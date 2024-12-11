import { NextResponse, type NextRequest } from 'next/server'

const LogOutMiddleware = (newSession, request: NextRequest) => {
  const { supabase } = newSession
  if (request.nextUrl.pathname.startsWith('/logout')) {
    supabase.auth.signOut()
    const url = request.nextUrl.clone()
    url.pathname = '/'
    const response = NextResponse.redirect(url)
    response.headers.append(
      'Set-Cookie',
      `2fa_token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`,
    )
    return response
  }
}

export default LogOutMiddleware
