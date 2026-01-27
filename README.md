# BFSI Analytics Implementation

Complete analytics implementation for Banking, Financial Services, and Insurance (BFSI) sector.

---

## 📁 Project Structure

```
BFSI/
├── bfsi_site/          # Next.js website (Web platform)
├── bfsi_app/           # React Native app (Android platform)
├── docs/               # Documentation
│   ├── event_schema.md              # Event definitions & parameters
│   ├── user_journeys.md             # User flow documentation
│   ├── bigquery_setup_guide.md      # GCP & BigQuery setup
│   ├── stape_io_setup_guide.md      # Server-side GTM setup
│   └── measurement_protocol_guide.md # MP implementation
├── scripts/            # Automation scripts
│   └── measurement_protocol.py      # GA4 MP data sender
├── MASTER_GUIDE.md     # Complete implementation guide
└── README.md           # This file
```

---

## 🎯 What's Implemented

### ✅ Phase 1: Planning & Schema
- Event schema (10 events per platform)
- User journey mapping
- Parameter definitions

### ✅ Phase 2: GA4 & GTM Setup
- GA4 property configured
- GTM Web container (10 tags)
- GTM Server container (Stape.io)
- Consent Mode v2

### ✅ Phase 3: Website Implementation
- All 10 events implemented
- 6 conversion events
- Proper navigation flow
- Session management

### ✅ Phase 4: Infrastructure
- Server-side GTM via Stape.io
- BigQuery linked to GA4
- Measurement Protocol script ready

### ⏳ Phase 5: Validation & Reporting
- Testing in progress
- GA4 Explorations (pending)
- Looker Studio dashboard (pending)

---

## 🚀 Quick Start

### Run Website Locally
```bash
cd bfsi_site
npm install
npm run dev
# Visit http://localhost:3000
```

### Run Measurement Protocol
```bash
cd scripts
python3 measurement_protocol.py
```

---

## 📊 Key Metrics

- **Events**: 10 per platform (Web + Android)
- **Conversions**: 6 events marked as conversions
- **Users**: 25,000 (via Measurement Protocol)
- **Data Sources**: Client-side, Server-side, Measurement Protocol

---

## 📖 Documentation

See `MASTER_GUIDE.md` for complete implementation details.

Individual guides in `/docs`:
- Event Schema & Parameters
- User Journeys
- BigQuery Setup
- Server-Side GTM
- Measurement Protocol

---

## 🔗 Live Links

- **Website**: https://bfsi-bice.vercel.app
- **GA4 Property**: G-VCF478TYEK
- **GTM Web**: GTM-N6GS55PH
- **GTM Server**: GTM-W9SSK4PD

---

## 👥 Team

TVC Intern Group 4

---

## 📝 License

Educational project for TVC Analytics Assessment.
