'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ArrowUpRight, Github, Linkedin, Mail, Zap, Dot } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { TechLogos } from '@/components/tech-logos'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
]

const experiences = [
  {
    title: 'Software Engineer',
    company: 'Sobiapi',
    period: '2025',
    description: 'Built AI agent platform with automated workflows. Improved productivity by 40%.',
    highlight: 'Real-time WebSocket communication & AI automation',
    tech: ['Nest.js', 'Next.js', 'N8n'],
  },
  {
    title: 'Software Engineer',
    company: 'Apollo Digital Solutions',
    period: '2024 – 2025',
    description: 'Designed three SaaS platforms. Reduced load times by 45% using SSR/ISR.',
    highlight: '45% frontend performance improvement via advanced caching',
    tech: ['Laravel', 'Next.js', 'Docker'],
  },
  {
    title: 'Software Engineer Intern',
    company: 'Sonelgaz',
    period: '2023',
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
  const [navOpen, setNavOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-50 px-6 py-4"
        initial={{ opacity: 1 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        pointerEvents={scrolled ? 'none' : 'auto'}
      >
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-black uppercase tracking-tighter">
            Houssine<span className="text-accent">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Link href="https://github.com/Greghori101" target="_blank">
              <Button variant="outline" size="sm" className="rounded-full">
                <Github size={16} className="mr-2" /> GitHub
              </Button>
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Sticky Navigation Dots with Popover */}
      <motion.div 
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: scrolled ? 1 : 0, x: scrolled ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <Popover open={navOpen} onOpenChange={setNavOpen}>
          <PopoverTrigger asChild>
            <button className="group flex flex-col items-center gap-2 focus:outline-none">
              <div className="flex flex-col gap-3 px-3 py-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.href}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="w-2 h-2 rounded-full bg-accent/60 hover:bg-accent group-hover:bg-accent transition-colors duration-300"
                  />
                ))}
              </div>
            </button>
          </PopoverTrigger>
          
          <PopoverContent 
            className="w-64 bg-background/95 backdrop-blur-2xl border border-accent/20 rounded-xl shadow-2xl p-0"
            side="left"
            align="center"
          >
            <div className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setNavOpen(false)}
                  className="group px-4 py-3 rounded-lg hover:bg-accent/10 transition-colors duration-300 flex items-center justify-between"
                >
                  <span className="text-sm font-bold uppercase tracking-widest text-foreground group-hover:text-accent transition-colors">
                    {item.label}
                  </span>
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"
                    layoutId="navIndicator"
                  />
                </Link>
              ))}
              <div className="border-t border-border my-2" />
              <Link
                href="https://github.com/Greghori101"
                target="_blank"
                onClick={() => setNavOpen(false)}
                className="group px-4 py-3 rounded-lg hover:bg-accent/10 transition-colors duration-300 flex items-center justify-between"
              >
                <span className="text-sm font-bold uppercase tracking-widest text-foreground group-hover:text-accent transition-colors">
                  GitHub
                </span>
                <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-accent transition-colors" />
              </Link>
            </div>
          </PopoverContent>
        </Popover>
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
        
        <div className="relative z-10 max-w-[1400px] mx-auto w-full">
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
                <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
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
        <div className="max-w-[1400px] mx-auto">
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
                I'm a full-stack software engineer with a language-agnostic architectural mindset, specializing in solving complex problems through clean, production-ready code.
              </p>

              <p>
                Currently pursuing a PhD in Quantum Computing at USTHB while working on cutting-edge technologies. My expertise spans deep learning, distributed systems, blockchain technology, and cloud infrastructure.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border">
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
        <div className="max-w-[1400px] mx-auto">
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
                  <div className="space-y-4 flex-grow">
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

                  {/* Tech Stack - Circle Icons */}
                  <div className="mt-8 pt-8 border-t border-border">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-4">Technologies</p>
                    <div className="flex flex-wrap gap-4">
                      {project.tech.map((t, idx) => (
                        <div 
                          key={idx} 
                          className="group/tech relative w-10 h-10 rounded-full bg-accent/10 border border-accent/30 hover:border-accent hover:bg-accent/20 transition-all duration-300 flex items-center justify-center cursor-help"
                          title={t}
                        >
                          <img 
                            src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${t.toLowerCase().replace('.', '')}/${t.toLowerCase().replace('.', '')}-original.svg`} 
                            alt={t}
                            className="w-5 h-5 object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              if (target.src.includes('-original')) {
                                target.src = target.src.replace('-original', '-plain');
                              }
                            }}
                          />
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs px-2 py-1 bg-card border border-border rounded opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
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
        <div className="max-w-[1400px] mx-auto">
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
                className="group grid md:grid-cols-4 gap-6 py-8 px-6 rounded-lg border border-border hover:border-accent/50 bg-card hover:bg-secondary transition-all duration-300"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{exp.period}</p>
                </div>

                <div className="md:col-span-2 space-y-3">
                  <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-accent transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-semibold">{exp.company}</p>
                  <p className="text-xs text-accent font-bold">{exp.highlight}</p>
                </div>

                <div className="flex md:justify-end pt-4 md:pt-0">
                  <ArrowUpRight className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" size={20} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-32 px-6 overflow-hidden border-t border-border">
        <div className="max-w-[1400px] mx-auto">
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
                <h3 className="text-2xl font-black text-foreground mb-3">Master's in Computer Science</h3>
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
          className="max-w-[1400px] mx-auto text-center space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight">
            Got a project in mind?<br />
            <span className="text-accent">Let's build something great</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether it's a quantum-safe system, AI integration, or scalable architecture, I'm ready to turn ideas into production-ready solutions.
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
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-black uppercase">Souala<span className="text-accent">.</span></h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Full-stack engineer building scalable systems at the intersection of AI and quantum computing research.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-8">
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
    </div>
  )
}
