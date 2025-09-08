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
        'class_level',
        'birth_date',
        'gender',
        'address',
        'phone_number',
        'parent_name',
        'parent_occupation',
    ];
}
