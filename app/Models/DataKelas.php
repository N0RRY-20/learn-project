<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataKelas extends Model
{
    use HasFactory;

    protected $table = 'data_kelas'; // nama tabel

    protected $fillable = [
        'nama_kelas',
        'waliKelas_id',
    ];

    public function students()
    {
        return $this->hasMany(Student::class, 'kelas_id');
    }

    public function walikelas()
    {
        return $this->belongsTo(TeachersData::class, 'waliKelas_id');
    }
}
