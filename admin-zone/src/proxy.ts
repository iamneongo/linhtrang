import type { NextRequest } from 'next/server';

export function proxy(_request: NextRequest) {
  // Intentionally no-op: Linh Trang admin runs without Clerk middleware.
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)'
  ]
};
