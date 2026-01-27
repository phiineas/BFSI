// Analytics Events Library - tvc_intern_group4
// Type-safe event tracking functions matching event_schema.md

import { pushToDataLayer, getUserLoginStatus } from './gtm';

// ============================================================================
// EVENT 1: page_view (Enhanced)
// ============================================================================
// Note: page_view is automatically tracked by GTM, but we enhance it with custom parameters
// This is called from layout or page components

export interface PageViewParams {
    page_title: string;
    page_location: string;
    page_path: string;
    user_login_status?: 'logged_in' | 'logged_out';
    page_category?: string;
}

export const trackPageView = (params: PageViewParams) => {
    pushToDataLayer({
        event: 'page_view',
        page_title: params.page_title,
        page_location: params.page_location,
        page_path: params.page_path,
        user_login_status: params.user_login_status || getUserLoginStatus(),
        page_category: params.page_category || 'other',
    });
};

// ============================================================================
// EVENT 2: view_product_list
// ============================================================================

export interface ViewProductListParams {
    product_category: 'all' | 'accounts' | 'loans' | 'insurance';
    product_count: number;
    filter_applied: string;
    user_segment: 'new_visitor' | 'returning_user' | 'existing_customer';
}

export const trackViewProductList = (params: ViewProductListParams) => {
    pushToDataLayer({
        event: 'view_product_list',
        product_category: params.product_category,
        product_count: params.product_count,
        filter_applied: params.filter_applied,
        user_segment: params.user_segment,
    });
};

// ============================================================================
// EVENT 3: view_product_detail
// ============================================================================

export interface ViewProductDetailParams {
    product_id: string;
    product_name: string;
    product_category: 'accounts' | 'loans' | 'insurance';
    product_interest_rate: string;
    product_rating: number;
    is_popular: boolean;
}

export const trackViewProductDetail = (params: ViewProductDetailParams) => {
    pushToDataLayer({
        event: 'view_product_detail',
        product_id: params.product_id,
        product_name: params.product_name,
        product_category: params.product_category,
        product_interest_rate: params.product_interest_rate,
        product_rating: params.product_rating,
        is_popular: params.is_popular,
    });
};

// ============================================================================
// EVENT 4: start_application (CONVERSION)
// ============================================================================

export interface StartApplicationParams {
    product_id: string;
    product_name: string;
    product_category: 'accounts' | 'loans' | 'insurance';
    application_source: 'product_card' | 'product_detail' | 'dashboard' | 'other';
    user_login_status?: 'logged_in' | 'logged_out';
}

export const trackStartApplication = (params: StartApplicationParams) => {
    pushToDataLayer({
        event: 'start_application',
        product_id: params.product_id,
        product_name: params.product_name,
        product_category: params.product_category,
        application_source: params.application_source,
        user_login_status: params.user_login_status || getUserLoginStatus(),
    });
};

// ============================================================================
// EVENT 5: form_step_completed (CONVERSION)
// ============================================================================

export interface FormStepCompletedParams {
    product_id: string;
    product_category: 'accounts' | 'loans' | 'insurance';
    form_step_number: number;
    form_step_name: 'personal_info' | 'employment_details' | 'financial_info' | 'review';
    total_steps: number;
    completion_percentage: number;
}

export const trackFormStepCompleted = (params: FormStepCompletedParams) => {
    pushToDataLayer({
        event: 'form_step_completed',
        product_id: params.product_id,
        product_category: params.product_category,
        form_step_number: params.form_step_number,
        form_step_name: params.form_step_name,
        total_steps: params.total_steps,
        completion_percentage: params.completion_percentage,
    });
};

// ============================================================================
// EVENT 6: otp_initiated (CONVERSION)
// ============================================================================

export interface OtpInitiatedParams {
    verification_type: 'mobile' | 'email';
    verification_purpose: 'application_verification' | 'login' | 'registration';
    product_id: string;
    user_type: 'new_user' | 'existing_user';
}

export const trackOtpInitiated = (params: OtpInitiatedParams) => {
    pushToDataLayer({
        event: 'otp_initiated',
        verification_type: params.verification_type,
        verification_purpose: params.verification_purpose,
        product_id: params.product_id,
        user_type: params.user_type,
    });
};

// ============================================================================
// EVENT 7: otp_verified (CONVERSION)
// ============================================================================

export interface OtpVerifiedParams {
    verification_type: 'mobile' | 'email';
    verification_purpose: 'application_verification' | 'login' | 'registration';
    product_id: string;
    verification_attempts: number;
    time_to_verify: number; // seconds
}

export const trackOtpVerified = (params: OtpVerifiedParams) => {
    pushToDataLayer({
        event: 'otp_verified',
        verification_type: params.verification_type,
        verification_purpose: params.verification_purpose,
        product_id: params.product_id,
        verification_attempts: params.verification_attempts,
        time_to_verify: params.time_to_verify,
    });
};

// ============================================================================
// EVENT 8: application_submitted (CONVERSION)
// ============================================================================

export interface ApplicationSubmittedParams {
    product_id: string;
    product_name: string;
    product_category: 'accounts' | 'loans' | 'insurance';
    application_id: string;
    application_amount: number;
    application_tenure: number; // months
    time_to_complete: number; // seconds
}

export const trackApplicationSubmitted = (params: ApplicationSubmittedParams) => {
    pushToDataLayer({
        event: 'application_submitted',
        product_id: params.product_id,
        product_name: params.product_name,
        product_category: params.product_category,
        application_id: params.application_id,
        application_amount: params.application_amount,
        application_tenure: params.application_tenure,
        time_to_complete: params.time_to_complete,
    });
};

// ============================================================================
// EVENT 9: user_login (CONVERSION)
// ============================================================================

export interface UserLoginParams {
    login_method: 'email_password' | 'otp' | 'social';
    user_type: 'existing_customer' | 'new_customer';
    login_source: 'header_cta' | 'apply_flow' | 'direct' | 'app_launch';
    session_start_time: string; // ISO format
}

export const trackUserLogin = (params: UserLoginParams) => {
    pushToDataLayer({
        event: 'user_login',
        login_method: params.login_method,
        user_type: params.user_type,
        login_source: params.login_source,
        session_start_time: params.session_start_time,
    });
};

// ============================================================================
// EVENT 10: user_registration
// ============================================================================

export interface UserRegistrationParams {
    registration_method: 'email' | 'mobile' | 'social';
    user_type: 'new_customer';
    registration_source: 'apply_flow' | 'direct' | 'product_page';
    account_type: 'individual' | 'business';
}

export const trackUserRegistration = (params: UserRegistrationParams) => {
    pushToDataLayer({
        event: 'user_registration',
        registration_method: params.registration_method,
        user_type: params.user_type,
        registration_source: params.registration_source,
        account_type: params.account_type,
    });
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// Generate unique application ID
export const generateApplicationId = (): string => {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `APP${dateStr}${randomNum}`;
};

// Calculate time elapsed in seconds
export const calculateTimeElapsed = (startTime: number): number => {
    return Math.floor((Date.now() - startTime) / 1000);
};

// Get user segment based on visit history
export const getUserSegment = (): 'new_visitor' | 'returning_user' | 'existing_customer' => {
    if (typeof window === 'undefined') return 'new_visitor';

    const isLoggedIn = localStorage.getItem('isAuthenticated') === 'true';
    if (isLoggedIn) return 'existing_customer';

    const visitCount = parseInt(localStorage.getItem('visitCount') || '0');
    return visitCount > 1 ? 'returning_user' : 'new_visitor';
};

// Increment visit count
export const incrementVisitCount = () => {
    if (typeof window === 'undefined') return;
    const visitCount = parseInt(localStorage.getItem('visitCount') || '0');
    localStorage.setItem('visitCount', (visitCount + 1).toString());
};

// Export all tracking functions
export default {
    trackPageView,
    trackViewProductList,
    trackViewProductDetail,
    trackStartApplication,
    trackFormStepCompleted,
    trackOtpInitiated,
    trackOtpVerified,
    trackApplicationSubmitted,
    trackUserLogin,
    trackUserRegistration,
    generateApplicationId,
    calculateTimeElapsed,
    getUserSegment,
    incrementVisitCount,
};
