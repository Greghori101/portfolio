<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['experiences' => Experience::orderBy('sort_order')->orderByDesc('created_at')->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'start' => 'required|string|max:50',
            'end' => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'highlight' => 'nullable|string',
            'tech' => 'nullable|array',
            'tech.*' => 'string|max:100',
            'sort_order' => 'integer',
        ]);

        $experience = Experience::create($validated);

        return response()->json(['experience' => $experience], 201);
    }

    public function update(Request $request, Experience $experience): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'company' => 'sometimes|string|max:255',
            'start' => 'sometimes|string|max:50',
            'end' => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'highlight' => 'nullable|string',
            'tech' => 'nullable|array',
            'tech.*' => 'string|max:100',
            'sort_order' => 'integer',
        ]);

        $experience->fill($validated);
        $experience->save();

        return response()->json(['experience' => $experience]);
    }

    public function destroy(Experience $experience): JsonResponse
    {
        $experience->delete();

        return response()->json(['message' => 'Experience deleted.']);
    }
}
