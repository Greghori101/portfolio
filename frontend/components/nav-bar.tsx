'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X, Github, Mail, Linkedin } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

const navItems = [
    { label: 'Home', href: '/#home' },
    { label: 'About', href: '/#about' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Research', href: '/#research' },
    { label: 'Blogs', href: '/blogs' },
]

export default function NavBar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <motion.nav
                className="sticky top-0 w-full z-50 px-6 py-4"
                initial={{ opacity: 1 }}
                animate={{ opacity: scrolled ? 0 : 1 }}
                transition={{ duration: 0.5 }}
                style={{ pointerEvents: scrolled ? 'none' : 'auto' }}
            >
                <div className="max-w-350 mx-auto flex justify-between gap-4">
                    <Link href="/" className="text-2xl font-black uppercase tracking-tighter">
                        SOUALA<span className="text-accent">.</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        <Link href="https://github.com/Greghori101" target="_blank">
                            <Button variant="outline" size="sm" className="rounded-full">
                                <Github size={16} className="mr-2" /> GitHub
                            </Button>
                        </Link>
                    </div>
                    <div className='grow md:hidden'></div>
                    <div className="md:hidden flex items-center"  >
                        <ThemeToggle />
                    </div>

                    <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            <AnimatePresence>
                {mobileMenuOpen ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl md:hidden"
                    >
                        <div className="px-6 py-4">
                            <div className="flex items-center justify-between">
                                <Link
                                    href="/"
                                    className="text-2xl font-black uppercase tracking-tighter"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    SOUALA<span className="text-accent">.</span>
                                </Link>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                                        <X size={24} />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-10 flex flex-col gap-6">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-3xl font-black uppercase tracking-tight hover:text-accent transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-12 pt-10 border-t border-border flex flex-col gap-4">
                                <Link
                                    href="https://github.com/Greghori101"
                                    target="_blank"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Button variant="outline" className="w-full rounded-full">
                                        <Github size={16} className="mr-2" /> GitHub
                                    </Button>
                                </Link>
                                <Link
                                    href="https://www.linkedin.com/in/hoceyne/"
                                    target="_blank"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Button variant="outline" className="w-full rounded-full">
                                        <Linkedin size={16} className="mr-2" /> LinkedIn
                                    </Button>
                                </Link>
                                <Link href="mailto:e.souala@esi-sba.dz" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full rounded-full">
                                        <Mail size={16} className="mr-2" /> Email
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </>
    )
}
