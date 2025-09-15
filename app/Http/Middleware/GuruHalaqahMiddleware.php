<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class GuruHalaqahMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Cek apakah user login dan punya role "Guru Halaqah"
        if (! Auth::check() || ! Auth::user()->roles->contains('name', 'Guru Halaqah')) {
            abort(403, 'Hanya Guru Halaqah yang bisa akses.');
        }

        return $next($request);
    }
}
