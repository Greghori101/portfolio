import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], weight: ['400', '700', '900'] });

export const metadata: Metadata = {
  title: 'Souala Elhoussine | Full-Stack Engineer & Quantum Computing Researcher',
  description: 'PhD Candidate in Quantum Computing | Full-Stack Software Engineer specializing in AI integration, scalable systems design, and cutting-edge technologies',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased selection:bg-accent selection:text-white`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
