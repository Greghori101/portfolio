'use client'

import { useAtomValue } from 'jotai'
import { userAtom, isAuthenticatedAtom } from '@/lib/auth-atoms'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { LayoutDashboard, List, ClipboardList, GraduationCap, BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AdminPortfolioDashboard() {
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
        <div className="max-w-5xl mx-auto px-4">
            <div className="mb-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/admin" className="text-accent hover:text-foreground">Admin</Link>
                    <span>/</span>
                    <span className="font-medium">Portfolio</span>
                </div>
                <div className="flex items-center gap-3">
                    <LayoutDashboard className="h-6 w-6 text-primary" />
                    <div>
                        <h1 className="text-2xl font-bold">Portfolio Content</h1>
                        <p className="text-sm text-muted-foreground">Manage homepage experiences, projects, education, and publications.</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Link href="/admin/portfolio/experiences">
                    <Card className="h-full hover:border-primary/50 transition-all duration-300 group">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <List className="h-5 w-5 text-primary" />
                                Experiences
                            </CardTitle>
                            <CardDescription>Manage work history and featured roles.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                Add, update, or remove experience cards displayed on the landing page.
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/portfolio/projects">
                    <Card className="h-full hover:border-primary/50 transition-all duration-300 group">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ClipboardList className="h-5 w-5 text-primary" />
                                Projects
                            </CardTitle>
                            <CardDescription>Manage the featured project showcase.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                Control project cards, featured work, and external links.
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/portfolio/educations">
                    <Card className="h-full hover:border-primary/50 transition-all duration-300 group">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5 text-primary" />
                                Education
                            </CardTitle>
                            <CardDescription>Manage academic profiles and thesis work.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                Update degrees, institutions, and research focus displayed on the homepage.
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/portfolio/publications">
                    <Card className="h-full hover:border-primary/50 transition-all duration-300 group">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-primary" />
                                Publications
                            </CardTitle>
                            <CardDescription>Manage research papers and published work.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                Keep your selected publications and links up to date.
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
