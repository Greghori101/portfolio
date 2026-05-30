const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
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