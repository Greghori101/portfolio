<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\EducationController;
use App\Http\Controllers\Api\PublicationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/auth/send-code', [AuthController::class, 'sendCode']);
Route::post('/auth/verify-code', [AuthController::class, 'verifyCode']);

// Public blog routes
Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/blogs/{slug}', [BlogController::class, 'show']);
Route::get('/tags', [TagController::class, 'index']);

// Public portfolio content routes
Route::get('/portfolio/experiences', [ExperienceController::class, 'index']);
Route::get('/portfolio/projects', [ProjectController::class, 'index']);
Route::get('/portfolio/educations', [EducationController::class, 'index']);
Route::get('/portfolio/publications', [PublicationController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Media uploads
    Route::post('/upload', [MediaController::class, 'upload']);
    Route::get('/media', [MediaController::class, 'index']);
    Route::delete('/media/{mediaId}', [MediaController::class, 'destroy']);

    // Blog CRUD (authenticated)
    Route::post('/blogs', [BlogController::class, 'store']);
    Route::put('/blogs/{blog}', [BlogController::class, 'update']);
    Route::delete('/blogs/{blog}', [BlogController::class, 'destroy']);

    // Portfolio content CRUD (authenticated)
    Route::post('/portfolio/experiences', [ExperienceController::class, 'store']);
    Route::put('/portfolio/experiences/{experience}', [ExperienceController::class, 'update']);
    Route::delete('/portfolio/experiences/{experience}', [ExperienceController::class, 'destroy']);

    Route::post('/portfolio/projects', [ProjectController::class, 'store']);
    Route::put('/portfolio/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/portfolio/projects/{project}', [ProjectController::class, 'destroy']);

    Route::post('/portfolio/educations', [EducationController::class, 'store']);
    Route::put('/portfolio/educations/{education}', [EducationController::class, 'update']);
    Route::delete('/portfolio/educations/{education}', [EducationController::class, 'destroy']);

    Route::post('/portfolio/publications', [PublicationController::class, 'store']);
    Route::put('/portfolio/publications/{publication}', [PublicationController::class, 'update']);
    Route::delete('/portfolio/publications/{publication}', [PublicationController::class, 'destroy']);
});
