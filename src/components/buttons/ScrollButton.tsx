'use client'
import { Button } from 'components/ui/Button'

export default function ScrollButton({
  targetId,
  children,
  type,
}: {
  targetId: string
  children: React.ReactNode
  type: string
}) {
  const handleScroll = () => {
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      const offsetTop =
        targetElement.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: offsetTop, // Mueve al componente objetivo
        behavior: 'smooth',
      })
    } else {
      console.error(`Element with ID "${targetId}" not found.`)
    }
  }

  return (
    <Button variant={type} onClick={handleScroll}>
      {children}
    </Button>
  )
}
