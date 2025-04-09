import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';

/**
 * Verifies the Netlify webhook signature
 * @param payload The raw request body
 * @param signature The signature from the X-Webhook-Signature header
 * @param secret The webhook secret
 * @returns boolean indicating if the signature is valid
 */
function verifySignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}

/**
 * Process deploy succeeded event
 * @param deployId The Netlify deploy ID
 * @param data The webhook payload data
 */
async function handleDeploySucceeded(deployId: string, data: any) {
  console.log(`Deploy succeeded for deploy ID: ${deployId}`);
  
  // You can implement custom logic here, such as:
  // - Send notifications to Slack, Discord, or email
  // - Update a database with deployment information
  // - Trigger additional build processes
  // - Clear cache on CDNs or other services

  const deployUrl = data.deploy.ssl_url || data.deploy.url;
  const siteName = data.site_name;
  
  console.log(`Site "${siteName}" deployed successfully at: ${deployUrl}`);
  
  // Example: Store deploy information in a database
  // await db.deployments.create({
  //   deployId,
  //   siteId: data.site_id,
  //   siteName,
  //   status: 'succeeded',
  //   url: deployUrl,
  //   createdAt: new Date(),
  // });
  
  return { success: true, message: 'Deploy succeeded event processed' };
}

/**
 * Process deploy failed event
 * @param deployId The Netlify deploy ID
 * @param data The webhook payload data
 */
async function handleDeployFailed(deployId: string, data: any) {
  console.log(`Deploy failed for deploy ID: ${deployId}`);
  
  const siteName = data.site_name;
  const errorMessage = data.error_message || 'Unknown error';
  
  console.error(`Site "${siteName}" deployment failed: ${errorMessage}`);
  
  // Example: Send alert to team
  // await sendAlert({
  //   title: `Deployment failed for ${siteName}`,
  //   message: errorMessage,
  //   severity: 'high',
  // });
  
  return { success: true, message: 'Deploy failed event processed' };
}

/**
 * Process deploy locked event
 * @param deployId The Netlify deploy ID
 * @param data The webhook payload data
 */
async function handleDeployLocked(deployId: string, data: any) {
  console.log(`Deploy locked for deploy ID: ${deployId}`);
  return { success: true, message: 'Deploy locked event processed' };
}

/**
 * Process deploy unlocked event
 * @param deployId The Netlify deploy ID
 * @param data The webhook payload data
 */
async function handleDeployUnlocked(deployId: string, data: any) {
  console.log(`Deploy unlocked for deploy ID: ${deployId}`);
  return { success: true, message: 'Deploy unlocked event processed' };
}

/**
 * POST handler for Netlify webhooks
 */
export async function POST(req: Request) {
  // Get webhook secret from environment variables
  const webhookSecret = process.env.NETLIFY_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    console.error('NETLIFY_WEBHOOK_SECRET is not set');
    return NextResponse.json(
      { error: 'Webhook secret is not configured' },
      { status: 500 }
    );
  }
  
  // Get the request headers
  const headersList = headers();
  const signature = headersList.get('X-Webhook-Signature');
  const event = headersList.get('X-Netlify-Event');
  
  // Validate required headers
  if (!signature) {
    console.error('Missing X-Webhook-Signature header');
    return NextResponse.json(
      { error: 'Missing signature header' },
      { status: 400 }
    );
  }
  
  if (!event) {
    console.error('Missing X-Netlify-Event header');
    return NextResponse.json(
      { error: 'Missing event header' },
      { status: 400 }
    );
  }
  
  try {
    // Get and parse the request body
    const body = await req.text();
    
    // Verify the webhook signature
    if (!verifySignature(body, signature, webhookSecret)) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }
    
    // Parse the JSON body
    const data = JSON.parse(body);
    const deployId = data.deploy_id || 'unknown';
    
    // Handle different event types
    let result;
    switch (event) {
      case 'deploy_succeeded':
        result = await handleDeploySucceeded(deployId, data);
        break;
        
      case 'deploy_failed':
        result = await handleDeployFailed(deployId, data);
        break;
        
      case 'deploy_locked':
        result = await handleDeployLocked(deployId, data);
        break;
        
      case 'deploy_unlocked':
        result = await handleDeployUnlocked(deployId, data);
        break;
        
      default:
        console.log(`Unhandled Netlify event: ${event}`);
        result = { success: true, message: `Event ${event} received but not processed` };
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    );
  }
}