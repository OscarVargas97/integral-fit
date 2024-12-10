import { redirectTo } from 'middleware/utils'

const SecondAuthMiddleware = async (supabase, request, user) => {
  const get2fa = user.user_metadata?.two_factor_enabled
  const validate = ['/access/2fa', '/api/access/2fa']
  if (get2fa) {
    if (validate.some((path) => request.nextUrl.pathname.startsWith(path))) {
      return redirectTo(request, '/')
    }
  } else if (
    !validate.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    return redirectTo(request, '/logout')
  }
}

export default SecondAuthMiddleware
