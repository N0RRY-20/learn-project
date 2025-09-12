<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Seeder; // Jangan lupa tambahkan ini!

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Panggil factory dan bilang: "Tolong buatkan 20 data siswa!"
        Student::factory(20)->create();
    }
}
