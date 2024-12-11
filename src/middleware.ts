import { type NextRequest } from 'next/server'
import { updateSession } from 'middleware/auth/updateSession'
import LogOutMiddleware from 'middleware/auth/logoutMiddleware'
import AuthMiddleWare from 'middleware/auth/authMiddleware'

export async function middleware(request: NextRequest) {
  console.log(request.nextUrl.pathname)
  const newSession = await updateSession(request)
  const { response } = newSession

  const logout = LogOutMiddleware(newSession, request)
  if (logout) return await logout

  const auth = await AuthMiddleWare(newSession, request)
  if (auth) return auth

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
