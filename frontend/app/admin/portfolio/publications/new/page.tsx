'use client'

import { useAtomValue } from 'jotai'
import { userAtom, isAuthenticatedAtom } from '@/lib/auth-atoms'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { portfolioApi } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function NewPublicationPage() {
    const user = useAtomValue(userAtom)
    const isAuthenticated = useAtomValue(isAuthenticatedAtom)
    const router = useRouter()

    const [title, setTitle] = useState('')
    const [authors, setAuthors] = useState('')
    const [publication, setPublication] = useState('')
    const [link, setLink] = useState('')
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (!isAuthenticated) router.push('/login')
    }, [isAuthenticated, router])

    if (!isAuthenticated || !user) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        const data = {
            title,
            authors: authors || null,
            publication: publication || null,
            link: link || null,
            sort_order: 0,
        }

        const res = await portfolioApi.storePublication(data as any)
        setSaving(false)
        if (!res.error) {
            router.push('/admin/portfolio/publications')
        } else {
            alert(res.error)
        }
    }

    return (
        <div className="max-w-3xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Link href="/admin/portfolio" className="text-sm text-muted-foreground hover:text-foreground">← Portfolio Dashboard</Link>
                    <h1 className="text-2xl font-bold mt-1">New Publication</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div>
                    <label className="text-sm font-medium">Authors</label>
                    <Input value={authors} onChange={(e) => setAuthors(e.target.value)} placeholder="Comma separated or full list" />
                </div>

                <div>
                    <label className="text-sm font-medium">Publication / Venue</label>
                    <Input value={publication} onChange={(e) => setPublication(e.target.value)} />
                </div>

                <div>
                    <label className="text-sm font-medium">Link</label>
                    <Input value={link} onChange={(e) => setLink(e.target.value)} />
                </div>

                <div className="flex gap-2">
                    <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Create'}</Button>
                    <Link href="/admin/portfolio/publications">
                        <Button variant="outline">Cancel</Button>
                    </Link>
                </div>
            </form>
        </div>
    )
}
