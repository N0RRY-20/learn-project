<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SetoranHafalan extends Model
{
    use HasFactory;

    protected $table = 'setoran_hafalan';

    protected $fillable = [
        'target_id',         // ID target yang disetor (opsional)
        'santri_id',         // ID santri yang setor
        'surah_start',       // Surah mulai
        'ayah_start',        // Ayat mulai
        'surah_end',         // Surah selesai
        'ayah_end',          // Ayat selesai
        'status',            // 'belum_setor', 'di_ulang', 'lulus'
        'feedback_guru',     // Feedback dari guru
        'nilai',             // Nilai dari guru (1-100)
        'tanggal_setor',     // Kapan setor
        'tanggal_review',    // Kapan direview
    ];

    protected $casts = [
        'tanggal_setor' => 'datetime',
        'tanggal_review' => 'datetime',
    ];

    // Relasi ke target
    public function target()
    {
        return $this->belongsTo(TargetHafalan::class, 'target_id');
    }

    // Relasi ke santri
    public function santri()
    {
        return $this->belongsTo(Student::class, 'santri_id');
    }

    // Relasi ke surah
    public function surahStart()
    {
        return $this->belongsTo(Surah::class, 'surah_start');
    }

    public function surahEnd()
    {
        return $this->belongsTo(Surah::class, 'surah_end');
    }

    // Scope untuk setoran belum setor
    public function scopeBelumSetor($query)
    {
        return $query->where('status', 'belum_setor');
    }

    // Scope untuk setoran di ulang
    public function scopeDiUlang($query)
    {
        return $query->where('status', 'di_ulang');
    }

    // Scope untuk setoran lulus
    public function scopeLulus($query)
    {
        return $query->where('status', 'lulus');
    }

    // Scope untuk setoran santri tertentu
    public function scopeUntukSantri($query, $santriId)
    {
        return $query->where('santri_id', $santriId);
    }

    // Scope untuk tanggal tertentu
    public function scopeUntukTanggal($query, $tanggal)
    {
        return $query->whereDate('tanggal_setor', $tanggal);
    }

    // Scope untuk setoran yang belum direview
    public function scopeBelumDireview($query)
    {
        return $query->whereNull('tanggal_review');
    }

    // Helper method untuk mendapatkan juz berdasarkan surah dan ayat
    public function getJuzSetorAttribute()
    {
        // Ambil juz dari surah_start dan ayah_start
        $juzStart = SurahAyahJuz::where('surah_id', $this->surah_start)
            ->where('ayah_number', $this->ayah_start)
            ->value('juz_number');

        // Ambil juz dari surah_end dan ayah_end
        $juzEnd = SurahAyahJuz::where('surah_id', $this->surah_end)
            ->where('ayah_number', $this->ayah_end)
            ->value('juz_number');

        // Jika juz sama, return juz tersebut
        if ($juzStart === $juzEnd) {
            return $juzStart;
        }

        // Jika berbeda, return range juz
        return $juzStart.'-'.$juzEnd;
    }

    // Helper method untuk mendapatkan nama surah
    public function getNamaSurahStartAttribute()
    {
        return Surah::find($this->surah_start)?->nama_surah ?? 'Surah '.$this->surah_start;
    }

    public function getNamaSurahEndAttribute()
    {
        return Surah::find($this->surah_end)?->nama_surah ?? 'Surah '.$this->surah_end;
    }

    // Helper method untuk mendapatkan status dengan warna
    public function getStatusColorAttribute()
    {
        return match ($this->status) {
            'belum_setor' => 'gray',
            'di_ulang' => 'red',
            'lulus' => 'green',
            default => 'gray'
        };
    }

    // Helper method untuk mendapatkan status dalam bahasa Indonesia
    public function getStatusIndonesiaAttribute()
    {
        return match ($this->status) {
            'belum_setor' => 'Belum Setor',
            'di_ulang' => 'Di Ulang',
            'lulus' => 'Lulus',
            default => 'Tidak Diketahui'
        };
    }

    // Helper method untuk format tanggal setor
    public function getTanggalSetorFormattedAttribute()
    {
        return $this->tanggal_setor->format('d/m/Y H:i');
    }

    // Helper method untuk format tanggal review
    public function getTanggalReviewFormattedAttribute()
    {
        return $this->tanggal_review ? $this->tanggal_review->format('d/m/Y H:i') : '-';
    }

    // **BARU: Method untuk evaluasi target**
    public function getStatusTargetAttribute()
    {
        if (! $this->target) {
            return 'tanpa_target';
        }

        $target = $this->target;

        // Hitung total ayat yang ditargetkan
        $totalAyatTarget = $this->hitungTotalAyat($target->surah_start, $target->ayah_start, $target->surah_end, $target->ayah_end);

        // Hitung total ayat yang disetor
        $totalAyatSetor = $this->hitungTotalAyat($this->surah_start, $this->ayah_start, $this->surah_end, $this->ayah_end);

        // Evaluasi
        if ($totalAyatSetor < $totalAyatTarget) {
            return 'belum_tercapai';
        } elseif ($totalAyatSetor == $totalAyatTarget) {
            return 'sampai_target';
        } else {
            return 'melebihi_target';
        }
    }

    // **BARU: Method untuk mendapatkan status target dalam bahasa Indonesia**
    public function getStatusTargetIndonesiaAttribute()
    {
        return match ($this->status_target) {
            'tanpa_target' => 'Tanpa Target',
            'belum_tercapai' => 'Belum Tercapai',
            'sampai_target' => 'Sampai Target',
            'melebihi_target' => 'Melebihi Target',
            default => 'Tidak Diketahui'
        };
    }

    // **BARU: Method untuk mendapatkan warna status target**
    public function getStatusTargetColorAttribute()
    {
        return match ($this->status_target) {
            'tanpa_target' => 'bg-gray-100 text-gray-800',
            'belum_tercapai' => 'bg-red-100 text-red-800',
            'sampai_target' => 'bg-green-100 text-green-800',
            'melebihi_target' => 'bg-blue-100 text-blue-800',
            default => 'bg-gray-100 text-gray-800'
        };
    }

    // **BARU: Method untuk menghitung total ayat**
    private function hitungTotalAyat($surahStart, $ayahStart, $surahEnd, $ayahEnd)
    {
        if ($surahStart == $surahEnd) {
            // Jika surah sama, hitung selisih ayat
            return $ayahEnd - $ayahStart + 1;
        } else {
            // Jika surah berbeda, hitung total ayat dari surah start sampai surah end
            $total = 0;

            // Ayat dari surah start (dari ayah_start sampai akhir surah)
            $surahStartData = Surah::find($surahStart);
            $total += $surahStartData->jumlah_ayat - $ayahStart + 1;

            // Ayat dari surah-surah di antara (jika ada)
            for ($i = $surahStart + 1; $i < $surahEnd; $i++) {
                $surahData = Surah::find($i);
                $total += $surahData->jumlah_ayat;
            }

            // Ayat dari surah end (dari awal sampai ayah_end)
            $total += $ayahEnd;

            return $total;
        }
    }

    // **BARU: Method untuk mendapatkan persentase pencapaian target**
    public function getPersentaseTargetAttribute()
    {
        if (! $this->target) {
            return 0;
        }

        $target = $this->target;
        $totalAyatTarget = $this->hitungTotalAyat($target->surah_start, $target->ayah_start, $target->surah_end, $target->ayah_end);
        $totalAyatSetor = $this->hitungTotalAyat($this->surah_start, $this->ayah_start, $this->surah_end, $this->ayah_end);

        return round(($totalAyatSetor / $totalAyatTarget) * 100, 1);
    }
}
