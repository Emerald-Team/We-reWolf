import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request) {
  return NextResponse
}

export const config = {
  matcher: '/about/:path*',
}
