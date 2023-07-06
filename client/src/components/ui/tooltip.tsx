import * as React from 'react'
import * as Primitive from '@radix-ui/react-tooltip'

import { cn } from '~/lib/utils'

const { Provider, Root, Portal } = Primitive

const Trigger = React.forwardRef<
  React.ElementRef<typeof Primitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof Primitive.Trigger>
>(({ className, ...props }, ref) => (
  <Primitive.Trigger ref={ref} className={cn('', className)} {...props} />
))
Trigger.displayName = 'Trigger'

const Content = React.forwardRef<
  React.ElementRef<typeof Primitive.Content>,
  React.ComponentPropsWithoutRef<typeof Primitive.Content>
>(({ className, ...props }, ref) => (
  <Primitive.Content
    ref={ref}
    className={cn('bg-secondary-800 rounded px-2 py-1 text-sm', className)}
    {...props}
  />
))
Content.displayName = 'Content'

const Arrow = React.forwardRef<
  React.ElementRef<typeof Primitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof Primitive.Arrow>
>(({ className, ...props }, ref) => (
  <Primitive.Arrow
    ref={ref}
    className={cn('fill-secondary-800', className)}
    {...props}
  />
))
Arrow.displayName = 'Arrow'

export { Provider, Root, Trigger, Portal, Content, Arrow }
