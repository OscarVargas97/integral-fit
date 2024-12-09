import { NextResponse, type NextRequest } from 'next/server'

export const redirectToHome = (request: NextRequest) => {
  const url = request.nextUrl.clone()
  url.pathname = '/'
  return NextResponse.redirect(url)
}

export const redirectToLogOut = (request: NextRequest) => {
  const url = request.nextUrl.clone()
  url.pathname = '/logout'
  return NextResponse.redirect(url)
}
