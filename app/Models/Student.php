<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'nisn',
        'birth_date',
        'gender',
        'address',
        'phone_number',
        'parent_name',
        'parent_occupation',
        'kelas_id',
        'halaqah_id',
    ];

    public function dataKelas()
    {
        return $this->belongsTo(DataKelas::class, 'kelas_id');
    }

    public function datahalaqah()
    {
        return $this->belongsTo(DataHalaqah::class, 'halaqah_id');
    }
}
