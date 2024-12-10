import { redirectTo } from 'middleware/utils'
import SecondAuthMiddleware from 'middleware/auth/secondAuthMiddleware'
import { type NextRequest } from 'next/server'

const FirsAuthMiddleware = async (supabase, request: NextRequest, user) => {
  const authInvalidPath = '/access'
  const exceptCases = ['/access/2fa', '/access/auth', '/api/access/2fa']

  if (request.nextUrl.pathname.startsWith(authInvalidPath)) {
    if (
      !exceptCases.some((path) => request.nextUrl.pathname.startsWith(path))
    ) {
      return redirectTo(request, '/')
    }
  }

  const secondAuth = await SecondAuthMiddleware(supabase, request, user) // Agregado await si es asíncrono
  if (secondAuth) return secondAuth

  return null // Continúa si no hay acción requerida
}

export default FirsAuthMiddleware
