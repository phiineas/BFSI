import { Platform } from 'react-native';

// User Login Status Helper
let currentUserLoginStatus = 'logged_out';

export const setUserLoginStatus = (status: 'logged_in' | 'logged_out') => {
    currentUserLoginStatus = status;
};

// Common Default Parameters
const getDefaultParams = () => ({
    user_login_status: currentUserLoginStatus,
});

// Helper to safely get analytics instance
const getAnalytics = () => {
    if (Platform.OS === 'web') {
        return {
            logEvent: async (name: string, params: any) => {
                console.log(`[Analytics-Web-Mock] Logging Event: ${name}`, params);
            }
        };
    }
    const analytics = require('@react-native-firebase/analytics').default;
    return analytics();
};

/**
 * Screen View Event
 * Tracks screen views with category and validation.
 */
export const logScreenView = async (params: {
    screen_name: string;
    screen_class?: string;
    screen_category?: string;
    previous_screen?: string;
}) => {
    try {
        const eventParams = {
            ...getDefaultParams(),
            screen_name: params.screen_name,
            screen_class: params.screen_class || params.screen_name,
            screen_category: params.screen_category || 'general',
            previous_screen: params.previous_screen || 'unknown',
        };

        // Log to Firebase (automatically handles screen_view but we add custom params)
        await getAnalytics().logEvent('screen_view', eventParams);
        console.log('[Analytics] Screen View:', eventParams);
    } catch (error) {
        console.log('[Analytics] Failed to log screen view:', error);
    }
};

/**
 * Generic Event Logger
 * Use for custom events not covered by specific helpers.
 */
export const logEvent = async (name: string, params: Record<string, any> = {}) => {
    try {
        const eventParams = {
            ...getDefaultParams(),
            ...params,
        };
        await getAnalytics().logEvent(name, eventParams);
        console.log(`[Analytics] Event: ${name}`, eventParams);
    } catch (error) {
        console.log(`[Analytics] Failed to log event ${name}:`, error);
    }
};

/**
 * Enhanced Ecommerce Events
 */

export const logViewProductList = async (params: {
    product_category: string;
    product_count: number;
    filter_applied?: string;
    user_segment?: string;
}) => {
    logEvent('view_product_list', {
        ...params,
        filter_applied: params.filter_applied || 'none',
        user_segment: params.user_segment || 'general',
    });
};

export const logUserRegistration = async (params: {
    registration_method: string;
    user_type: string;
    registration_source: string;
    account_type: string;
}) => {
    setUserLoginStatus('logged_in');
    logEvent('user_registration', params);
};

export const logViewProductDetail = async (params: {
    product_id: string;
    product_name: string;
    product_category: string;
    product_interest_rate?: string;
    product_rating?: number;
    is_popular?: boolean;
}) => {
    logEvent('view_product_detail', params);
};

export const logStartApplication = async (params: {
    product_id: string;
    product_name: string;
    product_category: string;
    application_source: string;
}) => {
    logEvent('start_application', params);
};

export const logFormStepCompleted = async (params: {
    product_id: string;
    product_category: string;
    form_step_number: number;
    form_step_name: string;
    total_steps: number;
    completion_percentage: number;
}) => {
    logEvent('form_step_completed', params);
};

export const logOtpInitiated = async (params: {
    verification_type: 'mobile' | 'email';
    verification_purpose: string;
    product_id?: string;
    user_type?: string;
}) => {
    logEvent('otp_initiated', {
        ...params,
        product_id: params.product_id || 'none',
        user_type: params.user_type || 'unknown',
    });
};

export const logOtpVerified = async (params: {
    verification_type: 'mobile' | 'email';
    verification_purpose: string;
    product_id?: string;
    verification_attempts: number;
    time_to_verify: number;
}) => {
    logEvent('otp_verified', {
        ...params,
        product_id: params.product_id || 'none',
    });
};

export const logApplicationSubmitted = async (params: {
    product_id: string;
    product_name: string;
    product_category: string;
    application_id: string;
    application_amount: number;
    application_tenure: number;
    time_to_complete: number;
}) => {
    logEvent('application_submitted', params);
};

export const logUserLogin = async (params: {
    login_method: string;
    user_type: string;
    login_source: string;
}) => {
    setUserLoginStatus('logged_in');
    logEvent('user_login', {
        ...params,
        session_start_time: new Date().toISOString(),
    });
};
