import { navLinks } from '../data/portfolio'
import myLogo from '../assets/logo.png'

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex items-center justify-between py-6 text-sm text-white/80">
          <img src={myLogo} alt="Logo" className="h-5 w-auto" />
          <div className="flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} className="hover:text-white" href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
