'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ArrowUpRight, Github, Linkedin, Mail, Zap } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { TechLogos } from '@/components/tech-logos'

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
    title: 'Quantum-Safe Blockchain',
    category: 'PHD RESEARCH',
    description: 'Thesis on quantum-resistant cryptography for distributed ledgers.',
    image: '/placeholder.jpg',
    link: 'https://github.com/Greghori101',
    tech: ['python', 'docker', 'kubernetes', 'postgresql'],
    featured: true
  },
  {
    title: 'AI Agent Platform',
    category: 'FULL STACK',
    description: 'Real estate automation with AI workflows and real-time updates.',
    image: '/placeholder-user.jpg',
    link: 'https://github.com/Greghori101',
    tech: ['nestjs', 'nextjs', 'typescript', 'mongodb'],
    featured: true
  },
  {
    title: 'Autospares Detection',
    category: 'DEEP LEARNING',
    description: 'Real-time computer vision for automotive parts recognition.',
    image: '/placeholder.jpg',
    link: 'https://github.com/Greghori101',
    tech: ['python', 'tensorflow', 'pytorch', 'docker'],
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
    <div className="bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-background/95 backdrop-blur-xl border-b border-border' : 'bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black uppercase tracking-tighter">
            Houssine<span className="text-accent">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <Link key={item.href} href={item.href} className="text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="https://github.com/Greghori101" target="_blank">
              <Button variant="outline" size="sm" className="rounded-full hidden md:flex">
                <Github size={16} className="mr-2" /> GitHub
              </Button>
            </Link>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

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

          <div className="grid md:grid-cols-2 gap-6">
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
                  {/* Image */}
                  <div className="relative aspect-[16/10] mb-6 overflow-hidden rounded-lg -mx-8 -mt-8 mb-8 group-hover:shadow-xl group-hover:shadow-accent/10 transition-all duration-500">
                    <Image
                      src={project.image}
                      alt={`${project.title} cover`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

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

                  {/* Tech Stack */}
                  <div className="mt-8 pt-8 border-t border-border flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium uppercase tracking-wider">
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium">
                          +{project.tech.length - 3}
                        </span>
                      )}
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
