'use client'

import { Button } from 'components/ui/Button'
import { Input } from 'components/ui/Input'
import { Label } from 'components/ui/Label'
import { useRouter } from 'next/navigation'
import { signUp } from 'utils/supabase/auth-client'
import { useState } from 'react'

const RegisterForm = () => {
  const router = useRouter()
  const [error, setError] = useState('')

  const handlePasswordConfirmInput = (e) => {
    e.target.setCustomValidity('') // Limpia cualquier error previo al modificar el campo
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    const password = e.target.password
    const passwordConfirm = e.target.passwordConfirm
    passwordConfirm.setCustomValidity('')
    if (password.value !== passwordConfirm.value) {
      passwordConfirm.setCustomValidity('Las contraseñas no coinciden')
      passwordConfirm.reportValidity()

      return
    }
    setError('')

    try {
      await signUp(e, router)
    } catch (err) {
      setError((err as Error).message || 'Algo salió mal, inténtalo de nuevo.')
    }
  }
  return (
    <form onSubmit={handleSignUp}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="flex space-x-4">
            <div>
              <Label htmlFor="firstName">Nombre</Label>
              <Input
                name="firstName"
                id="firstName"
                placeholder="Max"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                name="lastName"
                id="lastName"
                placeholder="Robinson"
                required
              />
            </div>
          </div>

          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              id="password"
              type="password"
              required
              minLength="8"
              placeholder="Enter your password"
            />
          </div>
          <Label htmlFor="passwordConfirm">Confirm Password</Label>
          <Input
            name="passwordConfirm"
            id="passwordConfirm"
            type="password"
            required
            minLength="8"
            placeholder="Confirm your password"
            onInput={handlePasswordConfirmInput}
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button type="submit" className="w-full">
          Create an account
        </Button>
      </div>
    </form>
  )
}

export default RegisterForm
