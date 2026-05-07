import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Sparkles } from 'lucide-react'
import SingularityEngine from '../components/SingularityEngine'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.hero-label',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.8 }
      )

      gsap.fromTo(
        '.hero-title-line',
        { opacity: 0, y: 60, rotateX: 45 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.15,
          delay: 1.0,
        }
      )

      gsap.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.5 }
      )

      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 1.8 }
      )

      // Scroll fade
      if (sectionRef.current) {
        gsap.to(sectionRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=50%',
            scrub: true,
          },
          opacity: 0,
          scale: 0.95,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleExplore = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector('#mission')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-end overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <SingularityEngine />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/50 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-space-black/80 via-transparent to-transparent z-[1]" />

      {/* Content */}
      <div
        ref={titleRef}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-24 lg:pb-32 w-full"
      >
        <div className="max-w-3xl">
          {/* Label */}
          <div className="hero-label flex items-center gap-3 mb-6 opacity-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20">
              <Sparkles size={14} className="text-gold" />
              <span className="text-xs font-mono text-gold tracking-widest uppercase">
                AI Automation Systems
              </span>
            </div>
            <span className="text-xs font-mono text-cream/40 tracking-widest">
              SRI LANKA
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream leading-[1.1] mb-6">
            <span className="hero-title-line block opacity-0">INTELLIGENT</span>
            <span className="hero-title-line block opacity-0 gradient-text-gold">
              SYSTEMS
            </span>
            <span className="hero-title-line block opacity-0">FOR THE FUTURE</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-base lg:text-lg text-cream/60 max-w-xl mb-8 leading-relaxed opacity-0 font-body">
            RINS Enterprises builds AI-powered automation infrastructure, intelligent
            workflows, and scalable digital systems that transform how businesses
            operate in the modern world.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <a
              href="#mission"
              onClick={handleExplore}
              className="hero-cta group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-space-black font-semibold text-sm hover:bg-gold-bright transition-all duration-300 hover:shadow-glow-lg opacity-0"
            >
              Explore Our Work
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              onClick={handleContact}
              className="hero-cta inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-panel text-gold font-medium text-sm hover:bg-white/[0.06] hover:border-gold/30 transition-all duration-300 opacity-0"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[150px] z-[1] pointer-events-none" />
    </section>
  )
}
