import { redirectToHome } from 'middleware/utils'
import SecondAuthMiddleware from 'middleware/secondAuthMiddleware'
import { type NextRequest } from 'next/server'

const FirsAuthMiddleware = async (supabase, request: NextRequest) => {
  const authInvalidPath = ['/access']
  const exceptCases = ['/access/2fa']
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    console.log('hi', session)

    if (
      authInvalidPath.some(
        (path) =>
          request.nextUrl.pathname.startsWith(path) &&
          !exceptCases.includes(path),
      )
    ) {
      return redirectToHome(request)
    }

    const secondAuth = SecondAuthMiddleware(supabase, request)
    if (secondAuth) return secondAuth
  }
}

export default FirsAuthMiddleware
