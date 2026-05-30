import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Provider as JotaiProvider } from 'jotai'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthInitializer } from '@/components/auth-initializer'
import './globals.css'

const inter = Inter({ subsets: ["latin"], weight: ['400', '700', '900'] });

export const metadata: Metadata = {
  title: 'Souala Elhoussine | Full-Stack Engineer & Quantum Computing Researcher',
  description: 'PhD Candidate in Quantum Computing | Full-Stack Software Engineer specializing in AI integration, scalable systems design, and cutting-edge technologies',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased selection:bg-accent selection:text-white bg-background text-foreground transition-colors duration-500`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <JotaiProvider>
            <AuthInitializer>
              {children}
            </AuthInitializer>
          </JotaiProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
