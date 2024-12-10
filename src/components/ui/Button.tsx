import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import {
  getVarianButton,
  type ButtonProps,
} from 'components/utils/buttonVariations'

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={getVarianButton(variant, size, className)}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button }
