import * as React from 'react'

import { Icons, Select } from '~/components/ui'

interface CustomSelectProps
  extends React.ComponentPropsWithRef<typeof Select.Root> {
  placeholder: string
  options: { label: string; value: string }[]
}

export default function CustomSelect({
  placeholder,
  options,
  ...props
}: CustomSelectProps) {
  return (
    <Select.Root {...props}>
      <Select.Trigger>
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <Icons.ChevronDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content>
          <Select.ScrollUpButton>
            <Icons.ChevronUp />
          </Select.ScrollUpButton>
          <Select.Viewport>
            <Select.Group>
              <Select.Label>{placeholder}</Select.Label>
              {options.map(({ label, value }) => (
                <Select.Item key={value} value={value}>
                  <Select.ItemText>{label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Icons.Circle />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton>
            <Icons.ChevronDown />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
