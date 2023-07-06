import FooterLink from './footer-link'
import { Icons } from './ui'

export default function Footer() {
  return (
    <footer className="bg-secondary-900 py-2">
      <div className="container flex items-center justify-between">
        <p>
          Developed by{' '}
          <a className="font-bold" href="https://dangminhngo.github.io">
            Dang Minh Ngo
          </a>
        </p>
        <div className="flex items-center gap-1">
          {links.map(({ icon: Icon, ...props }) => (
            <FooterLink key={props.label} {...props}>
              <Icon />
            </FooterLink>
          ))}
        </div>
      </div>
    </footer>
  )
}

const links = [
  {
    to: 'https://dangminhngo.github.io',
    icon: Icons.Github,
    label: 'Github',
  },
  {
    to: 'mailto:dangminhngo.dev@gmail.com',
    icon: Icons.Mail,
    label: 'Email',
  },
  {
    to: 'https://drive.google.com/file/d/1hoJ60VJZkSfF02vKdIY8FqJ_dx1ugREa/view?usp=drive_link',
    icon: Icons.Article,
    label: 'Download Resume',
  },
]
