import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Linkedin, Twitter, Mail, Code2, FlaskConical } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const founders = [
  {
    name: 'Isuru Rajapaksha',
    role: 'Founder & AI Developer',
    description:
      'A developer focused on building AI-powered systems, workflow automations, intelligent assistants, API integrations, and scalable automation infrastructure using modern technologies and AI systems.',
    image: '/images/founder-isuru.jpg',
    icon: Code2,
    expertise: ['AI Systems', 'Automation', 'Full-Stack Dev'],
  },
  {
    name: 'Dr. Thilini Madakumbura',
    role: 'Co-Founder & Research Specialist',
    description:
      'A research-focused professional with a background in microbiology and scientific research, contributing analytical thinking, research methodology, innovation-driven perspectives, and long-term strategic vision.',
    image: '/images/founder-thilini.jpg',
    icon: FlaskConical,
    expertise: ['Research', 'Strategy', 'Innovation'],
  },
]

export default function FoundersSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.founders-header',
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
        '.founder-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: { trigger: '.founders-grid', start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="founders"
      ref={sectionRef}
      className="relative py-24 lg:py-40 bg-space-black"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/3 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="founders-header text-center mb-16 lg:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-mono tracking-widest uppercase mb-6">
            Leadership
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-cream mb-4">
            Meet the <span className="gradient-text-gold">Founders</span>
          </h2>
          <p className="text-cream/50 max-w-2xl mx-auto text-sm lg:text-base leading-relaxed">
            A fusion of technical innovation and research-driven thinking, building
            the future of intelligent automation from Sri Lanka.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="founders-grid grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="founder-card group relative rounded-2xl overflow-hidden glass-panel hover:border-gold/25 transition-all duration-500"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="relative sm:w-2/5 aspect-[3/4] sm:aspect-auto overflow-hidden">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-space-black/80 hidden sm:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-transparent sm:hidden" />

                  {/* Icon badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-gold/20 backdrop-blur-sm border border-gold/30 flex items-center justify-center">
                    <founder.icon size={18} className="text-gold" />
                  </div>
                </div>

                {/* Content */}
                <div className="sm:w-3/5 p-6 lg:p-8 flex flex-col justify-center">
                  <h3 className="font-display font-bold text-xl lg:text-2xl text-cream mb-1 group-hover:text-gold transition-colors duration-300">
                    {founder.name}
                  </h3>
                  <p className="text-gold text-sm font-medium mb-4">
                    {founder.role}
                  </p>
                  <p className="text-cream/50 text-sm leading-relaxed mb-6">
                    {founder.description}
                  </p>

                  {/* Expertise tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {founder.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full bg-gold/10 border border-gold/15 text-gold/80 text-[10px] font-mono tracking-wide uppercase"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social links */}
                  <div className="flex items-center gap-3">
                    <button className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-gold/10 hover:border-gold/30 transition-all duration-300 group/icon">
                      <Linkedin size={14} className="text-cream/50 group-hover/icon:text-gold transition-colors" />
                    </button>
                    <button className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-gold/10 hover:border-gold/30 transition-all duration-300 group/icon">
                      <Twitter size={14} className="text-cream/50 group-hover/icon:text-gold transition-colors" />
                    </button>
                    <button className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-gold/10 hover:border-gold/30 transition-all duration-300 group/icon">
                      <Mail size={14} className="text-cream/50 group-hover/icon:text-gold transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
