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
        Schema::create('murojaah', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');

            $table->unsignedSmallInteger('surah_start'); // 1-114
            $table->unsignedSmallInteger('ayah_start'); // 1-286
            $table->unsignedSmallInteger('surah_end'); // 1-114
            $table->unsignedSmallInteger('ayah_end'); // 1-286
            $table->date('tanggal_murojaah');
            $table->enum('status', ['Lulus', 'Perlu Diulang', 'Belum Setor'])->default('Perlu Diulang');
            $table->integer('nilai')->nullable();
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('murojaah');
    }
};
