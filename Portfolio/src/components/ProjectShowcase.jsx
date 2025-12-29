import { projects } from '../data/portfolio'

function MockImage() {
  return (
    <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-white shadow-[0_18px_70px_rgba(0,0,0,0.55)]">
      <div className="h-full w-full bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.02))]" />
    </div>
  )
}

function Sparkle() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2l1.6 6.1L20 10l-6.4 1.9L12 18l-1.6-6.1L4 10l6.4-1.9L12 2z"
        fill="rgba(255,255,255,0.85)"
      />
    </svg>
  )
}

function ProjectBlock({ project, reverse }) {
  return (
    <div className={`grid grid-cols-1 items-start gap-10 lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
      <div className={`relative ${reverse ? 'lg:pl-6' : 'lg:pr-6'}`}>
        <div className={`${reverse ? 'text-right' : 'text-left'}`}>
          <div className="text-[11px] font-semibold tracking-widest text-[#a78bfa]">{project.label}</div>
          <div className="mt-2 text-[28px] font-semibold leading-[1.05] tracking-[-0.02em] text-white/90">
            {project.title}
          </div>
        </div>

        <div
          className={`relative z-10 mt-6 max-w-[520px] rounded-2xl bg-white/10 px-6 py-5 text-[12px] leading-6 text-white/75 shadow-[0_18px_70px_rgba(0,0,0,0.55)] ${
            reverse ? 'ml-auto lg:ml-[-140px]' : 'lg:mr-[-140px]'
          }`}
        >
          {project.description}
        </div>

        <div className={`mt-6 flex items-center gap-2 ${reverse ? 'justify-end' : 'justify-start'}`}>
          <Sparkle />
          <Sparkle />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
        <div
          className={`pointer-events-none absolute -inset-6 rounded-2xl bg-[#7c3aed]/10 ${
            reverse ? 'lg:-inset-y-8 lg:-inset-l-10' : 'lg:-inset-y-8 lg:-inset-r-10'
          }`}
        />
        <div className="relative scale-[0.94] lg:scale-[0.92]">
          <MockImage />
        </div>
      </div>
    </div>
  )
}

export default function ProjectShowcase() {
  const left = projects.slice(0, 6)
  const right = projects.slice(6, 12)

  return (
    <section id="projects" className="pb-28 pt-10">
      <ProjectBlock project={projects[0]} reverse={false} />
      <div className="mt-14" />
      <ProjectBlock project={projects[1]} reverse />

      <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <div className="text-[13px] font-semibold tracking-widest text-white/85">KEY ACHIEVEMENT</div>
          <div className="mt-3 text-[12px] font-semibold text-white/70">Mobile App Development – Projects</div>

          <div className="mt-4 space-y-2">
            {left.map((p) => (
              <div key={`p-left-${p.id}`} className="flex items-start gap-3 text-[12px] text-white/70">
                <div className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                <div className="leading-6">
                  <span className="font-semibold text-white/80">{p.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mt-[44px] text-[12px] font-semibold text-white/70">More Projects</div>
          <div className="mt-4 space-y-2">
            {right.map((p) => (
              <div key={`p-right-${p.id}`} className="flex items-start gap-3 text-[12px] text-white/70">
                <div className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                <div className="leading-6">
                  <span className="font-semibold text-white/80">{p.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
