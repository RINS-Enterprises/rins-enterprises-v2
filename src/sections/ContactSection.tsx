import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, MessageCircle, MapPin, Send, ArrowRight, CheckCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-header',
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
        '.contact-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-content', start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormState({ name: '', email: '', company: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-40 bg-space-black"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-gold/3 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="contact-header text-center mb-16 lg:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-mono tracking-widest uppercase mb-6">
            Contact
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-cream mb-4">
            Let's Build <span className="gradient-text-gold">Together</span>
          </h2>
          <p className="text-cream/50 max-w-2xl mx-auto text-sm lg:text-base leading-relaxed">
            Ready to transform your business with intelligent automation? Reach out
            and let's discuss your vision.
          </p>
        </div>

        {/* Contact Content */}
        <div className="contact-content grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* WhatsApp Card */}
            <div className="p-6 rounded-2xl glass-panel hover:border-green-500/30 transition-all duration-500 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors duration-300">
                  <MessageCircle size={22} className="text-green-400" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-cream text-sm mb-1">
                    WhatsApp
                  </h3>
                  <p className="text-cream/40 text-xs mb-3">
                    Chat with us directly for quick responses
                  </p>
                  <button className="inline-flex items-center gap-2 text-green-400 text-xs font-medium hover:text-green-300 transition-colors">
                    Connect on WhatsApp
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-6 rounded-2xl glass-panel hover:border-gold/30 transition-all duration-500 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                  <Mail size={22} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-cream text-sm mb-1">
                    Email
                  </h3>
                  <p className="text-cream/40 text-xs mb-3">
                    Send us a detailed message
                  </p>
                  <span className="text-gold text-xs font-mono">
                    hello@rinsenterprises.com
                  </span>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-6 rounded-2xl glass-panel hover:border-gold/30 transition-all duration-500 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                  <MapPin size={22} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-cream text-sm mb-1">
                    Location
                  </h3>
                  <p className="text-cream/40 text-xs">
                    Sri Lanka
                    <br />
                    <span className="text-cream/30">Serving clients globally</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="p-6 rounded-2xl glass-panel">
              <h3 className="font-display font-semibold text-cream text-sm mb-4">
                Follow Our Journey
              </h3>
              <div className="flex items-center gap-3">
                {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
                  <button
                    key={social}
                    className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-cream/60 text-xs hover:bg-gold/10 hover:border-gold/30 hover:text-gold transition-all duration-300"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8">
            <form
              onSubmit={handleSubmit}
              className="glass-panel rounded-2xl p-6 lg:p-8"
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
                    <CheckCircle size={28} className="text-green-400" />
                  </div>
                  <h3 className="font-display font-semibold text-cream text-xl mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-cream/50 text-sm">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-display font-semibold text-cream text-lg mb-6">
                    Send us a <span className="text-gold">message</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-cream/60 text-xs mb-2 font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-cream text-sm placeholder:text-cream/20 focus:outline-none focus:border-gold/40 focus:bg-white/[0.05] transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-cream/60 text-xs mb-2 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-cream text-sm placeholder:text-cream/20 focus:outline-none focus:border-gold/40 focus:bg-white/[0.05] transition-all duration-300"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-cream/60 text-xs mb-2 font-medium">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-cream text-sm placeholder:text-cream/20 focus:outline-none focus:border-gold/40 focus:bg-white/[0.05] transition-all duration-300"
                      placeholder="Your Company Name"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-cream/60 text-xs mb-2 font-medium">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-cream text-sm placeholder:text-cream/20 focus:outline-none focus:border-gold/40 focus:bg-white/[0.05] transition-all duration-300 resize-none"
                      placeholder="Tell us about your project, requirements, and goals..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gold text-space-black font-semibold text-sm hover:bg-gold-bright transition-all duration-300 hover:shadow-glow-lg group"
                  >
                    Send Message
                    <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
