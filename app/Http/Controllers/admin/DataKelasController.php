<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\DataKelas;
use App\Models\Student;
use App\Models\TeachersData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DataKelasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dataKelas = DataKelas::with(['students', 'walikelas.user'])->get();

        // lanjut sini buat relasi guru agar bisa di lihat detailnya
        return Inertia::render('admin/data/kelas/index', compact('dataKelas'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $students = Student::whereNull('kelas_id')->get();
        $teachers = TeachersData::whereHas('user.roles', function ($query) {
            $query->where('name', 'Guru Mapel');
        })
            ->with(['user.roles']) // biar relasinya langsung ikut di-load
            ->orderBy('id', 'asc')
            ->get();

        return Inertia::render('admin/data/kelas/create', compact('students', 'teachers'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // 1. Validasi Data
        $validated = $request->validate([
            'nama_kelas' => 'required|string|max:255|unique:data_kelas,nama_kelas',
            'waliKelas_id' => 'required|exists:teachers_data,id',
            'students' => 'required|array|min:1',
            // Validasi setiap elemen dalam array students
            'students.*.student_id' => [
                'required',
                'distinct', // Pastikan tidak ada ID siswa yang duplikat dalam satu request
                Rule::exists('students', 'id')->whereNull('kelas_id'), // Pastikan siswa ada dan belum punya kelas
            ],
        ]);

        // 2. Gunakan Database Transaction
        try {
            DB::transaction(function () use ($validated) {
                // a. Buat kelas baru
                $dataKelas = DataKelas::create([
                    'nama_kelas' => $validated['nama_kelas'],
                    'waliKelas_id' => $validated['waliKelas_id'],
                ]);

                // b. Dapatkan semua ID siswa dari request
                $studentIds = collect($validated['students'])->pluck('student_id');

                // c. Update semua siswa yang terpilih sekaligus (lebih efisien)
                Student::whereIn('id', $studentIds)->update(['kelas_id' => $dataKelas->id]);
            });
        } catch (\Throwable $e) {
            // Jika terjadi error, kembalikan ke halaman form dengan pesan error
            return redirect()->back()->with('error', 'Gagal menyimpan data kelas. Error: '.$e->getMessage());
        }

        // 3. Redirect ke halaman index dengan pesan sukses
        return redirect()->route('datakelas.index')->with('success', 'Data kelas berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(DataKelas $dataKelas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DataKelas $dataKelas)
    {
        $dataKelas->load(['students', 'walikelas.user']);

        $teachers = TeachersData::whereHas('user.roles', function ($query) {
            $query->where('name', 'Guru Mapel');
        })
            ->with(['user.roles']) // biar relasinya langsung ikut di-load
            ->orderBy('id', 'asc')
            ->get();

        $availableStudents = Student::whereNull('kelas_id')->orWhere('kelas_id', $dataKelas->id)->get();

        return Inertia::render('admin/data/kelas/edit', compact('dataKelas', 'availableStudents', 'teachers'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DataKelas $dataKelas)
    {
        $validated = $request->validate([
            'nama_kelas' => ['required', 'string', 'max:255', Rule::unique('data_kelas')->ignore($dataKelas->id)],
            'waliKelas_id' => 'required|exists:teachers_data,id',
            'students' => 'present|array',
            'students.*.student_id' => [
                'required',
                'distinct',

                Rule::exists('students', 'id')->where(function ($query) use ($dataKelas) {
                    $query->whereNull('kelas_id')->orWhere('kelas_id', $dataKelas->id);
                }),
            ],
        ]);

        DB::transaction(function () use ($validated, $dataKelas) {
            $dataKelas->update([
                'nama_kelas' => $validated['nama_kelas'],
                'waliKelas_id' => $validated['waliKelas_id'],
            ]);
            $submittedStudentIds = collect($validated['students'])->pluck('student_id');

            // Set siswa yang dikirim untuk masuk ke kelas ini
            Student::whereIn('id', $submittedStudentIds)->update(['kelas_id' => $dataKelas->id]);

            Student::where('kelas_id', $dataKelas->id)
                ->whereNotIn('id', $submittedStudentIds)
                ->update(['kelas_id' => null]);
        });

        return redirect()->route('datakelas.index')->with('success', 'Data kelas berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DataKelas $dataKelas)
    {
        $dataKelas->delete();

        return redirect()->route('datakelas.index')->with('success', 'Data kelas berhasil dihapus.');
    }
}
