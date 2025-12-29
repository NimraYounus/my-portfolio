import SectionTitle from './SectionTitle'
import { experiences } from '../data/portfolio'

function ExperienceCard({ role, company, companyUrl, icon }) {
  const iconSrc = new URL(`../assets/work-exp/${icon}`, import.meta.url).href
  const href = companyUrl || 'https://example.com'

  return (
    <div className="group relative overflow-hidden rounded-xl bg-[#120727]/70 px-7 py-6 shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/15 via-transparent to-[#7c3aed]/10" />
      </div>

      <div className="relative flex items-center gap-5">
        <img src={iconSrc} alt="" className="h-14 w-14 shrink-0 object-contain" />

        <div className="min-w-0">
          <div className="truncate text-[16px] font-semibold leading-6 text-white">{role}</div>
          <div className="mt-1 truncate text-[12px] text-white/60">{company}</div>

          <a
            className="mt-4 inline-flex items-center justify-center rounded-full border border-[#a78bfa]/40 bg-[#2b154f]/40 px-5 py-2 text-[10px] font-semibold tracking-widest text-white/80 hover:bg-[#2b154f]/55"
            href={href}
            target="_blank"
            rel="noreferrer"
          >
            VISIT COMPANY
          </a>
        </div>
      </div>
    </div>
  )
}

export default function ExperienceGrid() {
  return (
    <section className="mt-14">
      <SectionTitle>Work Experience</SectionTitle>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {experiences.map((e) => (
          <ExperienceCard
            key={e.id}
            role={e.role}
            company={e.company}
            companyUrl={e.companyUrl}
            icon={e.icon}
          />
        ))}
      </div>
    </section>
  )
}
