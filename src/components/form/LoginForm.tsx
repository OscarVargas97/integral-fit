'use client'

import Link from 'next/link'
import { Button } from 'components/ui/Button'
import { Input } from 'components/ui/Input'
import { Label } from 'components/ui/Label'
import { createClient } from 'lib/supabase/client'
import { animations } from 'components/transitions/animations'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const router = useRouter()

  const login = async (e) => {
    e.preventDefault() // Previene el comportamiento por defecto del formulario

    const { error } = await createClient().auth.signInWithPassword({
      email: e.target.email.value,
      password: e.target.password.value,
    })

    if (error) {
      console.error('Error during login:', error.message)
    } else {
      console.log('Login successful')
    }
    await animations.default.preTransition()
    router.push('/2fa')
    await animations.default.posTransition()
  }

  return (
    <form onSubmit={login}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="ml-auto inline-block text-sm underline">
              Forgot your password?
            </Link>
          </div>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
