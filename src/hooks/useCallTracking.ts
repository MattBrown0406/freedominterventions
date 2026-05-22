import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { trackEvent } from '@/lib/analytics';
import { getFunnelAttribution } from '@/lib/funnelAttribution';
import { getOpenClawCampaignKey, getOpenClawRoutingNumber, getOpenClawRoutingStatus, openClawSiteKey } from '@/config/callRouting';

// Generate or retrieve session ID for grouping clicks
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('call_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('call_session_id', sessionId);
  }
  return sessionId;
};

const getDeviceType = (): string => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

const normalizePhoneNumber = (phoneNumber: string) => phoneNumber.replace(/[^\d+]/g, '');

export const useCallTracking = () => {
  const location = useLocation();

  const trackCallClick = useCallback(async (phoneNumber: string = '541-668-8084', metadata: Record<string, unknown> = {}) => {
    const sourceAttribution = getFunnelAttribution();
    const attributionForTracking = sourceAttribution ?? { source: 'direct' };
    const source = attributionForTracking.source || sourceAttribution?.utm_source || 'direct';
    const callLocation = typeof metadata.location === 'string' ? metadata.location : 'unknown';
    const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);
    const openClawSite = openClawSiteKey(source);
    const openClawCampaignKey = getOpenClawCampaignKey(openClawSite, callLocation);
    const openClawCallSource = `${source}:${callLocation}`;
    const openClawRoutingNumber = getOpenClawRoutingNumber(openClawSite);
    const openClawRoutingStatus = getOpenClawRoutingStatus(openClawSite);

    trackEvent('phone_call_click', {
      page_path: location.pathname,
      phone_number: phoneNumber,
      call_source: openClawCallSource,
      normalized_phone_number: normalizedPhoneNumber,
      openclaw_site: openClawSite,
      openclaw_campaign_key: openClawCampaignKey,
      openclaw_routing_number: openClawRoutingNumber,
      openclaw_routing_status: openClawRoutingStatus,
      ...metadata,
    });

    try {
      // Use type assertion since the table was just created and types haven't synced
      await (supabase.from('call_analytics' as never) as unknown as { 
        insert: (data: Record<string, unknown>) => Promise<unknown> 
      }).insert({
        page_url: window.location.href,
        page_path: location.pathname,
        phone_number: phoneNumber,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        screen_width: window.innerWidth,
        screen_height: window.innerHeight,
        device_type: getDeviceType(),
        session_id: getSessionId(),
        source_attribution: attributionForTracking,
        metadata: {
          ...metadata,
          call_source: openClawCallSource,
          call_location: callLocation,
          openclaw_site: openClawSite,
          openclaw_campaign_key: openClawCampaignKey,
          openclaw_routing_number: openClawRoutingNumber,
          display_phone_number: phoneNumber,
          normalized_phone_number: normalizedPhoneNumber,
          openclaw_ready: true,
          routing_number_status: openClawRoutingStatus,
          source_attribution: attributionForTracking,
        },
      });
    } catch (error) {
      // Silently fail - don't interrupt user's call action
      console.error('Failed to track call click:', error);
    }
  }, [location.pathname]);

  return { trackCallClick };
};
