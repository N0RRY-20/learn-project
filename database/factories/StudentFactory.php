<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'nisn' => $this->faker->unique()->numerify('##########'), // 10 digit angka unik

            'birth_date' => $this->faker->dateTimeBetween('-18 years', '-15 years'),
            'gender' => $this->faker->randomElement(['Laki-laki', 'Perempuan']),
            'address' => $this->faker->address(),
            'phone_number' => $this->faker->phoneNumber(),
            'parent_name' => $this->faker->name(),
            'parent_occupation' => $this->faker->jobTitle(),
        ];
    }
}
