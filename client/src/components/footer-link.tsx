import { Tooltip } from './ui'

interface FooterLinkProps extends React.PropsWithChildren {
  to: string
  label: string
}

export default function FooterLink({ to, label, children }: FooterLinkProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <a
            className="hover:bg-secondary-800 grid h-11 w-11 place-items-center rounded-full transition-colors duration-200 hover:text-white"
            href={to}
            target="_blank"
            rel="noreferer"
          >
            {children}
          </a>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content sideOffset={4}>
            {label}
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
