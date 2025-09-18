<?php

namespace App\Http\Controllers\GuruHalaqah;

use App\Http\Controllers\Controller;
use App\Models\DataHalaqah;
use App\Models\Murojaah;
use App\Models\Student;
use App\Models\Surah;
use App\Models\TeachersData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MurojaahController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Hanya guru halaqah yang bisa akses
        if (! $user->roles->contains('name', 'Guru Halaqah')) {
            abort(403, 'Hanya guru halaqah yang bisa akses');
        }

        $guru = TeachersData::where('user_id', $user->id)->first();

        if (! $guru) {
            abort(403, 'Anda bukan guru halaqah');
        }
        $murojaah = Murojaah::with(['student', 'teacher'])->latest()->get();

        return Inertia::render('tahfidz/murojaah/index', [
            'murojaah' => $murojaah,
        ]);
    }

    public function create()
    {
        $user = Auth::user();

        if (! $user->roles->contains('name', 'Guru Halaqah')) {
            abort(403, 'Hanya guru halaqah yang bisa akses');
        }

        $guru = TeachersData::where('user_id', $user->id)->first();
        if (! $guru) {
            abort(403, 'Anda bukan guru halaqah');
        }
        $halaqah = DataHalaqah::where('teacher_id', $guru->id)->first();

        if (! $halaqah) {
            return Inertia::render('tahfidz/setoran/create', [
                'santri' => [],
                'surahs' => [],
                'targets' => [],
                'message' => 'Anda belum memiliki halaqah',
            ]);
        }
        $santri = Student::where('halaqah_id', $halaqah->id)->get();

        return Inertia::render('tahfidz/murojaah/create', [
            'santri' => $santri,
            'surahs' => Surah::all(['id', 'nama_surah']),
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        if (! $user->roles->contains('name', 'Guru Halaqah')) {
            abort(403, 'Hanya guru halaqah yang bisa akses');
        }

        $guru = TeachersData::where('user_id', $user->id)->first();
        if (! $guru) {
            abort(403, 'Anda bukan guru halaqah');
        }
        $halaqah = DataHalaqah::where('teacher_id', $guru->id)->first();

        if (! $halaqah) {
            return Inertia::render('tahfidz/setoran/create', [
                'santri' => [],
                'surahs' => [],
                'targets' => [],
                'message' => 'Anda belum memiliki halaqah',
            ]);
        }
        $santri = Student::where('halaqah_id', $halaqah->id)->get();

        $request->validate([
            'student_id' => 'required|exists:students,id',
            'surah_start' => 'required|integer|min:1|max:114',
            'ayah_start' => 'required|integer|min:1',
            'surah_end' => 'required|integer|min:1|max:114',
            'ayah_end' => 'required|integer|min:1',
            'status' => 'required|in:Lulus,Perlu Diulang',
            'nilai' => 'nullable|integer|min:0|max:100',
            'catatan' => 'nullable|string',
        ]);

        $santri = Student::where('id', $request->student_id)
            ->where('halaqah_id', $halaqah->id)
            ->first();

        if (! $santri) {
            return redirect()->back()->with('error', 'Santri tidak ditemukan');
        }
        $surahStart = Surah::find($request->surah_start);
        $surahEnd = Surah::find($request->surah_end);

        if ($request->surah_start > $request->surah_end) {
            return back()->withErrors([
                'surah_start' => 'Perhatikan Urutan Surah',
                'surah_end' => 'Perhatikan Urutan Surah',
            ])->withInput();
        }

        if (! $surahStart || ! $surahEnd) {
            return back()->withErrors(['surah' => 'Surah tidak valid']);
        }

        if ($request->ayah_start > $surahStart->jumlah_ayat) {
            return back()->withErrors(['ayah_start' => 'Ayat melebihi jumlah ayat surah '.$surahStart->nama_surah]);
        }

        if ($request->ayah_end > $surahEnd->jumlah_ayat) {
            return back()->withErrors(['ayah_end' => 'Ayat melebihi jumlah ayat surah '.$surahEnd->nama_surah]);
        }

        Murojaah::create([
            'student_id' => $request->student_id,
            'teacher_id' => $user->id, // Tambahkan teacher_id dari user yang login
            'surah_start' => $request->surah_start,
            'ayah_start' => $request->ayah_start,
            'surah_end' => $request->surah_end,
            'ayah_end' => $request->ayah_end,
            'tanggal_murojaah' => now(),
            'status' => $request->status,
            'nilai' => $request->nilai,
            'catatan' => $request->catatan,
        ]);

        return redirect()->route('murojaah.index')->with('success', 'Murojaah berhasil ditambahkan');
    }

    public function edit(Murojaah $murojaah)
    {
        $user = Auth::user();

        if (! $user->roles->contains('name', 'Guru Halaqah')) {
            abort(403, 'Hanya guru halaqah yang bisa akses');
        }

        $guru = TeachersData::where('user_id', $user->id)->first();
        if (! $guru) {
            abort(403, 'Anda bukan guru halaqah');
        }
        $halaqah = DataHalaqah::where('teacher_id', $guru->id)->first();

        if (! $halaqah) {
            return Inertia::render('tahfidz/setoran/create', [
                'santri' => [],
                'surahs' => [],
                'targets' => [],
                'message' => 'Anda belum memiliki halaqah',
            ]);
        }
        $santri = Student::where('halaqah_id', $halaqah->id)->get();

        return Inertia::render('tahfidz/murojaah/edit', [
            'murojaah' => $murojaah,
            'santri' => $santri,
            'surahs' => Surah::all(['id', 'nama_surah']),
        ]);
    }

    public function update(Request $request, Murojaah $murojaah)
    {
        $user = Auth::user();

        if (! $user->roles->contains('name', 'Guru Halaqah')) {
            abort(403, 'Hanya guru halaqah yang bisa akses');
        }

        $guru = TeachersData::where('user_id', $user->id)->first();
        if (! $guru) {
            abort(403, 'Anda bukan guru halaqah');
        }
        $halaqah = DataHalaqah::where('teacher_id', $guru->id)->first();

        if (! $halaqah) {
            return Inertia::render('tahfidz/setoran/create', [
                'santri' => [],
                'surahs' => [],
                'targets' => [],
                'message' => 'Anda belum memiliki halaqah',
            ]);
        }

        $request->validate([
            'student_id' => 'required|exists:students,id',
            'surah_start' => 'required|integer|min:1|max:114',
            'ayah_start' => 'required|integer|min:1|max:286',
            'surah_end' => 'required|integer|min:1|max:114',
            'ayah_end' => 'required|integer|min:1|max:286',
            'status' => 'required|in:Lulus,Perlu Diulang',
            'nilai' => 'nullable|integer|min:0|max:100',
            'catatan' => 'nullable|string',
        ]);

        $murojaah->update($request->all());

        return redirect()->route('murojaah.index')->with('success', 'Murojaah berhasil diupdate');
    }

    public function destroy(Murojaah $murojaah)
    {
        $murojaah->delete();

        return redirect()->route('murojaah.index')->with('success', 'Murojaah berhasil dihapus');
    }
}
