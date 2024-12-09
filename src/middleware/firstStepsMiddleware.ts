import { redirectTo } from 'middleware/utils'

export default async function FirstStepsMiddleware(newSession, request) {
  const { supabase, user } = newSession

  if (user && request.nextUrl.pathname !== '/first-steps') {
    const { data, error } = await supabase
      .from('users_person')
      .select('initial_config')
      .eq('user_id', user.id)

    if (!data || error || !data.length || !data[0].initial_config) {
      return redirectTo(request, 'first-steps')
    }
  }
}
