import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '~/lib/utils'

const inputVariants = cva(
  'rounded border border-secondary-700 bg-secondary-800',
  {
    variants: {
      variant: {
        md: 'h-12 px-6',
        lg: 'h-14 px-8',
      },
    },
    defaultVariants: {
      variant: 'md',
    },
  }
)

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  )
)
Input.displayName = 'Input'

export { Input }
