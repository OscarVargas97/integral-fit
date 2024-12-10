import { redirectTo } from 'middleware/utils'

const NotAuthMiddleware = async (supabaseClient, request) => {
  const publicUrls = ['/access', '/error', '/api/access', '/api/access/2fa']
  const exceptions = '/access/2fa'
  if (request.nextUrl.pathname === exceptions) {
    return redirectTo(request, '/')
  }
  if (request.nextUrl.pathname !== '/') {
    if (!publicUrls.some((url) => request.nextUrl.pathname.startsWith(url))) {
      return redirectTo(request, '/')
    }
  }
}

export default NotAuthMiddleware
