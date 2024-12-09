'use client'

import Link from 'next/link'
import { Button } from 'components/ui/Button'
import { Input } from 'components/ui/Input'
import { Label } from 'components/ui/Label'

import { useRouter } from 'next/navigation'
import { login } from 'lib/supabase/auth'

const LoginForm = () => {
  const router = useRouter()
  const handleLogin = async (e) => {
    e.preventDefault()
    login(e, router)
  }
  return (
    <form onSubmit={handleLogin}>
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
