<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TeachersDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat user dulu (karena teachers_data butuh user_id)
        $userId = DB::table('users')->insertGetId([
            'name' => 'amad',
            'email' => 'amad@mail.com',
            'password' => Hash::make('password'), // jangan lupa hash password
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 2. Buat teacher data
        $teacherId = DB::table('teachers_data')->insertGetId([
            'user_id' => $userId,
            'jenis_kelamin' => 'Laki-Laki',
            'alamat' => 'Jl. Pesantren No. 12',
            'birth_date' => '1985-05-10',
            'tempat_kelahiran' => 'Bandung',
            'no_hp' => '08123456789',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 3. Beri role "Guru Halaqah" (atau sesuai yang kamu punya di tabel roles)
        $roleId = DB::table('roles')->where('name', 'Guru Halaqah')->value('id');

        if ($roleId) {
            DB::table('role_user')->insert([
                'user_id' => $userId,
                'role_id' => $roleId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
