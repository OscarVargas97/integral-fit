import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'components/ui/Card'
import MfaForm from 'components/form/MfaForm'

const LoginPage = () => {
  return (
    <div className="flex h-svh items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MfaForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
