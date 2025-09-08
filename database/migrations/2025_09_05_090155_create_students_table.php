<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('nisn')->unique();
            $table->string('class_level');
            $table->date('birth_date');
            $table->enum('gender', ['Laki-Laki', 'Perempuan']);
            $table->text('address');
            $table->string('phone_number');

            // --- Ditambah ini ---
            $table->string('parent_name'); // Nama Orang Tua/Wali
            $table->string('parent_occupation')->nullable(); // Pekerjaan Orang Tua/Wali (boleh kosong)

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
