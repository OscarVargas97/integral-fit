import { NextResponse, type NextRequest } from 'next/server'

const LogOutMiddleware = async (newSession, request: NextRequest) => {
  const { supabase } = newSession
  if (request.nextUrl.pathname.startsWith('/logout')) {
    await supabase.auth.signOut()
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }
}

export default LogOutMiddleware
