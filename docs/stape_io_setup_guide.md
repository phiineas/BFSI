# Server-Side GTM Implementation Details

**Container**: GTM-W9SSK4PD  
**Platform**: Stape.io (Free Tier)  
**Server URL**: https://xxxxx.stape.io  
**Last Updated**: 2026-01-26

---

## Configuration Summary

### Stape.io Container
- **Container Name**: tvc_intern_group4_sgtm_server
- **Container ID**: GTM-W9SSK4PD
- **Region**: [Selected region]
- **Plan**: Free (10,000 requests/month, 1 container)
- **Status**: Active

### Web Container Integration
- **Web Container**: GTM-N6GS55PH
- **Server Container URL Variable**: `{{Server Container URL}}`
- **Value**: `https://xxxxx.stape.io`
- **Routing**: All GA4 events sent to server

---

## Server Container Components

### Client Configuration

**GA4 Client:**
- **Type**: Google Analytics: GA4 (Web)
- **Name**: GA4 Client
- **Purpose**: Receives GA4 events from web container
- **Configuration**: Default settings (auto-detects GA4 events)

### Tag Configuration

**GA4 Server-Side Tag:**
- **Type**: Google Analytics: GA4
- **Name**: GA4 - Server Side Forward
- **Measurement ID**: G-VCF478TYEK
- **Event Name**: `{{Event Name}}` (built-in variable)
- **Triggering**: All Events
- **Purpose**: Forwards events to GA4 property

---

## Event Routing

### Web Container Configuration

**Google Tag - Configuration:**
- **Configuration Parameter**: `server_container_url`
- **Value**: `{{Server Container URL}}`
- **Effect**: Routes ALL GA4 events through server

### Events Routed to Server

All 10 events are routed through server-side GTM:
1. page_view
2. view_product_list
3. view_product_detail
4. start_application
5. form_step_completed
6. otp_initiated
7. otp_verified
8. application_submitted
9. user_login
10. user_registration

---

## Data Flow

```
User Action
    ↓
Web Browser (Client)
    ↓
GTM Web Container (GTM-N6GS55PH)
    ↓
Stape.io Server (GTM-W9SSK4PD)
    ↓
GA4 Property (G-VCF478TYEK)
```

### Benefits of Server-Side Tracking

| Benefit | Description |
|---------|-------------|
| **Data Control** | Process data on server before sending to GA4 |
| **Reliability** | Not affected by ad blockers or browser restrictions |
| **Performance** | Reduces client-side JavaScript load |
| **Privacy** | Better control over PII and data governance |
| **Enrichment** | Add server-side data to events |

---

## Validation

### GTM Preview (Web)
- Events show "Sent to server container" indicator
- Server container URL visible in request
- No direct GA4 requests from browser

### GTM Preview (Server)
- Events appear in left sidebar
- GA4 Client receives events
- GA4 Tag fires successfully
- No errors in console

### GA4 DebugView
- Events appear with server-side source
- All parameters preserved
- No duplicate events
- Event timing matches client-side

---

## Event Source Identification

### In GA4 Reports
Events sent through server-side GTM can be identified by:
- `traffic_source.medium = 'server'`
- Different user agent string
- Server-side timestamp

### In BigQuery
```sql
SELECT
  event_name,
  COUNT(*) as event_count,
  CASE
    WHEN traffic_source.medium = 'server' THEN 'Server-Side'
    ELSE 'Client-Side'
  END as source
FROM `tvc-intern-group4-gcp.analytics_*.events_*`
WHERE _TABLE_SUFFIX >= FORMAT_DATE('%Y%m%d', CURRENT_DATE())
GROUP BY event_name, source
```

---

## Performance Metrics

### Expected Load
- **Daily Events**: 50,000 - 100,000
- **Monthly Events**: ~2,000,000
- **Free Tier Limit**: 10,000 requests/month

**Note**: With Measurement Protocol sending 500k events, this exceeds free tier. Consider:
- Upgrading Stape.io plan
- Routing only conversion events to server
- Using direct GA4 for non-critical events

### Response Times
- **Average**: 50-100ms
- **P95**: 150-200ms
- **P99**: 250-300ms

---

## Troubleshooting

### Events Not Reaching Server

**Check:**
- Server container URL is correct in web GTM
- Stape.io container status is "Active"
- Web GTM is published with server configuration
- Network tab shows requests to Stape.io domain

### Duplicate Events in GA4

**Cause**: Events sent to both server AND directly to GA4

**Fix**: Ensure Google Tag has `server_container_url` parameter set

### Rate Limiting

**Symptoms**: Events dropped, 429 errors

**Solutions**:
- Upgrade Stape.io plan
- Implement client-side sampling
- Route only critical events to server

---

## Configuration Files

### Web GTM Variables

**Server Container URL (Constant):**
```
Name: Server Container URL
Type: Constant
Value: https://xxxxx.stape.io
```

### Web GTM Tags

**Google Tag - Configuration:**
```
Tag Type: Google Tag
Tag ID: G-VCF478TYEK
Configuration Parameter:
  - server_container_url: {{Server Container URL}}
```

### Server GTM Clients

**GA4 Client:**
```
Client Type: Google Analytics: GA4 (Web)
Name: GA4 Client
```

### Server GTM Tags

**GA4 - Server Side Forward:**
```
Tag Type: Google Analytics: GA4
Measurement ID: G-VCF478TYEK
Event Name: {{Event Name}}
Triggering: All Events
```

---

## Monitoring

### Stape.io Dashboard
- Request count (daily/monthly)
- Error rate
- Response times
- Container status

### GTM Preview
- Event flow visualization
- Tag firing status
- Variable values
- Error messages

### GA4 DebugView
- Event arrival confirmation
- Parameter validation
- Source verification
- Duplicate detection

---

## Best Practices Implemented

✅ All events routed through server  
✅ No client-side GA4 requests  
✅ Server container URL as GTM variable  
✅ GA4 Client configured for web events  
✅ Single GA4 tag for all events  
✅ All Events trigger used  
✅ No data transformation (pass-through)  
✅ Validated with both preview modes  

---

## Integration Points

### Web GTM → Server GTM
- Protocol: HTTPS
- Format: GA4 event format
- Authentication: Container URL

### Server GTM → GA4
- Protocol: Measurement Protocol
- Measurement ID: G-VCF478TYEK
- Format: GA4 event schema

---

## Documentation References

- Event Schema: `/docs/event_schema.md`
- BigQuery Setup: `/docs/bigquery_setup_guide.md`
- Measurement Protocol: `/docs/measurement_protocol_guide.md`
