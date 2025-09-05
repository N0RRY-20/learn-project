<?php

namespace Database\Factories;

use App\Models\TeachersData;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TeachersData>
 */
class TeachersDataFactory extends Factory
{

     protected $model = TeachersData::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
         return [
            // ambil user random yang sudah ada
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'jenis_kelamin' => $this->faker->randomElement(['Laki-Laki', 'Perempuan']),
            'alamat' => $this->faker->address,
            'tanggal_lahir' => $this->faker->date(),
            'tempat_kelahiran' => $this->faker->city,
            'no_hp' => $this->faker->phoneNumber,
        ];
    }
}
