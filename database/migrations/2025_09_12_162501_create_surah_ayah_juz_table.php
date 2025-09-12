<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('surah_ayah_juz', function (Blueprint $table) {
            $table->id();
            $table->foreignId('surah_id')->constrained('surahs')->cascadeOnDelete();
            $table->unsignedSmallInteger('ayah_number');
            $table->unsignedTinyInteger('juz_number');
            $table->timestamps();

            $table->unique(['surah_id', 'ayah_number']); // Satu ayat hanya punya satu juz
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('surah_ayah_juz');
    }
};
