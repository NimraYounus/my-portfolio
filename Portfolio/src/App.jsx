import BackgroundGlow from './components/BackgroundGlow'
import ContactSection from './components/ContactSection'
import ExperienceGrid from './components/ExperienceGrid'
import FcmForegroundListener from './components/FcmForegroundListener'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import OrbitSection from './components/OrbitSection'
import ProjectShowcase from './components/ProjectShowcase'
import SocialAccounts from './components/SocialAccounts'

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#070312] text-white">
      {import.meta.env.DEV ? <FcmForegroundListener /> : null}
      <BackgroundGlow />
      <Navbar />

      <main className="relative mx-auto max-w-5xl px-4">
        <Hero />
        <ExperienceGrid />
        <OrbitSection />
        <ProjectShowcase />
        <ContactSection />
        <SocialAccounts />
      </main>
    </div>
  )
}
