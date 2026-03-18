// components/Analytics.tsx
"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // Replace with your actual GA4 ID

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: Record<string, any>[];
  }
}

// Pageview tracking
export const pageview = (url: string) => {
  if (typeof window.gtag === "undefined") return;
  
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Event tracking
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window.gtag === "undefined") return;
  
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Zimbabwe-specific event categories
export const ZW_EVENTS = {
  // Appointment events
  APPOINTMENT_REQUESTED: "appointment_requested",
  APPOINTMENT_CONFIRMED: "appointment_confirmed",
  APPOINTMENT_CANCELLED: "appointment_cancelled",
  
  // Contact method events (important for Zimbabwe)
  WHATSAPP_CLICK: "whatsapp_click",
  SMS_OPT_IN: "sms_opt_in",
  PHONE_CALL: "phone_call",
  EMAIL_CONTACT: "email_contact",
  
  // Page/section views
  EMERGENCY_PAGE_VIEW: "emergency_page_view",
  BRANCH_SELECTED: "branch_selected",
  SERVICE_INQUIRY: "service_inquiry",
  
  // Device/location events
  MOBILE_VISIT: "mobile_visit",
  DESKTOP_VISIT: "desktop_visit",
  ZIM_LOCATION: "zim_location_detected",
};

// Helper functions for common events
export const trackWhatsAppClick = (context: string) => {
  event({
    action: ZW_EVENTS.WHATSAPP_CLICK,
    category: "Contact",
    label: context,
  });
};

export const trackAppointmentRequest = (branch: string, method: string) => {
  event({
    action: ZW_EVENTS.APPOINTMENT_REQUESTED,
    category: "Appointments",
    label: `${branch} - ${method}`,
  });
};

export const trackSMSOptIn = (optedIn: boolean) => {
  event({
    action: ZW_EVENTS.SMS_OPT_IN,
    category: "Communication",
    label: optedIn ? "Opted In" : "Opted Out",
  });
};

export const trackEmergencyPageView = () => {
  event({
    action: ZW_EVENTS.EMERGENCY_PAGE_VIEW,
    category: "Pages",
    label: "Emergency Eye Care",
  });
};

// Inner component that uses hooks
function GoogleAnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      pageview(pathname);
    }
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
            
            // Detect Zimbabwe visitors
            const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (userTimeZone.includes('Harare') || userTimeZone.includes('Africa')) {
              gtag('event', '${ZW_EVENTS.ZIM_LOCATION}', {
                'event_category': 'Location',
                'event_label': userTimeZone
              });
            }
            
            // Detect mobile/desktop
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            gtag('event', isMobile ? '${ZW_EVENTS.MOBILE_VISIT}' : '${ZW_EVENTS.DESKTOP_VISIT}', {
              'event_category': 'Device',
              'event_label': navigator.userAgent
            });
          `,
        }}
      />
    </>
  );
}

// Main component wrapped in Suspense
export const GoogleAnalytics = () => {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner />
    </Suspense>
  );
};

// Hook for easy event tracking
export const useAnalytics = () => {
  return {
    trackWhatsAppClick,
    trackAppointmentRequest,
    trackSMSOptIn,
    trackEmergencyPageView,
    event,
    pageview,
  };
};

export default GoogleAnalytics;