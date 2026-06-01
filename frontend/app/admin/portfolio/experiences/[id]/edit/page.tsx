'use client'

import { useAtomValue } from 'jotai'
import { userAtom, isAuthenticatedAtom } from '@/lib/auth-atoms'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { portfolioApi, type ExperienceData } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function EditExperiencePage() {
    const user = useAtomValue(userAtom)
    const isAuthenticated = useAtomValue(isAuthenticatedAtom)
    const router = useRouter()
    const params = useParams()
    const id = Number(params?.id)

    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState('')
    const [company, setCompany] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [highlight, setHighlight] = useState('')
    const [description, setDescription] = useState('')
    const [tech, setTech] = useState('')
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
            return
        }

        if (!id) return

        portfolioApi.showExperience(id).then((res) => {
            if (res.data?.experience) {
                const e = res.data.experience as ExperienceData
                setTitle(e.title)
                setCompany(e.company)
                setStart(e.start)
                setEnd(e.end ?? '')
                setHighlight(e.highlight ?? '')
                setDescription(e.description ?? '')
                setTech(e.tech ? e.tech.join(', ') : '')
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
            company,
            start,
            end: end || null,
            description: description || null,
            highlight: highlight || null,
            tech: tech ? tech.split(',').map((t) => t.trim()).filter(Boolean) : null,
        }

        const res = await portfolioApi.updateExperience(id, data as any)
        setSaving(false)
        if (!res.error) {
            router.push('/admin/portfolio/experiences')
        } else {
            alert(res.error)
        }
    }

    return (
        <div className="max-w-3xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Link href="/admin/portfolio" className="text-sm text-muted-foreground hover:text-foreground">← Portfolio Dashboard</Link>
                    <h1 className="text-2xl font-bold mt-1">Edit Experience</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div>
                    <label className="text-sm font-medium">Company</label>
                    <Input value={company} onChange={(e) => setCompany(e.target.value)} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">Start</label>
                        <Input value={start} onChange={(e) => setStart(e.target.value)} placeholder="YYYY or MMM YYYY" />
                    </div>
                    <div>
                        <label className="text-sm font-medium">End</label>
                        <Input value={end} onChange={(e) => setEnd(e.target.value)} placeholder="Leave blank if current" />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium">Highlight</label>
                    <Input value={highlight} onChange={(e) => setHighlight(e.target.value)} />
                </div>

                <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div>
                    <label className="text-sm font-medium">Tech (comma separated)</label>
                    <Input value={tech} onChange={(e) => setTech(e.target.value)} placeholder="React, Node.js, PostgreSQL" />
                </div>

                <div className="flex gap-2">
                    <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Update'}</Button>
                    <Link href="/admin/portfolio/experiences">
                        <Button variant="outline">Cancel</Button>
                    </Link>
                </div>
            </form>
        </div>
    )
}
