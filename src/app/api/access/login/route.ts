import { createClient } from 'lib/supabase/client'
import { NextResponse } from 'next/server'
import { login } from 'lib/supabase/auth-server'

export async function POST(req) {
  const body = await req.json()
  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json(
      { message: 'Email and password are required' },
      { status: 400 },
    )
  }

  try {
    await login(email, password)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 401 })
  }

  return NextResponse.json({ message: 'Login successful' })
}
