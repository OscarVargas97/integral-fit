import FirsAuthMiddleware from 'middleware/firstAuthMiddleware'
import NotAuthMiddleware from 'middleware/notAuthMiddleware'

const AuthMiddleWare = async (newSession, request) => {
  const { supabase } = newSession
  const firstAuth = await FirsAuthMiddleware(supabase, request)
  if (firstAuth) return firstAuth

  const notAuth = await NotAuthMiddleware(supabase, request)
  if (notAuth) return notAuth
}

export default AuthMiddleWare
