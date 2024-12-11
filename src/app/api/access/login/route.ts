import { NextResponse } from 'next/server'
import { login } from 'utils/supabase/auth-server'
import { createEncryptedJWT } from 'utils/cryptoJwt'

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password }: { email: string; password: string } = body

  if (!email || !password) {
    return NextResponse.json(
      { message: 'Email and password are required' },
      { status: 400 },
    )
  }

  try {
    await login(email, password)
  } catch (error: any) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 401 },
    )
  }

  const token = await createEncryptedJWT({
    email,
    is_2fa_pending: true,
    login_at: new Date(),
  })

  const response = NextResponse.json({ message: 'Login successful' })

  response.headers.append(
    'Set-Cookie',
    `2fa_token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=300`,
  )

  return response
}
