'use client'

import { useAtomValue } from 'jotai'
import { userAtom, isAuthenticatedAtom } from '@/lib/auth-atoms'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { portfolioApi, type PublicationData } from '@/lib/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

export default function AdminPortfolioPublicationsPage() {
    const user = useAtomValue(userAtom)
    const isAuthenticated = useAtomValue(isAuthenticatedAtom)
    const router = useRouter()
    const [publications, setPublications] = useState<PublicationData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
            return
        }

        portfolioApi.publications().then((res) => {
            if (res.data?.publications) setPublications(res.data.publications)
            setLoading(false)
        })
    }, [isAuthenticated, router])

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this publication?')) return
        const res = await portfolioApi.destroyPublication(id)
        if (!res.error) {
            setPublications((prev) => prev.filter((item) => item.id !== id))
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
                        <span className="font-medium">Publications</span>
                    </div>
                    <h1 className="text-2xl font-bold">Publications</h1>
                </div>
                <Link href="/admin/portfolio/publications/new">
                    <Button className="rounded-full">Add Publication</Button>
                </Link>
            </div>

            {loading ? (
                <p className="text-muted-foreground">Loading publications…</p>
            ) : publications.length === 0 ? (
                <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">
                        No publications found.
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {publications.map((item) => (
                        <Card key={item.id} className="h-full hover:border-primary/50 transition-all duration-300">
                            <CardContent className="p-5 flex h-full flex-col justify-between gap-4">
                                <div className="space-y-3">
                                    <h3 className="text-xl font-semibold">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.authors ?? 'Unknown authors'} • {item.publication ?? 'Unknown publication'}</p>
                                    {item.link && (
                                        <a href={item.link} target="_blank" rel="noreferrer" className="text-accent hover:underline text-sm mt-2 inline-block break-all">
                                            View source
                                        </a>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2 justify-end">
                                    <Link href={`/admin/portfolio/publications/${item.id}/edit`}>
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
