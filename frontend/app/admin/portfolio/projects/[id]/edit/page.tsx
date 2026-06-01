'use client'

import { useAtomValue } from 'jotai'
import { userAtom, isAuthenticatedAtom } from '@/lib/auth-atoms'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { portfolioApi, type ProjectData } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function EditProjectPage() {
    const user = useAtomValue(userAtom)
    const isAuthenticated = useAtomValue(isAuthenticatedAtom)
    const router = useRouter()
    const params = useParams()
    const id = Number(params?.id)

    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    const [tech, setTech] = useState('')
    const [featured, setFeatured] = useState(false)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
            return
        }

        if (!id) return

        portfolioApi.showProject(id).then((res) => {
            if (res.data?.project) {
                const p = res.data.project as ProjectData
                setTitle(p.title)
                setCategory(p.category ?? '')
                setDescription(p.description ?? '')
                setLink(p.link ?? '')
                setTech(p.tech ? p.tech.join(', ') : '')
                setFeatured(p.featured ?? false)
            }
            setLoading(false)
        })
    }, [isAuthenticated, id, router])

    if (!isAuthenticated || !user) return null
    if (loading) return <p className="text-muted-foreground">Loading…</p>

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        const data = {
            title,
            category: category || null,
            description: description || null,
            link: link || null,
            tech: tech ? tech.split(',').map((t) => t.trim()).filter(Boolean) : null,
            featured,
        }

        const res = await portfolioApi.updateProject(id, data as any)
        setSaving(false)
        if (!res.error) {
            router.push('/admin/portfolio/projects')
        } else {
            alert(res.error)
        }
    }

    return (
        <div className="max-w-3xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Link href="/admin/portfolio" className="text-sm text-muted-foreground hover:text-foreground">← Portfolio Dashboard</Link>
                    <h1 className="text-2xl font-bold mt-1">Edit Project</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div>
                    <label className="text-sm font-medium">Category</label>
                    <Input value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>

                <div>
                    <label className="text-sm font-medium">Link</label>
                    <Input value={link} onChange={(e) => setLink(e.target.value)} />
                </div>

                <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div>
                    <label className="text-sm font-medium">Tech (comma separated)</label>
                    <Input value={tech} onChange={(e) => setTech(e.target.value)} placeholder="React, TypeScript" />
                </div>

                <div className="flex items-center gap-3">
                    <input id="featured" type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
                    <label htmlFor="featured" className="text-sm">Featured</label>
                </div>

                <div className="flex gap-2">
                    <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Update'}</Button>
                    <Link href="/admin/portfolio/projects">
                        <Button variant="outline">Cancel</Button>
                    </Link>
                </div>
            </form>
        </div>
    )
}
