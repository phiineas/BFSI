# Analytics Infrastructure Setup Guide - tvc_intern_group4

**Project**: BFSI Analytics Assessment  
**Group Number**: 4  
**Last Updated**: 2026-01-26

## Naming Convention

All assets MUST follow this naming pattern:
```
tvc_intern_group4_<descriptive_name>
```

---

## Phase 2: Account Setup Checklist

### 1. Google Analytics 4 Property

**Steps**:
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Admin" (bottom left)
3. Click "Create Property"
4. Property name: `tvc_intern_group4_ga4_property`
5. Timezone: `(GMT+05:30) India Standard Time`
6. Currency: `Indian Rupee (INR)`
7. Click "Next" → Select industry: "Finance" → Click "Create"

**Data Streams to Create**:

#### Web Data Stream
- Stream name: `tvc_intern_group4_web_stream`
- Website URL: Your deployed website URL
- Enhanced measurement: Enable all (Page views, Scrolls, Outbound clicks, Site search, Video engagement, File downloads)
- Note the **Measurement ID** (format: G-XXXXXXXXXX)

#### Android App Data Stream  
- Stream name: `tvc_intern_group4_android_stream`
- Package name: `com.tvc.group4.bfsi` (or your actual package name)
- Note the **App ID**

**Mark as Conversions** (in GA4 Admin → Events):
- `start_application`
- `form_step_completed`
- `otp_initiated`
- `otp_verified`
- `application_submitted`
- `user_login`

---

### 2. Google Tag Manager - Web Container

**Steps**:
1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Click "Create Account"
3. Account name: `tvc_intern_group4_account`
4. Container name: `tvc_intern_group4_gtm_web`
5. Target platform: **Web**
6. Click "Create"
7. Note the **Container ID** (format: GTM-XXXXXXX)

**Initial Configuration**:
- Install GTM snippet in website `<head>` and `<body>`
- Create dataLayer variable
- Set up GA4 Configuration tag with Measurement ID

---

### 3. Google Tag Manager - Server Container

**Steps**:
1. In GTM, click "Create Container"
2. Container name: `tvc_intern_group4_gtm_server`
3. Target platform: **Server**
4. Click "Create"
5. Note the **Container ID** (format: GTM-XXXXXXX)

**Server Hosting - Stape.io (Free Plan)**:
1. Go to [Stape.io](https://stape.io/)
2. Sign up for free account
3. Create new server container
4. Connect to your GTM Server container
5. Note the **Server Container URL** (format: https://xxxxxx.stape.io)
6. Configure tagging server endpoint in GTM Web container

---

### 4. Firebase Project (for Android App)

**Steps**:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Project name: `tvc-intern-group4-firebase`
4. Enable Google Analytics: **Yes**
5. Link to existing GA4 property: Select `tvc_intern_group4_ga4_property`
6. Click "Create Project"

**Add Android App**:
1. Click "Add App" → Android icon
2. Package name: `com.tvc.group4.bfsi`
3. App nickname: `tvc_intern_group4_android_app`
4. Download `google-services.json`
5. Follow setup instructions for React Native Expo

**Enable Firebase Analytics**:
- Already enabled when linked to GA4
- Configure debug mode for testing

---

### 5. Google Cloud Platform Project

**Steps**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a Project" → "New Project"
3. Project name: `tvc-intern-group4-gcp`
4. Click "Create"
5. Note the **Project ID**

**Enable Required APIs**:
```bash
# Enable BigQuery API
gcloud services enable bigquery.googleapis.com

# Enable Analytics API  
gcloud services enable analytics.googleapis.com

# Enable Cloud Storage API
gcloud services enable storage.googleapis.com
```

---

### 6. BigQuery Setup

**Steps**:
1. In Google Cloud Console, go to BigQuery
2. Click "Create Dataset"
3. Dataset ID: `tvc_intern_group4_bq_dataset`
4. Location: `US` (required for GA4 export)
5. Click "Create Dataset"

**Link GA4 to BigQuery**:
1. In GA4 Admin → Product Links → BigQuery Links
2. Click "Link"
3. Select your GCP project: `tvc-intern-group4-gcp`
4. Select dataset: `tvc_intern_group4_bq_dataset`
5. Enable: **Daily export** and **Streaming export** (if available in free tier)
6. Click "Next" → "Submit"

**Verify Export**:
- Wait 24 hours for first export
- Check for tables: `events_YYYYMMDD` and `events_intraday_YYYYMMDD`

---

### 7. Website Hosting on GCP (Free Tier)

**Option A: Firebase Hosting (Recommended - Simplest)**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize in your website directory
cd /home/jainilpatel/Desktop/BFSI/bfsi_site
firebase init hosting

# Select project: tvc-intern-group4-firebase
# Public directory: out (for Next.js static export)
# Single-page app: No
# Set up automatic builds: No

# Build Next.js for static export
npm run build
npx next export

# Deploy
firebase deploy --only hosting
```

**Option B: Google Cloud Storage (Static Hosting)**

```bash
# Create bucket
gsutil mb -p tvc-intern-group4-gcp gs://tvc-intern-group4-website

# Make bucket public
gsutil iam ch allUsers:objectViewer gs://tvc-intern-group4-website

# Upload static files
cd /home/jainilpatel/Desktop/BFSI/bfsi_site/out
gsutil -m cp -r * gs://tvc-intern-group4-website

# Enable website configuration
gsutil web set -m index.html -e 404.html gs://tvc-intern-group4-website
```

**Website URL**: `https://tvc-intern-group4-website.web.app` (Firebase) or `https://storage.googleapis.com/tvc-intern-group4-website/index.html` (GCS)

---

## Configuration Summary

After setup, you should have:

| Asset | Name | ID/URL |
|-------|------|--------|
| GA4 Property | tvc_intern_group4_ga4_property | G-XXXXXXXXXX |
| GTM Web Container | tvc_intern_group4_gtm_web | GTM-XXXXXXX |
| GTM Server Container | tvc_intern_group4_gtm_server | GTM-XXXXXXX |
| Firebase Project | tvc-intern-group4-firebase | Project ID |
| GCP Project | tvc-intern-group4-gcp | Project ID |
| BigQuery Dataset | tvc_intern_group4_bq_dataset | Dataset ID |
| Server Endpoint | Stape.io | https://xxxxxx.stape.io |
| Website URL | Firebase/GCS | https://... |

---

## Access Sharing for Submission

When submitting, share access to:
- GA4 Property → Add evaluator email as "Viewer"
- GTM Containers → Add as "Read" permission
- Firebase Project → Add as "Viewer"
- GCP Project → Add as "Viewer"
- BigQuery Dataset → Add as "BigQuery Data Viewer"
- Looker Studio Dashboard → Add as "Viewer"

---

## Next Steps

1. Complete all account setups
2. Document all IDs and URLs in a secure location
3. Proceed to Web analytics implementation
4. Proceed to Android analytics implementation
5. Test all integrations

---

## Troubleshooting

### GA4 not receiving events
- Check GTM Preview mode
- Verify Measurement ID is correct
- Check browser console for errors
- Verify dataLayer is defined before GTM loads

### BigQuery export not working
- Ensure GA4 property and BigQuery dataset are in same GCP project
- Wait 24 hours for first export
- Check dataset location is "US"
- Verify billing is enabled (free tier should work)

### Firebase not linking to GA4
- Ensure Firebase project is linked to correct GA4 property
- Check google-services.json is in correct location
- Verify package name matches exactly

### Server-Side GTM not receiving events
- Verify server container URL is correct in GTM Web
- Check Stape.io container is running
- Test with GTM Server Preview mode
- Verify client tags are configured correctly
