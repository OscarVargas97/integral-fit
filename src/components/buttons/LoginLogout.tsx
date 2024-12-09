'use client'
import React from 'react'
import { TransitionLink } from 'components/transitions/TransitionLink'

const LoginLogoutButton = ({ user }) => {
  return (
    <TransitionLink href={user ? '/logout' : '/access/login'} variant="outline">
      {user ? 'Logout' : 'Login'}
    </TransitionLink>
  )
}

export default LoginLogoutButton
