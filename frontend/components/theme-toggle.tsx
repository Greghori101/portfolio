'use client'

import { useMemo, useState } from 'react'
import { useTheme } from 'next-themes'
import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [pulseKey, setPulseKey] = useState(0)

  const isDark = useMemo(() => (resolvedTheme ?? 'dark') === 'dark', [resolvedTheme])

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      suppressHydrationWarning
      onClick={() => {
        const next = isDark ? 'light' : 'dark'
        setPulseKey((k) => k + 1)
        setTheme(next)
      }}
      className={`relative overflow-hidden rounded-full ${className ?? ''}`}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="pointer-events-none absolute inset-0 grid place-items-center"
          >
            <Moon className="size-4" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="pointer-events-none absolute inset-0 grid place-items-center"
          >
            <Sun className="size-4" />
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        <motion.span
          key={pulseKey}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 0.55, scale: 1.8 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute inset-0 rounded-full bg-accent/30"
        />
      </AnimatePresence>
    </Button>
  )
}
