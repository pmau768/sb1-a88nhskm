import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to handle redirects for route standardization
 * - Redirects /adoptables to /dogs
 * - Redirects /adoptables/[id] to /dogs/[id]
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Redirect /adoptables to /dogs
  if (pathname.startsWith('/adoptables')) {
    // Replace /adoptables with /dogs while preserving any ID parameters or query strings
    const newPath = pathname.replace('/adoptables', '/dogs');
    url.pathname = newPath;
    
    // Return response with 301 permanent redirect
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// Configure matcher to only run middleware on specific paths
export const config = {
  matcher: ['/adoptables/:path*'],
};