'use client'
import { Button } from 'components/ui/Button'
import { signInWithGoogle } from 'utils/supabase/auth-server'
import React from 'react'

const SignInWithGoogleButton = () => {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={() => {
        signInWithGoogle()
      }}
    >
      Login with Google
    </Button>
  )
}

export default SignInWithGoogleButton
