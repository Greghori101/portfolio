'use client'

import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { userAtom, isAuthenticatedAtom } from '@/lib/auth-atoms'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { blogApi, type BlogData } from '@/lib/api'
import { format } from 'date-fns'
import { Plus, Edit, Trash2, Eye, Calendar, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export default function AdminBlogsPage() {
  const user = useAtomValue(userAtom)
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)
  const router = useRouter()
  const [blogs, setBlogs] = useState<BlogData[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null)



  const handleDelete = async () => {
    if (!deleteSlug) return
    const res = await blogApi.destroy(deleteSlug)
    if (!res.error) {
      setBlogs((prev) => prev.filter((b) => b.slug !== deleteSlug))
    }
    setDeleteSlug(null)
  }

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true)
      const res = await blogApi.list()
      if (res.data?.data) setBlogs(res.data.data)
      setLoading(false)
    }
    loadBlogs()
  }, [])

  if (!isAuthenticated || !user) return null

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/admin" className="text-accent hover:text-foreground">Admin</Link>
            <span>/</span>
            <span className="font-medium">Blogs</span>
          </div>
          <h1 className="text-2xl font-bold">Blog Posts</h1>
        </div>
        <Link href="/admin/blogs/new">
          <Button className="rounded-full">
            <Plus className="h-4 w-4 mr-2" />
            New Article
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No blog posts yet.</p>
            <Link href="/admin/blogs/new">
              <Button>Create your first article</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <Card key={blog.id} className="h-full hover:border-primary/50 transition-all duration-300">
              <CardHeader className="p-5 pb-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold truncate">{blog.title}</h3>
                      {blog.published_at ? (
                        <Badge variant="default" className="shrink-0 text-xs">Published</Badge>
                      ) : (
                        <Badge variant="secondary" className="shrink-0 text-xs">Draft</Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(blog.created_at), 'MMM d, yyyy')}
                      </span>
                      {blog.tags.length > 0 && (
                        <span className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {blog.tags.map((t) => t.name).join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="max-w-xs text-sm text-muted-foreground line-clamp-2">
                    {blog.description || 'No description available.'}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-3">
                <div className="flex flex-wrap gap-2 justify-end">
                  <Link href={`/blogs/${blog.slug}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/blogs/${blog.slug}/edit`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => setDeleteSlug(blog.slug)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete article?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete &ldquo;{blog.title}&rdquo;.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}