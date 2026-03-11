'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = 'from-primary/[0.08]',
  duration = 20,
  floatDistance = 30,
  borderColor = 'border-primary/[0.15]',
  shadowColor = 'rgba(99,102,241,0.1)',
  glowColor = 'rgba(99,102,241,0.2)',
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
  duration?: number
  floatDistance?: number
  borderColor?: string
  shadowColor?: string
  glowColor?: string
}) {
  const shapeRef = useRef<HTMLDivElement>(null)
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!shapeRef.current) return

    const rect = shapeRef.current.getBoundingClientRect()
    const shapeX = rect.left + rect.width / 2
    const shapeY = rect.top + rect.height / 2

    const mouseX = e.clientX
    const mouseY = e.clientY

    const distance = Math.sqrt(Math.pow(mouseX - shapeX, 2) + Math.pow(mouseY - shapeY, 2))
    const maxDistance = 300
    const influence = Math.max(0, 1 - distance / maxDistance)

    const angle = Math.atan2(mouseY - shapeY, mouseX - shapeX)
    const offsetDistance = influence * 60

    setCursorOffset({
      x: Math.cos(angle) * offsetDistance,
      y: Math.sin(angle) * offsetDistance,
    })
  }

  const handleMouseLeave = () => {
    setCursorOffset({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={shapeRef}
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn('absolute', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{
          y: [0, floatDistance, -floatDistance, 0, cursorOffset.y],
          x: [0, floatDistance * 0.5, -floatDistance * 0.5, 0, cursorOffset.x],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
          times: [0, 0.33, 0.66, 1, 1],
          y: {
            times: [0, 0.33, 0.66, 1],
            duration,
          },
          x: {
            times: [0, 0.33, 0.66, 1],
            duration,
          },
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            'absolute inset-0 rounded-full',
            'bg-gradient-to-r to-transparent',
            gradient,
            'backdrop-blur-[2px]',
            borderColor,
            'transition-all duration-300',
            'after:absolute after:inset-0 after:rounded-full',
            'after:transition-opacity after:duration-300',
          )}
          style={{
            boxShadow: `0_8px_32px_0_${shadowColor}`,
            backgroundImage: `linear-gradient(to right, var(--primary), transparent)`,
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export function GeometricBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-auto -z-10">
      <ElegantShape
        delay={0.3}
        width={600}
        height={140}
        rotate={12}
        gradient="from-primary/[0.15]"
        borderColor="border-primary/[0.15]"
        shadowColor="rgba(99,102,241,0.1)"
        glowColor="rgba(99,102,241,0.2)"
        className="left-[-10%] md:left-[-5%] top-[10%] md:top-[15%] pointer-events-auto"
        duration={28}
        floatDistance={40}
      />

      <ElegantShape
        delay={0.5}
        width={500}
        height={120}
        rotate={-15}
        gradient="from-accent/[0.15]"
        borderColor="border-accent/[0.15]"
        shadowColor="rgba(82,102,241,0.15)"
        glowColor="rgba(82,102,241,0.25)"
        className="right-[-5%] md:right-[0%] top-[60%] md:top-[65%] pointer-events-auto"
        duration={32}
        floatDistance={50}
      />

      <ElegantShape
        delay={0.4}
        width={300}
        height={80}
        rotate={-8}
        gradient="from-primary/[0.12]"
        borderColor="border-primary/[0.12]"
        shadowColor="rgba(99,102,241,0.08)"
        glowColor="rgba(99,102,241,0.15)"
        className="left-[5%] md:left-[10%] bottom-[10%] md:bottom-[15%] pointer-events-auto"
        duration={25}
        floatDistance={35}
      />

      <ElegantShape
        delay={0.6}
        width={200}
        height={60}
        rotate={20}
        gradient="from-accent/[0.12]"
        borderColor="border-accent/[0.12]"
        shadowColor="rgba(82,102,241,0.1)"
        glowColor="rgba(82,102,241,0.18)"
        className="right-[15%] md:right-[20%] top-[5%] md:top-[10%] pointer-events-auto"
        duration={22}
        floatDistance={45}
      />

      <ElegantShape
        delay={0.7}
        width={150}
        height={40}
        rotate={-25}
        gradient="from-primary/[0.1]"
        borderColor="border-primary/[0.1]"
        shadowColor="rgba(99,102,241,0.08)"
        glowColor="rgba(99,102,241,0.15)"
        className="left-[20%] md:left-[25%] top-[40%] md:top-[45%] pointer-events-auto"
        duration={30}
        floatDistance={30}
      />
    </div>
  )
}
