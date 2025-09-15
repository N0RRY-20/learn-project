<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TargetHafalan extends Model
{
    use HasFactory;

    protected $table = 'target_hafalan';

    protected $fillable = [
        'guru_id',          // ID guru yang membuat target
        'santri_id',        // ID santri yang ditargetkan
        'surah_start',      // Surah mulai
        'ayah_start',       // Ayat mulai
        'surah_end',        // Surah selesai
        'ayah_end',         // Ayat selesai
        'tanggal_target',   // Tanggal target
        'status',           // 'aktif', 'selesai', 'batal'
    ];

    protected $casts = [
        'tanggal_target' => 'date',
    ];

    // Relasi ke guru
    public function guru()
    {
        return $this->belongsTo(User::class, 'guru_id');
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

    // Relasi ke setoran hafalan
    public function setorans()
    {
        return $this->hasMany(SetoranHafalan::class, 'target_id');
    }

    // Scope untuk target aktif
    public function scopeAktif($query)
    {
        return $query->where('status', 'aktif');
    }

    // Scope untuk target selesai
    public function scopeSelesai($query)
    {
        return $query->where('status', 'selesai');
    }

    // Scope untuk target batal
    public function scopeBatal($query)
    {
        return $query->where('status', 'batal');
    }

    // Scope untuk target guru tertentu
    public function scopeUntukGuru($query, $guruId)
    {
        return $query->where('guru_id', $guruId);
    }

    // Scope untuk target santri tertentu
    public function scopeUntukSantri($query, $santriId)
    {
        return $query->where('santri_id', $santriId);
    }

    // Scope untuk tanggal tertentu
    public function scopeUntukTanggal($query, $tanggal)
    {
        return $query->whereDate('tanggal_target', $tanggal);
    }

    // Helper method untuk mendapatkan juz berdasarkan surah dan ayat
    public function getJuzTargetAttribute()
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
            'aktif' => 'blue',
            'selesai' => 'green',
            'batal' => 'red',
            default => 'gray'
        };
    }

    // Helper method untuk mendapatkan status dalam bahasa Indonesia
    public function getStatusIndonesiaAttribute()
    {
        return match ($this->status) {
            'aktif' => 'Aktif',
            'selesai' => 'Selesai',
            'batal' => 'Batal',
            default => 'Tidak Diketahui'
        };
    }

    // Helper method untuk format tanggal target
    public function getTanggalFormattedAttribute()
    {
        return $this->tanggal_target->format('d/m/Y');
    }

    // Helper method untuk cek apakah target sudah ada setoran
    public function getSudahAdaSetoranAttribute()
    {
        return $this->setorans()->exists();
    }

    // Helper method untuk mendapatkan setoran terakhir
    public function getSetoranTerakhirAttribute()
    {
        $setoran = $this->setorans()->latest('tanggal_setor')->first();

        if ($setoran) {
            // Pastikan computed properties ter-load dengan memanggil accessor
            $setoran->status_target = $setoran->status_target;
            $setoran->persentase_target = $setoran->persentase_target;
        }

        return $setoran;
    }

    // **BARU: Method untuk cek apakah target sudah selesai dan bisa dihilangkan**
    public function getBisaDihilangkanAttribute()
    {
        $setoranTerakhir = $this->setoranTerakhir;

        if (! $setoranTerakhir) {
            return false; // Belum ada setoran
        }

        // Target bisa dihilangkan jika:
        // 1. Status target = "sampai_target" (100% tercapai)
        // 2. Status hafalan = "lulus"
        return $setoranTerakhir->status_target === 'sampai_target' &&
            $setoranTerakhir->status === 'lulus';
    }

    // **BARU: Method untuk mendapatkan status target berdasarkan setoran terakhir**
    public function getStatusTargetDariSetoranAttribute()
    {
        $setoranTerakhir = $this->setoranTerakhir;

        if (! $setoranTerakhir) {
            return 'belum_setor';
        }

        return $setoranTerakhir->status_target ?? 'tanpa_target';
    }

    // **BARU: Method untuk mendapatkan status hafalan dari setoran terakhir**
    public function getStatusHafalanDariSetoranAttribute()
    {
        $setoranTerakhir = $this->setoranTerakhir;

        if (! $setoranTerakhir) {
            return 'belum_setor';
        }

        return $setoranTerakhir->status;
    }

    // **BARU: Method untuk mendapatkan persentase target dari setoran terakhir**
    public function getPersentaseTargetDariSetoranAttribute()
    {
        $setoranTerakhir = $this->setoranTerakhir;

        if (! $setoranTerakhir) {
            return 0;
        }

        return $setoranTerakhir->persentase_target ?? 0;
    }
}
