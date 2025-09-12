<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            ['name' => 'Admin'],
            ['name' => 'Guru Halaqah'],
            ['name' => 'Guru Mapel'],
            ['name' => 'Walimurid'],
        ];

        foreach ($roles as $role) {
            DB::table('roles')->updateOrInsert(
                ['name' => $role['name']], // cek unik berdasarkan nama
                $role // kalau ada, update; kalau belum, insert
            );
        }
    }
}
