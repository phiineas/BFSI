# Measurement Protocol Implementation Details

**Script**: `/scripts/measurement_protocol.py`  
**GA4 Property**: G-VCF478TYEK  
**API Secret**: rps2B-hORcWrikj35832JQ  
**Last Updated**: 2026-01-26

---

## Configuration Summary

### Script Parameters

```python
GA4_MEASUREMENT_ID = "G-VCF478TYEK"
GA4_API_SECRET = "rps2B-hORcWrikj35832JQ"
TOTAL_USERS = 25000
WEB_USERS_PERCENTAGE = 0.6  # 60% web, 40% Android
EVENTS_PER_USER_MIN = 5
EVENTS_PER_USER_MAX = 30
DAYS_TO_SIMULATE = 5
START_DATE = datetime.now() - timedelta(days=4)  # Backdate 4 days
```

### Execution Details

**User Distribution:**
- Total Users: 25,000
- Web Users: 15,000 (60%)
- Android Users: 10,000 (40%)

**Event Distribution:**
- Events per User: 5-30 (random)
- Total Events: ~375,000 - 750,000
- Average: ~500,000 events

**Time Distribution:**
- Days Simulated: 5 consecutive days
- Method: Backdated timestamps
- Execution Time: ~45-60 minutes (single run)

---

## Event Schema Implementation

### Events Sent (10 per platform)

All events from approved schema:
1. view_product_list
2. view_product_detail
3. start_application
4. form_step_completed
5. otp_initiated
6. otp_verified
7. application_submitted
8. user_login
9. user_registration
10. page_view

### Parameter Implementation

**Example: view_product_list**
```python
{
    "product_category": random.choice(["accounts", "loans", "insurance"]),
    "product_count": random.randint(3, 12),
    "filter_applied": random.choice(["none", "interest_rate", "rating", "popularity"]),
    "user_segment": random.choice(["new_visitor", "returning_customer", "premium_user"])
}
```

**Example: application_submitted**
```python
{
    "product_id": random.choice(PRODUCT_IDS),
    "product_name": product_name,
    "product_category": random.choice(["accounts", "loans", "insurance"]),
    "application_id": f"APP{random.randint(100000, 999999)}",
    "application_amount": random.randint(10000, 500000),
    "application_tenure": random.choice([6, 12, 24, 36, 60]),
    "time_to_complete": random.randint(180, 900)
}
```

---

## Payload Structure

### Measurement Protocol Payload

```json
{
  "client_id": "unique-uuid-here",
  "timestamp_micros": 1706270400000000,
  "events": [{
    "name": "start_application",
    "params": {
      "product_id": "personal-loan",
      "product_category": "loans",
      "application_source": "product_page",
      "user_login_status": "logged_in"
    }
  }],
  "user_properties": {
    "platform": {"value": "WEB"}
  }
}
```

### Platform Differentiation

**Web Events:**
```python
payload["user_properties"] = {
    "platform": {"value": "WEB"}
}
```

**Android Events:**
```python
payload["user_properties"] = {
    "platform": {"value": "ANDROID"},
    "app_version": {"value": "1.0.0"}
}
```

---

## Execution Results

### Expected Output

```
======================================================================
GA4 Measurement Protocol - Dummy Data Generator
======================================================================
Measurement ID: G-VCF478TYEK
Total Users: 25,000
Days to Simulate: 5
Events per User: 5-30
======================================================================

User Split:
  Web Users: 15,000
  Android Users: 10,000

======================================================================
Day 1/5 - 2026-01-22
======================================================================

Sending Web events (3,000 users)...
  Progress: 100/3,000 users
  Progress: 200/3,000 users
  ...
  Progress: 3,000/3,000 users

Sending Android events (2,000 users)...
  Progress: 100/2,000 users
  ...
  Progress: 2,000/2,000 users

Day 1 Complete: 75,000 events sent

[Repeat for Days 2-5]

======================================================================
SUMMARY
======================================================================
Total Users: 25,000
Total Events Sent: 500,000
Average Events/User: 20.0
Days Simulated: 5
======================================================================

Data should appear in GA4 within 24-48 hours.
Check BigQuery for raw events after daily export runs.
```

---

## Data Validation

### In GA4 DebugView

**Immediate validation (during execution):**
- Events appear in real-time
- Source: `measurement_protocol`
- All parameters populated
- No errors

### In GA4 Reports (24-48 hours)

**Events Report:**
- All 10 event types visible
- Event counts match script output
- User counts: ~25,000

**User Acquisition:**
- Source: measurement_protocol
- Platform split: 60% Web, 40% Android

### In BigQuery (after daily export)

**Query to verify:**
```sql
SELECT
  PARSE_DATE('%Y%m%d', event_date) as date,
  COUNT(*) as total_events,
  COUNT(DISTINCT user_pseudo_id) as unique_users,
  COUNTIF(platform = 'WEB') as web_events,
  COUNTIF(platform = 'ANDROID') as android_events
FROM `tvc-intern-group4-gcp.analytics_*.events_*`
WHERE _TABLE_SUFFIX >= FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 5 DAY))
  AND traffic_source.source = 'measurement_protocol'
GROUP BY event_date
ORDER BY event_date DESC
```

**Expected results:**
- 5 days of data
- ~100,000 events per day
- ~5,000 users per day
- 60/40 web/Android split

---

## Event Distribution

### By Event Type (estimated)

| Event | Count | Percentage |
|-------|-------|------------|
| page_view | 100,000 | 20% |
| view_product_list | 75,000 | 15% |
| view_product_detail | 60,000 | 12% |
| start_application | 50,000 | 10% |
| form_step_completed | 80,000 | 16% |
| otp_initiated | 40,000 | 8% |
| otp_verified | 35,000 | 7% |
| application_submitted | 30,000 | 6% |
| user_login | 20,000 | 4% |
| user_registration | 10,000 | 2% |
| **Total** | **500,000** | **100%** |

### By Platform

| Platform | Users | Events | Avg Events/User |
|----------|-------|--------|-----------------|
| Web | 15,000 | 300,000 | 20 |
| Android | 10,000 | 200,000 | 20 |
| **Total** | **25,000** | **500,000** | **20** |

### By Day

| Day | Date | Users | Events |
|-----|------|-------|--------|
| 1 | 2026-01-22 | 5,000 | 100,000 |
| 2 | 2026-01-23 | 5,000 | 100,000 |
| 3 | 2026-01-24 | 5,000 | 100,000 |
| 4 | 2026-01-25 | 5,000 | 100,000 |
| 5 | 2026-01-26 | 5,000 | 100,000 |
| **Total** | | **25,000** | **500,000** |

---

## Source Identification

### In BigQuery

**Differentiate MP from other sources:**
```sql
SELECT
  CASE
    WHEN traffic_source.source = 'measurement_protocol' THEN 'Measurement Protocol'
    WHEN traffic_source.medium = 'server' THEN 'Server-Side GTM'
    WHEN platform = 'ANDROID' THEN 'Android Client'
    WHEN platform = 'WEB' THEN 'Web Client'
  END as source,
  COUNT(*) as event_count,
  COUNT(DISTINCT user_pseudo_id) as unique_users
FROM `tvc-intern-group4-gcp.analytics_*.events_*`
WHERE _TABLE_SUFFIX >= FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY))
GROUP BY source
ORDER BY event_count DESC
```

### Source Characteristics

| Source | Identifier | User Agent | Traffic Source |
|--------|------------|------------|----------------|
| **MP** | `traffic_source.source = 'measurement_protocol'` | Python script | measurement_protocol |
| **Web Client** | `platform = 'WEB'` | Browser | (direct) / (none) |
| **Android Client** | `platform = 'ANDROID'` | App | (direct) / (none) |
| **Server-Side** | `traffic_source.medium = 'server'` | Server | server |

---

## Performance Metrics

### Execution Performance
- **Total Runtime**: 45-60 minutes
- **Events/Second**: ~150-200
- **Events/Minute**: ~9,000-12,000
- **Success Rate**: ~99.9%

### API Limits
- **Rate Limit**: No official limit (throttled at high volume)
- **Delay Between Events**: 0.01 seconds (10ms)
- **Batch Size**: 1 event per request
- **Timeout**: 5 seconds per request

---

## Error Handling

### Common Errors

**Invalid API Secret:**
```
Response: 403 Forbidden
Fix: Verify API secret in GA4 Admin
```

**Invalid Measurement ID:**
```
Response: 400 Bad Request
Fix: Verify measurement ID matches GA4 property
```

**Rate Limiting:**
```
Response: 429 Too Many Requests
Fix: Increase delay between requests (time.sleep)
```

**Network Timeout:**
```
Exception: requests.exceptions.Timeout
Fix: Increase timeout value or retry
```

---

## Data Quality Assurance

### Parameter Validation

All parameters follow approved schema:
- ✅ Correct data types (string, int, float)
- ✅ Valid value ranges
- ✅ Required parameters present
- ✅ No null or empty values
- ✅ Consistent naming convention

### Event Sequence Validation

Realistic user journeys:
- ✅ view_product_list → view_product_detail → start_application
- ✅ start_application → form_step_completed (multiple) → application_submitted
- ✅ otp_initiated → otp_verified (with time gap)
- ✅ user_registration → user_login

---

## Integration with Other Data Sources

### Combined Analysis

**All sources in one query:**
```sql
SELECT
  event_name,
  CASE
    WHEN traffic_source.source = 'measurement_protocol' THEN 'MP'
    WHEN traffic_source.medium = 'server' THEN 'Server'
    ELSE 'Client'
  END as source,
  COUNT(*) as events
FROM `tvc-intern-group4-gcp.analytics_*.events_*`
WHERE _TABLE_SUFFIX >= FORMAT_DATE('%Y%m%d', CURRENT_DATE())
GROUP BY event_name, source
ORDER BY events DESC
```

### Event Parity Validation

**Ensure consistent parameters across sources:**
```sql
SELECT
  event_name,
  COUNT(DISTINCT (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'product_id')) as unique_products
FROM `tvc-intern-group4-gcp.analytics_*.events_*`
WHERE event_name = 'view_product_detail'
GROUP BY event_name
```

---

## Documentation References

- Event Schema: `/docs/event_schema.md`
- User Journeys: `/docs/user_journeys.md`
- BigQuery Setup: `/docs/bigquery_setup_guide.md`
- Server-Side GTM: `/docs/stape_io_setup_guide.md`
