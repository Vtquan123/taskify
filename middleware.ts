import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const publicRoute = createRouteMatcher([
  '/',
  '/api/webhooks(.*)',
])

const authRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/forgot-password(.*)',
  '/reset-password(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  const isPublicRoute = publicRoute(req)
  const isAuthRoute = authRoute(req)

  if (userId && authRoute(req)) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
  if (!userId) {
    if (!isPublicRoute && !isAuthRoute) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}