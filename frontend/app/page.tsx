'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Github, Linkedin, Mail, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import NavigationDots from '@/components/navigation-dots'
import Image from 'next/image'
import { portfolioApi, type EducationData, type ExperienceData, type PublicationData, type ProjectData } from '@/lib/api'
import { techIcons } from '@/techIcons'


const navItems = [
  { label: 'Home', href: '/#home' },
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

function parseTimelineDate(value: string | undefined | null) {
  if (!value || !value.trim()) return 0
  const trimmed = value.trim()
  const yearMonth = trimmed.match(/^(\d{4})[-/.](\d{1,2})/) ?? trimmed.match(/^(\d{4})\b/)
  if (!yearMonth) return 0
  const year = Number(yearMonth[1])
  const month = yearMonth[2] ? Number(yearMonth[2]) - 1 : 0
  return new Date(year, month, 1).getTime()
}

function sortByStartDate<T extends { start?: string | null }>(items: T[]) {
  return [...items].sort((a, b) => parseTimelineDate(b.start) - parseTimelineDate(a.start))
}

function sortPublicationsByYear(items: PublicationData[]) {
  return [...items].sort((a, b) => parseTimelineDate(b.publication) - parseTimelineDate(a.publication))
}

// Portfolio data is loaded from the backend via `portfolioApi` in the component below.

export default function Portfolio() {
  const [experiences, setExperiences] = useState<ExperienceData[]>([])
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [educations, setEducations] = useState<EducationData[]>([])
  const [publications, setPublications] = useState<PublicationData[]>([])

  useEffect(() => {
    Promise.all([
      portfolioApi.experiences(),
      portfolioApi.projects(),
      portfolioApi.educations(),
      portfolioApi.publications(),
    ]).then(([experiencesRes, projectsRes, educationsRes, publicationsRes]) => {
      if (experiencesRes.data?.experiences) setExperiences(sortByStartDate(experiencesRes.data.experiences))
      if (projectsRes.data?.projects) setProjects(projectsRes.data.projects)
      if (educationsRes.data?.educations) setEducations(sortByStartDate(educationsRes.data.educations))
      if (publicationsRes.data?.publications) setPublications(sortPublicationsByYear(publicationsRes.data.publications))
    })
  }, [])

  const featuredProjects = projects.filter((project) => project.featured)
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects

  return (
    <>
      <NavigationDots />

      {/* Hero Section */}
      <section id="home" className="relative flex flex-col justify-center px-6 pt-32 pb-20 overflow-hidden">
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
                I&apos;m Souala Elhoussine — a Computer Systems Engineer and PhD researcher in Quantum Computing. I build production-ready systems and conduct research on quantum-safe distributed technologies.
              </p>

              <p>
                For the full academic and professional journey (education, internships, projects, and research activities), <a href="/bio" className="text-accent font-semibold hover:underline">read the complete biography</a>.
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
            {displayProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative flex flex-col h-full bg-card border border-border hover:border-accent/50 p-8 transition-all duration-500 overflow-hidden"
              >
                <Link href={project.link ?? '#'} target={project.link ? '_blank' : undefined} className="flex flex-col h-full">
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
                      {Array.from(
                        new Map(
                          (project.tech ?? [])
                            .filter(t => techIcons[t])
                            .map(t => [techIcons[t], t]) // key = icon path
                        ).values()
                      ).slice(0, 5).map((t, idx) => (
                        <div
                          key={idx}
                          className="group/tech absolute w-12 h-12 rounded-full bg-accent/10 border-2 border-card hover:border-accent hover:bg-accent/20 transition-all duration-300 flex items-center justify-center cursor-help hover:z-10 hover:scale-125 hover:shadow-lg hover:shadow-accent/30"
                          style={{ left: `${idx * 2.5}rem` }}
                          title={t}
                        >
                          <Image
                            src={techIcons[t] ?? "/images/tech/default.png"}
                            alt={t}
                            width={24}
                            height={24}
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
            className="grid md:grid-cols-3 gap-16"
          >
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Research & Education</span>
              <h2 className="text-5xl md:text-6xl font-black uppercase leading-tight">
                Academic<br />Expertise
              </h2>
              <div className="w-12 h-1 bg-accent rounded-full" />
            </div>

            <div className="space-y-8 text-lg text-muted-foreground col-span-2">
              {educations.map((content, key) => {
                return (
                  <div key={key}>
                    <h3 className="text-2xl font-black text-foreground mb-3">{content.title}</h3>
                    <p className="text-foreground font-semibold mb-2">{content.institution} • {content.start}-{content.end}</p>
                    <span className="text-accent font-semibold">{content.thesis}</span>
                    <p className="leading-relaxed"> {content.details}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>
          <div className="mt-12 pt-8 border-t border-border"></div>
          <h2 className="text-3xl font-black uppercase leading-tight mb-6">Selected Publications</h2>
          <div className="grid gap-6">
            {publications.map((paper) => (
              <article key={paper.id} className="overflow-hidden rounded-3xl border border-border bg-surface/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">{paper.title}</h3>
                  <p className="text-sm font-medium text-muted-foreground">{paper.authors}</p>
                  <p className="leading-relaxed text-foreground">{paper.publication}</p>
                  {paper.link && (
                    <Link href={paper.link} target="_blank" className="text-accent hover:underline text-sm font-semibold">
                      View publication
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
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
          </div>
        </div>
      </footer>
    </>
  )
}
