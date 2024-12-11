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
  preFunc = false,
  animation = 'default',
  preExtraTime = 0,
  posExtraTime = 0,
  className,
  ...props
}) => {
  const router = useRouter()

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault()
    if (preFunc) {
      await animations[animation].preTransition(preExtraTime)
    }
    router.push(href)

    if (!preFunc) {
      await animations[animation].preTransition(preExtraTime)
    }
    await animations[animation].posTransition(posExtraTime)
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
