import { NextRequest, NextResponse } from 'next/server'
import { gateDecision } from '@/lib/gate'

const COOKIE = 'hh_portal'

// Next 16 "proxy" convention (formerly middleware). Gates the hacker portal.
export function proxy(req: NextRequest) {
  const token = process.env.PORTAL_ACCESS_TOKEN
  const url = req.nextUrl

  const decision = gateDecision({
    token,
    provided: url.searchParams.get('k'),
    cookie: req.cookies.get(COOKIE)?.value,
    isProd: process.env.NODE_ENV === 'production',
  })

  if (decision.type === 'allow') {
    return NextResponse.next()
  }

  if (decision.type === 'unlock') {
    const clean = url.clone()
    clean.searchParams.delete('k')
    const res = NextResponse.redirect(clean)
    res.cookies.set(COOKIE, token!, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/hackpack',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return res
  }

  // deny → show the "not available" page; keep the /hackpack URL in the bar
  const denied = url.clone()
  denied.pathname = '/hackpack-unavailable'
  denied.search = ''
  return NextResponse.rewrite(denied)
}

export const config = {
  matcher: ['/hackpack', '/hackpack/:path*'],
}
