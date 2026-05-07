import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Brain, Network, Cpu, Lightbulb, Target, TrendingUp } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const visionPoints = [
  {
    icon: Brain,
    title: 'Intelligent Systems',
    description:
      'Building AI that understands context, learns from interactions, and makes intelligent decisions autonomously.',
  },
  {
    icon: Network,
    title: 'Automation Ecosystems',
    description:
      'Creating interconnected automation networks where every tool, API, and platform works in seamless harmony.',
  },
  {
    icon: Cpu,
    title: 'AI Infrastructure',
    description:
      'Developing the foundational AI infrastructure that powers next-generation business operations worldwide.',
  },
  {
    icon: Lightbulb,
    title: 'Research-Driven Innovation',
    description:
      'Applying rigorous research methodology to discover and implement breakthrough automation solutions.',
  },
  {
    icon: Target,
    title: 'Precision Automation',
    description:
      'Achieving surgical precision in automation — every workflow optimized, every process refined.',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Intelligence',
    description:
      'Designing systems that grow smarter and more capable as they scale across organizations.',
  },
]

export default function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.vision-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )

      gsap.fromTo(
        '.vision-card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.vision-grid', start: 'top 85%' },
        }
      )

      gsap.fromTo(
        '.vision-quote',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.vision-quote', start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="relative py-24 lg:py-40 bg-space-black"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-indigo-depth/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="vision-header text-center mb-16 lg:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-mono tracking-widest uppercase mb-6">
            Future Vision
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-cream mb-4">
            Where We're <span className="gradient-text-gold">Headed</span>
          </h2>
          <p className="text-cream/50 max-w-2xl mx-auto text-sm lg:text-base leading-relaxed">
            Our long-term focus is on building the intelligent infrastructure that
            will define how businesses operate in the AI era.
          </p>
        </div>

        {/* Vision Grid */}
        <div className="vision-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16 lg:mb-24">
          {visionPoints.map((point) => (
            <div
              key={point.title}
              className="vision-card group p-6 rounded-2xl glass-panel hover:bg-white/[0.06] hover:border-gold/20 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
                <point.icon size={22} className="text-gold" />
              </div>
              <h3 className="font-display font-semibold text-cream text-sm mb-2 tracking-wide group-hover:text-gold transition-colors duration-300">
                {point.title}
              </h3>
              <p className="text-cream/40 text-xs leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="vision-quote relative max-w-3xl mx-auto text-center">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl text-gold/10 font-display">
            "
          </div>
          <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl text-cream/90 leading-relaxed italic">
            We are not just building tools. We are architecting the{' '}
            <span className="gradient-text-gold not-italic">
              intelligent foundation
            </span>{' '}
            for how work gets done in the future.
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-gold/30" />
            <span className="text-gold text-sm font-medium">RINS Enterprises</span>
            <div className="w-8 h-px bg-gold/30" />
          </div>
        </div>
      </div>
    </section>
  )
}
