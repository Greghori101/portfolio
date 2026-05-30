<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class MediaController extends Controller
{
    /**
     * Upload a file to the authenticated user's media library.
     */
    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg,gif,webp,svg,bmp|max:20120',
        ]);

        if (! $request->hasFile('file')) {
            return response()->json(['error' => 'No file provided.'], 400);
        }

        $file = $request->file('file');

        /** @var \App\Models\User $user */
        $user = $request->user();

        $media = $user
            ->addMedia($file)
            ->toMediaCollection('uploads');

        return response()->json([
            'url' => $media->getUrl(),
            'path' => $media->getPath(),
            'id' => $media->id,
            'name' => $media->name,
            'size' => $media->size,
            'mime_type' => $media->mime_type,
        ]);
    }

    /**
     * List all uploaded media for the authenticated user.
     */
    public function index(Request $request): JsonResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        $media = $user->getMedia('uploads')->map(fn ($m) => [
            'id' => $m->id,
            'url' => $m->getUrl(),
            'name' => $m->name,
            'size' => $m->size,
            'mime_type' => $m->mime_type,
            'created_at' => $m->created_at,
        ]);

        return response()->json(['media' => $media]);
    }

    /**
     * Delete a media item.
     */
    public function destroy(Request $request, int $mediaId): JsonResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        $media = $user->media()->find($mediaId);

        if (! $media) {
            return response()->json(['error' => 'Media not found.'], 404);
        }

        $media->delete();

        return response()->json(['message' => 'Media deleted.']);
    }
}