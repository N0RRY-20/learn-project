<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('setoran_hafalan', function (Blueprint $table) {
            $table->id();

            // Relasi ke target hafalan (opsional, bisa setor tanpa target)
            $table->foreignId('target_id')->nullable()->constrained('target_hafalan')->nullOnDelete();

            // Relasi ke santri yang setor
            $table->foreignId('santri_id')->constrained('students')->cascadeOnDelete();

            // Data setoran
            $table->unsignedSmallInteger('surah_start'); // 1-114
            $table->unsignedSmallInteger('ayah_start'); // 1-286
            $table->unsignedSmallInteger('surah_end'); // 1-114
            $table->unsignedSmallInteger('ayah_end'); // 1-286

            // Status berdasarkan kelancaran hafalan
            $table->enum('status', ['belum_setor', 'di_ulang', 'lulus'])->default('belum_setor');
            $table->text('feedback_guru')->nullable();
            $table->unsignedTinyInteger('nilai')->nullable(); // 1-100

            // Timestamps
            $table->datetime('tanggal_setor');
            $table->datetime('tanggal_review')->nullable();
            $table->timestamps();

            // Index untuk performa
            $table->index(['santri_id', 'tanggal_setor']);
            $table->index(['status', 'tanggal_setor']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('setoran_hafalan');
    }
};
