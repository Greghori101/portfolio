<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\JsonResponse;

class TagController extends Controller
{
    public function index(): JsonResponse
    {
        $tags = Tag::withCount('blogs')
            ->orderByDesc('blogs_count')
            ->get();

        return response()->json(['tags' => $tags]);
    }
}