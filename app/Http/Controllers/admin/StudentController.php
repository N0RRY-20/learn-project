<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\DataKelas;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia; // tambah import

class StudentController extends Controller
{
    public function index()
    {
        // Eager load relasi kelas agar dapat ditampilkan di tabel
        $students = Student::with('dataKelas')->get();

        return Inertia::render('admin/data/students/index', compact('students'));
    }

    public function create()
    {
        // Kirim daftar kelas untuk dipilih pada form
        $kelas = DataKelas::all();

        return Inertia::render('admin/data/students/create', compact('kelas'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'nisn' => 'required|string|unique:students',
            // ganti class_level -> kelas_id yang merujuk ke tabel data_kelas
            'kelas_id' => 'nullable|exists:data_kelas,id',
            'birth_date' => 'required|date',
            'gender' => 'required|in:Laki-Laki,Perempuan',
            'address' => 'required|string',
            'phone_number' => 'required|string',
            'parent_name' => 'required|string',
            'parent_occupation' => 'nullable|string',
        ]);

        Student::create($validated);

        return redirect()->route('students')->with('success', 'data berhasil ditambahkan');
    }

    public function edit(Student $student)
    {
        // Kirim daftar kelas untuk pilihan, dan data student
        $kelas = DataKelas::all();

        return Inertia::render('admin/data/students/edit', compact('student', 'kelas'));
    }

    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'nisn' => 'required|string|unique:students,nisn,'.$student->id,
            // ganti class_level -> kelas_id yang merujuk ke tabel data_kelas
            'kelas_id' => 'nullable|exists:data_kelas,id',
            'birth_date' => 'required|date',
            'gender' => 'required|in:Laki-Laki,Perempuan',
            'address' => 'required|string',
            'phone_number' => 'required|string',
            'parent_name' => 'required|string',
            'parent_occupation' => 'nullable|string',
        ]);

        $student->update($validated);

        return redirect()->route('students')->with('success', 'data berhasil diupdate');
    }

    public function destroy(Student $student)
    {
        $student->delete();

        return redirect()->route('students')->with('success', 'data berhasil dihapus');
    }
}
