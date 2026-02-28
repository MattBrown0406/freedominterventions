import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('MAILCHIMP_API_TOKEN');
    if (!apiKey) {
      throw new Error('MAILCHIMP_API_TOKEN not configured');
    }

    const { email, firstName, lastName } = await req.json();
    if (!email) {
      throw new Error('Email is required');
    }

    const listId = '1078537d9b';

    // MD5 hash of lowercase email
    const encoder = new TextEncoder();
    const data = encoder.encode(email.toLowerCase().trim());
    const hashBuffer = await crypto.subtle.digest('MD5', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const emailHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Upsert contact
    const upsertUrl = `https://us2.api.mailchimp.com/3.0/lists/${listId}/members/${emailHash}`;
    const upsertRes = await fetch(upsertUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Basic ${btoa(`anystring:${apiKey}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email.toLowerCase().trim(),
        status_if_new: 'subscribed',
        merge_fields: {
          FNAME: firstName || '',
          LNAME: lastName || '',
        },
      }),
    });

    if (!upsertRes.ok) {
      const errText = await upsertRes.text();
      console.error('Mailchimp upsert failed:', errText);
      throw new Error(`Mailchimp upsert failed: ${upsertRes.status}`);
    }

    const upsertData = await upsertRes.json();
    console.log('Mailchimp contact upserted:', upsertData.id);

    // Apply tag
    const tagUrl = `https://us2.api.mailchimp.com/3.0/lists/${listId}/members/${emailHash}/tags`;
    const tagRes = await fetch(tagUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`anystring:${apiKey}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tags: [{ name: 'Coaching Clients', status: 'active' }],
      }),
    });

    if (!tagRes.ok) {
      const tagErr = await tagRes.text();
      console.error('Mailchimp tag failed:', tagErr);
      // Don't throw - contact was added successfully
    } else {
      await tagRes.text();
      console.log('Mailchimp tag applied: Coaching Clients');
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('add-to-mailchimp error:', message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
