<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataHalaqah extends Model
{
    use HasFactory;

    // Nama tabel (opsional, karena Laravel otomatis pakai 'data_halaqah')
    protected $table = 'data_halaqah';

    // Kolom yang bisa diisi mass-assignment
    protected $fillable = [
        'nama_halaqah',
        'teacher_id',
    ];

    /**
     * Relasi ke model TeacherData
     * Satu Halaqah dimiliki oleh satu Teacher
     */
    public function teacher()
    {
        return $this->belongsTo(TeachersData::class, 'teacher_id');
    }

    public function students()
    {
        return $this->hasMany(Student::class, 'halaqah_id');
    }
}
