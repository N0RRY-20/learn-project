<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TeachersData extends Model
{
    use HasFactory;

    protected $table = 'teachers_data';

    protected $fillable = [
        'user_id',
        'jenis_kelamin',
        'alamat',
        'birth_date',
        'tempat_kelahiran',
        'no_hp',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_user');
    }

    public function dataKelas()
    {
        return $this->hasOne(DataKelas::class, 'waliKelas_id');
    }
}
