import { TransitionLink } from 'components/transitions/TransitionLink'

import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/Card'
import RegisterForm from 'components/form/RegisterForm'

const SignUp = () => {
  return (
    <div className="flex h-svh items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <TransitionLink
              preFunc={true}
              href="/access/login"
              variant="ghost"
              className="ml-auto inline-block text-sm underline h-6 px-2 py-1"
            >
              Sign in
            </TransitionLink>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignUp
