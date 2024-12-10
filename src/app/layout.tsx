import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from 'components/utils/utils'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Integral Fit',
  description: 'Genera el cambio que necesitas en tu vida',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn('bg-background', inter.className)}>{children}</body>
    </html>
  )
}
