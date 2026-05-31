'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowUpRight, Github, Linkedin, Mail, Zap } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { TechLogos } from '@/components/tech-logos'
import { ThemeToggle } from '@/components/theme-toggle'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'


const navItems = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Research', href: '/#research' },
  { label: 'Blogs', href: '/blogs' },
]

function formatMonthYear(value: string) {
  const trimmed = value.trim()
  if (/^\d{4}$/.test(trimmed)) {
    const year = Number(trimmed)
    const date = new Date(year, 0, 1)
    if (Number.isNaN(date.getTime())) return value
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date)
  }

  const match = trimmed.match(/^(\d{4})[-/](\d{1,2})$/)
  if (!match) return value

  const year = Number(match[1])
  const monthIndex = Number(match[2]) - 1
  const date = new Date(year, monthIndex, 1)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date)
}

function formatDateRange(start: string, end?: string | null) {
  const startLabel = formatMonthYear(start)
  const endLabel = end ? formatMonthYear(end) : 'Present'
  return `${startLabel} — ${endLabel}`
}

const experiences = [
  {
    title: 'Backend Developer',
    company: 'Sobiapi',
    start: '2025-08',
    end: '2025-10',
    description: 'Developed a real estate AI agent platform with n8n-driven automated workflows and real-time updates.',
    highlight: 'AI automation + workflow orchestration (n8n) for real estate operations',
    tech: ['Nest.js', 'Next.js', 'N8n'],
  },
  {
    title: 'Software Engineer',
    company: 'Apollo Digital Solutions',
    start: '2024-07',
    end: '2025-08',
    description: 'Designed and developed full SaaS applications with Stripe integrations and mentored engineering interns.',
    highlight: 'Stripe payments integration + end-to-end SaaS delivery and mentorship',
    tech: ['Laravel', 'Next.js', 'Stripe', 'Docker'],
  },
  {
    title: 'Software Engineer Intern',
    company: 'Sonelgaz',
    start: '2023-11',
    end: '2023-12',
    description: 'Process automation and infrastructure management.',
    highlight: '99.9% uptime maintenance & 100% workflow automation',
    tech: ['PHP', 'JavaScript'],
  },
]

const projects = [
  {
    title: 'AI Agent Platform',
    category: 'SAAS',
    description: 'Real estate automation SaaS with AI workflows, real-time updates, and automated task scheduling. Includes comprehensive dashboard and analytics.',
    link: 'https://github.com/Greghori101',
    tech: ['nestjs', 'nextjs', 'typescript', 'mongodb', 'websockets'],
    featured: true
  },
  {
    title: 'Property Management System',
    category: 'SAAS',
    description: 'Full-featured SaaS platform for property management with multi-tenant architecture, real-time notifications, and advanced reporting.',
    link: 'https://github.com/Greghori101',
    tech: ['laravel', 'nextjs', 'postgresql', 'docker', 'redis'],
    featured: true
  },
  {
    title: 'Analytics Dashboard',
    category: 'SAAS',
    description: 'Enterprise analytics SaaS with real-time data visualization, custom report generation, and predictive analytics powered by ML models.',
    link: 'https://github.com/Greghori101',
    tech: ['react', 'nodejs', 'fastapi', 'postgresql', 'tensorflow'],
    featured: true
  },
]

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Sticky Navigation Dots */}
      <motion.div
        className="block fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: scrolled ? 1 : 0, x: scrolled ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-4 px-4 py-7 bg-background/70 backdrop-blur-sm border border-border/60 rounded-full shadow-2xl hover:border-border transition-all duration-300">
          {navItems.map((item, idx) => (
            <motion.div
              key={item.href}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className="group relative w-3 h-3 rounded-full bg-accent/70 hover:bg-accent hover:scale-150 hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 flex items-center justify-center cursor-pointer"
                  >
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="left" sideOffset={12} className="bg-background/95 backdrop-blur-2xl border border-accent/40 text-accent font-bold uppercase tracking-widest text-xs">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </motion.div>
          ))}

          <div className="w-0.5 h-0.5 bg-accent/40 rounded-full mx-auto my-1" />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: navItems.length * 0.05 }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="https://github.com/Greghori101"
                  target="_blank"
                  className="group relative w-3 h-3 rounded-full bg-accent/70 hover:bg-accent hover:scale-150 hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 flex items-center justify-center cursor-pointer"
                >
                  <Github size={8} className="text-background opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="left" sideOffset={12} className="bg-background/95 backdrop-blur-2xl border border-accent/40 text-accent font-bold uppercase tracking-widest text-xs">
                GitHub
              </TooltipContent>
            </Tooltip>
          </motion.div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-32 pb-20 overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'linear-gradient(to right, var(--color-accent) 1px, transparent 1px), linear-gradient(to bottom, var(--color-accent) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(circle, transparent 0%, black 70%)'
          }} />
        </div>

        <div className="relative z-10 max-w-360 mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 w-fit"
            >
              <Zap size={14} className="text-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-accent">PhD Candidate in Quantum Computing</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl font-black uppercase leading-tight tracking-tight">
                Full-Stack Engineer & <br />
                <span className="bg-linear-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                  AI Systems Designer
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
            >
              Architecting scalable systems at the intersection of research and production. Specializing in quantum computing, AI integration, and distributed systems with language-agnostic expertise.
            </motion.p>

            {/* Stats and CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between pt-8"
            >
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-sm uppercase tracking-widest text-muted-foreground font-bold mb-2">Experience</p>
                  <p className="text-4xl font-black">3+</p>
                  <p className="text-xs text-muted-foreground">Years</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-muted-foreground font-bold mb-2">Projects</p>
                  <p className="text-4xl font-black">20+</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="#projects">
                  <Button className="rounded-full">
                    View My Work <ArrowUpRight size={16} className="ml-2" />
                  </Button>
                </Link>
                <Link href="mailto:e.souala@esi-sba.dz">
                  <Button variant="outline" className="rounded-full">
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-6 pt-12"
            >
              <Link href="https://github.com/Greghori101" target="_blank" className="text-muted-foreground hover:text-accent transition-colors">
                <Github size={24} />
              </Link>
              <Link href="https://www.linkedin.com/in/hoceyne/" target="_blank" className="text-muted-foreground hover:text-accent transition-colors">
                <Linkedin size={24} />
              </Link>
              <Link href="mailto:e.souala@esi-sba.dz" className="text-muted-foreground hover:text-accent transition-colors">
                <Mail size={24} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-360 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-16"
          >
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">About Me</span>
              <h2 className="text-5xl md:text-6xl font-black uppercase leading-tight">
                Bridging<br />Research &<br />Production
              </h2>
              <div className="w-12 h-1 bg-accent rounded-full" />
            </div>

            <div className="space-y-8 text-lg text-muted-foreground">
              <p className="text-foreground text-xl font-medium leading-relaxed">
                I&apos;m a full-stack software engineer with a language-agnostic architectural mindset, specializing in solving complex problems through clean, production-ready code.
              </p>

              <p>
                Currently pursuing a PhD in Quantum Computing at USTHB while working on cutting-edge technologies. My expertise spans deep learning, distributed systems, blockchain technology, and cloud infrastructure.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-border">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3">Location</p>
                  <p className="text-lg font-black text-foreground uppercase">Algiers, Algeria</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3">Status</p>
                  <p className="text-lg font-black text-foreground uppercase">PhD • USTHB</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 overflow-hidden">
        <div className="max-w-360 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4 mb-20"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Featured Projects</span>
            <h2 className="text-5xl md:text-6xl font-black uppercase leading-tight">
              Selected<br />Works & Research
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative flex flex-col h-full bg-card border border-border hover:border-accent/50 p-8 transition-all duration-500 overflow-hidden"
              >
                <Link href={project.link} target="_blank" className="flex flex-col h-full">
                  <div className="space-y-4 grow">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold uppercase tracking-widest text-accent">{project.category}</span>
                      <ArrowUpRight className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" size={20} />
                    </div>

                    <h3 className="text-2xl font-black uppercase tracking-tight leading-tight group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack - Overlapping Circle Icons */}
                  <div className="mt-8 pt-8 border-t border-border">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-4">Technologies</p>
                    <div className="relative h-14 flex items-center">
                      {project.tech.slice(0, 4).map((t, idx) => (
                        <div
                          key={idx}
                          className="group/tech absolute w-12 h-12 rounded-full bg-accent/10 border-2 border-card hover:border-accent hover:bg-accent/20 transition-all duration-300 flex items-center justify-center cursor-help hover:z-10 hover:scale-125 hover:shadow-lg hover:shadow-accent/30"
                          style={{ left: `${idx * 2.5}rem` }}
                          title={t}
                        >
                          <img
                            src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${t.toLowerCase().replace('.', '')}/${t.toLowerCase().replace('.', '')}-original.svg`}
                            alt={t}
                            className="w-6 h-6 object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              if (target.src.includes('-original')) {
                                target.src = target.src.replace('-original', '-plain');
                              }
                            }}
                          />
                          <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs px-2 py-1 bg-card border border-border rounded opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-20">
                            {t}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link href="https://github.com/Greghori101" target="_blank" className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-accent transition-colors">
              View All Projects <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6 overflow-hidden border-t border-border">
        <div className="max-w-360 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4 mb-20"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Professional Journey</span>
            <h2 className="text-5xl md:text-6xl font-black uppercase leading-tight">
              Work<br />Experience
            </h2>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-20 pb-20 border-b border-border"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-8">Core Technologies</p>
            <TechLogos />
          </motion.div>

          {/* Experience Timeline */}
          <div className="space-y-4">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group grid md:grid-cols-4 gap-6 py-6 sm:py-8 px-4 sm:px-6 rounded-lg border border-border hover:border-accent/50 bg-card hover:bg-secondary transition-all duration-300"
              >
                <div>
                  <p className="hidden md:block text-xs uppercase tracking-widest text-muted-foreground font-bold">
                    {formatDateRange(exp.start, exp.end)}
                  </p>
                </div>

                <div className="md:col-span-2 space-y-3">
                  <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-accent transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-semibold">
                    {exp.company}
                    <span className="md:hidden"> • {formatDateRange(exp.start, exp.end)}</span>
                  </p>
                  <p className="text-xs text-accent font-bold">{exp.highlight}</p>
                </div>

                <div className="flex justify-end md:justify-end md:items-start pt-0 md:pt-0">
                  <ArrowUpRight className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" size={20} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-32 px-6 overflow-hidden border-t border-border">
        <div className="max-w-360 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-16"
          >
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Research & Education</span>
              <h2 className="text-5xl md:text-6xl font-black uppercase leading-tight">
                Academic<br />Expertise
              </h2>
              <div className="w-12 h-1 bg-accent rounded-full" />
            </div>

            <div className="space-y-8 text-lg text-muted-foreground">
              <div>
                <h3 className="text-2xl font-black text-foreground mb-3">PhD in Quantum Computing</h3>
                <p className="text-foreground font-semibold mb-2">USTHB University • 2025-2029</p>
                <p className="leading-relaxed">
                  Thesis: <span className="text-accent font-semibold">Quantum-Safe Blockchain and Distributed Ledger Technologies</span>. Researching post-quantum cryptography and the intersection of quantum computing with blockchain security.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-foreground mb-3">Master&apos;s in Computer Science</h3>
                <p className="text-foreground font-semibold mb-2">ESI-SBA University • 2019-2024</p>
                <p className="leading-relaxed">
                  Thesis: <span className="text-accent font-semibold">Real-time Autospares Detection using Deep Learning</span>. Developed CNN models for real-time object detection in automotive applications.
                </p>
              </div>

              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Combining academic rigor with practical engineering, focused on making quantum-safe systems production-ready and accessible.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-border overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-360 mx-auto text-center space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight">
            Got a project in mind?<br />
            <span className="text-accent">Let&apos;s build something great</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether it&apos;s a quantum-safe system, AI integration, or scalable architecture, I&apos;m ready to turn ideas into production-ready solutions.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
            <Link href="mailto:e.souala@esi-sba.dz">
              <Button size="lg" className="rounded-full">
                Start a Conversation
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/hoceyne/" target="_blank">
              <Button size="lg" variant="outline" className="rounded-full">
                Connect on LinkedIn
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border overflow-hidden">
        <div className="max-w-360 mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-black uppercase">Souala<span className="text-accent">.</span></h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Full-stack engineer building scalable systems at the intersection of AI and quantum computing research.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Navigation</p>
                <div className="flex flex-col gap-3 text-sm">
                  {navItems.map(item => (
                    <Link key={item.href} href={item.href} className="hover:text-accent transition-colors">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Social</p>
                <div className="flex flex-col gap-3 text-sm">
                  <Link href="https://github.com/Greghori101" target="_blank" className="hover:text-accent transition-colors">
                    GitHub
                  </Link>
                  <Link href="https://www.linkedin.com/in/hoceyne/" target="_blank" className="hover:text-accent transition-colors">
                    LinkedIn
                  </Link>
                  <Link href="mailto:e.souala@esi-sba.dz" className="hover:text-accent transition-colors">
                    Email
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Contact</p>
                <div className="flex flex-col gap-3 text-sm">
                  <a href="mailto:e.souala@esi-sba.dz" className="hover:text-accent transition-colors">
                    e.souala@esi-sba.dz
                  </a>
                  <a href="tel:+213674680780" className="hover:text-accent transition-colors">
                    +213 67 468 0780
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">© 2026 Souala Elhoussine. All rights reserved.</p>
            <p className="text-xs text-muted-foreground">Built with React, Next.js & Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </>
  )
}
