import { redirectTo } from 'middleware/utils'
import { verifyEncryptedJWT } from 'utils/cryptoJwt'

const AuthMiddleWare = async (newSession: any, request: NextRequest) => {
  const { supabase } = newSession
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const state = await getState(newSession, request, user)
  const { access = [], notAccess = [] } = getRoutes(state)

  const shouldRedirect = (paths: string[]) =>
    paths.some((path) => request.nextUrl.pathname.startsWith(path))

  if (request.nextUrl.pathname === '/' && state === 1) {
    return redirectTo(request, getReturn(state))
  }
  if (request.nextUrl.pathname !== '/') {
    if (access.length > 0 && !shouldRedirect(access)) {
      return redirectTo(request, getReturn(state))
    }
    if (notAccess.length > 0 && shouldRedirect(notAccess)) {
      return redirectTo(request, getReturn(state))
    }
  }
}

const getRoutes = (state) => {
  const routes = {
    0: {
      access: ['/access/login', '/access/signup', '/error', '/api/access'],
    },
    1: {
      notAccess: ['/access/login', '/access/signup'],
    },
    2: {
      notAccess: ['/access/login', '/access/signup', '/access/2fa'],
    },
  }
  return routes[state]
}

const getState = async (newSession, request, user) => {
  if (user) {
    const token = request.cookies.get('2fa_token')?.value
    if (token) {
      const payload = await verifyEncryptedJWT(token)
      if (!payload?.is_2fa_pending) {
        return 2
      }
    }
    return 1
  }
  return 0
}

const getReturn = (state) => {
  const result = {
    0: '/',
    1: '/logout',
    2: '/logout',
  }
  return result[state]
}

export default AuthMiddleWare
