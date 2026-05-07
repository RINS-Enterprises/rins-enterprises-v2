import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Navigation from './components/Navigation'
import HeroSection from './sections/HeroSection'
import MissionSection from './sections/MissionSection'
import ServicesSection from './sections/ServicesSection'
import ProjectsSection from './sections/ProjectsSection'
import ProcessSection from './sections/ProcessSection'
import TechStackSection from './sections/TechStackSection'
import FoundersSection from './sections/FoundersSection'
import VisionSection from './sections/VisionSection'
import ContactSection from './sections/ContactSection'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf as any)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-space-black text-cream noise-overlay">
      <Navigation />
      <main>
        <HeroSection />
        <MissionSection />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <TechStackSection />
        <FoundersSection />
        <VisionSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
