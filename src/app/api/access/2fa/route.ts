import { NextResponse } from 'next/server'
import { mfaVerify } from 'lib/supabase/auth-server'

export async function POST(req: Request) {
  const body = await req.json()
  const { otp }: { otp: string } = body

  if (!otp) {
    return NextResponse.json({ message: 'Otp are required' }, { status: 400 })
  }

  try {
    await mfaVerify(otp)
  } catch (error: any) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 401 },
    )
  }

  return NextResponse.json({ message: 'Login successful' })
}
