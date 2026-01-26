# User Journeys Documentation - tvc_intern_group4

**Project**: BFSI Analytics Assessment  
**Last Updated**: 2026-01-26

## Overview

This document maps out the key user journeys for both Web and Android App platforms, identifying critical interaction points and their corresponding analytics events.

---

## Journey 1: Product Discovery & Application (Primary Conversion Flow)

### Description
User discovers products, explores details, and submits an application for a financial product (loan, account, or insurance).

### Steps - Web

1. **Landing** → Home Page (/)
   - Event: `page_view` (page_category: "home")
   - User sees hero section, product highlights, CTAs

2. **Product Browsing** → Products Page (/products)
   - Event: `page_view` (page_category: "product_listing")
   - Event: `view_product_list` (product_category: "all")
   - User can filter by category (Accounts, Loans, Insurance)
   - Each filter change triggers: `view_product_list` (product_category: selected)

3. **Product Detail View** → Product Detail Page (/products/[product-id])
   - Event: `view_product_detail` (product_id, product_name, product_category, etc.)
   - User reviews features, benefits, interest rates, ratings

4. **Application Initiation** → Click "Apply Now"
   - Event: `start_application` (CONVERSION)
   - User redirected to /apply/[product-id]

5. **Application Form - Step 1** → Personal Information
   - Event: `page_view` (page_category: "application_form")
   - User fills: Name, DOB, Email, Mobile
   - Event: `form_step_completed` (form_step_number: 1, form_step_name: "personal_info")

6. **Application Form - Step 2** → Employment Details
   - User fills: Employment type, Company, Income
   - Event: `form_step_completed` (form_step_number: 2, form_step_name: "employment_details")

7. **Application Form - Step 3** → Financial Information
   - User fills: Loan amount, Tenure, Purpose
   - Event: `form_step_completed` (form_step_number: 3, form_step_name: "financial_info")

8. **OTP Verification** → Mobile/Email Verification
   - Event: `otp_initiated` (CONVERSION)
   - User receives OTP
   - User enters OTP
   - Event: `otp_verified` (CONVERSION)

9. **Application Form - Step 4** → Review & Submit
   - User reviews all information
   - Event: `form_step_completed` (form_step_number: 4, form_step_name: "review")
   - User clicks "Submit Application"
   - Event: `application_submitted` (CONVERSION)

10. **Confirmation** → Thank You Page
    - Event: `page_view` (page_category: "confirmation")
    - User sees application ID, next steps

### Steps - Android App

Mirror of Web journey with screen-based navigation:
1. Home Screen → `screen_view`
2. Product List Screen → `screen_view`, `view_product_list`
3. Product Detail Screen → `view_product_detail`
4. Apply Now Tap → `start_application`
5. Form Steps 1-4 → `form_step_completed` (each step)
6. OTP Flow → `otp_initiated`, `otp_verified`
7. Submit → `application_submitted`
8. Confirmation Screen → `screen_view`

### Conversion Funnel Events
1. `view_product_list` (Top of funnel)
2. `view_product_detail` (Interest)
3. `start_application` (Intent)
4. `form_step_completed` (Engagement)
5. `otp_verified` (Trust)
6. `application_submitted` (Conversion)

---

## Journey 2: User Registration & Login

### Description
New user creates an account or existing user logs in to access personalized features.

### Registration Flow - Web

1. **Registration Page** → /register
   - Event: `page_view` (page_category: "registration")
   - User fills: Name, Email, Mobile, Password

2. **OTP Verification**
   - Event: `otp_initiated` (verification_purpose: "registration")
   - Event: `otp_verified` (verification_purpose: "registration")

3. **Account Created**
   - Event: `user_registration` (registration_method: "email", registration_source: "direct")
   - User redirected to dashboard

### Login Flow - Web

1. **Login Page** → /login
   - Event: `page_view` (page_category: "login")
   - User enters credentials

2. **Successful Login**
   - Event: `user_login` (CONVERSION) (login_method: "email_password", login_source: "direct")
   - User redirected to dashboard

### Registration Flow - Android App

1. Register Screen → `screen_view`
2. OTP → `otp_initiated`, `otp_verified`
3. Success → `user_registration`

### Login Flow - Android App

1. Login Screen → `screen_view`
2. Success → `user_login` (login_method: "biometric" or "email_password")

---

## Journey 3: Authenticated User - Dashboard Access

### Description
Logged-in user accesses dashboard to view applications, products, and account information.

### Steps - Web

1. **Dashboard** → /dashboard
   - Event: `page_view` (page_category: "dashboard", user_login_status: "logged_in")
   - User sees: Active applications, Saved products, Account summary

2. **View Saved Products**
   - Event: `view_product_list` (product_category: "saved")

3. **Continue Application**
   - Event: `start_application` (application_source: "dashboard")

### Steps - Android App

1. Dashboard Screen → `screen_view` (user_login_status: "logged_in")
2. Navigate to sections → Various `screen_view` events

---

## Journey 4: Product Comparison & Research

### Description
User compares multiple products before making a decision.

### Steps - Web

1. **Products Page** → /products
   - Event: `view_product_list` (product_category: "loans")

2. **View Product A** → /products/personal-loan
   - Event: `view_product_detail` (product_id: "personal-loan")

3. **Back to Products** → /products
   - Event: `page_view`

4. **View Product B** → /products/home-loan
   - Event: `view_product_detail` (product_id: "home-loan")

5. **Decision & Apply** → Click Apply on Product B
   - Event: `start_application` (product_id: "home-loan")

### Analytics Insight
- Track product view sequences
- Identify most compared products
- Understand decision-making patterns

---

## Journey 5: Application Drop-off & Recovery

### Description
User starts application but doesn't complete it (drop-off analysis).

### Drop-off Points

1. **After Product View** → User views product but doesn't click Apply
   - Last event: `view_product_detail`
   - No `start_application`

2. **After Application Start** → User clicks Apply but doesn't fill form
   - Last event: `start_application`
   - No `form_step_completed`

3. **Mid-Form Abandonment** → User completes some steps but not all
   - Last event: `form_step_completed` (form_step_number: 1 or 2)
   - No `application_submitted`

4. **OTP Failure** → User initiates OTP but doesn't verify
   - Last event: `otp_initiated`
   - No `otp_verified`

### Recovery Opportunities
- Email reminders (tracked via campaign parameters)
- Push notifications (Android App)
- Retargeting campaigns

---

## Cross-Platform Journey Tracking

### Web-to-App Transition
1. User browses on Web → `page_view` events
2. User downloads app → Track via campaign
3. User continues on App → `screen_view` events
4. User completes application on App → `application_submitted`

### App-to-Web Transition
1. User browses on App → `screen_view` events
2. User shares link → Track via UTM parameters
3. User opens on Web → `page_view` with campaign parameters
4. User completes on Web → `application_submitted`

### Analytics Approach
- Use User ID for cross-platform tracking
- Compare conversion rates: Web-only vs App-only vs Cross-platform
- Identify preferred platform for each journey stage

---

## Event Trigger Points Summary

### Page Load Events
- `page_view` (Web) / `screen_view` (Android) → Every navigation

### Interaction Events
- `view_product_list` → Category tab click, Products page load
- `view_product_detail` → Product card click, Product page load
- `start_application` → "Apply Now" button click

### Form Events
- `form_step_completed` → "Next" button click after completing each step
- `otp_initiated` → "Send OTP" button click
- `otp_verified` → "Verify OTP" button click with successful verification
- `application_submitted` → "Submit Application" button click

### Authentication Events
- `user_registration` → Registration form submission success
- `user_login` → Login form submission success

---

## BFSI-Specific Considerations

### High-Intent Signals
- Multiple product detail views → Serious consideration
- Form step completion → High commitment
- OTP verification → Trust established

### Drop-off Indicators
- View product but no apply → Low interest or comparison shopping
- Start application but no form completion → Friction in form
- OTP initiated but not verified → Technical issues or trust concerns

### Conversion Optimization Focus
1. Reduce steps from product view to application start
2. Simplify form fields (track completion rate per step)
3. Improve OTP delivery and UX (track time_to_verify)
4. Provide clear value proposition at each step

---

## Implementation Checklist

- [ ] Map all Web pages to page_category values
- [ ] Map all Android screens to screen_category values
- [ ] Implement dataLayer on all Web pages
- [ ] Implement Firebase Analytics on all Android screens
- [ ] Add event triggers to all CTAs and form submissions
- [ ] Test complete user journeys in both platforms
- [ ] Validate event sequences in GA4 DebugView
- [ ] Create funnel explorations for each journey
- [ ] Set up drop-off alerts for critical steps

---

## Next Steps

1. Use this document to guide GTM tag configuration
2. Reference event schema for exact parameter names
3. Create test scripts covering all journeys
4. Validate event sequences match documented flows
5. Build GA4 funnels matching these journeys
