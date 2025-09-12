<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Surah extends Model
{
    use HasFactory;

    protected $table = 'surahs';

    protected $fillable = [
        'nama_surah',
        'jumlah_ayat',
    ];

    public function ayahJuzMappings()
    {
        return $this->hasMany(SurahAyahJuz::class, 'surah_id');
    }

    public function getJuzByAyah($ayahNumber)
    {
        return $this->ayahJuzMappings()
            ->where('ayah_number', $ayahNumber)
            ->value('juz_number');
    }
}
