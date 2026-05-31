'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Github } from 'lucide-react'
import { motion } from 'framer-motion'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'


const navItems = [
    { label: 'Home', href: '/#home' },
    { label: 'About', href: '/#about' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Research', href: '/#research' },
    { label: 'Blogs', href: '/blogs' },
]

export default function NavigationDots() {
    const [scrolled, setScrolled] = useState(false)

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
        </>
    )
}
