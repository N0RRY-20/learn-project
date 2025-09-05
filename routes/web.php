<?php

use App\Http\Controllers\TeachersDataController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'Admin'])->group(function () {

    Route::get('teachersData', [TeachersDataController::class, 'index'])->name('teachersData');
    Route::get('teachersCreate', [TeachersDataController::class, 'create'])->name('teachers.create');
    Route::post('teachersStore', [TeachersDataController::class, 'store'])->name('teachers.store');
    Route::delete('/teachersDestroy/{teachersData}', [TeachersDataController::class, 'destroy'])->name('teachers.destroy');
    Route::get('/teachersEdit/{teachersData}', [TeachersDataController::class, 'edit'])->name('teachers.edit');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
