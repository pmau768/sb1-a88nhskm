import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

/**
 * Handles the post-success webhook from Netlify
 * This endpoint is called after a successful deploy via the post-success hook
 */
export async function POST(req: Request) {
  try {
    // Get and parse the request body
    const data = await req.json();
    
    console.log('Deploy success webhook received:', data);
    
    // Implement your success logic here:
    // - Send notifications to team members
    // - Update a status dashboard
    // - Trigger post-deployment processes
    // - Clear cache on connected services
    
    // Example: Log deployment details
    const deployTime = new Date().toISOString();
    const deployId = data.id || 'unknown';
    const deploySite = data.name || 'unknown';
    const deployUrl = data.ssl_url || data.url || 'unknown';
    
    console.log(`
      Deployment completed at ${deployTime}
      Deploy ID: ${deployId}
      Site: ${deploySite}
      URL: ${deployUrl}
    `);
    
    return NextResponse.json({
      success: true,
      message: 'Deploy success hook processed',
      timestamp: deployTime
    });
  } catch (error) {
    console.error('Error processing deploy success webhook:', error);
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    );
  }
}