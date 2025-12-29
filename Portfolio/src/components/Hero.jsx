import { motion } from 'framer-motion'
import { profile } from '../data/portfolio'
import nimraImg from '../assets/nimra.jpg'
import astrikLogo from '../assets/astrik.png'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

function Avatar() {
  return (
    <div className="group relative">
      <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.10)]">
        <img src={nimraImg} alt={profile.name} className="h-full w-full object-cover" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-[74px] w-max -translate-x-1/2 rounded-md border border-white/10 bg-[#0b061a] px-3 py-1.5 text-[11px] text-white/80 opacity-0 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-opacity duration-150 group-hover:opacity-100">
        Hello! I am {profile.name}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <motion.section variants={container} initial="hidden" animate="show" className="pt-6">
      <motion.div variants={item} className="flex items-start gap-6">
        <Avatar />
        <div className="pt-0">
          <div className="max-w-2xl text-[12px] leading-8 text-white/70">
            Hello, I am Nimra Younus.
          </div>
          <div className="text-[24px] font-semibold leading-[1.05] tracking-[-0.02em]">“Full Stack Developer”</div>
          <div className="mt-2 text-[12px] text-white/80">
            Currently, I&apos;m a Software Engineer at{' '}
            <a
              className="inline-flex items-center gap-2"
              href="https://www.linkedin.com/company/astrikdigital/posts/?feedView=all"
              target="_blank"
              rel="noreferrer"
              aria-label="Astrik LinkedIn"
            >
              <img src={astrikLogo} alt="Astrik" className="h-5 w-auto" />
            </a>
          </div>
          <div className="mt-10 max-w-2xl text-[16px] font-normal italic leading-8 text-white">
            I build scalable, real-world applications using Angular, Flutter, and ASP.NET Core — from clean UI to reliable backend systems.

          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
