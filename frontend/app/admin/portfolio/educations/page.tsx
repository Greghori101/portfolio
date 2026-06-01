'use client'

import { useAtomValue } from 'jotai'
import { userAtom, isAuthenticatedAtom } from '@/lib/auth-atoms'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { portfolioApi, type EducationData } from '@/lib/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

export default function AdminPortfolioEducationsPage() {
    const user = useAtomValue(userAtom)
    const isAuthenticated = useAtomValue(isAuthenticatedAtom)
    const router = useRouter()
    const [educations, setEducations] = useState<EducationData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
            return
        }

        portfolioApi.educations().then((res) => {
            if (res.data?.educations) setEducations(res.data.educations)
            setLoading(false)
        })
    }, [isAuthenticated, router])

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this education entry?')) return
        const res = await portfolioApi.destroyEducation(id)
        if (!res.error) {
            setEducations((prev) => prev.filter((item) => item.id !== id))
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
                        <span className="font-medium">Education</span>
                    </div>
                    <h1 className="text-2xl font-bold">Education</h1>
                </div>
                <Link href="/admin/portfolio/educations/new">
                    <Button className="rounded-full">Add Education</Button>
                </Link>
            </div>

            {loading ? (
                <p className="text-muted-foreground">Loading education items…</p>
            ) : educations.length === 0 ? (
                <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">
                        No education entries found.
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {educations.map((item) => (
                        <Card key={item.id} className="h-full hover:border-primary/50 transition-all duration-300">
                            <CardContent className="p-5 flex h-full flex-col justify-between gap-4">
                                <div className="space-y-3">
                                    <h3 className="text-xl font-semibold">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.institution} • {item.start ?? 'Unknown'} — {item.end ?? 'Present'}</p>
                                    {item.thesis && <p className="text-sm text-accent">Thesis: {item.thesis}</p>}
                                    {item.details && <p className="text-sm text-muted-foreground max-w-2xl">{item.details}</p>}
                                </div>
                                <div className="flex flex-wrap gap-2 justify-end">
                                    <Link href={`/admin/portfolio/educations/${item.id}/edit`}>
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
