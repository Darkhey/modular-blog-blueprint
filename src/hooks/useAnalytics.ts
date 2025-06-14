
import { siteConfig } from '@/config/site.config';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    adsbygoogle: any[];
  }
}

export const useAnalytics = () => {
  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (siteConfig.googleServices.analytics.enabled && window.gtag) {
      window.gtag('event', eventName, {
        event_category: 'engagement',
        event_label: window.location.pathname,
        ...parameters
      });
    }
  };

  const trackPageView = (path: string, title?: string) => {
    if (siteConfig.googleServices.analytics.enabled && window.gtag) {
      window.gtag('config', siteConfig.googleServices.analytics.trackingId, {
        page_path: path,
        page_title: title || document.title
      });
    }
  };

  const trackOutboundLink = (url: string, label?: string) => {
    trackEvent('click', {
      event_category: 'outbound',
      event_label: label || url,
      transport_type: 'beacon'
    });
  };

  const trackDownload = (filename: string) => {
    trackEvent('file_download', {
      event_category: 'engagement',
      event_label: filename
    });
  };

  const trackNewsletterSignup = () => {
    trackEvent('newsletter_signup', {
      event_category: 'lead_generation',
      value: 1
    });
  };

  const trackCalculatorUsage = (calculatorType: string) => {
    trackEvent('calculator_usage', {
      event_category: 'engagement',
      event_label: calculatorType
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackOutboundLink,
    trackDownload,
    trackNewsletterSignup,
    trackCalculatorUsage
  };
};
