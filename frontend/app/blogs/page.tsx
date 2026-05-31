'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { blogApi, tagApi, type BlogData, type TagData } from '@/lib/api'
import { format } from 'date-fns'
import { Calendar, Tag, ArrowRight, Search, BookOpen } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogData[]>([])
  const [tags, setTags] = useState<TagData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    Promise.all([
      blogApi.list({ published: true }),
      tagApi.list(),
    ]).then(([blogsRes, tagsRes]) => {
      if (blogsRes.data?.data) setBlogs(blogsRes.data.data)
      if (tagsRes.data?.tags) setTags(tagsRes.data.tags)
    }).finally(() => setLoading(false))
  }, [])

  const filteredBlogs = blogs.filter((blog) => {
    const matchesTag = selectedTag ? blog.tags.some((t) => t.slug === selectedTag) : true
    const matchesSearch = searchQuery
      ? blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description?.toLowerCase().includes(searchQuery.toLowerCase())
      : true
    return matchesTag && matchesSearch
  })

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-4 border-b border-border/40">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary font-medium">
            <BookOpen className="h-4 w-4" />
            Blog & Articles
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Thoughts, Research & Insights
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Exploring the intersection of quantum computing, AI engineering, and full-stack development.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`text-left text-sm px-3 py-1.5 rounded-md transition-colors ${selectedTag === null
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }`}
                >
                  All Articles
                </button>
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => setSelectedTag(tag.slug)}
                    className={`text-left text-sm px-3 py-1.5 rounded-md transition-colors ${selectedTag === tag.slug
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                      }`}
                  >
                    {tag.name}
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({tag.blogs_count})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Blog Grid */}
          <div>
            {loading ? (
              <div className="grid gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <Skeleton className="h-48 md:h-auto md:w-72 rounded-none" />
                      <div className="flex-1 p-6 space-y-3">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No articles found</h3>
                <p className="text-muted-foreground mt-1">
                  {searchQuery
                    ? 'Try a different search term'
                    : 'Articles will appear here once published'}
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredBlogs.map((blog) => (
                  <Link key={blog.id} href={`/blogs/${blog.slug}`}>
                    <Card className="overflow-hidden group hover:border-primary/50 transition-all duration-300">
                      <div className="flex flex-col md:flex-row">
                        {blog.cover_image && (
                          <div className="relative h-48 md:h-auto md:w-72 shrink-0 overflow-hidden">
                            <Image
                              src={blog.cover_image}
                              alt={blog.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="flex-1 p-6 flex flex-col justify-between">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {blog.published_at
                                  ? format(new Date(blog.published_at), 'MMM d, yyyy')
                                  : 'Draft'}
                              </span>
                              <span>•</span>
                              <span>{blog.author.name}</span>
                            </div>
                            <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                              {blog.title}
                            </h2>
                            {blog.description && (
                              <p className="text-muted-foreground line-clamp-2">
                                {blog.description}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex flex-wrap gap-1.5">
                              {blog.tags.map((tag) => (
                                <Badge key={tag.id} variant="secondary" className="text-xs">
                                  <Tag className="h-3 w-3 mr-1" />
                                  {tag.name}
                                </Badge>
                              ))}
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}