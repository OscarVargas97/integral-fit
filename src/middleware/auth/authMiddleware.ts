import { redirectTo } from 'middleware/utils'

const AuthMiddleWare = async (newSession: any, request: NextRequest) => {
  const { supabase } = newSession
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const state = getState(user)
  const { access = [], notAccess = [] } = getRoutes(state)

  const shouldRedirect = (paths: string[]) =>
    paths.some((path) => request.nextUrl.pathname.startsWith(path))

  console.log(state)

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
      access: ['/access/login', '/access/register', '/error', '/api/access'],
    },
    1: {
      notAccess: ['/access/login', '/access/register'],
    },
    2: {
      notAccess: ['/access/login', '/access/register', '/access/2fa'],
    },
  }
  return routes[state]
}

const getState = (user) => {
  if (user) {
    if (user.user_metadata?.two_factor_enabled) {
      return 2
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
