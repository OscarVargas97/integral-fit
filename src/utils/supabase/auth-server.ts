'use server'

import { createClient } from 'utils/supabase/server'

export async function login(email: string, password: string) {
  let supabase
  try {
    supabase = await createClient()
  } catch (error) {
    throw new Error(error.message)
  }

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function mfaVerify(otp: string) {
  let supabase
  try {
    supabase = await createClient()
  } catch (error: any) {
    throw new Error('Error al solicitar verificación')
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error) {
    throw new Error(error.message)
  }

  try {
    const { error } = await supabase.auth.verifyOtp({
      email: user.email,
      token: otp,
      type: 'email',
    })
    if (error) {
      console.log(error.message)
      throw new Error(error.message)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function signout() {
  const supabase = createClient()
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function signInWithGoogle() {
  const supabase = createClient()
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {}
}
