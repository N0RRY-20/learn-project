<?php

namespace App\Http\Controllers;

use App\Models\DataHalaqah;
use App\Models\Student;
use App\Models\Surah;
use App\Models\TargetHafalan;
use App\Models\TeachersData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TargetHafalanController extends Controller
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

        // Ambil halaqah guru ini
        $halaqah = DataHalaqah::where('teacher_id', $guru->id)->first();

        if (! $halaqah) {
            return Inertia::render('tahfidz/targets/index', [
                'targets' => [],
                'santri' => [],
                'surahs' => [],
                'message' => 'Anda belum memiliki halaqah',
            ]);
        }

        // Ambil santri di halaqah ini
        $santri = Student::where('halaqah_id', $halaqah->id)->get();

        // Ambil target untuk santri di halaqah ini
        $targets = TargetHafalan::with(['santri', 'setorans.target'])
            ->whereHas('santri', function ($query) use ($halaqah) {
                $query->where('halaqah_id', $halaqah->id);
            })
            ->orderBy('tanggal_target', 'desc')
            ->get();

        // **TAMBAHKAN: Filter target yang belum bisa dihilangkan**
        $targetsTampil = $targets->filter(function ($target) {
            return ! $target->bisa_dihilangkan;
        });

        // **TAMBAHKAN: Map computed properties untuk setiap target**
        $targetsWithStatus = $targetsTampil->map(function ($target) {
            $target->status_target_dari_setoran = $target->status_target_dari_setoran;
            $target->status_hafalan_dari_setoran = $target->status_hafalan_dari_setoran;
            $target->persentase_target_dari_setoran = $target->persentase_target_dari_setoran;
            $target->bisa_dihilangkan = $target->bisa_dihilangkan;
            $target->juz_target = $target->juz_target;

            return $target;
        });

        // Group targets by tanggal
        $targetsGrouped = $targetsWithStatus->groupBy(function ($target) {
            return $target->tanggal_target->format('Y-m-d');
        });

        // Ambil target hari ini (semua, bukan hanya yang pertama)
        $targetHariIni = $targetsWithStatus->where('tanggal_target', today())->values();

        return Inertia::render('tahfidz/targets/index', [
            'targets' => $targetsGrouped,
            'santri' => $santri,
            'surahs' => Surah::orderBy('id')->get(),
            'targetHariIni' => $targetHariIni,
            'tanggalHariIni' => today()->format('Y-m-d'),
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
            return Inertia::render('tahfidz/targets/create', [
                'santri' => [],
                'surahs' => [],
                'message' => 'Anda belum memiliki halaqah',
            ]);
        }

        $santri = Student::where('halaqah_id', $halaqah->id)->get();

        return Inertia::render('tahfidz/targets/create', [
            'santri' => $santri,
            'surahs' => Surah::orderBy('id')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        // Hanya guru halaqah yang bisa buat target
        if (! $user->roles->contains('name', 'Guru Halaqah')) {
            abort(403, 'Hanya guru halaqah yang bisa buat target hafalan');
        }

        $guru = TeachersData::where('user_id', $user->id)->first();
        $halaqah = DataHalaqah::where('teacher_id', $guru->id)->first();

        $request->validate([
            'santri_id' => 'required|exists:students,id',
            'surah_start' => 'required|integer|min:1|max:114',
            'ayah_start' => 'required|integer|min:1|max:286',
            'surah_end' => 'required|integer|min:1|max:114',
            'ayah_end' => 'required|integer|min:1|max:286',
            'tanggal_target' => 'required|date|after_or_equal:today',
        ]);

        // Pastikan santri ada di halaqah guru ini
        $santri = Student::where('id', $request->santri_id)
            ->where('halaqah_id', $halaqah->id)
            ->first();

        if (! $santri) {
            return back()->withErrors(['santri_id' => 'Santri tidak ada di halaqah Anda']);
        }

        // Validasi surah dan ayat
        $surahStart = Surah::find($request->surah_start);
        $surahEnd = Surah::find($request->surah_end);

        if (! $surahStart || ! $surahEnd) {
            return back()->withErrors(['surah' => 'Surah tidak valid']);
        }

        if ($request->ayah_start > $surahStart->jumlah_ayat) {
            return back()->withErrors(['ayah_start' => 'Ayat melebihi jumlah ayat surah '.$surahStart->nama_surah]);
        }

        if ($request->ayah_end > $surahEnd->jumlah_ayat) {
            return back()->withErrors(['ayah_end' => 'Ayat melebihi jumlah ayat surah '.$surahEnd->nama_surah]);
        }

        // Cek apakah sudah ada target untuk santri di tanggal yang sama
        $existingTarget = TargetHafalan::where('santri_id', $request->santri_id)
            ->whereDate('tanggal_target', $request->tanggal_target)
            ->where('status', 'aktif')
            ->first();

        if ($existingTarget) {
            return back()->withErrors(['tanggal_target' => 'Santri sudah memiliki target aktif di tanggal ini']);
        }

        TargetHafalan::create([
            'guru_id' => $user->id,
            'santri_id' => $request->santri_id,
            'surah_start' => $request->surah_start,
            'ayah_start' => $request->ayah_start,
            'surah_end' => $request->surah_end,
            'ayah_end' => $request->ayah_end,
            'tanggal_target' => $request->tanggal_target,
        ]);

        return to_route('target-hafalan.index')->with('success', 'Target hafalan berhasil dibuat');
    }

    public function update(Request $request, TargetHafalan $target)
    {
        $user = Auth::user();

        // Hanya guru halaqah yang bisa update
        if (! $user->roles->contains('name', 'Guru Halaqah')) {
            abort(403, 'Hanya guru halaqah yang bisa update target');
        }

        $guru = TeachersData::where('user_id', $user->id)->first();
        $halaqah = DataHalaqah::where('teacher_id', $guru->id)->first();

        // Pastikan target ini untuk santri di halaqah guru ini
        if ($target->santri->halaqah_id !== $halaqah->id) {
            abort(403, 'Target ini bukan untuk santri di halaqah Anda');
        }

        // Izinkan update penuh seperti di store
        $request->validate([
            'santri_id' => 'sometimes|exists:students,id',
            'surah_start' => 'sometimes|integer|min:1|max:114',
            'ayah_start' => 'sometimes|integer|min:1|max:286',
            'surah_end' => 'sometimes|integer|min:1|max:114',
            'ayah_end' => 'sometimes|integer|min:1|max:286',
            'tanggal_target' => 'sometimes|date',
            'status' => 'sometimes|in:aktif,selesai,batal',
        ]);

        // Validasi opsional jika field dikirim
        if ($request->filled('santri_id')) {
            $santri = Student::where('id', $request->santri_id)
                ->where('halaqah_id', $halaqah->id)
                ->first();
            if (! $santri) {
                return back()->withErrors(['santri_id' => 'Santri tidak ada di halaqah Anda']);
            }
        }

        if ($request->filled('surah_start')) {
            $surahStart = Surah::find($request->surah_start);
            if (! $surahStart) {
                return back()->withErrors(['surah_start' => 'Surah mulai tidak valid']);
            }
            if ($request->filled('ayah_start') && $request->ayah_start > $surahStart->jumlah_ayat) {
                return back()->withErrors(['ayah_start' => 'Ayat melebihi jumlah ayat surah '.$surahStart->nama_surah]);
            }
        }
        if ($request->filled('surah_end')) {
            $surahEnd = Surah::find($request->surah_end);
            if (! $surahEnd) {
                return back()->withErrors(['surah_end' => 'Surah selesai tidak valid']);
            }
            if ($request->filled('ayah_end') && $request->ayah_end > $surahEnd->jumlah_ayat) {
                return back()->withErrors(['ayah_end' => 'Ayat melebihi jumlah ayat surah '.$surahEnd->nama_surah]);
            }
        }

        $target->update($request->only([
            'santri_id',
            'surah_start',
            'ayah_start',
            'surah_end',
            'ayah_end',
            'tanggal_target',
            'status',
        ]));

        return to_route('target-hafalan.index')->with('success', 'Target berhasil diupdate');
    }

    public function destroy(TargetHafalan $target)
    {
        $user = Auth::user();

        // Hanya guru halaqah yang bisa hapus
        if (! $user->roles->contains('name', 'Guru Halaqah')) {
            abort(403, 'Hanya guru halaqah yang bisa hapus target');
        }

        $guru = TeachersData::where('user_id', $user->id)->first();
        $halaqah = DataHalaqah::where('teacher_id', $guru->id)->first();

        // Pastikan target ini untuk santri di halaqah guru ini
        if ($target->santri->halaqah_id !== $halaqah->id) {
            abort(403, 'Target ini bukan untuk santri di halaqah Anda');
        }

        $target->delete();

        return back()->with('success', 'Target berhasil dihapus');
    }

    public function edit(TargetHafalan $target)
    {
        $user = Auth::user();
        if (! $user->roles->contains('name', 'Guru Halaqah')) {
            abort(403, 'Hanya guru halaqah yang bisa akses');
        }
        $guru = TeachersData::where('user_id', $user->id)->first();
        $halaqah = DataHalaqah::where('teacher_id', $guru->id)->first();

        if ($target->santri->halaqah_id !== $halaqah->id) {
            abort(403, 'Target ini bukan untuk santri di halaqah Anda');
        }

        $santri = Student::where('halaqah_id', $halaqah->id)->get();

        return Inertia::render('tahfidz/targets/edit', [
            'target' => $target,
            'santri' => $santri,
            'surahs' => Surah::orderBy('id')->get(),
        ]);
    }
}
