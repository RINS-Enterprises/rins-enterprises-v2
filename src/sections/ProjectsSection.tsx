import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'AI WhatsApp Assistant',
    description:
      'An AI-powered communication assistant capable of intelligent customer interaction, automated responses, and workflow-triggered messaging for businesses.',
    image: '/images/project-whatsapp.jpg',
    tags: ['AI', 'WhatsApp API', 'Automation'],
  },
  {
    title: 'Telegram Automation Platform',
    description:
      'A Telegram-based intelligent workflow and automation ecosystem for community management, broadcast messaging, and bot-driven operations.',
    image: '/images/project-telegram.jpg',
    tags: ['Telegram API', 'Bots', 'Workflows'],
  },
  {
    title: 'AI Workflow Dashboard',
    description:
      'A cinematic intelligent dashboard visualizing AI systems, automation chains, operational data, and real-time system health monitoring.',
    image: '/images/project-dashboard.jpg',
    tags: ['Dashboard', 'Analytics', 'AI'],
  },
  {
    title: 'AI Product Visualization',
    description:
      'AI-enhanced product rendering and digital visualization pipelines that transform product imagery with intelligent enhancement.',
    image: '/images/project-visualization.jpg',
    tags: ['AI Imaging', '3D', 'E-commerce'],
  },
  {
    title: 'Intelligent Automation Infrastructure',
    description:
      'Scalable systems connecting AI models, APIs, databases, messaging platforms, and automation pipelines into unified infrastructure.',
    image: '/images/project-infrastructure.jpg',
    tags: ['Infrastructure', 'APIs', 'Scale'],
  },
  {
    title: 'Smart Business Workflow Systems',
    description:
      'Modern automation tools designed to simplify productivity, streamline operations, and eliminate repetitive manual tasks.',
    image: '/images/project-workflow.jpg',
    tags: ['Workflows', 'n8n', 'Productivity'],
  },
]

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-header',
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
        '.project-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.projects-grid', start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-40 bg-space-black"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="projects-header flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-20">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-mono tracking-widest uppercase mb-6">
              Portfolio
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-cream">
              Featured <span className="gradient-text-gold">Projects</span>
            </h2>
          </div>
          <p className="text-cream/50 max-w-md text-sm lg:text-base leading-relaxed">
            Real systems we have architected and built. Each project represents a
            complete intelligent automation solution.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`project-card group relative rounded-2xl overflow-hidden glass-panel hover:border-gold/30 transition-all duration-500 ${
                index === 0 || index === 3 ? 'md:col-span-2' : ''
              }`}
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/40 to-transparent" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top-right icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-space-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight size={16} className="text-gold" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/15 text-gold/80 text-[10px] font-mono tracking-wide uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-display font-semibold text-cream text-lg mb-2 group-hover:text-gold transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-cream/40 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
