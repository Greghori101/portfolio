const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
}

export interface BlogData {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  cover_image: string | null;
  content_json: unknown;
  content_markdown: string | null;
  author_id: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author: {
    id: number;
    name: string;
    email: string;
  };
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

export interface TagData {
  id: number;
  name: string;
  slug: string;
  blogs_count: number;
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    // Get auth token from localStorage
    const token = typeof window !== 'undefined'
      ? localStorage.getItem('auth_token')
      : null

    const headers: Record<string, string> = {
      Accept: 'application/json',
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string> || {}),
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: 'Request failed' }))
      return { error: errorData.error || errorData.message || `HTTP ${res.status}` }
    }

    const data = await res.json()
    return { data }
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Network error' }
  }
}

export const mediaApi = {
  async upload(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    return fetchApi<{ url: string; path: string; id: number; name: string; size: number; mime_type: string }>('/upload', {
      method: 'POST',
      body: formData,
    })
  },

  async list() {
    return fetchApi<{ media: Array<{ id: number; url: string; name: string; size: number; mime_type: string; created_at: string }> }>('/media')
  },

  async delete(mediaId: number) {
    return fetchApi<{ message: string }>(`/media/${mediaId}`, {
      method: 'DELETE',
    })
  },
}

export const blogApi = {
  async list(params?: { published?: boolean; tag?: string; per_page?: number }) {
    const query = new URLSearchParams();
    if (params?.published) query.set('published', 'true');
    if (params?.tag) query.set('tag', params.tag);
    if (params?.per_page) query.set('per_page', String(params.per_page));
    const qs = query.toString();
    return fetchApi<{ data: BlogData[]; meta: Record<string, unknown> }>(`/blogs${qs ? `?${qs}` : ''}`);
  },

  async show(slug: string) {
    return fetchApi<{ blog: BlogData }>(`/blogs/${slug}`);
  },

  async store(data: {
    title: string;
    description?: string;
    cover_image?: string;
    content_json?: unknown;
    content_markdown?: string;
    tags?: string[];
    published?: boolean;
  }) {
    return fetchApi<{ blog: BlogData }>('/blogs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(slug: string, data: Partial<{
    title: string;
    description: string;
    cover_image: string;
    content_json: unknown;
    content_markdown: string;
    tags: string[];
    published: boolean;
  }>) {
    return fetchApi<{ blog: BlogData }>(`/blogs/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async destroy(slug: string) {
    return fetchApi<{ message: string }>(`/blogs/${slug}`, {
      method: 'DELETE',
    });
  },
}

export const tagApi = {
  async list() {
    return fetchApi<{ tags: TagData[] }>('/tags');
  },
}