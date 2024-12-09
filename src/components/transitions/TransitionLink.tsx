'use client'
import Link from 'next/link'
import React from 'react'
import { getVarianButton } from 'components/utils/buttonVariations'
import { useRouter } from 'next/navigation'
import { animations } from './animations'

interface TransitionLinkProps {
  children: React.ReactNode
  href: string
  variant?: string
  size?: string
  initTime?: number
  finishTime?: number
  transitionClassName?: string
  className?: string
  [key: string]: any
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  children,
  href,
  variant,
  size,
  className,
  ...props
}) => {
  const router = useRouter()

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault()
    await animations.default.preTransition()
    router.push(href)
    await animations.default.posTransition()
  }

  return (
    <Link
      {...props}
      href={href}
      onClick={handleTransition}
      className={getVarianButton(variant, size, className)}
    >
      {children}
    </Link>
  )
}
