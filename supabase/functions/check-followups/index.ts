import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const NOTION_API_TOKEN = Deno.env.get('NOTION_API_TOKEN');
const CRM_DB_ID = '2bb286dad2cf81499fc8d8151ee033a8';

interface OverdueContact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  followUpDate: string;
  daysOverdue: number;
  nextStep?: string;
  status?: string;
}

function calculateDaysOverdue(followUpDateStr: string): number {
  const followUpDate = new Date(followUpDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  followUpDate.setHours(0, 0, 0, 0);
  
  const diffTime = today.getTime() - followUpDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

async function checkOverdueFollowUps(): Promise<OverdueContact[]> {
  const today = new Date().toISOString().split('T')[0];
  
  const response = await fetch(`https://api.notion.com/v1/databases/${CRM_DB_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_API_TOKEN}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      filter: {
        and: [
          {
            property: 'Follow-Up Date',
            date: {
              on_or_before: today
            }
          },
          {
            property: 'Status',
            status: {
              does_not_equal: 'Completed'
            }
          },
          {
            property: 'Status',
            status: {
              does_not_equal: 'Lost'
            }
          },
          {
            property: 'Status',
            status: {
              does_not_equal: 'Unsuccessful'
            }
          },
          {
            property: 'Follow-Up Date',
            date: {
              is_not_empty: true
            }
          }
        ]
      },
      sorts: [
        {
          property: 'Follow-Up Date',
          direction: 'ascending'
        }
      ]
    }),
  });

  if (!response.ok) {
    console.error('Notion query error:', response.status, await response.text());
    throw new Error('Failed to query Notion CRM');
  }

  const data = await response.json();
  const overdueContacts: OverdueContact[] = [];

  for (const page of data.results) {
    const properties = page.properties;
    
    // Extract data from Notion properties
    const name = properties.Name?.title?.[0]?.text?.content || 'Unknown';
    const phone = properties.Phone?.phone_number || undefined;
    const email = properties.Email?.email || undefined;
    const followUpDate = properties['Follow-Up Date']?.date?.start;
    const nextStep = properties['Next Step']?.rich_text?.[0]?.text?.content || undefined;
    const status = properties.Status?.status?.name || undefined;

    if (followUpDate) {
      const daysOverdue = calculateDaysOverdue(followUpDate);
      
      if (daysOverdue >= 0) { // Include today (0 days) and overdue
        overdueContacts.push({
          id: page.id,
          name,
          phone,
          email,
          followUpDate,
          daysOverdue,
          nextStep,
          status
        });
      }
    }
  }

  return overdueContacts;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!NOTION_API_TOKEN) {
      throw new Error('NOTION_API_TOKEN not configured');
    }

    console.log('Checking for overdue follow-ups...');
    const overdueContacts = await checkOverdueFollowUps();

    console.log(`Found ${overdueContacts.length} overdue follow-up(s)`);

    // Format the response for easy consumption
    const summary = {
      count: overdueContacts.length,
      contacts: overdueContacts.map(contact => ({
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        followUpDate: contact.followUpDate,
        daysOverdue: contact.daysOverdue,
        nextStep: contact.nextStep,
        status: contact.status,
        urgency: contact.daysOverdue >= 7 ? 'high' : contact.daysOverdue >= 3 ? 'medium' : 'low'
      }))
    };

    return new Response(JSON.stringify(summary), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error checking follow-ups:', errorMessage);
    return new Response(JSON.stringify({ 
      error: errorMessage,
      count: 0,
      contacts: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});