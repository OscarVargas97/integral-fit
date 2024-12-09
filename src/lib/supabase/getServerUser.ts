import { createClient } from 'lib/supabase/server'

export const getUser = async () => {
  const supabase = await createClient()
  const { data: user } = await supabase.auth.getUser()
  const resutlUser = user.user
  return resutlUser
}
