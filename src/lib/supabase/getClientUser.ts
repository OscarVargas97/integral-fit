'use client'
import { useEffect, useState } from 'react'
import { createClient } from 'lib/supabase/client'

const getUser = () => {
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }

    fetchUser()
  }, [supabase])

  return user
}

export default getUser
