import { NextResponse, type NextRequest } from 'next/server'

export const redirectToHome = (request: NextRequest) => {
  const url = request.nextUrl.clone()
  url.pathname = '/'
  return NextResponse.redirect(url)
}

export const redirectTo = (request: NextRequest, path: string) => {
  const url = request.nextUrl.clone()
  url.pathname = path
  return NextResponse.redirect(url)
}
