<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('target_hafalan', function (Blueprint $table) {
            $table->id();

            // Relasi ke guru yang membuat target
            $table->foreignId('guru_id')->constrained('users')->cascadeOnDelete();

            // Relasi ke santri yang ditargetkan
            $table->foreignId('santri_id')->constrained('students')->cascadeOnDelete();

            // Data target hafalan
            $table->unsignedSmallInteger('surah_start'); // 1-114
            $table->unsignedSmallInteger('ayah_start'); // 1-286
            $table->unsignedSmallInteger('surah_end'); // 1-114
            $table->unsignedSmallInteger('ayah_end'); // 1-286

            // Tanggal target
            $table->date('tanggal_target');

            // Status target
            $table->enum('status', ['aktif', 'selesai', 'batal'])->default('aktif');

            $table->timestamps();

            // Index untuk performa
            $table->index(['guru_id', 'tanggal_target']);
            $table->index(['santri_id', 'tanggal_target']);
            $table->index(['status', 'tanggal_target']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('target_hafalan');
    }
};
