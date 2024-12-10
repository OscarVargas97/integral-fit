import { NextResponse } from 'next/server'
import { login } from 'lib/supabase/auth-server'

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

  return NextResponse.json({ message: 'Login successful' })
}
