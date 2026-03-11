'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface TechLogo {
  name: string
  src: string
  alt: string
}

const technologies: TechLogo[] = [
  { name: 'React', src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/React_Logo_SVG-b0wEyQ4l1Ruje5u94aMDMax8Si9k0R.svg', alt: 'React' },
  { name: 'Next.js', src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Next.js_wordmark-EB2GSJ4UxrizBO99fEXr8FlvOGEU1h.svg', alt: 'Next.js' },
  { name: 'TypeScript', src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Typescript-OmNzArWfh77JMuklLRoYHjG2IligT9.svg', alt: 'TypeScript' },
  { name: 'Node.js', src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Node.js_logo-BClBrW8oClFHPsVSrvZGXkyaMZgJK5.svg', alt: 'Node.js' },
  { name: 'Python', src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Python-logo-notext.svg-Htf4xFlRQjTkm9iNrOoNNlTwp0noCb.xml', alt: 'Python' },
  { name: 'Laravel', src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Laravel-O2IYw8VqvwjVjkoObNVcWcBcqX283e.svg', alt: 'Laravel' },
  { name: 'Vue.js', src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vue.js_Logo_2.svg-Onu55A3pdWe3vAu1Cxg9lTKDWeUked.xml', alt: 'Vue.js' },
  { name: 'Docker', src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/docker-mark-blue.svg-8Qyk59RSTP6ZpQgwvCFv3gY4ZqjlcX.xml', alt: 'Docker' },
  { name: 'Docker Compose', src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/docker-compose-d6wmfSxY3f2xvbhK3uQDNAtScz247W.png', alt: 'Docker Compose' },
  { name: 'AWS', src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Amazon_Web_Services_Logo.svg-oD33F6Rzg9sbgBN01DspAY6yXYBxyP.xml', alt: 'AWS' },
  { name: 'Kubernetes', src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kubernetes_logo_without_workmark.svg-4tLugmREzDaa8OGhZqU1HhtxVdSnHP.xml', alt: 'Kubernetes' },
  { name: 'PostgreSQL', src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/R_%281%29ds-PG8RqcqMBuKdsNdrZoiWUHJUbk6oui.png', alt: 'PostgreSQL' },
  { name: 'TensorFlow', src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tensorflow-svgrepo-com.svg-66435ID13JSSPnNOYG3aJ0Bu5MwL5y.xml', alt: 'TensorFlow' },
]

export function TechLogos() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8"
    >
      {technologies.map((tech) => (
        <motion.div
          key={tech.name}
          variants={itemVariants}
          whileHover={{ scale: 1.1, y: -5 }}
          className="flex flex-col items-center justify-center p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300 bg-card/50 hover:bg-card backdrop-blur-sm"
        >
          <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
            <Image
              src={tech.src}
              alt={tech.alt}
              width={64}
              height={64}
              className="w-auto h-auto max-w-full max-h-full object-contain"
              priority={false}
            />
          </div>
          <p className="text-xs md:text-sm font-medium text-muted-foreground mt-3 text-center">
            {tech.name}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}
