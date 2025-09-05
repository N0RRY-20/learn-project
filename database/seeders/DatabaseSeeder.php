<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\TeachersData;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(30)->create();
        TeachersData::factory(30)->create();


    DB::table('roles')->insert([
            ['name' => 'Admin'],
            ['name' => 'Guru Halaqah'],
            ['name' => 'Guru Mapel'],
            ['name' => 'Walimurid'],
        ]);
       

     $userId =  DB::table('users')->insertGetId([
            'name' => 'Nory',
            'email' => 'nory@exa.com',
            'password' => Hash::make('password'), // jangan simpan plain text!
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        $role = Role::where('name','Admin')->first();

        DB::table('role_user')->insert([
             'user_id' => $userId,
            'role_id' => $role -> id,
           
        ]);
    }
}
