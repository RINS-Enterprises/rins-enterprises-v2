import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Bot,
  MessageSquare,
  Send,
  Workflow,
  Plug,
  Globe,
  BrainCircuit,
  LayoutDashboard,
  Server,
  Eye,
  Wrench,
  Phone,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Bot,
    title: 'AI Automation Systems',
    description:
      'End-to-end intelligent automation that transforms manual processes into self-operating workflows powered by advanced AI.',
  },
  {
    icon: BrainCircuit,
    title: 'AI Agents & Assistants',
    description:
      'Custom-built AI agents that understand context, make decisions, and execute tasks autonomously across your operations.',
  },
  {
    icon: Phone,
    title: 'WhatsApp AI Integrations',
    description:
      'Smart WhatsApp business solutions with AI-powered responses, automated customer engagement, and seamless messaging workflows.',
  },
  {
    icon: Send,
    title: 'Telegram Automation',
    description:
      'Intelligent Telegram bots and automation systems for community management, notifications, and business operations.',
  },
  {
    icon: Workflow,
    title: 'Workflow Engineering',
    description:
      'Precision-designed automation pipelines using n8n and modern orchestration tools to connect your entire tech stack.',
  },
  {
    icon: Plug,
    title: 'API Integrations',
    description:
      'Seamless connection between platforms, services, and databases through robust API architecture and custom integrations.',
  },
  {
    icon: Globe,
    title: 'Modern Web Platforms',
    description:
      'Next.js and React-based web applications with premium UI/UX, built for performance, scalability, and conversion.',
  },
  {
    icon: MessageSquare,
    title: 'AI Communication Systems',
    description:
      'Conversational AI infrastructure that enables natural, intelligent interactions across all customer touchpoints.',
  },
  {
    icon: LayoutDashboard,
    title: 'Intelligent Dashboards',
    description:
      'Real-time data visualization and analytics dashboards that provide actionable insights into your operations.',
  },
  {
    icon: Server,
    title: 'Automation Infrastructure',
    description:
      'Scalable backend systems, databases, and deployment pipelines built on Supabase, Vercel, and modern cloud architecture.',
  },
  {
    icon: Eye,
    title: 'AI Product Visualization',
    description:
      'AI-enhanced product rendering, digital visualization pipelines, and automated content generation for e-commerce.',
  },
  {
    icon: Wrench,
    title: 'Internal Business Tools',
    description:
      'Custom internal tools and business process automation that improve productivity and streamline operations.',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.services-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )

      // Cards stagger
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-40 bg-space-black"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/3 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="services-header text-center mb-16 lg:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-mono tracking-widest uppercase mb-6">
            What We Build
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-cream mb-4">
            Our <span className="gradient-text-gold">Services</span>
          </h2>
          <p className="text-cream/50 max-w-2xl mx-auto text-sm lg:text-base leading-relaxed">
            From intelligent automation to AI-powered communication systems, we build
            the digital infrastructure that powers modern businesses.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card group p-6 rounded-2xl glass-panel hover:bg-white/[0.06] hover:border-gold/20 transition-all duration-500 cursor-default"
            >
              <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
                <service.icon size={20} className="text-gold" />
              </div>
              <h3 className="font-display font-semibold text-cream text-sm mb-2 tracking-wide group-hover:text-gold transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-cream/40 text-xs leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
