# BigQuery & GCP Implementation Details

**Project**: tvc-intern-group4-gcp  
**Dataset**: analytics_XXXXXXXX  
**Location**: US (multi-region)  
**Last Updated**: 2026-01-26

---

## Configuration Summary

### GCP Project
- **Project ID**: `tvc-intern-group4-gcp`
- **Project Name**: TVC Intern Group 4 GCP
- **Billing**: Free tier enabled
- **APIs Enabled**:
  - BigQuery API
  - Cloud Storage API
  - Cloud Build API

### BigQuery Dataset
- **Dataset ID**: `analytics_XXXXXXXX` (auto-created by GA4)
- **Location**: US (multi-region)
- **Default table expiration**: Never
- **Data retention**: Unlimited (free tier)

### GA4 to BigQuery Link
- **GA4 Property**: G-VCF478TYEK
- **Export Frequency**:
  - ✅ Daily export (once per day, complete data)
  - ✅ Streaming export (real-time, updated every few minutes)
- **Data streams**: Web data stream
- **Advertising identifiers**: Not included

---

## BigQuery Tables Structure

### Table Naming Convention

**Daily Export Tables:**
```
analytics_XXXXXXXX.events_YYYYMMDD
```
- Complete day's data
- Exported once daily (usually completes by 1 PM next day)
- Permanent storage

**Streaming Tables:**
```
analytics_XXXXXXXX.events_intraday_YYYYMMDD
```
- Real-time data (updated every few minutes)
- Replaced by daily export table
- Temporary storage

### Table Schema (Key Fields)

| Field | Type | Description |
|-------|------|-------------|
| `event_date` | STRING | Date in YYYYMMDD format |
| `event_timestamp` | INTEGER | Microseconds since epoch |
| `event_name` | STRING | Name of the event |
| `event_params` | ARRAY | Event parameters (nested) |
| `user_pseudo_id` | STRING | Anonymous user ID |
| `user_properties` | ARRAY | User properties (nested) |
| `traffic_source` | RECORD | Source, medium, campaign |
| `device` | RECORD | Device category, OS, browser |
| `geo` | RECORD | Country, region, city |
| `platform` | STRING | WEB, ANDROID, IOS |

---

## Event Source Differentiation

### Query to Identify Sources

```sql
SELECT
  event_name,
  CASE
    WHEN traffic_source.source = 'measurement_protocol' THEN 'Measurement Protocol'
    WHEN traffic_source.medium = 'server' THEN 'Server-Side GTM'
    WHEN platform = 'ANDROID' THEN 'Android App (Client)'
    WHEN platform = 'WEB' THEN 'Web (Client)'
    ELSE 'Unknown'
  END as event_source,
  COUNT(*) as event_count,
  COUNT(DISTINCT user_pseudo_id) as unique_users
FROM `tvc-intern-group4-gcp.analytics_*.events_*`
WHERE _TABLE_SUFFIX >= FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY))
GROUP BY event_name, event_source
ORDER BY event_count DESC
```

### Source Identification Logic

| Source | Identifier |
|--------|------------|
| **Web Client** | `platform = 'WEB'` AND `traffic_source.medium != 'server'` |
| **Android Client** | `platform = 'ANDROID'` |
| **Server-Side GTM** | `traffic_source.medium = 'server'` |
| **Measurement Protocol** | `traffic_source.source = 'measurement_protocol'` |

---

## Event Parameter Extraction

### Unnesting Event Parameters

```sql
SELECT
  event_name,
  event_timestamp,
  (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'product_id') as product_id,
  (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'product_count') as product_count,
  (SELECT value.double_value FROM UNNEST(event_params) WHERE key = 'product_rating') as product_rating
FROM `tvc-intern-group4-gcp.analytics_*.events_*`
WHERE event_name = 'view_product_detail'
  AND _TABLE_SUFFIX = FORMAT_DATE('%Y%m%d', CURRENT_DATE())
LIMIT 100
```

### Parameter Data Types

| GA4 Type | BigQuery Field |
|----------|----------------|
| String | `value.string_value` |
| Integer | `value.int_value` |
| Float | `value.double_value` |
| Boolean | `value.int_value` (0 or 1) |

---

## Common Queries

### Daily Event Summary

```sql
SELECT
  PARSE_DATE('%Y%m%d', event_date) as date,
  event_name,
  COUNT(*) as event_count,
  COUNT(DISTINCT user_pseudo_id) as unique_users
FROM `tvc-intern-group4-gcp.analytics_*.events_*`
WHERE _TABLE_SUFFIX >= FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY))
GROUP BY event_date, event_name
ORDER BY event_date DESC, event_count DESC
```

### Conversion Funnel

```sql
WITH funnel_events AS (
  SELECT
    user_pseudo_id,
    MAX(CASE WHEN event_name = 'view_product_list' THEN 1 ELSE 0 END) as viewed_list,
    MAX(CASE WHEN event_name = 'view_product_detail' THEN 1 ELSE 0 END) as viewed_detail,
    MAX(CASE WHEN event_name = 'start_application' THEN 1 ELSE 0 END) as started_app,
    MAX(CASE WHEN event_name = 'application_submitted' THEN 1 ELSE 0 END) as submitted_app
  FROM `tvc-intern-group4-gcp.analytics_*.events_*`
  WHERE _TABLE_SUFFIX >= FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY))
  GROUP BY user_pseudo_id
)
SELECT
  SUM(viewed_list) as step1_viewed_list,
  SUM(viewed_detail) as step2_viewed_detail,
  SUM(started_app) as step3_started_app,
  SUM(submitted_app) as step4_submitted_app,
  ROUND(SUM(viewed_detail) / SUM(viewed_list) * 100, 2) as conversion_rate_1_to_2,
  ROUND(SUM(started_app) / SUM(viewed_detail) * 100, 2) as conversion_rate_2_to_3,
  ROUND(SUM(submitted_app) / SUM(started_app) * 100, 2) as conversion_rate_3_to_4
FROM funnel_events
```

### Platform Comparison

```sql
SELECT
  platform,
  COUNT(*) as total_events,
  COUNT(DISTINCT user_pseudo_id) as unique_users,
  COUNTIF(event_name = 'application_submitted') as conversions,
  ROUND(COUNTIF(event_name = 'application_submitted') / COUNT(DISTINCT user_pseudo_id) * 100, 2) as conversion_rate
FROM `tvc-intern-group4-gcp.analytics_*.events_*`
WHERE _TABLE_SUFFIX >= FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY))
GROUP BY platform
```

---

## Website Hosting on GCS

### Bucket Configuration
- **Bucket Name**: `tvc-intern-group4-website`
- **Location**: us-central1 (region)
- **Storage Class**: Standard
- **Public Access**: Enabled (allUsers = Storage Object Viewer)
- **Website Configuration**:
  - Main page: `index.html`
  - 404 page: `404.html`

### Website URL
```
https://storage.googleapis.com/tvc-intern-group4-website/index.html
```

### Build Command
```bash
cd bfsi_site
npm run build
# Output: /out directory
```

---

## Data Validation

### Expected Data Volume

**Daily Metrics (estimated):**
- Events: 50,000 - 100,000
- Users: 5,000 - 10,000
- Sessions: 8,000 - 15,000

**Measurement Protocol Data:**
- Total Users: 25,000
- Total Events: ~500,000
- Days: 5 (backdated)

### Data Quality Checks

```sql
-- Check for null parameters
SELECT
  event_name,
  COUNTIF((SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'product_id') IS NULL) as null_product_ids
FROM `tvc-intern-group4-gcp.analytics_*.events_*`
WHERE event_name IN ('view_product_detail', 'start_application')
  AND _TABLE_SUFFIX = FORMAT_DATE('%Y%m%d', CURRENT_DATE())
GROUP BY event_name
```

---

## Free Tier Limits

| Resource | Free Tier Limit | Usage |
|----------|-----------------|-------|
| BigQuery Storage | 10 GB | ~2-3 GB (estimated) |
| BigQuery Queries | 1 TB/month | ~50-100 GB (estimated) |
| Streaming Inserts | 300 MB/day | ~50-100 MB/day |
| GCS Storage | 5 GB | ~500 MB (website files) |

**Status**: Well within free tier limits ✅

---

## Integration Points

### GA4 → BigQuery
- Automatic daily export (configured)
- Streaming export enabled
- No data transformation required

### BigQuery → Looker Studio
- Direct BigQuery connector
- Custom SQL queries
- Real-time data refresh

### BigQuery → Python/Scripts
- BigQuery client library
- Service account authentication
- Query execution via API

---

## Documentation References

- Event Schema: `/docs/event_schema.md`
- User Journeys: `/docs/user_journeys.md`
- Measurement Protocol: `/docs/measurement_protocol_guide.md`
