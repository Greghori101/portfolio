'use client'

import { useAtomValue } from 'jotai'
import { userAtom, isAuthenticatedAtom } from '@/lib/auth-atoms'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { portfolioApi, type ExperienceData } from '@/lib/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

export default function AdminPortfolioExperiencesPage() {
    const user = useAtomValue(userAtom)
    const isAuthenticated = useAtomValue(isAuthenticatedAtom)
    const router = useRouter()
    const [experiences, setExperiences] = useState<ExperienceData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
            return
        }

        portfolioApi.experiences().then((res) => {
            if (res.data?.experiences) setExperiences(res.data.experiences)
            setLoading(false)
        })
    }, [isAuthenticated, router])

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this experience?')) return
        const res = await portfolioApi.destroyExperience(id)
        if (!res.error) {
            setExperiences((prev) => prev.filter((item) => item.id !== id))
        }
    }

    if (!isAuthenticated || !user) return null

    return (
        <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Link href="/admin" className="hover:text-foreground">Admin</Link>
                        <span>/</span>
                        <Link href="/admin/portfolio" className="hover:text-foreground">Portfolio</Link>
                        <span>/</span>
                        <span className="font-medium">Experiences</span>
                    </div>
                    <h1 className="text-2xl font-bold">Experiences</h1>
                </div>
                <Link href="/admin/portfolio/experiences/new">
                    <Button className="rounded-full">Add Experience</Button>
                </Link>
            </div>

            {loading ? (
                <p className="text-muted-foreground">Loading experiences…</p>
            ) : experiences.length === 0 ? (
                <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">
                        No experiences found.
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {experiences.map((item) => (
                        <Card key={item.id} className="h-full hover:border-primary/50 transition-all duration-300">
                            <CardContent className="p-5 flex h-full flex-col justify-between gap-4">
                                <div className="space-y-3">
                                    <h3 className="text-xl font-semibold">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.company} • {item.start} — {item.end ?? 'Present'}</p>
                                    {item.highlight && <p className="text-sm text-accent">{item.highlight}</p>}
                                    {item.description && <p className="text-sm text-muted-foreground max-w-2xl">{item.description}</p>}
                                    {item.tech?.length ? <p className="text-sm text-muted-foreground">Tech: {item.tech.join(', ')}</p> : null}
                                </div>
                                <div className="flex flex-wrap gap-2 justify-end">
                                    <Link href={`/admin/portfolio/experiences/${item.id}/edit`}>
                                        <Button size="sm" variant="outline">View / Edit</Button>
                                    </Link>
                                    <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
