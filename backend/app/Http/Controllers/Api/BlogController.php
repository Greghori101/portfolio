<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Tag;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Blog::with(['author:id,name,email', 'tags:id,name,slug']);

        if ($request->boolean('published')) {
            $query->whereNotNull('published_at')->orderByDesc('published_at');
        }

        if ($tag = $request->input('tag')) {
            $query->whereHas('tags', fn ($q) => $q->where('slug', $tag));
        }

        $perPage = min((int) $request->input('per_page', 12), 50);
        $blogs = $query->orderByDesc('created_at')->paginate($perPage);

        return response()->json($blogs);
    }

    public function show(string $slug): JsonResponse
    {
        $blog = Blog::with(['author:id,name,email', 'tags:id,name,slug'])
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json(['blog' => $blog]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'cover_image' => 'nullable|string|max:2048',
            'content_json' => 'nullable|json',
            'content_markdown' => 'nullable|string',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'published' => 'boolean',
        ]);

        /** @var \App\Models\User $user */
        $user = $request->user();

        $blog = new Blog();
        $blog->title = $validated['title'];
        $blog->description = $validated['description'] ?? null;
        $blog->cover_image = $validated['cover_image'] ?? null;
        $blog->content_json = $validated['content_json'] ?? null;
        $blog->content_markdown = $validated['content_markdown'] ?? null;
        $blog->author_id = $user->id;

        if ($request->boolean('published')) {
            $blog->published_at = now();
        }

        $blog->save();

        $this->syncTags($blog, $validated['tags'] ?? []);

        $blog->load(['author:id,name,email', 'tags:id,name,slug']);

        return response()->json(['blog' => $blog], 201);
    }

    public function update(Request $request, Blog $blog): JsonResponse
    {
        if ($blog->author_id !== $request->user()->id) {
            return response()->json(['error' => 'Forbidden.'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string|max:1000',
            'cover_image' => 'nullable|string|max:2048',
            'content_json' => 'nullable|json',
            'content_markdown' => 'nullable|string',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'published' => 'boolean',
        ]);

        if (isset($validated['title'])) {
            $blog->title = $validated['title'];
            $blog->slug = \Illuminate\Support\Str::slug($validated['title']) . '-' . \Illuminate\Support\Str::random(6);
        }

        if (array_key_exists('description', $validated)) {
            $blog->description = $validated['description'];
        }
        if (array_key_exists('cover_image', $validated)) {
            $blog->cover_image = $validated['cover_image'];
        }
        if (array_key_exists('content_json', $validated)) {
            $blog->content_json = $validated['content_json'];
        }
        if (array_key_exists('content_markdown', $validated)) {
            $blog->content_markdown = $validated['content_markdown'];
        }
        if ($request->has('published')) {
            $blog->published_at = $request->boolean('published') ? now() : null;
        }

        $blog->save();

        if ($request->has('tags')) {
            $this->syncTags($blog, $validated['tags'] ?? []);
        }

        $blog->load(['author:id,name,email', 'tags:id,name,slug']);

        return response()->json(['blog' => $blog]);
    }

    public function destroy(Request $request, Blog $blog): JsonResponse
    {
        if ($blog->author_id !== $request->user()->id) {
            return response()->json(['error' => 'Forbidden.'], 403);
        }

        $blog->delete();

        return response()->json(['message' => 'Blog deleted.']);
    }

    private function syncTags(Blog $blog, array $tagNames): void
    {
        $tagIds = [];
        foreach ($tagNames as $name) {
            $name = trim($name);
            if (empty($name)) continue;

            $tag = Tag::firstOrCreate(
                ['slug' => \Illuminate\Support\Str::slug($name)],
                ['name' => $name]
            );
            $tagIds[] = $tag->id;
        }

        $blog->tags()->sync($tagIds);
    }
}