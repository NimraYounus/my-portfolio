export default function BackgroundGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-44 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#7c3aed]/35 blur-[120px]" />
      <div className="absolute top-[520px] left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[#6d28d9]/25 blur-[130px]" />
      <div className="absolute top-[1140px] left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#8b5cf6]/18 blur-[130px]" />
      <div className="absolute bottom-[-220px] left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-[#7c3aed]/16 blur-[150px]" />
    </div>
  )
}
