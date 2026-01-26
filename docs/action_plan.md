# Quick Action Plan - tvc_intern_group4

**Time**: 11:45 AM IST, January 26, 2026  
**Deadline**: End of day (11:59 PM IST)  
**Time Remaining**: ~12 hours  
**Team**: 2 people

---

## ✅ COMPLETED (Phase 1 - 45 minutes)

- [x] Event Schema Design (10 events per platform, 20 total)
- [x] User Journey Documentation (5 key BFSI flows)
- [x] Analytics Setup Guide (step-by-step instructions)

---

## 🎯 IMMEDIATE NEXT STEPS (Next 2 hours - 12:00 PM to 2:00 PM)

### Person 1: Analytics Infrastructure Setup
**Time**: 1.5 hours

1. **Create GA4 Property** (15 min)
   - Name: `tvc_intern_group4_ga4_property`
   - Create Web + Android data streams
   - Mark 6 events as conversions

2. **Create GTM Web Container** (15 min)
   - Name: `tvc_intern_group4_gtm_web`
   - Get container ID

3. **Create GTM Server Container** (20 min)
   - Name: `tvc_intern_group4_gtm_server`
   - Set up Stape.io free account
   - Get server endpoint URL

4. **Create Firebase Project** (20 min)
   - Name: `tvc-intern-group4-firebase`
   - Link to GA4 property
   - Download google-services.json

5. **Create GCP Project + BigQuery** (20 min)
   - Name: `tvc-intern-group4-gcp`
   - Create BigQuery dataset: `tvc_intern_group4_bq_dataset`
   - Link GA4 to BigQuery

**Document all IDs/URLs in a spreadsheet!**

### Person 2: Web Implementation Preparation
**Time**: 1.5 hours

1. **Install GTM in Website** (30 min)
   - Add GTM snippet to layout.tsx
   - Create lib/gtm.ts helper file
   - Test dataLayer initialization

2. **Create Consent Banner Component** (30 min)
   - Build consent-banner.tsx
   - Implement Consent Mode v2 logic
   - Style with existing design system

3. **Create Analytics Events Library** (30 min)
   - Build lib/analytics-events.ts
   - Type-safe event functions
   - Match event schema exactly

---

## 📋 AFTERNOON WORK (2:00 PM to 6:00 PM - 4 hours)

### Person 1: Web Analytics Implementation
**Time**: 4 hours

1. **Implement Core Events** (2 hours)
   - page_view on all pages
   - view_product_list on products page
   - view_product_detail on product detail pages
   - start_application on Apply Now clicks

2. **Implement Form Events** (1.5 hours)
   - form_step_completed on each form step
   - otp_initiated / otp_verified
   - application_submitted

3. **Configure GTM Tags** (30 min)
   - GA4 Configuration tag
   - GA4 Event tags for all custom events
   - Test in Preview mode

### Person 2: Android App Analytics Implementation
**Time**: 4 hours

1. **Firebase SDK Setup** (1 hour)
   - Install Firebase packages
   - Add google-services.json
   - Initialize Firebase Analytics

2. **Implement Core Events** (2 hours)
   - screen_view on all screens
   - view_product_list
   - view_product_detail
   - start_application

3. **Implement Form Events** (1 hour)
   - form_step_completed
   - otp_initiated / otp_verified
   - application_submitted

---

## 🧪 EVENING WORK (6:00 PM to 9:00 PM - 3 hours)

### Both: Validation & Testing
**Time**: 1.5 hours

1. **Web Validation** (45 min)
   - GTM Preview mode testing
   - GA4 DebugView verification
   - Screenshot all events
   - Check for duplicates/null values

2. **Android Validation** (45 min)
   - Firebase DebugView testing
   - Verify event parity with Web
   - Screenshot all events

### Person 1: Server-Side GTM + Measurement Protocol
**Time**: 1.5 hours

1. **Configure sGTM** (45 min)
   - Set up client tags
   - Forward events to GA4
   - Test with sGTM Preview

2. **Measurement Protocol Script** (45 min)
   - Write Python script
   - Generate 5 days of dummy data
   - Send to GA4

### Person 2: GCP Hosting + BigQuery Verification
**Time**: 1.5 hours

1. **Deploy Website** (45 min)
   - Build Next.js static export
   - Deploy to Firebase Hosting
   - Test deployed site

2. **Verify BigQuery** (45 min)
   - Check for GA4 export tables
   - Query events
   - Screenshot results

---

## 🎨 FINAL PUSH (9:00 PM to 11:30 PM - 2.5 hours)

### Person 1: GA4 Reporting
**Time**: 2 hours

1. **Create GA4 Explorations** (1.5 hours)
   - Funnel Exploration (2 tabs)
   - Path Exploration (2 tabs)
   - Free Form Exploration (2 tabs)
   - Screenshot + document insights

2. **Looker Studio Dashboard** (30 min)
   - Page 1: GA4 connector
   - Page 2: BigQuery connector
   - Key BFSI KPIs

### Person 2: Documentation
**Time**: 2 hours

1. **Validation Report** (45 min)
   - Compile all screenshots
   - Document test results
   - Proof of no errors

2. **Data Engineering Documentation** (45 min)
   - BigQuery data model design
   - CRM schema definition
   - SST architecture diagram
   - Cost estimations

3. **Final Submission Deck** (30 min)
   - Google Slides presentation
   - All screenshots
   - Access sharing instructions

---

## 📦 OPTIONAL (If Time Permits)

- Third-party pixels (Meta, Google Ads) - 1 hour
- Additional GA4 explorations - 30 min
- CRM dummy data generation - 30 min

---

## 🚨 CRITICAL SUCCESS FACTORS

1. **Follow naming convention** - Everything starts with `tvc_intern_group4_`
2. **Event parity** - Web and Android events must match exactly
3. **No null values** - All parameters must have valid data
4. **Document everything** - Screenshot every step
5. **Test thoroughly** - Use DebugView for all platforms

---

## 📞 COMMUNICATION

- Use "New Bees 2026" g-chat group ONLY
- Share progress every 2 hours
- Ask for help immediately if blocked
- Divide work clearly between team members

---

## 🎯 MINIMUM VIABLE DELIVERABLES

If running short on time, prioritize:

1. ✅ Event schema (DONE)
2. ✅ User journeys (DONE)
3. ✅ Setup guide (DONE)
4. ⚠️ GA4 + GTM + Firebase setup (MUST DO)
5. ⚠️ Web analytics implementation (MUST DO - at least 6 events)
6. ⚠️ Android analytics implementation (MUST DO - at least 6 events)
7. ⚠️ Validation screenshots (MUST DO)
8. ⚠️ Measurement Protocol (MUST DO)
9. ⚠️ BigQuery linkage (MUST DO)
10. ⚠️ 3 GA4 Explorations (MUST DO)
11. ⚠️ Looker Studio dashboard (MUST DO)
12. ⚠️ Final submission deck (MUST DO)

**Can be documentation-only if time runs out:**
- Server-Side GTM (document architecture)
- Third-party pixels (document approach)
- Data engineering (all documentation)
- CRM integration (all documentation)

---

## 📝 NEXT IMMEDIATE ACTION

**RIGHT NOW** (Person 1):
1. Open Google Analytics
2. Create GA4 property: `tvc_intern_group4_ga4_property`
3. Note the Measurement ID

**RIGHT NOW** (Person 2):
1. Open code editor
2. Navigate to /home/jainilpatel/Desktop/BFSI/bfsi_site
3. Prepare to add GTM snippet to layout.tsx

Let's execute! 🚀
