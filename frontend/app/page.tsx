'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { TechLogos } from '@/components/tech-logos'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
]

const experiences = [
  {
    title: 'Software Engineer',
    company: 'Sobiapi',
    period: '2025',
    description: 'Built AI agent platform with automated workflows. Improved productivity by 40%.',
    tech: ['Nest.js', 'Next.js', 'N8n'],
  },
  {
    title: 'Software Engineer',
    company: 'Apollo Digital Solutions',
    period: '2024 – 2025',
    description: 'Designed three SaaS platforms. Reduced load times by 45% using SSR/ISR.',
    tech: ['Laravel', 'Next.js', 'Docker'],
  },
]

const projects = [
  {
    title: 'Quantum-Safe Blockchain',
    category: 'PHD RESEARCH',
    description: 'Thesis project on quantum-safe blockchain and distributed ledger technologies.',
    image: '/placeholder.jpg',
    link: 'https://github.com/Greghori101',
    tech: ['python', 'docker', 'kubernetes', 'postgresql']
  },
  {
    title: 'AI Agent Platform',
    category: 'FULL STACK',
    description: 'Automated workflows and real-time statistics for real estate.',
    image: '/placeholder-user.jpg',
    link: 'https://github.com/Greghori101',
    tech: ['nestjs', 'nextjs', 'typescript', 'mongodb']
  },
  {
    title: 'Autospares Detection',
    category: 'MACHINE LEARNING',
    description: 'Computer vision for real-time object detection in autospares.',
    image: '/placeholder.jpg',
    link: 'https://github.com/Greghori101',
    tech: ['python', 'tensorflow', 'pytorch', 'docker']
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
    <div className="bg-background text-foreground">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black uppercase tracking-tighter">
            Houssine<span className="text-accent">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {navItems.map(item => (
              <Link key={item.href} href={item.href} className="text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors">
                {item.label}
              </Link>
            ))}
            <div className="flex gap-4">
              <Link href="https://github.com/Greghori101" target="_blank">
                <Button variant="outline" size="sm" className="rounded-full px-4 font-bold uppercase text-[10px] tracking-widest border-2">
                  <Github size={14} className="mr-2" /> GitHub
                </Button>
              </Link>
              <Link href="https://www.linkedin.com/in/hoceyne/" target="_blank">
                <Button size="sm" className="rounded-full px-4 font-bold uppercase text-[10px] tracking-widest">
                  <Linkedin size={14} className="mr-2" /> LinkedIn
                </Button>
              </Link>
            </div>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20 overflow-hidden bg-white">
        {/* Subtle Background Elements to fill "empty" space */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center md:items-start space-y-8"
          >
            <div className="overflow-hidden w-full">
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-wrap justify-center md:justify-start gap-6 text-[4vw] md:text-[5vw] font-black uppercase tracking-[0.2em] text-accent w-full leading-none opacity-80"
              >
                <span>PHD CANDIDATE & SOFTWARE ENGINEER</span>
              </motion.div>
            </div>
            
            <div className="w-full">
              <h1 className="text-[18vw] md:text-[22vw] leading-[0.75] font-black text-mask text-center md:text-left py-10 uppercase tracking-tighter" style={{ backgroundImage: 'url(/text-mask.png)' }}>
                SOUALA<br />ELHOUSSINE
              </h1>
            </div>
            
            <div className="w-full flex flex-col md:flex-row gap-12 items-center md:items-end justify-between mt-12">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left max-w-2xl">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-xl md:text-3xl font-medium leading-tight text-neutral-900 tracking-tight"
                >
                  Engineering scalable solutions with a language-agnostic mindset. Bridging the gap between academic research and production-ready systems.
                </motion.p>
              </div>

              <div className="flex flex-col items-center md:items-end gap-6 shrink-0">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center md:items-end p-2 text-primary">
                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Experience</p>
                    <p className="text-3xl font-black">3+ YEARS</p>
                  </div>
                  <div className="w-px h-12 bg-neutral-100 hidden md:block" />
                  <div className="flex flex-col items-center md:items-end p-2 text-primary">
                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Projects</p>
                    <p className="text-3xl font-black">20+</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <Link href="https://github.com/Greghori101" target="_blank" className="text-primary hover:text-accent transition-colors"><Github size={28} /></Link>
                  <Link href="https://www.linkedin.com/in/hoceyne/" target="_blank" className="text-primary hover:text-accent transition-colors"><Linkedin size={28} /></Link>
                  <Link href="mailto:e.souala@esi-sba.dz" className="text-primary hover:text-accent transition-colors"><Mail size={28} /></Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section - Black with Background Info */}
      <section id="about" className="relative section-black py-40 px-6 mt-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay grayscale" 
             style={{ backgroundImage: 'url(/placeholder.jpg)' }} />
        
        <div className="relative z-10 max-w-[1400px] mx-auto grid md:grid-cols-2 gap-20">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">THE INDIVIDUAL</span>
            <h2 className="text-6xl md:text-8xl font-black uppercase leading-none">THE<br />ENGINEER</h2>
          </div>
          <div className="space-y-8 text-xl text-neutral-400">
            <p className="text-white text-3xl font-medium leading-tight">
              I approach development with a language-agnostic, architectural mindset, prioritizing problem-solving and clean production pipelines.
            </p>
            <p>
              Currently researching quantum-safe blockchain at USTHB. My expertise spans from deep learning models to large-scale microservices, ensuring every line of code serves a purpose.
            </p>
            <div className="pt-12 border-t border-white/10 grid grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4 font-bold">Location</p>
                <p className="text-white font-black uppercase tracking-tighter text-2xl">Algiers, AL</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4 font-bold">Research</p>
                <p className="text-white font-black uppercase tracking-tighter text-2xl">PhD • USTHB</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Card Layout */}
      <section id="projects" className="py-40 px-6 section-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">PORTFOLIO</span>
              <h2 className="text-5xl md:text-7xl font-black uppercase leading-none">Selected<br />Works</h2>
            </div>
            <Link href="https://github.com/Greghori101" target="_blank" className="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest uppercase hover:text-accent transition-colors">
              View All Projects <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {projects.map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative flex flex-col bg-neutral-50 border border-neutral-100 p-8 hover:bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-neutral-200/50"
              >
                <Link href={project.link} target="_blank" className="block w-full">
                  <div className="relative aspect-[16/10] mb-8 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                    <Image
                      src={project.image}
                      alt={`${project.title} cover`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  <div className="space-y-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-black uppercase tracking-widest text-accent">{project.category}</span>
                      <ArrowUpRight className="text-neutral-300 group-hover:text-accent transition-colors" size={24} />
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-neutral-500 leading-snug">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-8 border-t border-neutral-100 flex items-center justify-between">
                    <div className="flex -space-x-3">
                      {project.tech.map((t, idx) => (
                        <div key={idx} className="w-10 h-10 rounded-full bg-white border border-neutral-200 p-2 flex items-center justify-center hover:z-20 hover:scale-125 hover:border-accent transition-all duration-300">
                          <img 
                            src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${t}/${t}-original.svg`} 
                            alt={t}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              if (target.src.includes('-original')) {
                                target.src = target.src.replace('-original', '-plain');
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">View Project</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services/Expeience - Structured */}
      <section id="experience" className="section-black py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-20 text-center">Tech<br />Stack</h2>
          <TechLogos />
          
          <div className="mt-32 space-y-px bg-white/10">
            {experiences.map((exp, i) => (
              <div key={i} className="group grid md:grid-cols-4 gap-8 py-12 items-center bg-black hover:bg-neutral-900 transition-colors px-8 border-b border-white/10">
                <span className="text-xs text-neutral-500 font-bold uppercase">{exp.period}</span>
                <h3 className="text-2xl font-bold uppercase md:col-span-2 group-hover:text-accent transition-colors">{exp.title} @ {exp.company}</h3>
                <div className="flex md:justify-end">
                  <ArrowUpRight className="text-neutral-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-neutral-100 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-20">
            <div className="space-y-12">
              <h2 className="text-6xl md:text-[8vw] font-black uppercase tracking-tighter leading-none">
                BUILD<br />THINGS<span className="text-accent">.</span>
              </h2>
              <div className="flex gap-8">
                <Link href="mailto:e.souala@esi-sba.dz" className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <Mail size={16} /> Email
                </Link>
                <Link href="https://www.linkedin.com/in/hoceyne/" target="_blank" className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <Linkedin size={16} /> LinkedIn
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-widest text-neutral-400">Links</p>
                <div className="flex flex-col gap-4 text-sm font-bold uppercase font-mono">
                   {navItems.map(item => (
                    <Link key={item.href} href={item.href} className="hover:text-accent">{item.label}</Link>
                   ))}
                </div>
              </div>
              <div className="space-y-6 text-right">
                <p className="text-xs uppercase tracking-widest text-neutral-400">Social</p>
                <div className="flex flex-col gap-4 text-sm font-bold uppercase font-mono">
                  <Link href="https://github.com/Greghori101" target="_blank" className="hover:text-accent">GitHub</Link>
                  <Link href="https://www.linkedin.com/in/hoceyne/" target="_blank" className="hover:text-accent">LinkedIn</Link>
                  <Link href="mailto:e.souala@esi-sba.dz" className="hover:text-accent">Email</Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Massive Watermark */}
          <div className="mt-40 pointer-events-none select-none">
            <h2 className="text-[10vw] font-black uppercase leading-none text-neutral-100 -mb-[5vw] transition-all">
              HOUSSINE
            </h2>
          </div>
        </div>
      </footer>
    </div>
  )
}
