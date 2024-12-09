import { redirectToHome, redirectToLogOut } from 'middleware/utils'
import FirstStepsMiddleware from 'middleware/firstStepsMiddleware'
import RoleMiddleware from 'middleware/roleMiddleware'

export default SecondAuthMiddleware = (supabase, request) => {
  const get2fa = false
  const validate = ['/access/2fa']
  if (!get2fa) {
    if (request.nextUrl.pathname.startsWith(validate)) {
      return redirectToLogOut(request)
    }
  }

  if (request.nextUrl.pathname.startsWith('/access/2fa')) {
    return redirectToHome(request)
  }

  const firsSteps = FirstStepsMiddleware(supabase, request)
  if (firsSteps) return firsSteps

  const role = RoleMiddleware(supabase, request)
  if (role) return role
}

const get2faStatus = (supabase, request) => {
  return cookies['2fa'] === 'true'
}
