'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface TechLogo {
  name: string
  src: string
  alt: string
}

const technologies: TechLogo[] = [
  { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React' },
  { name: 'Next.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', alt: 'Next.js' },
  { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', alt: 'TypeScript' },
  { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', alt: 'Node.js' },
  { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', alt: 'Python' },
  { name: 'FastAPI', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', alt: 'FastAPI' },
  { name: 'NestJS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg', alt: 'NestJS' },
  { name: 'Laravel', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', alt: 'Laravel' },
  { name: 'Docker', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', alt: 'Docker' },
  { name: 'Kubernetes', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', alt: 'Kubernetes' },
  { name: 'PostgreSQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', alt: 'PostgreSQL' },
  { name: 'MongoDB', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', alt: 'MongoDB' },
  { name: 'TensorFlow', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', alt: 'TensorFlow' },
  { name: 'PyTorch', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', alt: 'PyTorch' },
  { name: 'AWS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', alt: 'AWS' },
]

// Duplicate array for seamless infinite scroll
const duplicatedTechs = [...technologies, ...technologies]

export function TechLogos() {

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        initial={{ x: 0 }}
        animate={{x:60}}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex gap-8 py-8 cursor-grab active:cursor-grabbing"
      >
        {duplicatedTechs.map((tech, idx) => (
          <motion.div
            key={`${tech.name}-${idx}`}
            className="group flex flex-col items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-16 h-16 rounded-full bg-accent/10 border border-accent/30 hover:border-accent hover:bg-accent/20 transition-all duration-300 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-accent/20">
              <Image
                src={tech.src}
                alt={tech.alt}
                width={32}
                height={32}
                className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                priority={false}
              />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-accent transition-colors mt-3 whitespace-nowrap">
              {tech.name}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
