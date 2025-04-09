#!/usr/bin/env node

/**
 * This script simulates a Netlify webhook request for testing purposes.
 * It creates a payload similar to what Netlify would send and signs it
 * with your test webhook secret.
 */

const crypto = require('crypto');
const https = require('https');
const http = require('http');

// Configuration - modify these values
const WEBHOOK_SECRET = process.env.NETLIFY_WEBHOOK_SECRET || 'test-webhook-secret';
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'http://localhost:3000/api/webhooks/netlify';
const EVENT_TYPE = process.argv[2] || 'deploy_succeeded';

// Create a sample payload similar to what Netlify would send
const payload = {
  site_id: 'test-site-id',
  site_name: 'trek-snout',
  deploy_id: `test-deploy-${Date.now()}`,
  deploy: {
    id: `test-deploy-${Date.now()}`,
    url: 'https://main--trek-snout.netlify.app',
    ssl_url: 'https://main--trek-snout.netlify.app',
    admin_url: 'https://app.netlify.com/sites/trek-snout/deploys/test-deploy',
    deploy_url: 'https://main--trek-snout.netlify.app',
    branch: 'main',
    commit_ref: 'test-commit-ref',
    commit_url: 'https://github.com/example/trek-snout/commit/test-commit',
    committer: 'Test User',
    published_at: new Date().toISOString(),
  },
  event: EVENT_TYPE,
  error_message: EVENT_TYPE === 'deploy_failed' ? 'This is a test error message' : undefined,
  timestamp: Date.now(),
};

// Convert the payload to a string
const payloadString = JSON.stringify(payload);

// Sign the payload
const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
const signature = hmac.update(payloadString).digest('hex');

console.log(`Testing webhook with event: ${EVENT_TYPE}`);
console.log(`Webhook URL: ${WEBHOOK_URL}`);
console.log(`Payload size: ${payloadString.length} bytes`);

// Parse the URL
const url = new URL(WEBHOOK_URL);
const options = {
  hostname: url.hostname,
  port: url.port || (url.protocol === 'https:' ? 443 : 80),
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': payloadString.length,
    'X-Webhook-Signature': signature,
    'X-Netlify-Event': EVENT_TYPE,
    'User-Agent': 'Netlify Webhook Test Script',
  },
};

// Send the request
const request = (url.protocol === 'https:' ? https : http).request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
    console.log('Headers:', res.headers);
    
    try {
      const response = JSON.parse(data);
      console.log('Response body:', response);
    } catch (e) {
      console.log('Response body:', data);
    }
    
    console.log(
      res.statusCode >= 200 && res.statusCode < 300
        ? '✅ Webhook test completed successfully!'
        : '❌ Webhook test failed!'
    );
  });
});

request.on('error', (error) => {
  console.error('Error sending webhook test:', error.message);
});

request.write(payloadString);
request.end();

console.log('Webhook test request sent...');