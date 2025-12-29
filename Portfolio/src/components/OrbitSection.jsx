export default function OrbitSection() {
  const orbitImg = new URL('../assets/skills.png', import.meta.url).href

  const skills = [
    { id: 's1', label: 'Figma', src: new URL('../assets/skills/figma.png', import.meta.url).href },
    { id: 's2', label: 'React', src: new URL('../assets/skills/react.png', import.meta.url).href },
    { id: 's3', label: 'Next.js', src: new URL('../assets/skills/nextjs.png', import.meta.url).href },
    { id: 's4', label: 'Node.js', src: new URL('../assets/skills/nodejs.png', import.meta.url).href },
    { id: 's5', label: 'Express', src: new URL('../assets/skills/expressjs.png', import.meta.url).href },
    { id: 's6', label: 'JavaScript', src: new URL('../assets/skills/js.png', import.meta.url).href },
    { id: 's7', label: 'MongoDB', src: new URL('../assets/skills/mongodb.png', import.meta.url).href },
    { id: 's8', label: 'Angular', src: new URL('../assets/skills/angular.png', import.meta.url).href },
    { id: 's9', label: 'Flutter', src: new URL('../assets/skills/flutter.png', import.meta.url).href },
    { id: 's10', label: '.NET Core', src: new URL('../assets/skills/net-core.png', import.meta.url).href },
    { id: 's11', label: 'SQL', src: new URL('../assets/skills/sql.png', import.meta.url).href },
  ]

  function SkillChip({ src, label, dimmed }) {
    return (
      <div className="group relative">
        <div
          className={`grid h-9 w-9 place-items-center rounded-full bg-[#0b061a] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_12px_30px_rgba(0,0,0,0.45)] ${
            dimmed ? 'opacity-90' : ''
          }`}
        >
          <img src={src} alt={label} className="h-[18px] w-[18px] object-contain" />
        </div>

        <div className="pointer-events-none absolute left-1/2 top-[-10px] w-max -translate-x-1/2 -translate-y-full rounded-md border border-white/10 bg-[#0b061a] px-3 py-1.5 text-[11px] text-white/80 opacity-0 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-opacity duration-150 group-hover:opacity-100">
          {label}
        </div>
      </div>
    )
  }

  return (
    <section id="about" className="pb-20 pt-24">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-sm leading-6 text-white/85">
          I&apos;m currently looking to join a <span className="text-[#a78bfa]">cross-functional</span> team
        </div>
        <div className="mt-1 text-[11px] leading-5 text-white/55">
          that values improving people&apos;s lives through accessible design
        </div>
      </div>

      <div className="mx-auto mt-5 w-full max-w-[620px]">
        <div className="flex items-center justify-center gap-2">
          {skills.slice(0, 7).map((s) => (
            <SkillChip key={s.id} src={s.src} label={s.label} />
          ))}
        </div>

        <div className="mt-3 flex items-center justify-center gap-2">
          {skills.slice(7, 11).map((s) => (
            <SkillChip key={`b-${s.id}`} src={s.src} label={s.label} dimmed />
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-3xl">
        <img
          src={orbitImg}
          alt="Skills orbit"
          className="mx-auto w-full max-w-[980px] select-none"
          draggable="false"
        />
      </div>
    </section>
  )
}
