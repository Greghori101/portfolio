'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CardCarousel } from '@/components/card-carousel'
import { GeometricBackground } from '@/components/geometric-background'
import { TechLogos } from '@/components/tech-logos'

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
]

const skills = {
  'AI & Machine Learning': ['TensorFlow', 'PyTorch', 'LangChain', 'OpenAI API', 'Deep Learning', 'CNN Models'],
  'Backend': ['Node.js (Nest.js)', 'Python (FastAPI, Django)', 'PHP (Laravel)', 'REST APIs', 'Microservices'],
  'Frontend': ['React', 'Next.js', 'Vue 3', 'TypeScript', 'Tailwind CSS'],
  'DevOps & Cloud': ['Docker', 'Kubernetes', 'AWS (EC2, Lambda, S3)', 'GitHub Actions', 'Terraform', 'CI/CD'],
  'Core': ['System Design', 'Clean Architecture', 'SOLID Principles', 'Database Optimization', 'Algorithms'],
}

const experiences = [
  {
    title: 'Software Engineer',
    company: 'Sobiapi',
    period: 'Aug 2025 – Oct 2025',
    description: 'Built AI agent platform with automated workflows and real-time WebSocket communication. Improved agent productivity by 40% through property statistics and workflow automation.',
    tech: ['Nest.js', 'Next.js', 'N8n', 'WebSockets'],
  },
  {
    title: 'Software Engineer',
    company: 'Apollo Digital Solutions',
    period: 'Jul 2024 – Aug 2025',
    description: 'Designed three SaaS platforms focusing on backend scalability. Reduced frontend load times by 45% with SSR/ISR. Engineered modular REST APIs with 300ms response time.',
    tech: ['Laravel', 'Next.js', 'Docker', 'GitHub Actions'],
  },
  {
    title: 'Software Engineer Intern',
    company: 'Sonelgaz',
    period: 'Dec 2023',
    description: 'Developed order-management system handling ~100 daily orders. Automated 100% of manual workflows. Maintained network infrastructure with 99.9% uptime.',
    tech: ['PHP', 'JavaScript', 'Infrastructure'],
  },
]

const projects = [
  {
    title: 'Quantum-Safe Blockchain',
    description: 'PhD thesis project on quantum-safe blockchain and distributed ledger technologies',
    tech: ['Quantum Computing', 'Blockchain', 'Cryptography'],
    link: 'https://github.com/Greghori101',
  },
  {
    title: 'Real-time Autospares Detection',
    description: 'Master\'s thesis using deep learning for real-time object detection in autospares',
    tech: ['Deep Learning', 'CNN', 'TensorFlow', 'Computer Vision'],
    link: 'https://github.com/Greghori101',
  },
  {
    title: 'AI Agent Platform',
    description: 'Real-estate AI agent platform with automated workflows and real-time statistics',
    tech: ['Nest.js', 'Next.js', 'N8n', 'WebSockets'],
    link: 'https://github.com/Greghori101',
  },
]

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SE
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex gap-4">
              <Link href="https://github.com/Greghori101" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">GitHub</Button>
              </Link>
              <Link href="https://www.linkedin.com/in/hoceyne/" target="_blank" rel="noopener noreferrer">
                <Button size="sm">LinkedIn</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-4">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex gap-4 pt-4">
                <Link href="https://github.com/Greghori101" target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">GitHub</Button>
                </Link>
                <Link href="https://www.linkedin.com/in/hoceyne/" target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button size="sm" className="w-full">LinkedIn</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-primary font-semibold">Welcome to my portfolio</p>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight text-balance">
                  Souala Elhoussine
                </h1>
                <p className="text-2xl text-muted-foreground">PhD Candidate in Quantum Computing</p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Full-stack research engineer specializing in scalable system design and AI integration. Proven track record of taking projects from UML proof-of-concept to production deployment with a focus on clean architecture and performance optimization.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#experience">
                  <Button size="lg" className="w-full sm:w-auto">Explore My Work</Button>
                </Link>
                <Link href="https://www.linkedin.com/in/hoceyne/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">Get in Touch</Button>
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex gap-6 pt-4">
                <Link href="https://github.com/Greghori101" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <span className="text-2xl">⚙️</span>
                </Link>
                <Link href="https://www.linkedin.com/in/hoceyne/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <span className="text-2xl">💼</span>
                </Link>
              </div>
            </div>

            {/* Right Column - Profile Image */}
            <div className="hidden md:flex justify-center">
              <div className="relative w-72 h-72 rounded-2xl overflow-hidden border-2 border-primary/30 hover:border-primary/60 transition-colors duration-300 shadow-2xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design-HGcceKtzjg3zcrdxwXyAXRPYgXERkX.png"
                  alt="Souala Elhoussine"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                I approach development with a language-agnostic, architectural mindset, prioritizing problem-solving, database optimization, and clean production pipelines over framework loyalty. My expertise spans from quantum computing research to full-stack application development.
              </p>
              <p className="text-lg leading-relaxed">
                <strong className="text-foreground">Currently:</strong> PhD Candidate at USTHB, researching quantum-safe blockchain and distributed ledger technologies.
              </p>
              <p className="text-lg leading-relaxed">
                <strong className="text-foreground">Background:</strong> Master's in Computer Science from ESI-SBA with a thesis on real-time autospares detection using deep learning. 3+ years of professional software engineering experience.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Education</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">PhD, Quantum Computing</strong><br />
                    USTHB, Algeria (Nov 2025 – Oct 2029)
                  </p>
                  <p>
                    <strong className="text-foreground">Master's, Computer Science</strong><br />
                    ESI-SBA, Algeria (Sep 2019 – Oct 2024)
                  </p>
                </div>
              </div>
              <div className="h-px bg-border" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Contact</h3>
                <p className="text-muted-foreground">
                  <a href="mailto:e.souala@esi-sba.dz" className="text-primary hover:underline">e.souala@esi-sba.dz</a><br />
                  <a href="tel:+213674680780" className="text-primary hover:underline">+213 674 680 780</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="bg-background border border-border rounded-2xl p-8 hover:border-primary/50 transition-colors duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold">{exp.title}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                </div>
                <p className="text-muted-foreground mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-border overflow-hidden">
        <GeometricBackground />
        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Featured Projects</h2>
          <CardCarousel className="py-8">
            {projects.map((project, idx) => (
              <Link href={project.link} target="_blank" rel="noopener noreferrer" key={idx} className="w-full h-full block pointer-events-auto">
                <div className="bg-card border border-border rounded-2xl p-8 h-full hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-6 flex-grow">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Skills & Technologies</h2>

          {/* Skill Categories Carousel */}
          <CardCarousel className="py-8 mb-16">
            {Object.entries(skills).map(([category, items], idx) => (
              <div key={idx} className="bg-background border border-border rounded-2xl p-8 h-full w-full">
                <h3 className="text-lg font-semibold mb-4 text-primary">{category}</h3>
                <div className="space-y-2">
                  {items.map((skill, i) => (
                    <p key={i} className="text-muted-foreground flex items-center">
                      <span className="text-primary mr-2">▹</span>
                      {skill}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </CardCarousel>

          {/* Tech Logos - Official Logos */}
          <div className="py-8">
            <h3 className="text-2xl font-semibold mb-8 text-primary">Official Tech Stack</h3>
            <TechLogos />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-gradient-to-r from-primary/10 via-background to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to collaborate?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            I'm always interested in innovative projects and opportunities. Let's build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://www.linkedin.com/in/hoceyne/" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto">Connect on LinkedIn</Button>
            </Link>
            <Link href="https://github.com/Greghori101" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">View GitHub</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-muted-foreground">
                {navItems.map(item => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-foreground transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="https://github.com/Greghori101" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com/in/hoceyne/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <a href="mailto:e.souala@esi-sba.dz" className="hover:text-foreground transition-colors">
                    Email
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <p className="text-sm text-muted-foreground">
                PhD Candidate in Quantum Computing specializing in full-stack development and AI integration.
              </p>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2024 Souala Elhoussine. All rights reserved.</p>
            <p>Built with React, Next.js, and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
