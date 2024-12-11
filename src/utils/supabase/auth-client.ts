'use client'

import { createClient } from 'utils/supabase/client'
import { animations } from 'components/transitions/animations'

export const login = async (e, router) => {
  const email = e.target.email.value
  const password = e.target.password.value

  const response = await fetch('/api/access/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (response.ok) {
    router.push('/access/2fa')
    send2fa(e.target.email.value)
    await animations.default.preTransition(0)
    await animations.default.posTransition(0)
  } else {
    const errorData = await response.json()
    return errorData.message
  }
}

const send2fa = async (email) => {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithOtp({
    email,
  })

  if (error) {
    console.error('Error enviando el correo:', error.message)
    return false
  }
  return true
}

export const signUp = async (e, router) => {
  const { error } = await createClient().auth.signUp({
    email: e.target.email.value,
    password: e.target.password.value,
    options: {},
  })
  if (error) {
    throw new Error(error.message || 'Error desconocido al registrarse.')
  }
  router.push('/access/2fa')
}

export const mfaAuth = async (e, router, otp) => {
  const response = await fetch('/api/access/2fa', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ otp }),
  })
  if (response.ok) {
    router.push('/')
    await animations.default.preTransition(0)
    await animations.default.posTransition(0)
  } else {
    const errorData = await response.json()
    return errorData.message
  }
}
