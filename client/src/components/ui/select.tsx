import * as React from 'react'
import * as Primitive from '@radix-ui/react-select'

import { cn } from '~/lib/utils'

const { Root, Portal } = Primitive

const Trigger = React.forwardRef<
  React.ElementRef<typeof Primitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof Primitive.Trigger>
>(({ className, ...props }, ref) => (
  <Primitive.Trigger
    ref={ref}
    className={cn(
      'border-secondary-700 bg-secondary-800 inline-flex h-11 min-w-[200px] items-center justify-between gap-4 rounded border px-4 leading-none',
      className
    )}
    {...props}
  />
))
Trigger.displayName = 'Trigger'

const Value = React.forwardRef<
  React.ElementRef<typeof Primitive.Value>,
  React.ComponentPropsWithoutRef<typeof Primitive.Value>
>(({ className, ...props }, ref) => (
  <Primitive.Value ref={ref} className={cn('', className)} {...props} />
))
Value.displayName = 'Value'

const Icon = React.forwardRef<
  React.ElementRef<typeof Primitive.Icon>,
  React.ComponentPropsWithoutRef<typeof Primitive.Icon>
>(({ className, ...props }, ref) => (
  <Primitive.Icon
    ref={ref}
    className={cn('text-secondary-500', className)}
    {...props}
  />
))
Icon.displayName = 'Icon'

const Content = React.forwardRef<
  React.ElementRef<typeof Primitive.Content>,
  React.ComponentPropsWithoutRef<typeof Primitive.Content>
>(({ className, ...props }, ref) => (
  <Primitive.Content
    ref={ref}
    className={cn('bg-secondary-700 overflow-hidden rounded', className)}
    {...props}
  />
))
Content.displayName = 'Content'

const Viewport = React.forwardRef<
  React.ElementRef<typeof Primitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof Primitive.Viewport>
>(({ className, ...props }, ref) => (
  <Primitive.Viewport
    ref={ref}
    className={cn('min-w-[200px] p-1 shadow-lg', className)}
    {...props}
  />
))
Viewport.displayName = 'Viewport'

const Item = React.forwardRef<
  React.ElementRef<typeof Primitive.Item>,
  React.ComponentPropsWithoutRef<typeof Primitive.Item>
>(({ className, ...props }, ref) => (
  <Primitive.Item
    ref={ref}
    className={cn(
      'data-[highlighted]:bg-secondary-600 relative flex h-11 select-none items-center rounded pl-8 pr-4 leading-none data-[disabled]:pointer-events-none data-[highlighted]:text-white data-[disabled]:opacity-50 data-[highlighted]:outline-none',
      className
    )}
    {...props}
  />
))
Item.displayName = 'Item'

const ItemText = React.forwardRef<
  React.ElementRef<typeof Primitive.ItemText>,
  React.ComponentPropsWithoutRef<typeof Primitive.ItemText>
>(({ className, ...props }, ref) => (
  <Primitive.ItemText ref={ref} className={cn('', className)} {...props} />
))
ItemText.displayName = 'ItemText'

const ItemIndicator = React.forwardRef<
  React.ElementRef<typeof Primitive.ItemIndicator>,
  React.ComponentPropsWithoutRef<typeof Primitive.ItemIndicator>
>(({ className, ...props }, ref) => (
  <Primitive.ItemIndicator
    ref={ref}
    className={cn(
      'text-primary-500 absolute left-2 inline-flex w-3 items-center justify-center',
      className
    )}
    {...props}
  />
))
ItemIndicator.displayName = 'ItemIndicator'

const Group = React.forwardRef<
  React.ElementRef<typeof Primitive.Group>,
  React.ComponentPropsWithoutRef<typeof Primitive.Group>
>(({ className, ...props }, ref) => (
  <Primitive.Group ref={ref} className={cn('', className)} {...props} />
))
Group.displayName = 'Group'

const Label = React.forwardRef<
  React.ElementRef<typeof Primitive.Label>,
  React.ComponentPropsWithoutRef<typeof Primitive.Label>
>(({ className, ...props }, ref) => (
  <Primitive.Label
    ref={ref}
    className={cn('py-2 pl-8 pr-4 font-bold text-white', className)}
    {...props}
  />
))
Label.displayName = 'Label'

const Separator = React.forwardRef<
  React.ElementRef<typeof Primitive.Separator>,
  React.ComponentPropsWithoutRef<typeof Primitive.Separator>
>(({ className, ...props }, ref) => (
  <Primitive.Separator ref={ref} className={cn('', className)} {...props} />
))
Separator.displayName = 'Separator'

const ScrollUpButton = React.forwardRef<
  React.ElementRef<typeof Primitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof Primitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <Primitive.ScrollUpButton
    ref={ref}
    className={cn(
      'bg-secondary-600 flex items-center justify-center py-1',
      className
    )}
    {...props}
  />
))
ScrollUpButton.displayName = 'ScrollUpButton'

const ScrollDownButton = React.forwardRef<
  React.ElementRef<typeof Primitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof Primitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <Primitive.ScrollDownButton
    ref={ref}
    className={cn(
      'bg-secondary-600 flex items-center justify-center py-1',
      className
    )}
    {...props}
  />
))
ScrollDownButton.displayName = 'ScrollDownButton'

const Arrow = React.forwardRef<
  React.ElementRef<typeof Primitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof Primitive.Arrow>
>(({ className, ...props }, ref) => (
  <Primitive.Arrow ref={ref} className={cn('', className)} {...props} />
))
Arrow.displayName = 'Arrow'

export {
  Root,
  Trigger,
  Value,
  Icon,
  Portal,
  Content,
  Viewport,
  Item,
  ItemText,
  ItemIndicator,
  Group,
  Label,
  Separator,
  ScrollUpButton,
  ScrollDownButton,
  Arrow,
}
