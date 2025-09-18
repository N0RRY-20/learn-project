<?php

use App\Http\Controllers\admin\DataHalaqahController;
use App\Http\Controllers\admin\DataKelasController;
use App\Http\Controllers\admin\StudentController;
use App\Http\Controllers\admin\TeachersDataController;
use App\Http\Controllers\admin\UserDataController;
use App\Http\Controllers\GuruHalaqah\MurojaahController;
use App\Http\Controllers\SetoranHafalanController;
use App\Http\Controllers\TargetHafalanController;
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

    // Data halaqah=====================================
    Route::get('datahalaqah', [DataHalaqahController::class, 'index'])->name('datahalaqah.index');
    Route::get('datahalaqahCreate', [DataHalaqahController::class, 'create'])->name('datahalaqah.create');
    Route::post('datahalaqahStore', [DataHalaqahController::class, 'store'])->name('datahalaqah.store');
    Route::delete('datahalaqahDestroy/{datahalaqah}', [DataHalaqahController::class, 'destroy'])->name('datahalaqah.destroy');
    Route::get('datahalaqahEdit/{datahalaqah}', [DataHalaqahController::class, 'edit'])->name('datahalaqah.edit');
    Route::post('datahalaqahUpdate/{datahalaqah}', [DataHalaqahController::class, 'update'])->name('datahalaqah.update');
    Route::get('datahalaqahShow/{datahalaqah}', [DataHalaqahController::class, 'show'])->name('datahalaqah.show');

    // data kelas=============
    Route::get('datakelas', [DataKelasController::class, 'index'])->name('datakelas.index');
    Route::get('datakelasCreate', [DataKelasController::class, 'create'])->name('datakelas.create');
    Route::post('datakelasStore', [DataKelasController::class, 'store'])->name('datakelas.store');
    Route::get('datakelasEdit/{dataKelas}', [DataKelasController::class, 'edit'])->name('datakelas.edit');
    Route::put('datakelasUpdate/{dataKelas}', [DataKelasController::class, 'update'])->name('datakelas.update');
    Route::delete('datakelasDestroy/{dataKelas}', [DataKelasController::class, 'destroy'])->name('datakelas.destroy');
});

Route::middleware(['auth', 'GuruHalaqah'])->group(function () {
    // Setoran Hafalan (Hanya Guru)
    Route::get('setoran-hafalan', [SetoranHafalanController::class, 'index'])->name('setoran-hafalan.index');
    Route::get('setoran-hafalan/create', [SetoranHafalanController::class, 'create'])->name('setoran-hafalan.create');
    Route::get('setoran-hafalan/{setoran}/edit', [SetoranHafalanController::class, 'edit'])->name('setoran-hafalan.edit');
    Route::post('setoran-hafalan', [SetoranHafalanController::class, 'store'])->name('setoran-hafalan.store');
    Route::put('setoran-hafalan/{setoran}', [SetoranHafalanController::class, 'update'])->name('setoran-hafalan.update');
    Route::delete('setoran-hafalan/{setoran}', [SetoranHafalanController::class, 'destroy'])->name('setoran-hafalan.destroy');

    // Target Hafalan (Hanya Guru)
    Route::get('target-hafalan', [TargetHafalanController::class, 'index'])->name('target-hafalan.index');
    Route::get('target-hafalan/create', [TargetHafalanController::class, 'create'])->name('target-hafalan.create');
    Route::get('target-hafalan/{target}/edit', [TargetHafalanController::class, 'edit'])->name('target-hafalan.edit');
    Route::post('target-hafalan', [TargetHafalanController::class, 'store'])->name('target-hafalan.store');
    Route::put('target-hafalan/{target}', [TargetHafalanController::class, 'update'])->name('target-hafalan.update');
    Route::delete('target-hafalan/{target}', [TargetHafalanController::class, 'destroy'])->name('target-hafalan.destroy');

    // Murojaah (Hanya Guru)
    Route::get('murojaah', [MurojaahController::class, 'index'])->name('murojaah.index');
    Route::get('murojaah/create', [MurojaahController::class, 'create'])->name('murojaah.create');
    Route::get('murojaah/{murojaah}/edit', [MurojaahController::class, 'edit'])->name('murojaah.edit');
    Route::post('murojaah', [MurojaahController::class, 'store'])->name('murojaah.store');
    Route::put('murojaah/{murojaah}', [MurojaahController::class, 'update'])->name('murojaah.update');
    Route::delete('murojaah/{murojaah}', [MurojaahController::class, 'destroy'])->name('murojaah.destroy');
});
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
