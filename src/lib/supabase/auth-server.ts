'use server'

import { redirect } from 'next/navigation'
import { createClient } from 'lib/supabase/server'

export async function login(email: string, password: string) {
  const supabase = await createClient()
  console.log(email, password)
  const data = {
    email,
    password,
  }

  try {
    const { error } = await supabase.auth.signInWithPassword(data)
    if (error) {
      throw new Error(error.message || 'Error desconocido al iniciar sesión.')
    }
  } catch (error) {
    console.log(error)
    throw new Error('Error interno')
  }
}

export async function mfaVerify(otp: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email: user.email,
      token: otp, // El OTP que introdujo el usuario
      type: 'email', // Tipo de verificación
    })

    const { data: updateData, error: updateError } =
      await supabase.auth.updateUser({
        data: {
          user_id: user.id, // Información personalizada que quieras agregar
          two_factor_enabled: true, // Indicador de autenticación de dos factores
          role: 'user', // Ejemplo de rol personalizado
          last_login: new Date().toISOString(), // Última fecha de inicio de sesión
        },
      })
    if (error) {
      throw new Error(error.message || 'Error desconocido al validar el OTP.')
    }
  } catch (error) {
    throw new Error(
      (error as Error).message || 'Error desconocido al validar el OTP.',
    )
  }
}

export async function signout() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    redirect('/error')
  }

  redirect('/logout')
}

export async function signInWithGoogle() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    redirect('/error')
  }
  redirect(data.url)
}
