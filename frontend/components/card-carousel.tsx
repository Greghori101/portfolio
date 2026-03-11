'use client'

import { Children, useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, type PanInfo } from 'framer-motion'

interface CardCarouselProps {
  children: ReactNode | ReactNode[]
  className?: string
}

export function CardCarousel({ children, className = '' }: CardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const dragOffsetRef = useRef(0)
  const viewportWidthRef = useRef(0)

  const cardsArray = Children.toArray(children)
  const itemCount = cardsArray.length
  const [slideSpacing, setSlideSpacing] = useState(340)

  useEffect(() => {
    const updateSpacing = () => {
      const width = carouselRef.current?.getBoundingClientRect().width ?? 0
      if (!width) return
      setSlideSpacing(width * 0.58)
    }

    updateSpacing()
    window.addEventListener('resize', updateSpacing)
    return () => window.removeEventListener('resize', updateSpacing)
  }, [])

  const wrapIndex = (index: number) => {
    if (itemCount === 0) return 0
    return (index + itemCount) % itemCount
  }

  const startDrag = () => {
    if (itemCount <= 1) return
    viewportWidthRef.current = carouselRef.current?.getBoundingClientRect().width ?? 0
    dragOffsetRef.current = 0
    setIsDragging(true)
    setDragOffset(0)
  }

  const updateDrag = (_: PointerEvent, info: PanInfo) => {
    if (!isDragging) return
    const nextOffset = info.offset.x
    dragOffsetRef.current = nextOffset
    setDragOffset(nextOffset)
  }

  const endDrag = (draggedDistance = dragOffsetRef.current, velocity = 0) => {
    if (!isDragging) return

    const width = viewportWidthRef.current || carouselRef.current?.getBoundingClientRect().width || slideSpacing
    const threshold = Math.max(40, Math.min(width * 0.15, slideSpacing * 0.3))
    const velocityThreshold = 0.5

    // Use velocity for quick swipes
    if (Math.abs(velocity) > velocityThreshold) {
      if (velocity > 0) {
        setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount)
      } else {
        setCurrentIndex((prev) => (prev + 1) % itemCount)
      }
    } else if (draggedDistance > threshold) {
      setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount)
    } else if (draggedDistance < -threshold) {
      setCurrentIndex((prev) => (prev + 1) % itemCount)
    }

    setIsDragging(false)
    dragOffsetRef.current = 0
    setDragOffset(0)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (itemCount <= 1) return

    if (e.key === 'ArrowRight') {
      setCurrentIndex((prev) => (prev + 1) % itemCount)
    } else if (e.key === 'ArrowLeft') {
      setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount)
    }
  }

  const dragProgress = slideSpacing ? dragOffset / slideSpacing : 0

  const getCardStyle = (position: number) => {
    const shifted = position + dragProgress
    const distance = Math.min(Math.abs(shifted), 1.25)
    const scale = 1.06 - distance * 0.22
    const opacity = 1 - distance * 0.42
    const blur = distance * 1.6

    return {
      x: shifted * slideSpacing,
      y: 0,
      scale,
      opacity,
      filter: `blur(${blur}px)`,
      zIndex: 30 - Math.round(distance * 10),
    }
  }

  if (itemCount === 0) return null
  if (itemCount === 1) {
    return <div className={className}>{cardsArray[0]}</div>
  }

  return (
    <motion.div
      ref={carouselRef}
      className={`relative overflow-visible w-full px-3 py-4 sm:px-6 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${className}`}
      onPanStart={startDrag}
      onPan={updateDrag}
      onPanEnd={(_: PointerEvent, info: PanInfo) => endDrag(info.offset.x, info.velocity.x)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ touchAction: 'pan-y', userSelect: 'none' }}
    >
      <div className="pointer-events-none opacity-0 absolute w-5/6 max-w-md">{cardsArray[currentIndex]}</div>

      <div className="relative w-full h-96 flex items-center justify-center">
        {([-1, 0, 1] as const).map((position) => {
          const cardIndex = wrapIndex(currentIndex + position)
          return (
            <motion.div
              key={cardIndex}
              className="absolute flex w-5/6 max-w-md h-full items-stretch justify-center will-change-transform"
              initial={false}
              animate={getCardStyle(position)}
              transition={
                isDragging
                  ? { duration: 0 }
                  : {
                      type: 'spring',
                      stiffness: 220,
                      damping: 30,
                      mass: 0.95,
                    }
              }
              style={{ pointerEvents: position === 0 ? 'auto' : 'none' }}
            >
              <div className="w-full h-full">
                {cardsArray[cardIndex]}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation indicators */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2">
        {cardsArray.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all ${
              idx === currentIndex
                ? 'w-8 h-2 bg-primary'
                : 'w-2 h-2 bg-primary/30 hover:bg-primary/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </motion.div>
  )
}
