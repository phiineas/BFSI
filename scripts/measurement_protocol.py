#!/usr/bin/env python3
"""
GA4 Measurement Protocol - Dummy Data Generator
Sends dummy data for 5 consecutive days to GA4 via Measurement Protocol

Requirements:
- Maximum 25,000 users (Web + Android combined)
- Up to 30 events per user
- Only approved event schema events
- Runs for 5 consecutive days
"""

import requests
import json
import random
import time
from datetime import datetime, timedelta
import uuid

# ============================================================================
# CONFIGURATION
# ============================================================================

# GA4 Configuration
GA4_MEASUREMENT_ID = "G-VCF478TYEK"  # Your GA4 Measurement ID
GA4_API_SECRET = "rps2B-hORcWrikj35832JQ"  # Get from GA4 Admin > Data Streams > Measurement Protocol API secrets

# Measurement Protocol Endpoint
MP_ENDPOINT = f"https://www.google-analytics.com/mp/collect?measurement_id={GA4_MEASUREMENT_ID}&api_secret={GA4_API_SECRET}"

# User Configuration
TOTAL_USERS = 25000  # Max users
WEB_USERS_PERCENTAGE = 1.0  # 100% web
EVENTS_PER_USER_MIN = 5
EVENTS_PER_USER_MAX = 30

# Days Configuration
DAYS_TO_SIMULATE = 5
START_DATE = datetime.now() - timedelta(days=4)  # Start 4 days ago to backdate events
# This allows sending 5 days of data in one execution

# ============================================================================
# EVENT SCHEMA - APPROVED EVENTS ONLY
# ============================================================================

# Web Events
WEB_EVENTS = [
    "view_product_list",
    "view_product_detail",
    "start_application",
    "form_step_completed",
    "otp_initiated",
    "otp_verified",
    "application_submitted",
    "user_login",
    "user_registration",
    "page_view"
]

# Android Events (same as web for parity)
ANDROID_EVENTS = WEB_EVENTS.copy()

# Product Categories
PRODUCT_CATEGORIES = ["accounts", "loans", "insurance"]
PRODUCT_IDS = [
    "savings-account", "salary-account", "personal-loan", 
    "home-loan", "car-loan", "life-insurance", 
    "health-insurance", "investment-plan"
]

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def generate_client_id():
    """Generate unique client ID"""
    return str(uuid.uuid4())

def get_event_parameters(event_name, platform="WEB"):
    """Get parameters for specific event based on schema"""
    params = {}
    
    if event_name == "view_product_list":
        params = {
            "product_category": random.choice(PRODUCT_CATEGORIES),
            "product_count": random.randint(3, 12),
            "filter_applied": random.choice(["none", "interest_rate", "rating", "popularity"]),
            "user_segment": random.choice(["new_visitor", "returning_customer", "premium_user"])
        }
    
    elif event_name == "view_product_detail":
        params = {
            "product_id": random.choice(PRODUCT_IDS),
            "product_name": random.choice(PRODUCT_IDS).replace("-", " ").title(),
            "product_category": random.choice(PRODUCT_CATEGORIES),
            "product_interest_rate": round(random.uniform(3.5, 12.5), 2),
            "product_rating": round(random.uniform(3.5, 5.0), 1),
            "is_popular": random.choice([True, False])
        }
    
    elif event_name == "start_application":
        params = {
            "product_id": random.choice(PRODUCT_IDS),
            "product_category": random.choice(PRODUCT_CATEGORIES),
            "application_source": random.choice(["product_page", "banner", "search"]),
            "user_login_status": random.choice(["logged_in", "guest"])
        }
    
    elif event_name == "form_step_completed":
        step_num = random.randint(1, 4)
        params = {
            "product_id": random.choice(PRODUCT_IDS),
            "product_category": random.choice(PRODUCT_CATEGORIES),
            "form_step_number": step_num,
            "form_step_name": ["personal_info", "employment_details", "financial_info", "review"][step_num-1],
            "total_steps": 4,
            "completion_percentage": (step_num / 4) * 100
        }
    
    elif event_name == "otp_initiated":
        params = {
            "verification_type": "email",
            "verification_purpose": random.choice(["registration", "login", "application"]),
            "product_id": random.choice(PRODUCT_IDS + ["registration", "login"]),
            "user_type": random.choice(["new_user", "existing_user"])
        }
    
    elif event_name == "otp_verified":
        params = {
            "verification_type": "email",
            "verification_purpose": random.choice(["registration", "login", "application"]),
            "product_id": random.choice(PRODUCT_IDS + ["registration", "login"]),
            "verification_attempts": random.randint(1, 3),
            "time_to_verify": random.randint(15, 120)
        }
    
    elif event_name == "application_submitted":
        params = {
            "product_id": random.choice(PRODUCT_IDS),
            "product_name": random.choice(PRODUCT_IDS).replace("-", " ").title(),
            "product_category": random.choice(PRODUCT_CATEGORIES),
            "application_id": f"APP{random.randint(100000, 999999)}",
            "application_amount": random.randint(10000, 500000),
            "application_tenure": random.choice([6, 12, 24, 36, 60]),
            "time_to_complete": random.randint(180, 900)
        }
    
    elif event_name == "user_login":
        params = {
            "login_method": random.choice(["email_password", "social"]),
            "user_type": "existing_customer",
            "login_source": "direct",
            "session_start_time": datetime.now().isoformat()
        }
    
    elif event_name == "user_registration":
        params = {
            "registration_method": "email",
            "user_type": "new_customer",
            "registration_source": "direct",
            "account_type": "individual"
        }
    
    elif event_name == "page_view":
        params = {
            "page_location": f"https://bfsi-bice.vercel.app/{random.choice(['', 'products', 'about', 'contact'])}",
            "page_title": random.choice(["Home", "Products", "About", "Contact"])
        }
    
    return params

def send_event(client_id, event_name, platform="WEB", timestamp_micros=None):
    """Send single event to GA4 via Measurement Protocol"""
    
    if timestamp_micros is None:
        timestamp_micros = int(time.time() * 1000000)
    
    # Get event parameters
    params = get_event_parameters(event_name, platform)
    
    # Build payload
    payload = {
        "client_id": client_id,
        "timestamp_micros": timestamp_micros,
        "events": [{
            "name": event_name,
            "params": params
        }]
    }
    
    # Add platform-specific user properties
    if platform == "ANDROID":
        payload["user_properties"] = {
            "platform": {"value": "ANDROID"},
            "app_version": {"value": "1.0.0"}
        }
    else:
        payload["user_properties"] = {
            "platform": {"value": "WEB"}
        }
    
    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = requests.post(MP_ENDPOINT, json=payload, timeout=10)
            if response.status_code == 204:
                return True
            else:
                print(f"  Warning: Received status {response.status_code} for event {event_name}")
                return False
        except (requests.exceptions.Timeout, requests.exceptions.ConnectionError):
            if attempt < max_retries - 1:
                print(f"  Request timed out, retrying ({attempt + 1}/{max_retries})...")
                time.sleep(1)  # Wait before retrying
            else:
                print(f"  Error: Max retries reached for event {event_name}")
                return False
        except Exception as e:
            print(f"Error sending event: {e}")
            return False

def generate_user_journey(client_id, platform="WEB", day_offset=0):
    """Generate realistic user journey with multiple events"""
    
    events_to_send = random.randint(EVENTS_PER_USER_MIN, EVENTS_PER_USER_MAX)
    event_list = WEB_EVENTS if platform == "WEB" else ANDROID_EVENTS
    
    # Base timestamp for this day
    base_time = START_DATE + timedelta(days=day_offset)
    base_timestamp = int(base_time.timestamp() * 1000000)
    
    # Generate events
    sent_count = 0
    for i in range(events_to_send):
        # Random event
        event_name = random.choice(event_list)
        
        # Add realistic time gaps between events (1-300 seconds)
        time_gap = random.randint(1, 300) * 1000000  # microseconds
        event_timestamp = base_timestamp + (i * time_gap)
        
        # Send event
        if send_event(client_id, event_name, platform, event_timestamp):
            sent_count += 1
        
        # Small delay to avoid rate limiting
        time.sleep(0.01)
    
    return sent_count

# ============================================================================
# MAIN EXECUTION
# ============================================================================

import sys

def main():
    """Main function to send dummy data for 5 days"""
    
    # Parse resume parameters
    resume_day = 0
    resume_user = 0
    
    if len(sys.argv) > 1:
        try:
            resume_day = int(sys.argv[1]) - 1
            if len(sys.argv) > 2:
                resume_user = int(sys.argv[2])
        except ValueError:
            print("Usage: python3 measurement_protocol.py [resume_day_1_to_5] [resume_user_index]")
            return

    print("=" * 70)
    print("GA4 Measurement Protocol - Dummy Data Generator")
    print("=" * 70)
    print(f"Measurement ID: {GA4_MEASUREMENT_ID}")
    print(f"Total Users: {TOTAL_USERS:,}")
    print(f"Days to Simulate: {DAYS_TO_SIMULATE}")
    print(f"Events per User: {EVENTS_PER_USER_MIN}-{EVENTS_PER_USER_MAX}")
    if resume_day > 0 or resume_user > 0:
        print(f"Resuming from Day {resume_day + 1}, User Index: {resume_user}")
    print("=" * 70)
    
    # Calculate user split
    web_users_per_day = TOTAL_USERS // DAYS_TO_SIMULATE
    
    print(f"\nConfiguration:")
    print(f"  Web Users per day: {web_users_per_day:,}")
    print()
    
    # Simulate each day
    total_events_sent = 0
    
    for day in range(DAYS_TO_SIMULATE):
        if day < resume_day:
            print(f"Skipping Day {day + 1} (already completed)")
            continue
            
        day_date = START_DATE + timedelta(days=day)
        print(f"\n{'='*70}")
        print(f"Day {day + 1}/{DAYS_TO_SIMULATE} - {day_date.strftime('%Y-%m-%d')}")
        print(f"{'='*70}")
        
        day_events = 0
        
        # Web users for this day
        print(f"\nSending Web events ({web_users_per_day:,} users)...")
        for i in range(web_users_per_day):
            if day == resume_day and i < resume_user:
                continue
                
            client_id = generate_client_id()
            events_sent = generate_user_journey(client_id, "WEB", day)
            day_events += events_sent
            
            if (i + 1) % 100 == 0:
                print(f"  Progress: {i+1:,}/{web_users_per_day:,} users (Current index: {i+1})")

        
        total_events_sent += day_events
        print(f"\nDay {day + 1} Complete: {day_events:,} events sent")
    
    print(f"\n{'='*70}")
    print("SUMMARY")
    print(f"{'='*70}")
    print(f"Total Users: {TOTAL_USERS:,}")
    print(f"Total Events Sent: {total_events_sent:,}")
    print(f"Average Events/User: {total_events_sent / TOTAL_USERS:.1f}")
    print(f"Days Simulated: {DAYS_TO_SIMULATE}")
    print(f"{'='*70}")
    print("\nData should appear in GA4 within 24-48 hours.")
    print("Check BigQuery for raw events after daily export runs.")

if __name__ == "__main__":
    # Validate API secret is set
    if "YOUR_API_SECRET_HERE" in GA4_API_SECRET:
        print("\n❌ ERROR: Please set your GA4_API_SECRET in the script!")
        print("\nTo get your API secret:")
        print("1. Go to GA4 Admin → Data Streams")
        print("2. Click on your web data stream")
        print("3. Scroll to 'Measurement Protocol API secrets'")
        print("4. Create a new secret or copy existing one")
        print("5. Update GA4_API_SECRET in this script\n")
        exit(1)
    
    # Confirm before running
    response = input("\nThis will send data to GA4. Continue? (yes/no): ")
    if response.lower() != "yes":
        print("Cancelled.")
        exit(0)
    
    main()
