<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Education;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'educations' => Education::orderBy('sort_order')->orderByDesc('created_at')->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'start' => 'nullable|string|max:50',
            'end' => 'nullable|string|max:50',
            'thesis' => 'nullable|string|max:255',
            'details' => 'nullable|string',
            'sort_order' => 'integer',
        ]);

        $education = Education::create($validated);

        return response()->json(['education' => $education], 201);
    }

    public function update(Request $request, Education $education): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'institution' => 'sometimes|string|max:255',
            'start' => 'nullable|string|max:50',
            'end' => 'nullable|string|max:50',
            'thesis' => 'nullable|string|max:255',
            'details' => 'nullable|string',
            'sort_order' => 'integer',
        ]);

        $education->fill($validated);
        $education->save();

        return response()->json(['education' => $education]);
    }

    public function destroy(Education $education): JsonResponse
    {
        $education->delete();

        return response()->json(['message' => 'Education entry deleted.']);
    }
}
