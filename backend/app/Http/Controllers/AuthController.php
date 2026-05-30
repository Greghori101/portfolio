<?php

namespace App\Http\Controllers;

use App\Mail\LoginCodeMail;
use App\Models\LoginCode;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function sendCode(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $email = $request->input('email');

        // Find or create the user
        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => explode('@', $email)[0],
                'password' => bcrypt(\Illuminate\Support\Str::random(32)),
            ]
        );

        // Generate a login code
        $loginCode = LoginCode::generateForEmail($email);

        // Send the code via email
        Mail::to($email)->send(new LoginCodeMail($loginCode));

        return response()->json([
            'message' => 'Login code sent to your email.',
        ]);
    }

    public function verifyCode(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string|size:6',
        ]);

        $loginCode = LoginCode::where('email', $request->input('email'))
            ->where('code', $request->input('code'))
            ->whereNull('used_at')
            ->where('expires_at', '>', now())
            ->first();

        if (! $loginCode) {
            throw ValidationException::withMessages([
                'code' => ['The provided code is invalid or expired.'],
            ]);
        }

        $loginCode->markAsUsed();

        $user = User::where('email', $request->input('email'))->firstOrFail();

        // Revoke previous tokens
        $user->tokens()->delete();

        // Create a new token
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'Logged in successfully.',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }

    public function user(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }
}