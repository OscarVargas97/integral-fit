import { NextResponse } from 'next/server'
import { mfaVerify } from 'utils/supabase/auth-server'
import { createEncryptedJWT } from 'utils/cryptoJwt'
import { createClient } from 'utils/supabase/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { otp }: { otp: string } = body

  if (!otp) {
    return NextResponse.json({ message: 'Otp are required' }, { status: 400 })
  }
  try {
    await mfaVerify(otp)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 401 })
  }
  const supabase = await createClient()
  const user = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }

  const response = NextResponse.json({ message: 'Login successful' })

  const token = await createEncryptedJWT({
    email: user.email,
    is_2fa_pending: false,
    login_at: new Date(),
  })

  response.headers.append(
    'Set-Cookie',
    `2fa_token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=300`,
  )

  return response
}
