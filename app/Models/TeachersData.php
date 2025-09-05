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
        'tanggal_lahir',
        'tempat_kelahiran',
        'no_hp',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class,'user_id','id');
    }
}
