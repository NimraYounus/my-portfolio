import { socialAccounts } from '../data/portfolio'

import emailIcon from '../assets/social-account/email.png'
import facebookIcon from '../assets/social-account/facebook.png'
import githubIcon from '../assets/social-account/github.png'
import linkedInIcon from '../assets/social-account/linkedIn.png'

function IconButton({ href, label, iconSrc }) {
  const isExternal = href?.startsWith('http')
  const disabled = !href

  const className = `group relative grid h-16 w-16 place-items-center ${disabled ? 'opacity-60' : 'transition-transform duration-150 hover:scale-[1.06]'
    }`

  const imgClassName = `h-16 w-16 object-contain ${disabled
      ? 'opacity-80'
      : 'drop-shadow-[0_0_18px_rgba(124,58,237,0.55)] drop-shadow-[0_0_45px_rgba(124,58,237,0.30)] group-hover:drop-shadow-[0_0_22px_rgba(124,58,237,0.65)] group-hover:drop-shadow-[0_0_55px_rgba(124,58,237,0.36)]'
    }`

  if (disabled) {
    return (
      <div className={className} aria-label={label} title={label}>
        <img src={iconSrc} alt={label} className={imgClassName} />
      </div>
    )
  }

  return (
    <a
      className={className}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      aria-label={label}
      title={label}
    >
      <img src={iconSrc} alt={label} className={imgClassName} />
    </a>
  )
}

export default function SocialAccounts() {
  const items = [
    {
      id: 'facebook',
      label: 'Facebook',
      href: socialAccounts.facebook,
      iconSrc: facebookIcon,
    },
    {
      id: 'email',
      label: 'Email',
      href: socialAccounts.email ? `mailto:${socialAccounts.email}` : '',
      iconSrc: emailIcon,
    },
    {
      id: 'github',
      label: 'GitHub',
      href: socialAccounts.github,
      iconSrc: githubIcon,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: socialAccounts.linkedin,
      iconSrc: linkedInIcon,
    },
  ]

  return (
    <section className="mt-14">
      <div className="mx-auto mt-6 flex max-w-3xl items-center justify-center gap-10">
        {items.map((i) => (
          <IconButton key={i.id} href={i.href} label={i.label} iconSrc={i.iconSrc} />
        ))}
      </div>
    </section>
  )
}
