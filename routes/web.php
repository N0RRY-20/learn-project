<?php

use App\Http\Controllers\admin\StudentController;
use App\Http\Controllers\admin\TeachersDataController;
use App\Http\Controllers\admin\UserDataController;
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
    // teacher data ==============================
    Route::get('teachersData', [TeachersDataController::class, 'index'])->name('teachersData');
    Route::get('teachersCreate', [TeachersDataController::class, 'create'])->name('teachers.create');
    Route::post('teachersStore', [TeachersDataController::class, 'store'])->name('teachers.store');
    Route::delete('/teachersDestroy/{teachersData}', [TeachersDataController::class, 'destroy'])->name('teachers.destroy');
    Route::get('/teachersEdit/{teachersData}', [TeachersDataController::class, 'edit'])->name('teachers.edit');
    Route::put('/teachersUpdate/{teachersData}', [TeachersDataController::class, 'update'])->name('teachers.update');
    // ==============================================

    //  student data ==============================
    Route::get('students', [StudentController::class, 'index'])->name('students');
    Route::get('studentsCreate', [StudentController::class, 'create'])->name('students.create');
    Route::post('studentsStore', [StudentController::class, 'store'])->name('students.store');
    Route::delete('/studentsDestroy/{student}', [StudentController::class, 'destroy'])->name('students.destroy');
    Route::get('/studentsEdit/{student}', [StudentController::class, 'edit'])->name('students.edit');
    Route::put('/studentsUpdate/{student}', [StudentController::class, 'update'])->name('students.update');
    // ==============================================

    // user data ==============================
    Route::get('usersData', [UserDataController::class, 'index'])->name('usersData');
    Route::get('usersCreate', [UserDataController::class, 'create'])->name('users.create');
    Route::post('usersStore', [UserDataController::class, 'store'])->name('users.store');
    Route::get('/usersEdit/{user}', [UserDataController::class, 'edit'])->name('users.edit');
    Route::put('/usersUpdate/{user}', [UserDataController::class, 'update'])->name('users.update');
    Route::delete('/usersDestroy/{user}', [UserDataController::class, 'destroy'])->name('users.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
