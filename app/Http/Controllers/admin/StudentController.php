<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::all();

        return Inertia::render('admin/data/students/index', compact('students'));
    }

    public function create()
    {
        return Inertia::render('admin/data/students/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'nisn' => 'required|string|unique:students',
            'class_level' => 'required|string',
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
        return Inertia::render('admin/data/students/edit', compact('student'));
    }

    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'nisn' => 'required|string|unique:students,nisn,'.$student->id,
            'class_level' => 'required|string',
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
