import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { trackEvent } from '@/lib/analytics';

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

export const useCallTracking = () => {
  const location = useLocation();

  const trackCallClick = useCallback(async (phoneNumber: string = '541-838-6009', metadata: Record<string, unknown> = {}) => {
    trackEvent('phone_call_click', {
      page_path: location.pathname,
      phone_number: phoneNumber,
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
        metadata: metadata,
      });
    } catch (error) {
      // Silently fail - don't interrupt user's call action
      console.error('Failed to track call click:', error);
    }
  }, [location.pathname]);

  return { trackCallClick };
};
