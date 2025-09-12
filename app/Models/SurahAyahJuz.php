<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurahAyahJuz extends Model
{
    use HasFactory;

    protected $table = 'surah_ayah_juz';

    protected $fillable = [
        'surah_id',
        'ayah_number',
        'juz_number',
    ];

    public function surah()
    {
        return $this->belongsTo(Surah::class, 'surah_id');
    }
}
