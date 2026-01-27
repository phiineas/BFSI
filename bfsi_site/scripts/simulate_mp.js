const https = require('https');

// --- CONFIGURATION ---
const FIREBASE_APP_ID = '1:966315019860:android:d87686617090ef1ffca7c1';
const API_SECRET = '36w4pB4PTM-ojHMo4O94IA';

const TOTAL_USERS = 25000;

// --- DATA ---
const PRODUCTS = [
  { id: '1', name: 'Premium Savings Account', category: 'accounts', price: 0 },
  { id: '2', name: 'Personal Loan', category: 'loans', price: 0 },
  { id: '3', name: 'Home Loan', category: 'loans', price: 0 },
  { id: '4', name: 'Car Insurance', category: 'insurance', price: 5000 },
];

const USER_TYPES = ['new_visitor', 'returning_visitor', 'existing_customer'];

// --- HELPERS ---
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const delay = (ms) => new Promise(res => setTimeout(res, ms));

const generateAppInstanceId = () =>
  [...Array(32)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

const generateTimestampMicros = () => {
  const now = Date.now();
  const maxBack = 72 * 60 * 60 * 1000;
  return (now - rand(0, maxBack)) * 1000;
};

// --- SEND EVENT ---
const sendToGA4 = (events, appInstanceId) => {
  const payload = JSON.stringify({
    app_instance_id: appInstanceId,
    non_personalized_ads: false,
    events
  });

  const options = {
    hostname: 'www.google-analytics.com',
    path: `/mp/collect?firebase_app_id=${FIREBASE_APP_ID}&api_secret=${API_SECRET}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  return new Promise(resolve => {
    const req = https.request(options, res => resolve(res.statusCode));
    req.on('error', () => resolve(500));
    req.write(payload);
    req.end();
  });
};

// --- USER SIMULATION ---
const simulateUserJourney = () => {
  const events = [];
  const realtime = Math.random() > 0.8;
  const timestamp = realtime ? undefined : generateTimestampMicros();

  const baseParams = {
    debug_mode: 1,
    engagement_time_msec: rand(1000, 10000),
    user_type: pick(USER_TYPES)
  };

  // screen_view
  events.push({
    name: 'screen_view',
    ...(timestamp && { timestamp_micros: timestamp }),
    params: {
      ...baseParams,
      screen_name: 'HomeScreen',
      screen_class: 'HomeScreen'
    }
  });

  // view_item_list
  if (Math.random() > 0.3) {
    events.push({
      name: 'view_item_list',
      ...(timestamp && { timestamp_micros: timestamp }),
      params: {
        ...baseParams,
        item_list_name: 'All Products'
      }
    });

    // view_item
    if (Math.random() > 0.5) {
      const product = pick(PRODUCTS);

      events.push({
        name: 'view_item',
        ...(timestamp && { timestamp_micros: timestamp }),
        params: {
          ...baseParams,
          items: [{
            item_id: product.id,
            item_name: product.name,
            item_category: product.category,
            price: product.price
          }]
        }
      });

      // custom conversion
      if (Math.random() > 0.7) {
        events.push({
          name: 'application_submitted',
          ...(timestamp && { timestamp_micros: timestamp }),
          params: {
            ...baseParams,
            product_id: product.id
          }
        });
      }
    }
  }

  return events;
};

// --- MAIN ---
const runSimulation = async () => {
  console.log(`Starting Android GA4 simulation for ${TOTAL_USERS} users`);

  let processed = 0;

  while (processed < TOTAL_USERS) {
    const batch = [];

    for (let i = 0; i < 10 && processed < TOTAL_USERS; i++) {
      batch.push(
        sendToGA4(
          simulateUserJourney(),
          generateAppInstanceId()
        )
      );
      processed++;
    }

    await Promise.all(batch);

    if (processed % 500 === 0) {
      console.log(`Processed ${processed}`);
    }

    await delay(200);
  }

  console.log('Simulation complete ✅');
};

runSimulation();
