import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  {
    name: 'Frontend',
    items: [
      { name: 'Next.js', level: 95 },
      { name: 'React', level: 98 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'TypeScript', level: 92 },
    ],
  },
  {
    name: 'Backend',
    items: [
      { name: 'Supabase', level: 90 },
      { name: 'PostgreSQL', level: 88 },
      { name: 'REST APIs', level: 95 },
      { name: 'Authentication', level: 92 },
    ],
  },
  {
    name: 'Automation',
    items: [
      { name: 'n8n', level: 95 },
      { name: 'Workflow Systems', level: 93 },
      { name: 'Pipeline Orchestration', level: 90 },
      { name: 'Webhook Integrations', level: 94 },
    ],
  },
  {
    name: 'AI',
    items: [
      { name: 'OpenAI APIs', level: 96 },
      { name: 'AI Agents', level: 92 },
      { name: 'Conversational AI', level: 94 },
      { name: 'AI Content Generation', level: 90 },
    ],
  },
  {
    name: 'Messaging',
    items: [
      { name: 'WhatsApp API', level: 93 },
      { name: 'Telegram API', level: 95 },
      { name: 'Bot Frameworks', level: 92 },
      { name: 'Real-time Messaging', level: 90 },
    ],
  },
  {
    name: 'DevOps',
    items: [
      { name: 'GitHub', level: 95 },
      { name: 'Vercel', level: 93 },
      { name: 'CI/CD Pipelines', level: 90 },
      { name: 'Cloud Deployment', level: 92 },
    ],
  },
]

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeCategory, setActiveCategory] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tech-header',
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
        '.tech-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.tech-content', start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="tech"
      ref={sectionRef}
      className="relative py-24 lg:py-40 bg-space-black"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-gold/3 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="tech-header text-center mb-16 lg:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-mono tracking-widest uppercase mb-6">
            Technologies
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-cream mb-4">
            Our <span className="gradient-text-gold">Tech Stack</span>
          </h2>
          <p className="text-cream/50 max-w-2xl mx-auto text-sm lg:text-base leading-relaxed">
            We leverage cutting-edge technologies to build robust, scalable, and
            intelligent automation systems.
          </p>
        </div>

        {/* Tech Content */}
        <div className="tech-content grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Category Tabs */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {categories.map((cat, index) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(index)}
                className={`group flex items-center gap-3 px-5 py-3.5 rounded-xl text-left whitespace-nowrap transition-all duration-300 ${
                  activeCategory === index
                    ? 'bg-gold/10 border border-gold/30'
                    : 'bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1]'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeCategory === index
                      ? 'bg-gold shadow-glow'
                      : 'bg-cream/20'
                  }`}
                />
                <span
                  className={`font-display text-sm tracking-wide transition-colors duration-300 ${
                    activeCategory === index ? 'text-gold' : 'text-cream/60'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            ))}
          </div>

          {/* Skills Display */}
          <div className="lg:col-span-8">
            <div className="glass-panel rounded-2xl p-6 lg:p-8">
              <h3 className="font-display font-semibold text-cream text-lg mb-6">
                {categories[activeCategory].name}{' '}
                <span className="text-gold">Technologies</span>
              </h3>

              <div className="space-y-5">
                {categories[activeCategory].items.map((item, index) => (
                  <div key={item.name} className="tech-bar">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-cream/80 text-sm font-medium">
                        {item.name}
                      </span>
                      <span className="font-mono text-gold text-xs">
                        {item.level}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-gold/60 to-gold transition-all duration-1000 ease-out"
                        style={{
                          width: `${item.level}%`,
                          transitionDelay: `${index * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative grid */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-1 rounded-full bg-gold/10"
                      style={{
                        opacity: Math.random() * 0.5 + 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
