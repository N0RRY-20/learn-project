<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\DataHalaqah;
use App\Models\DataKelas;
use App\Models\Student;
use App\Models\TeachersData;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DataHalaqahController extends Controller
{
    public function index()
    {
        $halaqah = DataHalaqah::with('students', 'teacher.user')->get();

        return Inertia::render('admin/data/halaqah/index', compact('halaqah'));
    }

    public function create()
    {
        $students = Student::whereNull('halaqah_id')->get();
        $teachers = TeachersData::whereHas('user.roles', function ($query) {
            $query->where('name', 'Guru Halaqah');
        })
            ->with(['user.roles']) // biar relasinya langsung ikut di-load
            ->orderBy('id', 'asc')
            ->get();
        $kelas = DataKelas::all();

        return Inertia::render('admin/data/halaqah/create', compact('teachers', 'students', 'kelas'));
    }

    public function store()
    {
        $attributes = request()->validate([
            'nama_halaqah' => 'required|string|max:255',
            'teacher_id' => 'required|exists:teachers_data,id',
            'students' => 'required|array|min:1',
            // Validasi setiap elemen dalam array students
            'students.*.student_id' => [
                'required',
                'distinct', // Pastikan tidak ada ID siswa yang duplikat dalam satu request
                Rule::exists('students', 'id')->whereNull('halaqah_id'), // Pastikan siswa ada dan belum punya kelas
            ],
        ]);

        try {
            DB::transaction(function () use ($attributes) {
                // a. Buat kelas baru
                $datahalaqah = DataHalaqah::create([
                    'nama_halaqah' => $attributes['nama_halaqah'],
                    'teacher_id' => $attributes['teacher_id'],
                ]);

                // b. Dapatkan semua ID siswa dari request
                $studentIds = collect($attributes['students'])->pluck('student_id');

                // c. Update semua siswa yang terpilih sekaligus (lebih efisien)
                Student::whereIn('id', $studentIds)->update(['halaqah_id' => $datahalaqah->id]);
            });
        } catch (\Throwable $e) {
            // Jika terjadi error, kembalikan ke halaman form dengan pesan error
            return redirect()->back()->with('error', 'Gagal menyimpan data kelas. Error: '.$e->getMessage());
        }

        return to_route('datahalaqah.index')->with('success', 'Data Halaqah berhasil ditambahkan.');
    }

    public function edit(DataHalaqah $datahalaqah)
    {
        $datahalaqah->load(['students', 'teacher.user']);
        $teachers = TeachersData::whereHas('user.roles', function ($query) {
            $query->where('name', 'Guru Halaqah');
        })
            ->with(['user.roles']) // biar relasinya langsung ikut di-load
            ->orderBy('id', 'asc')
            ->get();

        $availableStudents = Student::whereNull('halaqah_id')->orWhere('halaqah_id', $datahalaqah->id)->get();
        $kelas = DataKelas::all();

        return Inertia::render('admin/data/halaqah/edit', compact('datahalaqah', 'teachers', 'availableStudents', 'kelas'));
    }

    public function update(DataHalaqah $datahalaqah)
    {
        $attributes = request()->validate([
            'nama_halaqah' => 'required|string|max:255',
            'teacher_id' => 'required|exists:teachers_data,id',
            'students' => 'present|array',
            'students.*.student_id' => [
                'required',
                'distinct',

                Rule::exists('students', 'id')->where(function ($query) use ($datahalaqah) {
                    $query->whereNull('halaqah_id')->orWhere('halaqah_id', $datahalaqah->id);
                }),
            ],
        ]);

        DB::transaction(function () use ($attributes, $datahalaqah) {
            $datahalaqah->update([
                'nama_halaqah' => $attributes['nama_halaqah'],
                'teacher_id' => $attributes['teacher_id'],
            ]);
            $submittedStudentIds = collect($attributes['students'])->pluck('student_id');

            // Set siswa yang dikirim untuk masuk ke kelas ini
            Student::whereIn('id', $submittedStudentIds)->update(['halaqah_id' => $datahalaqah->id]);

            Student::where('halaqah_id', $datahalaqah->id)
                ->whereNotIn('id', $submittedStudentIds)
                ->update(['halaqah_id' => null]);
        });

        return to_route('datahalaqah.index')->with('success', 'Data Halaqah berhasil diupdate.');
    }

    public function destroy(DataHalaqah $datahalaqah)
    {
        $datahalaqah->delete();

        return to_route('datahalaqah.index')->with('success', 'Data Halaqah berhasil dihapus.');
    }
}
