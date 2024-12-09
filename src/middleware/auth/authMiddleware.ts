import FirsAuthMiddleware from 'middleware/auth/firstAuthMiddleware'
import NotAuthMiddleware from 'middleware/auth/notAuthMiddleware'

const AuthMiddleWare = async (newSession, request) => {
  const { supabase } = newSession
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    const firstAuth = await FirsAuthMiddleware(supabase, request, user)
    if (firstAuth) return firstAuth
  } else {
    const notAuth = await NotAuthMiddleware(supabase, request)
    if (notAuth) return notAuth
  }
}

export default AuthMiddleWare
