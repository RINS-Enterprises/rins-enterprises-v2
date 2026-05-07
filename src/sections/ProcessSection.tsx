import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Search,
  FlaskConical,
  Map,
  PenTool,
  Code2,
  Play,
  TrendingUp,
  Rocket,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Discovery',
    description: 'Understanding your business needs, challenges, and automation opportunities through deep consultation.',
  },
  {
    icon: FlaskConical,
    number: '02',
    title: 'Research',
    description: 'Analyzing the best AI models, tools, and approaches to craft the optimal solution architecture.',
  },
  {
    icon: Map,
    number: '03',
    title: 'Planning',
    description: 'Designing comprehensive automation roadmaps with clear milestones and deliverables.',
  },
  {
    icon: PenTool,
    number: '04',
    title: 'System Design',
    description: ' architecting the technical infrastructure, data flows, and integration points.',
  },
  {
    icon: Code2,
    number: '05',
    title: 'Development',
    description: 'Building the solution with modern technologies, clean code, and best practices.',
  },
  {
    icon: Play,
    number: '06',
    title: 'Automation',
    description: 'Deploying workflows, connecting APIs, and activating the intelligent systems.',
  },
  {
    icon: TrendingUp,
    number: '07',
    title: 'Optimization',
    description: 'Fine-tuning performance, improving accuracy, and refining the automation logic.',
  },
  {
    icon: Rocket,
    number: '08',
    title: 'Scale',
    description: 'Expanding the system capabilities and ensuring reliable long-term operation.',
  },
]

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        '.process-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )

      // Steps stagger
      gsap.fromTo(
        '.process-step',
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.process-track', start: 'top 85%' },
        }
      )

      // Horizontal scroll for mobile
      if (window.innerWidth < 768 && trackRef.current) {
        const track = trackRef.current
        gsap.to(track, {
          x: () => -(track.scrollWidth - track.parentElement!.clientWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 20%',
            end: () => `+=${track.scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 lg:py-40 bg-space-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="process-header text-center mb-16 lg:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-mono tracking-widest uppercase mb-6">
            Our Process
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-cream mb-4">
            Automation <span className="gradient-text-gold">Pipeline</span>
          </h2>
          <p className="text-cream/50 max-w-2xl mx-auto text-sm lg:text-base leading-relaxed">
            A systematic approach to building intelligent automation systems that
            deliver measurable results.
          </p>
        </div>

        {/* Process Track */}
        <div
          ref={trackRef}
          className="process-track flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="process-step group relative p-6 rounded-2xl glass-panel hover:bg-white/[0.06] hover:border-gold/25 transition-all duration-500 min-w-[280px] md:min-w-0"
            >
              {/* Connection line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-gold/30 to-transparent z-10" />
              )}

              {/* Number */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                  <step.icon size={18} className="text-gold" />
                </div>
                <span className="font-mono text-2xl font-bold text-cream/10 group-hover:text-gold/30 transition-colors duration-300">
                  {step.number}
                </span>
              </div>

              <h3 className="font-display font-semibold text-cream text-base mb-2 group-hover:text-gold transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-cream/40 text-xs leading-relaxed">
                {step.description}
              </p>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent" />
              </div>
            </div>
          ))}
        </div>

        {/* Pipeline visual connector (desktop) */}
        <div className="hidden lg:block mt-12 relative h-2">
          <div className="absolute inset-0 rounded-full bg-white/5 overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-gold/30 via-gold/20 to-transparent rounded-full animate-pulse" />
          </div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20" />
        </div>
      </div>
    </section>
  )
}
