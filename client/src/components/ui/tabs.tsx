import * as React from 'react'
import * as Primitive from '@radix-ui/react-tabs'

import { cn } from '~/lib/utils'

const Root = React.forwardRef<
  React.ElementRef<typeof Primitive.Root>,
  React.ComponentPropsWithoutRef<typeof Primitive.Root>
>(({ className, ...props }, ref) => (
  <Primitive.Root
    ref={ref}
    className={cn('flex flex-col', className)}
    {...props}
  />
))
Root.displayName = 'Root'

const List = React.forwardRef<
  React.ElementRef<typeof Primitive.List>,
  React.ComponentPropsWithoutRef<typeof Primitive.List>
>(({ className, ...props }, ref) => (
  <Primitive.List
    ref={ref}
    className={cn('border-secondary-900 border-b', className)}
    {...props}
  />
))
List.displayName = 'List'

const Trigger = React.forwardRef<
  React.ElementRef<typeof Primitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof Primitive.Trigger>
>(({ className, ...props }, ref) => (
  <Primitive.Trigger
    ref={ref}
    className={cn(
      'data-[state=active]:border-primary-600 text-secondary-500 hover:text-secondary-300 data-[state=active]:bg-secondary-900 data-[state=active]:text-secondary-300 rounded-tl rounded-tr border-b-2 border-transparent px-6 py-2 font-medium uppercase transition-colors duration-200',
      className
    )}
    {...props}
  />
))
Trigger.displayName = 'Trigger'

const Content = React.forwardRef<
  React.ElementRef<typeof Primitive.Content>,
  React.ComponentPropsWithoutRef<typeof Primitive.Content>
>(({ className, ...props }, ref) => (
  <Primitive.Content
    ref={ref}
    className={cn('flex pt-4', className)}
    {...props}
  />
))
Content.displayName = 'Content'

export { Root, List, Trigger, Content }
