import { useEffect, useRef } from 'react'
import { Zap, Globe, Cpu, Shield } from 'lucide-react'

const pillars = [
  {
    icon: Cpu,
    label: 'Intelligent Systems',
    description: 'AI-powered automation that learns and adapts',
  },
  {
    icon: Zap,
    label: 'Workflow Automation',
    description: 'Streamlined processes that save time and reduce errors',
  },
  {
    icon: Globe,
    label: 'Global Infrastructure',
    description: 'Scalable solutions built for worldwide deployment',
  },
  {
    icon: Shield,
    label: 'Secure by Design',
    description: 'Enterprise-grade security at every layer',
  },
]

export default function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lines = entry.target.querySelectorAll('.blur-reveal')
            lines.forEach((line, i) => {
              setTimeout(() => {
                line.classList.add('visible')
              }, i * 150)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative py-24 lg:py-40 bg-space-black"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-black via-indigo-depth/20 to-space-black pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Mission text */}
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-cream leading-relaxed mb-16 lg:mb-24">
          <span className="blur-reveal block">
            We engineer the interface between
          </span>
          <span className="blur-reveal block gradient-text-gold mt-2">
            human ambition
          </span>
          <span className="blur-reveal block mt-2">
            and automated execution.
          </span>
        </h2>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.label}
              className="blur-reveal group p-6 rounded-2xl glass-panel hover:bg-white/[0.06] hover:border-gold/20 transition-all duration-500"
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                <pillar.icon size={22} className="text-gold" />
              </div>
              <h3 className="font-display font-semibold text-cream text-sm mb-2 tracking-wide">
                {pillar.label}
              </h3>
              <p className="text-cream/50 text-xs leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
