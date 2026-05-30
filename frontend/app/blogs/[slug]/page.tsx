'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { blogApi, type BlogData } from '@/lib/api'
import { format } from 'date-fns'
import { Calendar, Tag, User, ArrowLeft, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { RichTextViewer } from '@/components/rich-text-viewer'

export default function BlogDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [blog, setBlog] = useState<BlogData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    blogApi.show(slug).then((res) => {
      if (res.data?.blog) setBlog(res.data.blog)
    }).finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96" />
          <Skeleton className="h-64 w-full rounded-xl" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Article not found</h2>
          <p className="text-muted-foreground">The article you're looking for doesn't exist.</p>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blogs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 pt-8">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to articles
        </Link>
      </div>

      <article className="max-w-3xl mx-auto px-4 py-8">
        <header className="space-y-6 mb-12">
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <Badge key={tag.id} variant="secondary">
                <Tag className="h-3 w-3 mr-1" />
                {tag.name}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            {blog.title}
          </h1>

          {blog.description && (
            <p className="text-xl text-muted-foreground leading-relaxed">
              {blog.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b border-border/40">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {blog.author.name}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {blog.published_at
                ? format(new Date(blog.published_at), 'MMMM d, yyyy')
                : 'Draft'}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {format(new Date(blog.created_at), 'MMM d, yyyy')}
            </span>
          </div>
        </header>

        {blog.cover_image && (
          <div className="relative aspect-video rounded-xl overflow-hidden mb-12">
            <Image
              src={blog.cover_image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {blog.content_json ? (
            <RichTextViewer content={blog.content_json} />
          ) : blog.content_markdown ? (
            <div className="whitespace-pre-wrap">{blog.content_markdown}</div>
          ) : (
            <p className="text-muted-foreground italic">No content available.</p>
          )}
        </div>
      </article>
    </div>
  )
}