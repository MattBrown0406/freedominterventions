import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const NOTION_API_TOKEN = Deno.env.get('NOTION_API_TOKEN');
const CRM_DB_ID = '2bb286dad2cf81499fc8d8151ee033a8';
const CALL_LOG_DB_ID = '314286dad2cf817dbfbcd6c2e94894fb';

interface BookingPayload {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  bookingType: string;
  bookingDate: string;
  bookingTime: string;
  durationMinutes: number;
  paymentId?: string;
  amountCents?: number;
}

interface NotionPage {
  id: string;
  properties: any;
}

async function searchNotionCRMByEmail(email: string): Promise<NotionPage | null> {
  const response = await fetch(`https://api.notion.com/v1/databases/${CRM_DB_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_API_TOKEN}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      filter: {
        property: 'Email',
        email: {
          equals: email.toLowerCase().trim()
        }
      }
    }),
  });

  if (!response.ok) {
    console.error('Notion search error:', await response.text());
    return null;
  }

  const data = await response.json();
  return data.results.length > 0 ? data.results[0] : null;
}

async function createNotionCRMRecord(payload: BookingPayload): Promise<string | null> {
  const isCoaching = payload.bookingType === 'coaching';
  const isConsultation = payload.bookingType === 'consultation';
  
  const properties: any = {
    'Name': {
      title: [{ text: { content: payload.customerName } }]
    },
    'Email': {
      email: payload.customerEmail
    },
    'Status': {
      status: { name: isConsultation ? 'Lead' : 'Scheduled' }
    },
    'Stage': {
      select: { name: isConsultation ? 'Consultation' : 'Booked' }
    },
    'Lead Source': {
      select: { name: 'Website' }
    },
    'Last Contact': {
      date: { start: new Date().toISOString().split('T')[0] }
    },
    'Next Step': {
      rich_text: [{
        text: { 
          content: `${isCoaching ? 'Coaching session' : 'Consultation'} booked for ${payload.bookingDate} at ${payload.bookingTime}` 
        }
      }]
    }
  };

  // Add phone if provided
  if (payload.customerPhone) {
    properties['Phone'] = {
      phone_number: payload.customerPhone
    };
  }

  // Add service type and pricing for coaching
  if (isCoaching) {
    properties['Service Type'] = {
      select: { name: 'Coaching' }
    };
    
    if (payload.amountCents) {
      const dollarAmount = payload.amountCents / 100;
      properties['Quoted Price'] = { number: dollarAmount };
      properties['Coaching Revenue'] = { number: dollarAmount };
    }
  }

  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_API_TOKEN}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      parent: { database_id: CRM_DB_ID },
      properties
    }),
  });

  if (!response.ok) {
    console.error('Notion create error:', await response.text());
    return null;
  }

  const data = await response.json();
  return data.id;
}

async function updateNotionCRMRecord(pageId: string): Promise<boolean> {
  const response = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${NOTION_API_TOKEN}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      properties: {
        'Last Contact': {
          date: { start: new Date().toISOString().split('T')[0] }
        }
      }
    }),
  });

  return response.ok;
}

async function createCallLogEntry(crmPageId: string, payload: BookingPayload): Promise<boolean> {
  const isCoaching = payload.bookingType === 'coaching';
  
  const properties = {
    'CRM': {
      relation: [{ id: crmPageId }]
    },
    'Date': {
      date: { start: new Date().toISOString().split('T')[0] }
    },
    'Type': {
      select: { name: isCoaching ? 'Booking - Coaching' : 'Booking - Consultation' }
    },
    'Notes': {
      rich_text: [{
        text: { 
          content: `${isCoaching ? 'Coaching session' : 'Consultation'} booked via website for ${payload.bookingDate} at ${payload.bookingTime}. Duration: ${payload.durationMinutes} minutes.${payload.paymentId ? ` Payment ID: ${payload.paymentId}` : ''}${payload.amountCents ? ` Amount: $${(payload.amountCents / 100).toFixed(2)}` : ''}`
        }
      }]
    }
  };

  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_API_TOKEN}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      parent: { database_id: CALL_LOG_DB_ID },
      properties
    }),
  });

  if (!response.ok) {
    console.error('Call log create error:', await response.text());
    return false;
  }

  return true;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!NOTION_API_TOKEN) {
      throw new Error('NOTION_API_TOKEN not configured');
    }

    const payload: BookingPayload = await req.json();
    
    console.log('Syncing booking to Notion:', {
      email: payload.customerEmail,
      type: payload.bookingType,
      date: payload.bookingDate
    });

    // Check if contact already exists
    const existingContact = await searchNotionCRMByEmail(payload.customerEmail);
    
    let crmPageId: string;
    
    if (existingContact) {
      // Update existing contact
      crmPageId = existingContact.id;
      await updateNotionCRMRecord(crmPageId);
      console.log('Updated existing CRM contact:', crmPageId);
    } else {
      // Create new contact
      const newPageId = await createNotionCRMRecord(payload);
      if (!newPageId) {
        throw new Error('Failed to create CRM record');
      }
      crmPageId = newPageId;
      console.log('Created new CRM contact:', crmPageId);
    }

    // Create call log entry
    const callLogCreated = await createCallLogEntry(crmPageId, payload);
    if (!callLogCreated) {
      console.error('Failed to create call log entry, but continuing...');
    }

    return new Response(JSON.stringify({ 
      success: true, 
      crmPageId,
      isNewContact: !existingContact,
      callLogCreated 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error syncing booking to Notion:', errorMessage);
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});