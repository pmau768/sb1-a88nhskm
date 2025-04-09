# Netlify Webhooks Configuration for Trek Snout

This document explains how to set up and use Netlify webhooks with Trek Snout to automate deployment-related tasks and notifications.

## Overview

Netlify webhooks allow you to receive notifications when specific events occur with your Netlify site, such as:

- Successful deployments
- Failed deployments
- Form submissions
- Site lock/unlock events

We use these webhooks to trigger automated processes like:
- Deployment notifications to team members
- Database migrations
- Cache clearing
- External service synchronization

## Setup Instructions

### 1. Create a Webhook Secret

First, create a strong secret key to secure your webhooks:

```bash
# Generate a random webhook secret
openssl rand -hex 32
```

Store this secret in your environment variables:
- Add it to your Netlify site's environment variables
- Add it to your local .env file as `NETLIFY_WEBHOOK_SECRET`

### 2. Configure Webhooks in Netlify

1. Log in to your Netlify account
2. Go to your site settings
3. Navigate to "Build & deploy" > "Deploy notifications"
4. Click "Add notification" and select "Webhook"
5. Configure the webhook:
   - Event: Deploy succeeded, Deploy failed, etc.
   - URL: `https://your-site.com/api/webhooks/netlify`
   - Check "Enable signing requests with HMAC signatures"
   - Add your webhook secret

### 3. Update Environment Variables

Ensure your application has the required environment variables:

```
NETLIFY_WEBHOOK_SECRET=your_generated_secret
```

For local development, also set:
```
WEBHOOK_URL=http://localhost:3000/api/webhooks/netlify
```

### 4. Test Your Webhooks

You can use the included test script to simulate webhook events:

```bash
# Test a successful deployment webhook
npm run webhook:test deploy_succeeded

# Test a failed deployment webhook
npm run webhook:test deploy_failed
```

This sends a properly signed test payload to your local webhook endpoint.

## Available Webhook Endpoints

| Endpoint | Purpose |
|----------|---------|
| `/api/webhooks/netlify` | Main webhook handler for all Netlify events |
| `/api/webhooks/netlify/deploy-success` | Handles post-successful-deploy actions |
| `/api/webhooks/netlify/deploy-failure` | Handles post-failed-deploy actions |
| `/api/webhooks/netlify/status` | Check webhook configuration status |

## Customizing Behavior

To customize the behavior for specific events, edit the handler functions in:

- `app/api/webhooks/netlify/route.ts` - Main webhook handler
- `app/api/webhooks/netlify/deploy-success/route.ts` - Success handler
- `app/api/webhooks/netlify/deploy-failure/route.ts` - Failure handler

Common customizations include:
- Sending Slack/Discord notifications
- Updating status dashboards
- Running database migrations
- Clearing CDN caches
- Sending email alerts to the team

## Security Considerations

- Keep your webhook secret secure and never commit it to version control
- All webhook endpoints verify the signature to prevent unauthorized requests
- Use environment variables for all sensitive configuration
- Regularly rotate your webhook secrets as part of security best practices

## Troubleshooting

If webhooks aren't working:

1. Check the Netlify webhook logs in your site's Deploy notifications settings
2. Verify your webhook secret matches between Netlify and your application
3. Ensure your application is publicly accessible (for production webhooks)
4. Check for any error responses in your application logs
5. Test with the included test script to isolate the issue

For local development, you can use `netlify dev` with the Netlify CLI to proxy webhooks to your local environment.