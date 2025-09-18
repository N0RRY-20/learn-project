<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Murojaah extends Model
{
    protected $table = 'murojaah';

    protected $fillable = [
        'student_id',
        'teacher_id',
        'surah_start',
        'ayah_start',
        'surah_end',
        'ayah_end',
        'tanggal_murojaah',
        'status',
        'nilai',
        'catatan',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
}
