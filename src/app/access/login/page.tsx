import React from 'react'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'components/ui/Card'
import LoginForm from 'components/form/LoginForm'
import SignInWithGoogleButton from 'components/buttons/SignInWithGoogleButton'

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
          <LoginForm />
          <SignInWithGoogleButton />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
