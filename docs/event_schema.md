# Event Schema Design - tvc_intern_group4

**Project**: BFSI Analytics Assessment  
**Platforms**: Web (Next.js) + Android App (React Native Expo)  
**Last Updated**: 2026-01-26

## Overview

This document defines the comprehensive event schema for both Web and Android App platforms. All events follow GA4 best practices and are designed to track key BFSI user journeys including product browsing, application flows, and verification processes.

**Total Events**: 10 per platform (20 total)  
**Conversion Events**: 6 per platform  
**Event Parity**: Web and Android events maintain consistent naming and parameters

---

## Web Events Schema

### Event 1: page_view (Enhanced)

| Field | Value |
|-------|-------|
| **User Action** | User navigates to any page on the website |
| **Page URL** | All pages (/, /products, /apply/*, /login, /dashboard, etc.) |
| **Screenshot Reference** | See user_journeys.md |
| **Event Name** | `page_view` |
| **Event Parameters** | page_title, page_location, page_path, user_login_status, page_category |
| **Parameter Scope** | Event-scoped |
| **Data Types** | String (all parameters) |
| **Principle** | Track all page views with enhanced context about user authentication status and page category for better segmentation |
| **Example Values** | page_title: "Products - BFSI Bank", page_location: "https://example.com/products", page_path: "/products", user_login_status: "logged_out", page_category: "product_listing" |

**Code Snippet (dataLayer)**:
```javascript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'page_view',
  page_title: document.title,
  page_location: window.location.href,
  page_path: window.location.pathname,
  user_login_status: userLoggedIn ? 'logged_in' : 'logged_out',
  page_category: 'product_listing' // dynamic based on page
});
```

---

### Event 2: view_product_list

| Field | Value |
|-------|-------|
| **User Action** | User views the products listing page or switches product category tabs |
| **Page URL** | /products |
| **Screenshot Reference** | See user_journeys.md - Products Page |
| **Event Name** | `view_product_list` |
| **Event Parameters** | product_category, product_count, filter_applied, user_segment |
| **Parameter Scope** | Event-scoped |
| **Data Types** | product_category: String, product_count: Integer, filter_applied: String, user_segment: String |
| **Principle** | Track product discovery behavior to understand which categories drive most engagement |
| **Example Values** | product_category: "loans", product_count: 3, filter_applied: "all", user_segment: "new_visitor" |

**Code Snippet (dataLayer)**:
```javascript
window.dataLayer.push({
  event: 'view_product_list',
  product_category: 'loans', // 'all', 'accounts', 'loans', 'insurance'
  product_count: 3,
  filter_applied: 'all',
  user_segment: 'new_visitor'
});
```

---

### Event 3: view_product_detail

| Field | Value |
|-------|-------|
| **User Action** | User clicks "Learn More" on a product card or navigates to product detail page |
| **Page URL** | /products/[product-id] |
| **Screenshot Reference** | See user_journeys.md - Product Detail Pages |
| **Event Name** | `view_product_detail` |
| **Event Parameters** | product_id, product_name, product_category, product_interest_rate, product_rating, is_popular |
| **Parameter Scope** | Event-scoped |
| **Data Types** | product_id: String, product_name: String, product_category: String, product_interest_rate: String, product_rating: Float, is_popular: Boolean |
| **Principle** | Track product interest and enable product performance analysis |
| **Example Values** | product_id: "personal-loan", product_name: "Personal Loan", product_category: "loans", product_interest_rate: "10.5% p.a.", product_rating: 4.6, is_popular: true |

**Code Snippet (dataLayer)**:
```javascript
window.dataLayer.push({
  event: 'view_product_detail',
  product_id: 'personal-loan',
  product_name: 'Personal Loan',
  product_category: 'loans',
  product_interest_rate: '10.5% p.a.',
  product_rating: 4.6,
  is_popular: true
});
```

---

### Event 4: start_application (CONVERSION)

| Field | Value |
|-------|-------|
| **User Action** | User clicks "Apply Now" button on product card or detail page |
| **Page URL** | /products, /products/[product-id] |
| **Screenshot Reference** | See user_journeys.md - Apply Now CTA |
| **Event Name** | `start_application` |
| **Event Parameters** | product_id, product_name, product_category, application_source, user_login_status |
| **Parameter Scope** | Event-scoped |
| **Data Types** | All String except user_login_status: String |
| **Principle** | Critical conversion event - marks intent to apply for a financial product |
| **Example Values** | product_id: "home-loan", product_name: "Home Loan", product_category: "loans", application_source: "product_card", user_login_status: "logged_out" |

**Code Snippet (dataLayer)**:
```javascript
window.dataLayer.push({
  event: 'start_application',
  product_id: 'home-loan',
  product_name: 'Home Loan',
  product_category: 'loans',
  application_source: 'product_card', // or 'product_detail'
  user_login_status: 'logged_out'
});
```

---

### Event 5: form_step_completed (CONVERSION)

| Field | Value |
|-------|-------|
| **User Action** | User completes a step in the multi-step application form |
| **Page URL** | /apply/[product-id] |
| **Screenshot Reference** | See user_journeys.md - Application Form Steps |
| **Event Name** | `form_step_completed` |
| **Event Parameters** | product_id, product_category, form_step_number, form_step_name, total_steps, completion_percentage |
| **Parameter Scope** | Event-scoped |
| **Data Types** | product_id: String, product_category: String, form_step_number: Integer, form_step_name: String, total_steps: Integer, completion_percentage: Float |
| **Principle** | Track form funnel progression and identify drop-off points in application process |
| **Example Values** | product_id: "personal-loan", product_category: "loans", form_step_number: 2, form_step_name: "employment_details", total_steps: 4, completion_percentage: 50.0 |

**Code Snippet (dataLayer)**:
```javascript
window.dataLayer.push({
  event: 'form_step_completed',
  product_id: 'personal-loan',
  product_category: 'loans',
  form_step_number: 2,
  form_step_name: 'employment_details', // 'personal_info', 'employment_details', 'financial_info', 'review'
  total_steps: 4,
  completion_percentage: 50.0
});
```

---

### Event 6: otp_initiated (CONVERSION)

| Field | Value |
|-------|-------|
| **User Action** | User requests OTP for verification (mobile/email) |
| **Page URL** | /apply/[product-id], /login, /register |
| **Screenshot Reference** | See user_journeys.md - OTP Verification |
| **Event Name** | `otp_initiated` |
| **Event Parameters** | verification_type, verification_purpose, product_id, user_type |
| **Parameter Scope** | Event-scoped |
| **Data Types** | All String |
| **Principle** | Track verification initiation - critical trust indicator in BFSI |
| **Example Values** | verification_type: "mobile", verification_purpose: "application_verification", product_id: "personal-loan", user_type: "new_user" |

**Code Snippet (dataLayer)**:
```javascript
window.dataLayer.push({
  event: 'otp_initiated',
  verification_type: 'mobile', // or 'email'
  verification_purpose: 'application_verification', // or 'login', 'registration'
  product_id: 'personal-loan',
  user_type: 'new_user' // or 'existing_user'
});
```

---

### Event 7: otp_verified (CONVERSION)

| Field | Value |
|-------|-------|
| **User Action** | User successfully verifies OTP |
| **Page URL** | /apply/[product-id], /login, /register |
| **Screenshot Reference** | See user_journeys.md - OTP Success |
| **Event Name** | `otp_verified` |
| **Event Parameters** | verification_type, verification_purpose, product_id, verification_attempts, time_to_verify |
| **Parameter Scope** | Event-scoped |
| **Data Types** | verification_type: String, verification_purpose: String, product_id: String, verification_attempts: Integer, time_to_verify: Integer (seconds) |
| **Principle** | Track successful verification and measure verification efficiency |
| **Example Values** | verification_type: "mobile", verification_purpose: "application_verification", product_id: "personal-loan", verification_attempts: 1, time_to_verify: 45 |

**Code Snippet (dataLayer)**:
```javascript
window.dataLayer.push({
  event: 'otp_verified',
  verification_type: 'mobile',
  verification_purpose: 'application_verification',
  product_id: 'personal-loan',
  verification_attempts: 1,
  time_to_verify: 45 // seconds
});
```

---

### Event 8: application_submitted (CONVERSION)

| Field | Value |
|-------|-------|
| **User Action** | User submits complete application form |
| **Page URL** | /apply/[product-id] |
| **Screenshot Reference** | See user_journeys.md - Application Submission |
| **Event Name** | `application_submitted` |
| **Event Parameters** | product_id, product_name, product_category, application_id, application_amount, application_tenure, time_to_complete |
| **Parameter Scope** | Event-scoped |
| **Data Types** | product_id: String, product_name: String, product_category: String, application_id: String, application_amount: Float, application_tenure: Integer, time_to_complete: Integer (seconds) |
| **Principle** | Primary conversion event - successful lead generation |
| **Example Values** | product_id: "home-loan", product_name: "Home Loan", product_category: "loans", application_id: "APP20260126001", application_amount: 250000.00, application_tenure: 240, time_to_complete: 420 |

**Code Snippet (dataLayer)**:
```javascript
window.dataLayer.push({
  event: 'application_submitted',
  product_id: 'home-loan',
  product_name: 'Home Loan',
  product_category: 'loans',
  application_id: 'APP20260126001',
  application_amount: 250000.00,
  application_tenure: 240, // months
  time_to_complete: 420 // seconds
});
```

---

### Event 9: user_login (CONVERSION)

| Field | Value |
|-------|-------|
| **User Action** | User successfully logs into their account |
| **Page URL** | /login |
| **Screenshot Reference** | See user_journeys.md - Login Page |
| **Event Name** | `user_login` |
| **Event Parameters** | login_method, user_type, login_source, session_start_time |
| **Parameter Scope** | Event-scoped |
| **Data Types** | All String except session_start_time: String (ISO format) |
| **Principle** | Track authentication success and user engagement |
| **Example Values** | login_method: "email_password", user_type: "existing_customer", login_source: "header_cta", session_start_time: "2026-01-26T11:45:00Z" |

**Code Snippet (dataLayer)**:
```javascript
window.dataLayer.push({
  event: 'user_login',
  login_method: 'email_password', // or 'otp', 'social'
  user_type: 'existing_customer',
  login_source: 'header_cta', // or 'apply_flow', 'direct'
  session_start_time: new Date().toISOString()
});
```

---

### Event 10: user_registration

| Field | Value |
|-------|-------|
| **User Action** | User completes account registration |
| **Page URL** | /register |
| **Screenshot Reference** | See user_journeys.md - Registration Page |
| **Event Name** | `user_registration` |
| **Event Parameters** | registration_method, user_type, registration_source, account_type |
| **Parameter Scope** | Event-scoped |
| **Data Types** | All String |
| **Principle** | Track new user acquisition and registration channel effectiveness |
| **Example Values** | registration_method: "email", user_type: "new_customer", registration_source: "apply_flow", account_type: "individual" |

**Code Snippet (dataLayer)**:
```javascript
window.dataLayer.push({
  event: 'user_registration',
  registration_method: 'email', // or 'mobile', 'social'
  user_type: 'new_customer',
  registration_source: 'apply_flow', // or 'direct', 'product_page'
  account_type: 'individual' // or 'business'
});
```

---

## Android App Events Schema

### Event 1: screen_view (Enhanced)

| Field | Value |
|-------|-------|
| **User Action** | User navigates to any screen in the app |
| **Screen Name** | All screens (Home, ProductList, ProductDetail, Apply, Login, Dashboard, etc.) |
| **Screenshot Reference** | See user_journeys.md - App Screens |
| **Event Name** | `screen_view` |
| **Event Parameters** | screen_name, screen_class, user_login_status, screen_category, previous_screen |
| **Parameter Scope** | Event-scoped |
| **Data Types** | All String |
| **Principle** | Track all screen views with navigation context and user authentication status |
| **Example Values** | screen_name: "ProductListScreen", screen_class: "ProductListScreen", user_login_status: "logged_out", screen_category: "product_browsing", previous_screen: "HomeScreen" |

**Code Snippet (Firebase)**:
```javascript
import { logEvent } from 'firebase/analytics';

logEvent(analytics, 'screen_view', {
  screen_name: 'ProductListScreen',
  screen_class: 'ProductListScreen',
  user_login_status: userLoggedIn ? 'logged_in' : 'logged_out',
  screen_category: 'product_browsing',
  previous_screen: 'HomeScreen'
});
```

---

### Event 2: view_product_list

| Field | Value |
|-------|-------|
| **User Action** | User views the products listing screen or switches category |
| **Screen Name** | ProductListScreen |
| **Screenshot Reference** | See user_journeys.md - App Product List |
| **Event Name** | `view_product_list` |
| **Event Parameters** | product_category, product_count, filter_applied, user_segment |
| **Parameter Scope** | Event-scoped |
| **Data Types** | product_category: String, product_count: Integer, filter_applied: String, user_segment: String |
| **Principle** | Maintain parity with Web event for cross-platform analysis |
| **Example Values** | product_category: "insurance", product_count: 3, filter_applied: "all", user_segment: "returning_user" |

**Code Snippet (Firebase)**:
```javascript
logEvent(analytics, 'view_product_list', {
  product_category: 'insurance',
  product_count: 3,
  filter_applied: 'all',
  user_segment: 'returning_user'
});
```

---

### Event 3: view_product_detail

| Field | Value |
|-------|-------|
| **User Action** | User taps on a product card to view details |
| **Screen Name** | ProductDetailScreen |
| **Screenshot Reference** | See user_journeys.md - App Product Detail |
| **Event Name** | `view_product_detail` |
| **Event Parameters** | product_id, product_name, product_category, product_interest_rate, product_rating, is_popular |
| **Parameter Scope** | Event-scoped |
| **Data Types** | product_id: String, product_name: String, product_category: String, product_interest_rate: String, product_rating: Float, is_popular: Boolean |
| **Principle** | Identical to Web event for cross-platform comparison |
| **Example Values** | product_id: "savings-account", product_name: "Premium Savings Account", product_category: "accounts", product_interest_rate: "7.5% p.a.", product_rating: 4.8, is_popular: true |

**Code Snippet (Firebase)**:
```javascript
logEvent(analytics, 'view_product_detail', {
  product_id: 'savings-account',
  product_name: 'Premium Savings Account',
  product_category: 'accounts',
  product_interest_rate: '7.5% p.a.',
  product_rating: 4.8,
  is_popular: true
});
```

---

### Event 4: start_application (CONVERSION)

| Field | Value |
|-------|-------|
| **User Action** | User taps "Apply Now" button |
| **Screen Name** | ProductListScreen, ProductDetailScreen |
| **Screenshot Reference** | See user_journeys.md - App Apply CTA |
| **Event Name** | `start_application` |
| **Event Parameters** | product_id, product_name, product_category, application_source, user_login_status |
| **Parameter Scope** | Event-scoped |
| **Data Types** | All String |
| **Principle** | Critical conversion event - identical to Web for parity |
| **Example Values** | product_id: "car-loan", product_name: "Car Loan", product_category: "loans", application_source: "product_detail", user_login_status: "logged_in" |

**Code Snippet (Firebase)**:
```javascript
logEvent(analytics, 'start_application', {
  product_id: 'car-loan',
  product_name: 'Car Loan',
  product_category: 'loans',
  application_source: 'product_detail',
  user_login_status: 'logged_in'
});
```

---

### Event 5: form_step_completed (CONVERSION)

| Field | Value |
|-------|-------|
| **User Action** | User completes a step in application form |
| **Screen Name** | ApplicationFormScreen |
| **Screenshot Reference** | See user_journeys.md - App Form Steps |
| **Event Name** | `form_step_completed` |
| **Event Parameters** | product_id, product_category, form_step_number, form_step_name, total_steps, completion_percentage |
| **Parameter Scope** | Event-scoped |
| **Data Types** | product_id: String, product_category: String, form_step_number: Integer, form_step_name: String, total_steps: Integer, completion_percentage: Float |
| **Principle** | Track mobile form funnel - identical parameters to Web |
| **Example Values** | product_id: "life-insurance", product_category: "insurance", form_step_number: 3, form_step_name: "financial_info", total_steps: 4, completion_percentage: 75.0 |

**Code Snippet (Firebase)**:
```javascript
logEvent(analytics, 'form_step_completed', {
  product_id: 'life-insurance',
  product_category: 'insurance',
  form_step_number: 3,
  form_step_name: 'financial_info',
  total_steps: 4,
  completion_percentage: 75.0
});
```

---

### Event 6: otp_initiated (CONVERSION)

| Field | Value |
|-------|-------|
| **User Action** | User requests OTP in app |
| **Screen Name** | ApplicationFormScreen, LoginScreen, RegisterScreen |
| **Screenshot Reference** | See user_journeys.md - App OTP |
| **Event Name** | `otp_initiated` |
| **Event Parameters** | verification_type, verification_purpose, product_id, user_type |
| **Parameter Scope** | Event-scoped |
| **Data Types** | All String |
| **Principle** | Track mobile verification initiation |
| **Example Values** | verification_type: "mobile", verification_purpose: "login", product_id: "none", user_type: "existing_user" |

**Code Snippet (Firebase)**:
```javascript
logEvent(analytics, 'otp_initiated', {
  verification_type: 'mobile',
  verification_purpose: 'login',
  product_id: 'none',
  user_type: 'existing_user'
});
```

---

### Event 7: otp_verified (CONVERSION)

| Field | Value |
|-------|-------|
| **User Action** | User successfully verifies OTP in app |
| **Screen Name** | ApplicationFormScreen, LoginScreen, RegisterScreen |
| **Screenshot Reference** | See user_journeys.md - App OTP Success |
| **Event Name** | `otp_verified` |
| **Event Parameters** | verification_type, verification_purpose, product_id, verification_attempts, time_to_verify |
| **Parameter Scope** | Event-scoped |
| **Data Types** | verification_type: String, verification_purpose: String, product_id: String, verification_attempts: Integer, time_to_verify: Integer |
| **Principle** | Track mobile verification success |
| **Example Values** | verification_type: "mobile", verification_purpose: "registration", product_id: "none", verification_attempts: 2, time_to_verify: 62 |

**Code Snippet (Firebase)**:
```javascript
logEvent(analytics, 'otp_verified', {
  verification_type: 'mobile',
  verification_purpose: 'registration',
  product_id: 'none',
  verification_attempts: 2,
  time_to_verify: 62
});
```

---

### Event 8: application_submitted (CONVERSION)

| Field | Value |
|-------|-------|
| **User Action** | User submits application in app |
| **Screen Name** | ApplicationFormScreen |
| **Screenshot Reference** | See user_journeys.md - App Submission |
| **Event Name** | `application_submitted` |
| **Event Parameters** | product_id, product_name, product_category, application_id, application_amount, application_tenure, time_to_complete |
| **Parameter Scope** | Event-scoped |
| **Data Types** | product_id: String, product_name: String, product_category: String, application_id: String, application_amount: Float, application_tenure: Integer, time_to_complete: Integer |
| **Principle** | Primary mobile conversion - identical to Web |
| **Example Values** | product_id: "health-insurance", product_name: "Health Insurance", product_category: "insurance", application_id: "APP20260126002", application_amount: 50000.00, application_tenure: 12, time_to_complete: 380 |

**Code Snippet (Firebase)**:
```javascript
logEvent(analytics, 'application_submitted', {
  product_id: 'health-insurance',
  product_name: 'Health Insurance',
  product_category: 'insurance',
  application_id: 'APP20260126002',
  application_amount: 50000.00,
  application_tenure: 12,
  time_to_complete: 380
});
```

---

### Event 9: user_login (CONVERSION)

| Field | Value |
|-------|-------|
| **User Action** | User logs in via app |
| **Screen Name** | LoginScreen |
| **Screenshot Reference** | See user_journeys.md - App Login |
| **Event Name** | `user_login` |
| **Event Parameters** | login_method, user_type, login_source, session_start_time |
| **Parameter Scope** | Event-scoped |
| **Data Types** | All String |
| **Principle** | Track mobile authentication |
| **Example Values** | login_method: "biometric", user_type: "existing_customer", login_source: "app_launch", session_start_time: "2026-01-26T11:50:00Z" |

**Code Snippet (Firebase)**:
```javascript
logEvent(analytics, 'user_login', {
  login_method: 'biometric',
  user_type: 'existing_customer',
  login_source: 'app_launch',
  session_start_time: new Date().toISOString()
});
```

---

### Event 10: user_registration

| Field | Value |
|-------|-------|
| **User Action** | User registers via app |
| **Screen Name** | RegisterScreen |
| **Screenshot Reference** | See user_journeys.md - App Registration |
| **Event Name** | `user_registration` |
| **Event Parameters** | registration_method, user_type, registration_source, account_type |
| **Parameter Scope** | Event-scoped |
| **Data Types** | All String |
| **Principle** | Track mobile user acquisition |
| **Example Values** | registration_method: "mobile", user_type: "new_customer", registration_source: "app_onboarding", account_type: "individual" |

**Code Snippet (Firebase)**:
```javascript
logEvent(analytics, 'user_registration', {
  registration_method: 'mobile',
  user_type: 'new_customer',
  registration_source: 'app_onboarding',
  account_type: 'individual'
});
```

---

## Event Mapping for BFSI KPIs

### Acquisition & Reach
- `page_view` / `screen_view` → Users, New Users, Traffic source
- `user_registration` → New user acquisition

### Engagement
- `page_view` / `screen_view` → Engaged sessions, Engagement rate
- `view_product_list`, `view_product_detail` → Product views by category

### Funnel & Conversion
- `start_application` → Application start rate
- `form_step_completed` → Form step completion rate, Drop-off analysis
- `application_submitted` → Lead conversion rate

### Trust & Verification
- `otp_initiated` → OTP initiation rate
- `otp_verified` → OTP success rate
- Ratio of `otp_verified` / `otp_initiated` → Verification completion rate

### Platform Performance
- Compare Web vs Android metrics across all events
- Cross-platform user journey analysis

---

## Implementation Notes

1. **Naming Convention**: All GA4 properties, GTM containers, and related assets use prefix `tvc_intern_group4_`
2. **Event Parity**: Web and Android events have identical names and parameter structures for cross-platform analysis
3. **Conversion Events**: 6 conversion events per platform marked as conversions in GA4
4. **Data Quality**: All parameters must have valid values (no null, empty, or "not set")
5. **Server-Side Tracking**: Selected events will be routed through sGTM for enhanced reliability
6. **Measurement Protocol**: All events in this schema are eligible for MP implementation

## Next Steps

1. Create user journey documentation with screenshots
2. Implement events in Web codebase
3. Implement events in Android App codebase
4. Configure GTM triggers and tags
5. Set up Firebase Analytics
6. Validate all events in DebugView
