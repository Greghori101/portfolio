'use client'

import { useAtomValue } from 'jotai'
import { userAtom, isAuthenticatedAtom } from '@/lib/auth-atoms'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { FileText, Plus, LayoutDashboard, ClipboardList } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminDashboard() {
  const user = useAtomValue(userAtom)
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) return null

  return (
    <div className="max-w-4xl mx-auto  px-4">
      <div className="flex items-center gap-3 mb-8">
        <LayoutDashboard className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/admin/blogs">
          <Card className="hover:border-primary/50 transition-all duration-300 group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Blog Posts
              </CardTitle>
              <CardDescription>Manage your blog articles</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                View, edit, and manage all your published and draft articles.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/portfolio">
          <Card className="hover:border-primary/50 transition-all duration-300 group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" />
                Portfolio
              </CardTitle>
              <CardDescription>Manage homepage portfolio content</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Update experiences, projects, education, and publications displayed on the landing page.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="mt-8 p-4 rounded-lg bg-muted/50">
        <p className="text-sm text-muted-foreground">
          Logged in as <strong>{user.name}</strong> ({user.email})
        </p>
      </div>
    </div>
  )
}