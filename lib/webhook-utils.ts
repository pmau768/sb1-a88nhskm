import crypto from 'crypto';

/**
 * Verifies the Netlify webhook signature
 * @param payload The raw request body
 * @param signature The signature from the X-Webhook-Signature header
 * @param secret The webhook secret
 * @returns boolean indicating if the signature is valid
 */
export function verifyNetlifySignature(payload: string, signature: string, secret: string): boolean {
  try {
    const hmac = crypto.createHmac('sha256', secret);
    const digest = hmac.update(payload).digest('hex');
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(digest)
    );
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
}

/**
 * Parse and extract useful information from a Netlify webhook payload
 * @param body The parsed JSON body from the webhook
 * @returns Extracted deployment information
 */
export function parseNetlifyWebhook(body: any) {
  return {
    siteId: body.site_id,
    siteName: body.site_name,
    deployId: body.deploy_id,
    deployUrl: body.deploy?.ssl_url || body.deploy?.url,
    branch: body.deploy?.branch,
    commitRef: body.deploy?.commit_ref,
    commitUrl: body.deploy?.commit_url,
    committer: body.deploy?.committer,
    publishedAt: body.deploy?.published_at,
    errorMessage: body.error_message,
    event: body.event,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Creates a test webhook payload for local testing
 * @param event The event type
 * @returns A sample webhook payload
 */
export function createTestWebhookPayload(event: string = 'deploy_succeeded') {
  return {
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
    event: event,
    error_message: event === 'deploy_failed' ? 'This is a test error message' : undefined,
    timestamp: Date.now(),
  };
}

/**
 * Signs a payload with the provided secret
 * @param payload The payload to sign
 * @param secret The secret to use for signing
 * @returns The signature
 */
export function signPayload(payload: string, secret: string): string {
  const hmac = crypto.createHmac('sha256', secret);
  return hmac.update(payload).digest('hex');
}