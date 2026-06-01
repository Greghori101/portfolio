'use client'

import { useAtomValue } from 'jotai'
import { userAtom, isAuthenticatedAtom } from '@/lib/auth-atoms'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { portfolioApi } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function NewEducationPage() {
    const user = useAtomValue(userAtom)
    const isAuthenticated = useAtomValue(isAuthenticatedAtom)
    const router = useRouter()

    const [title, setTitle] = useState('')
    const [institution, setInstitution] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [thesis, setThesis] = useState('')
    const [details, setDetails] = useState('')
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
            institution,
            start: start || null,
            end: end || null,
            thesis: thesis || null,
            details: details || null,
            sort_order: 0,
        }

        const res = await portfolioApi.storeEducation(data as any)
        setSaving(false)
        if (!res.error) {
            router.push('/admin/portfolio/educations')
        } else {
            alert(res.error)
        }
    }

    return (
        <div className="max-w-3xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Link href="/admin/portfolio" className="text-sm text-muted-foreground hover:text-foreground">← Portfolio Dashboard</Link>
                    <h1 className="text-2xl font-bold mt-1">New Education</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm font-medium">Title (Degree)</label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div>
                    <label className="text-sm font-medium">Institution</label>
                    <Input value={institution} onChange={(e) => setInstitution(e.target.value)} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">Start</label>
                        <Input value={start} onChange={(e) => setStart(e.target.value)} />
                    </div>
                    <div>
                        <label className="text-sm font-medium">End</label>
                        <Input value={end} onChange={(e) => setEnd(e.target.value)} />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium">Thesis</label>
                    <Input value={thesis} onChange={(e) => setThesis(e.target.value)} />
                </div>

                <div>
                    <label className="text-sm font-medium">Details</label>
                    <Textarea value={details} onChange={(e) => setDetails(e.target.value)} />
                </div>

                <div className="flex gap-2">
                    <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Create'}</Button>
                    <Link href="/admin/portfolio/educations">
                        <Button variant="outline">Cancel</Button>
                    </Link>
                </div>
            </form>
        </div>
    )
}
