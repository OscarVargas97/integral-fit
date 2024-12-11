import React from 'react'
import { TransitionLink } from 'components/transitions/TransitionLink'
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/Card'
import LoginForm from 'components/form/LoginForm'

const LoginPage = () => {
  return (
    <div className="flex h-svh items-center">
      <Card className="mx-auto max-w-md px-6">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <TransitionLink
              preFunc={true}
              href="/access/signup"
              variant="ghost"
              className="ml-auto inline-block text-sm underline h-6 px-2 py-1"
            >
              Sign up
            </TransitionLink>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
