<?php

namespace App\Http\Controllers;

use App\Models\DataHalaqah;
use App\Models\SetoranHafalan;
use App\Models\Student;
use App\Models\Surah;
use App\Models\TargetHafalan;
use App\Models\TeachersData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SetoranHafalanController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Hanya guru halaqah yang bisa akses
        if (! $user->roles()->where('name', 'Guru Halaqah')->exists()) {
            abort(403, 'Hanya guru halaqah yang bisa akses');
        }

        $guru = TeachersData::where('user_id', $user->id)->first();

        if (! $guru) {
            abort(403, 'Anda bukan guru halaqah');
        }

        // Ambil halaqah guru ini
        $halaqah = DataHalaqah::where('teacher_id', $guru->id)->first();

        if (! $halaqah) {
            return Inertia::render('tahfidz/setoran/index', [
                'setorans' => [],
                'santri' => [],
                'surahs' => [],
                'targets' => [],
                'message' => 'Anda belum memiliki halaqah',
            ]);
        }

        // Ambil santri di halaqah ini
        $santri = Student::where('halaqah_id', $halaqah->id)->get();

        // Ambil target aktif untuk dropdown (dengan filter auto-hide)
        $allTargets = TargetHafalan::with(['santri', 'setorans.target'])
            ->whereHas('santri', function ($query) use ($halaqah) {
                $query->where('halaqah_id', $halaqah->id);
            })
            ->where('status', 'aktif')
            ->get();

        // Filter target yang belum bisa dihilangkan (sama seperti di TargetHafalanController)
        $targets = $allTargets->filter(function ($target) {
            return !$target->bisa_dihilangkan;
        });

        // Ambil setoran dari santri di halaqah ini
        $setorans = SetoranHafalan::with(['santri', 'target'])
            ->whereHas('santri', function ($query) use ($halaqah) {
                $query->where('halaqah_id', $halaqah->id);
            })
            ->orderBy('tanggal_setor', 'desc')
            ->get();

        // **TAMBAHKAN: Evaluasi status target untuk setiap setoran**
        $setoransWithStatus = $setorans->map(function ($setoran) {
            $setoran->status_target = $setoran->status_target;
            $setoran->status_target_indonesia = $setoran->status_target_indonesia;
            $setoran->status_target_color = $setoran->status_target_color;
            $setoran->persentase_target = $setoran->persentase_target;
            return $setoran;
        });

        return Inertia::render('tahfidz/setoran/index', [
            'setorans' => $setoransWithStatus,
            'santri' => $santri,
            'surahs' => Surah::orderBy('id')->get(),
            'targets' => $targets->values()->toArray(), // Konversi Collection ke array
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        // Hanya guru halaqah yang bisa input setoran
        if (! $user->roles()->where('name', 'Guru Halaqah')->exists()) {
            abort(403, 'Hanya guru halaqah yang bisa input setoran hafalan');
        }

        $guru = TeachersData::where('user_id', $user->id)->first();
        $halaqah = DataHalaqah::where('teacher_id', $guru->id)->first();

        $request->validate([
            'santri_id' => 'required|exists:students,id',
            'target_id' => 'nullable|exists:target_hafalan,id',
            'surah_start' => 'required|integer|min:1|max:114',
            'ayah_start' => 'required|integer|min:1|max:286',
            'surah_end' => 'required|integer|min:1|max:114',
            'ayah_end' => 'required|integer|min:1|max:286',
            'status' => 'required|in:belum_setor,di_ulang,lulus',
            'feedback_guru' => 'nullable|string|max:1000',
            'nilai' => 'nullable|integer|min:1|max:100',
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
            return back()->withErrors(['ayah_start' => 'Ayat melebihi jumlah ayat surah ' . $surahStart->nama_surah]);
        }

        if ($request->ayah_end > $surahEnd->jumlah_ayat) {
            return back()->withErrors(['ayah_end' => 'Ayat melebihi jumlah ayat surah ' . $surahEnd->nama_surah]);
        }

        // Convert 'null' string to actual null
        $targetId = $request->target_id === 'null' ? null : $request->target_id;

        SetoranHafalan::create([
            'target_id' => $targetId,
            'santri_id' => $request->santri_id,
            'surah_start' => $request->surah_start,
            'ayah_start' => $request->ayah_start,
            'surah_end' => $request->surah_end,
            'ayah_end' => $request->ayah_end,
            'status' => $request->status,
            'feedback_guru' => $request->feedback_guru,
            'nilai' => $request->nilai,
            'tanggal_setor' => now(),
            'tanggal_review' => now(), // Langsung direview karena guru yang input
        ]);

        return back()->with('success', 'Setoran hafalan berhasil disimpan');
    }

    public function update(Request $request, SetoranHafalan $setoran)
    {
        $user = Auth::user();

        // Hanya guru halaqah yang bisa update
        if (! $user->roles()->where('name', 'Guru Halaqah')->exists()) {
            abort(403, 'Hanya guru halaqah yang bisa update setoran');
        }

        $guru = TeachersData::where('user_id', $user->id)->first();
        $halaqah = DataHalaqah::where('teacher_id', $guru->id)->first();

        // Pastikan setoran ini dari santri di halaqah guru ini
        if ($setoran->santri->halaqah_id !== $halaqah->id) {
            abort(403, 'Setoran ini bukan dari santri di halaqah Anda');
        }

        $request->validate([
            'status' => 'required|in:belum_setor,di_ulang,lulus',
            'feedback_guru' => 'nullable|string|max:1000',
            'nilai' => 'nullable|integer|min:1|max:100',
        ]);

        $setoran->update([
            'status' => $request->status,
            'feedback_guru' => $request->feedback_guru,
            'nilai' => $request->nilai,
            'tanggal_review' => now(),
        ]);

        return back()->with('success', 'Setoran berhasil diupdate');
    }

    public function destroy(SetoranHafalan $setoran)
    {
        $user = Auth::user();

        // Hanya guru halaqah yang bisa hapus
        if (! $user->roles()->where('name', 'Guru Halaqah')->exists()) {
            abort(403, 'Hanya guru halaqah yang bisa hapus setoran');
        }

        $guru = TeachersData::where('user_id', $user->id)->first();
        $halaqah = DataHalaqah::where('teacher_id', $guru->id)->first();

        // Pastikan setoran ini dari santri di halaqah guru ini
        if ($setoran->santri->halaqah_id !== $halaqah->id) {
            abort(403, 'Setoran ini bukan dari santri di halaqah Anda');
        }

        $setoran->delete();

        return back()->with('success', 'Setoran berhasil dihapus');
    }
}
