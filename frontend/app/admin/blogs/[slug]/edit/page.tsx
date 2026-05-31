'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useAtomValue } from 'jotai'
import { userAtom, isAuthenticatedAtom } from '@/lib/auth-atoms'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { blogApi, mediaApi, type BlogData } from '@/lib/api'
import { RichTextEditor } from '@/components/rich-text-editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, Save, X, Image as ImageIcon, Loader2 } from 'lucide-react'

export default function EditBlogPage() {
  const params = useParams()
  const slug = params.slug as string
  const user = useAtomValue(userAtom)
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [published, setPublished] = useState(false)
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [coverUploading, setCoverUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    if (!slug) return
    blogApi.show(slug).then((res) => {
      if (res.data?.blog) {
        const blog = res.data.blog
        setTitle(blog.title)
        setDescription(blog.description || '')
        setCoverImage(blog.cover_image)
        setTags(blog.tags.map((t) => t.name))
        setPublished(!!blog.published_at)
      }
      setLoading(false)
    })
  }, [slug, isAuthenticated, router])

  if (!isAuthenticated || !user) return null

  const addTag = () => {
    const trimmed = tagInput.trim()
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed])
    }
    setTagInput('')
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCoverUploading(true)
    const res = await mediaApi.upload(file)
    if (res.data?.url) {
      setCoverImage(res.data.url)
    }
    setCoverUploading(false)
  }

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    setSaving(true)
    setError('')

    const res = await blogApi.update(slug, {
      title: title.trim(),
      description: description.trim() || undefined,
      cover_image: coverImage || undefined,
      tags: tags.length > 0 ? tags : undefined,
      published,
    })

    if (res.error) {
      setError(res.error)
      setSaving(false)
      return
    }

    router.push('/admin/blogs')
  }

  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    )
  }

  return (
      <div className="max-w-4xl mx-auto  px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin/blogs" className="text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 inline mr-1" />
              Back to posts
            </Link>
            <h1 className="text-2xl font-bold mt-1">Edit Article</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="published" className="text-sm">Publish</Label>
              <Switch
                id="published"
                checked={published}
                onCheckedChange={setPublished}
              />
            </div>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Update
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Cover Image */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cover Image</CardTitle>
            </CardHeader>
            <CardContent>
              {coverImage ? (
                <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setCoverImage(null)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-background/80 hover:bg-background"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : null}
              <div className="flex items-center gap-3">
                <Label
                  htmlFor="cover-upload"
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md border border-input hover:bg-accent transition-colors text-sm"
                >
                  {coverUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ImageIcon className="h-4 w-4" />
                  )}
                  {coverImage ? 'Change Image' : 'Upload Cover Image'}
                </Label>
                <input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverUpload}
                />
              </div>
            </CardContent>
          </Card>

          {/* Title & Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Article Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter article title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description for cards and SEO"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Type a tag and press Enter"
                  className="max-w-xs"
                />
                <Button type="button" variant="outline" onClick={addTag} disabled={!tagInput.trim()}>
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Rich Text Editor */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Content</CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                name="content"
                placeholder="Start writing your article..."
                minHeight="400px"
              />
            </CardContent>
          </Card>
        </div>
      </div>
  )
}