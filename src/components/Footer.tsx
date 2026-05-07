import { Code2, Heart } from 'lucide-react'

const footerLinks = [
  {
    title: 'Company',
    links: ['About', 'Services', 'Projects', 'Process'],
  },
  {
    title: 'Technologies',
    links: ['Next.js', 'AI Systems', 'Automation', 'APIs'],
  },
  {
    title: 'Connect',
    links: ['Contact', 'WhatsApp', 'LinkedIn', 'GitHub'],
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-space-black border-t border-white/[0.04]">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold to-gold-bright flex items-center justify-center">
                <span className="font-display font-bold text-space-black text-sm">
                  R
                </span>
              </div>
              <span className="font-display font-semibold text-cream text-lg tracking-wide">
                RINS Enterprises
              </span>
            </div>
            <p className="text-cream/40 text-sm leading-relaxed max-w-sm mb-6">
              Building intelligent AI-powered systems, workflow automations, and
              scalable digital infrastructure for the future. Based in Sri Lanka,
              serving the world.
            </p>
            <div className="flex items-center gap-2 text-cream/30 text-xs">
              <Code2 size={14} />
              <span>Crafted with precision</span>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-3 gap-8">
              {footerLinks.map((group) => (
                <div key={group.title}>
                  <h4 className="font-display font-semibold text-cream text-xs tracking-widest uppercase mb-4">
                    {group.title}
                  </h4>
                  <ul className="space-y-3">
                    {group.links.map((link) => (
                      <li key={link}>
                        <button className="text-cream/40 text-sm hover:text-gold transition-colors duration-300">
                          {link}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream/30 text-xs">
            &copy; {currentYear} RINS Enterprises. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-cream/30 text-xs">
            <span>Built with</span>
            <Heart size={12} className="text-gold/60 fill-gold/60" />
            <span>in Sri Lanka</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
