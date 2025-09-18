<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MurojaahSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('murojaah')->delete();

        $data = [
            [
                'student_id' => 1, // pastikan student_id=1 ada di tabel students
                'teacher_id' => 1, // pastikan teacher_id=1 ada di tabel users
                'surah_start' => 2,  // Al-Baqarah
                'ayah_start' => 1,
                'surah_end' => 2,
                'ayah_end' => 5,
                'tanggal_murojaah' => Carbon::now()->subDays(3),
                'status' => 'Lulus',
                'nilai' => 90,
                'catatan' => 'Bacaan lancar dan tajwid bagus',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'student_id' => 2,
                'teacher_id' => 1,
                'surah_start' => 18, // Al-Kahf
                'ayah_start' => 1,
                'surah_end' => 18,
                'ayah_end' => 10,
                'tanggal_murojaah' => Carbon::now()->subDays(2),
                'status' => 'Perlu Diulang',
                'nilai' => 70,
                'catatan' => 'Masih terbata-bata di beberapa ayat',
                'created_at' => now(),
                'updated_at' => now(),
            ],

        ];

        DB::table('murojaah')->insert($data);
    }
}
