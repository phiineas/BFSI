// GTM and Analytics Helper Functions
// tvc_intern_group4

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Initialize dataLayer
export const initDataLayer = () => {
  window.dataLayer = window.dataLayer || [];
};

// GTM dataLayer push helper
export const pushToDataLayer = (data: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
  }
};

// Consent Mode v2 - Default consent state
export const setDefaultConsent = () => {
  pushToDataLayer({
    event: 'default_consent',
    'gtm.start': new Date().getTime(),
  });
  
  // Set default consent to denied
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'wait_for_update': 500
    });
  }
};

// Update consent when user accepts
export const updateConsent = (analyticsGranted: boolean, adsGranted: boolean) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      'analytics_storage': analyticsGranted ? 'granted' : 'denied',
      'ad_storage': adsGranted ? 'granted' : 'denied',
      'ad_user_data': adsGranted ? 'granted' : 'denied',
      'ad_personalization': adsGranted ? 'granted' : 'denied',
    });
  }

  // Push consent event to dataLayer
  pushToDataLayer({
    event: 'consent_update',
    analytics_storage: analyticsGranted ? 'granted' : 'denied',
    ad_storage: adsGranted ? 'granted' : 'denied',
  });
};

// Get user login status from auth context or localStorage
export const getUserLoginStatus = (): 'logged_in' | 'logged_out' => {
  if (typeof window === 'undefined') return 'logged_out';
  
  // Check localStorage or your auth system
  const isLoggedIn = localStorage.getItem('isAuthenticated') === 'true';
  return isLoggedIn ? 'logged_in' : 'logged_out';
};

// Get page category based on pathname
export const getPageCategory = (pathname: string): string => {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/products')) {
    if (pathname === '/products') return 'product_listing';
    return 'product_detail';
  }
  if (pathname.startsWith('/apply')) return 'application_form';
  if (pathname === '/login') return 'login';
  if (pathname === '/register') return 'registration';
  if (pathname.startsWith('/dashboard')) return 'dashboard';
  if (pathname === '/about') return 'about';
  if (pathname === '/contact') return 'contact';
  if (pathname === '/support') return 'support';
  return 'other';
};

// Enhanced page_view event
export const trackPageView = (pathname: string, title: string) => {
  pushToDataLayer({
    event: 'page_view',
    page_title: title,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    page_path: pathname,
    user_login_status: getUserLoginStatus(),
    page_category: getPageCategory(pathname),
  });
};

export default {
  initDataLayer,
  pushToDataLayer,
  setDefaultConsent,
  updateConsent,
  getUserLoginStatus,
  getPageCategory,
  trackPageView,
};
