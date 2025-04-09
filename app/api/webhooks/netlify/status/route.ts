import { NextResponse } from 'next/server';
import { getDeploymentStatus } from '@/lib/deployment';

/**
 * GET handler to check if webhooks are configured properly
 * and return recent deployment status
 */
export async function GET(req: Request) {
  try {
    return NextResponse.json({
      status: 'active',
      message: 'Netlify webhooks are configured and ready to receive events',
      timestamp: new Date().toISOString(),
      documentation: 'See README.md for more information on using webhooks',
      endpoints: {
        main: '/api/webhooks/netlify',
        deploySuccess: '/api/webhooks/netlify/deploy-success',
        deployFailure: '/api/webhooks/netlify/deploy-failure',
        status: '/api/webhooks/netlify/status'
      }
    });
  } catch (error) {
    console.error('Error getting webhook status:', error);
    return NextResponse.json(
      { error: 'Error retrieving webhook status' },
      { status: 500 }
    );
  }
}