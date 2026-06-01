<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Publication;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicationController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['publications' => Publication::orderBy('sort_order')->orderByDesc('created_at')->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'authors' => 'nullable|string',
            'publication' => 'nullable|string|max:255',
            'link' => 'nullable|url|max:2048',
            'sort_order' => 'integer',
        ]);

        $publication = Publication::create($validated);

        return response()->json(['publication' => $publication], 201);
    }

    public function update(Request $request, Publication $publication): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'authors' => 'nullable|string',
            'publication' => 'nullable|string|max:255',
            'link' => 'nullable|url|max:2048',
            'sort_order' => 'integer',
        ]);

        $publication->fill($validated);
        $publication->save();

        return response()->json(['publication' => $publication]);
    }

    public function destroy(Publication $publication): JsonResponse
    {
        $publication->delete();

        return response()->json(['message' => 'Publication deleted.']);
    }
}
