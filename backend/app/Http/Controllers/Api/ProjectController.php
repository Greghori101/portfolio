<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['projects' => Project::orderByDesc('featured')->orderBy('sort_order')->orderByDesc('created_at')->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'link' => 'nullable|url|max:2048',
            'tech' => 'nullable|array',
            'tech.*' => 'string|max:100',
            'featured' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $project = Project::create($validated);

        return response()->json(['project' => $project], 201);
    }

    public function update(Request $request, Project $project): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'category' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'link' => 'nullable|url|max:2048',
            'tech' => 'nullable|array',
            'tech.*' => 'string|max:100',
            'featured' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $project->fill($validated);
        $project->save();

        return response()->json(['project' => $project]);
    }

    public function destroy(Project $project): JsonResponse
    {
        $project->delete();

        return response()->json(['message' => 'Project deleted.']);
    }
}
