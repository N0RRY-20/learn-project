<?php

namespace Database\Seeders;

use App\Models\TeachersData;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeachersDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         TeachersData::factory()->count(50)->create();
    }
}
