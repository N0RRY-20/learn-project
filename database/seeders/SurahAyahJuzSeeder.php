<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SurahAyahJuzSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('surah_ayah_juz')->delete();

        $ayahJuzMappings = [];

        // Juz 1: Al-Fatihah (1-7) + Al-Baqarah (1-141)
        // Al-Fatihah
        for ($ayah = 1; $ayah <= 7; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 1,
                'ayah_number' => $ayah,
                'juz_number' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Baqarah ayat 1-141 di Juz 1
        for ($ayah = 1; $ayah <= 141; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 2,
                'ayah_number' => $ayah,
                'juz_number' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Juz 2: Al-Baqarah (142-286) + Ali Imran (1-92)
        // Al-Baqarah ayat 142-286 di Juz 2
        for ($ayah = 142; $ayah <= 286; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 2,
                'ayah_number' => $ayah,
                'juz_number' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Ali Imran ayat 1-92 di Juz 2
        for ($ayah = 1; $ayah <= 92; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 3,
                'ayah_number' => $ayah,
                'juz_number' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Juz 3: Ali Imran (93-200) + An-Nisa (1-23)
        // Ali Imran ayat 93-200 di Juz 3
        for ($ayah = 93; $ayah <= 200; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 3,
                'ayah_number' => $ayah,
                'juz_number' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // An-Nisa ayat 1-23 di Juz 3
        for ($ayah = 1; $ayah <= 23; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 4,
                'ayah_number' => $ayah,
                'juz_number' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Juz 4: An-Nisa (24-176) + Al-Maidah (1-81)
        // An-Nisa ayat 24-176 di Juz 4
        for ($ayah = 24; $ayah <= 176; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 4,
                'ayah_number' => $ayah,
                'juz_number' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Maidah ayat 1-81 di Juz 4
        for ($ayah = 1; $ayah <= 81; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 5,
                'ayah_number' => $ayah,
                'juz_number' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Juz 5: Al-Maidah (82-120) + Al-An'am (1-110)
        // Al-Maidah ayat 82-120 di Juz 5
        for ($ayah = 82; $ayah <= 120; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 5,
                'ayah_number' => $ayah,
                'juz_number' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-An'am ayat 1-110 di Juz 5
        for ($ayah = 1; $ayah <= 110; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 6,
                'ayah_number' => $ayah,
                'juz_number' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Juz 6: Al-An'am (111-165) + Al-A'raf (1-87)
        // Al-An'am ayat 111-165 di Juz 6
        for ($ayah = 111; $ayah <= 165; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 6,
                'ayah_number' => $ayah,
                'juz_number' => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-A'raf ayat 1-87 di Juz 6
        for ($ayah = 1; $ayah <= 87; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 7,
                'ayah_number' => $ayah,
                'juz_number' => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Juz 7: Al-A'raf (88-206) + Al-Anfal (1-75) + At-Taubah (1-92)
        // Al-A'raf ayat 88-206 di Juz 7
        for ($ayah = 88; $ayah <= 206; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 7,
                'ayah_number' => $ayah,
                'juz_number' => 7,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Anfal ayat 1-75 di Juz 7
        for ($ayah = 1; $ayah <= 75; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 8,
                'ayah_number' => $ayah,
                'juz_number' => 7,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // At-Taubah ayat 1-92 di Juz 7
        for ($ayah = 1; $ayah <= 92; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 9,
                'ayah_number' => $ayah,
                'juz_number' => 7,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Juz 8: At-Taubah (93-129) + Yunus (1-109)
        // At-Taubah ayat 93-129 di Juz 8
        for ($ayah = 93; $ayah <= 129; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 9,
                'ayah_number' => $ayah,
                'juz_number' => 8,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Yunus ayat 1-109 di Juz 8
        for ($ayah = 1; $ayah <= 109; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 10,
                'ayah_number' => $ayah,
                'juz_number' => 8,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Juz 9: Hud (1-5) + Yusuf (1-52)
        // Hud ayat 1-5 di Juz 9
        for ($ayah = 1; $ayah <= 5; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 11,
                'ayah_number' => $ayah,
                'juz_number' => 9,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Yusuf ayat 1-52 di Juz 9
        for ($ayah = 1; $ayah <= 52; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 12,
                'ayah_number' => $ayah,
                'juz_number' => 9,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Juz 10: Yusuf (53-111) + Ar-Ra'd (1-43) + Ibrahim (1-52) + Al-Hijr (1-99)
        // Yusuf ayat 53-111 di Juz 10
        for ($ayah = 53; $ayah <= 111; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 12,
                'ayah_number' => $ayah,
                'juz_number' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Ar-Ra'd ayat 1-43 di Juz 10
        for ($ayah = 1; $ayah <= 43; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 13,
                'ayah_number' => $ayah,
                'juz_number' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Ibrahim ayat 1-52 di Juz 10
        for ($ayah = 1; $ayah <= 52; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 14,
                'ayah_number' => $ayah,
                'juz_number' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Hijr ayat 1-99 di Juz 10
        for ($ayah = 1; $ayah <= 99; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 15,
                'ayah_number' => $ayah,
                'juz_number' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Juz 11: An-Nahl (1-128) + Al-Isra (1-111) + Al-Kahf (1-110)
        // An-Nahl ayat 1-128 di Juz 11
        for ($ayah = 1; $ayah <= 128; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 16,
                'ayah_number' => $ayah,
                'juz_number' => 11,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Isra ayat 1-111 di Juz 11
        for ($ayah = 1; $ayah <= 111; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 17,
                'ayah_number' => $ayah,
                'juz_number' => 11,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Kahf ayat 1-110 di Juz 11
        for ($ayah = 1; $ayah <= 110; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 18,
                'ayah_number' => $ayah,
                'juz_number' => 11,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Juz 12: Maryam (1-98) + Taha (1-135) + Al-Anbiya (1-112)
        // Maryam ayat 1-98 di Juz 12
        for ($ayah = 1; $ayah <= 98; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 19,
                'ayah_number' => $ayah,
                'juz_number' => 12,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Taha ayat 1-135 di Juz 12
        for ($ayah = 1; $ayah <= 135; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 20,
                'ayah_number' => $ayah,
                'juz_number' => 12,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Anbiya ayat 1-112 di Juz 12
        for ($ayah = 1; $ayah <= 112; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 21,
                'ayah_number' => $ayah,
                'juz_number' => 12,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Juz 13: Al-Hajj (1-78) + Al-Mu'minun (1-118) + An-Nur (1-64) + Al-Furqan (1-77) + Asy-Syu'ara (1-227)
        // Al-Hajj ayat 1-78 di Juz 13
        for ($ayah = 1; $ayah <= 78; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 22,
                'ayah_number' => $ayah,
                'juz_number' => 13,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Mu'minun ayat 1-118 di Juz 13
        for ($ayah = 1; $ayah <= 118; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 23,
                'ayah_number' => $ayah,
                'juz_number' => 13,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // An-Nur ayat 1-64 di Juz 13
        for ($ayah = 1; $ayah <= 64; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 24,
                'ayah_number' => $ayah,
                'juz_number' => 13,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Furqan ayat 1-77 di Juz 13
        for ($ayah = 1; $ayah <= 77; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 25,
                'ayah_number' => $ayah,
                'juz_number' => 13,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Asy-Syu'ara ayat 1-227 di Juz 13
        for ($ayah = 1; $ayah <= 227; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 26,
                'ayah_number' => $ayah,
                'juz_number' => 13,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Juz 14: An-Naml (1-93) + Al-Qasas (1-88) + Al-'Ankabut (1-69) + Ar-Rum (1-60) + Luqman (1-34) + As-Sajdah (1-30) + Al-Ahzab (1-73)
        // An-Naml ayat 1-93 di Juz 14
        for ($ayah = 1; $ayah <= 93; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 27,
                'ayah_number' => $ayah,
                'juz_number' => 14,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Qasas ayat 1-88 di Juz 14
        for ($ayah = 1; $ayah <= 88; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 28,
                'ayah_number' => $ayah,
                'juz_number' => 14,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-'Ankabut ayat 1-69 di Juz 14
        for ($ayah = 1; $ayah <= 69; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 29,
                'ayah_number' => $ayah,
                'juz_number' => 14,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Ar-Rum ayat 1-60 di Juz 14
        for ($ayah = 1; $ayah <= 60; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 30,
                'ayah_number' => $ayah,
                'juz_number' => 14,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Luqman ayat 1-34 di Juz 14
        for ($ayah = 1; $ayah <= 34; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 31,
                'ayah_number' => $ayah,
                'juz_number' => 14,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // As-Sajdah ayat 1-30 di Juz 14
        for ($ayah = 1; $ayah <= 30; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 32,
                'ayah_number' => $ayah,
                'juz_number' => 14,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Ahzab ayat 1-73 di Juz 14
        for ($ayah = 1; $ayah <= 73; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 33,
                'ayah_number' => $ayah,
                'juz_number' => 14,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Juz 15: Saba (1-54) + Fatir (1-45) + Ya-Sin (1-83) + As-Saffat (1-182) + Sad (1-88) + Az-Zumar (1-75)
        // Saba ayat 1-54 di Juz 15
        for ($ayah = 1; $ayah <= 54; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 34,
                'ayah_number' => $ayah,
                'juz_number' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Fatir ayat 1-45 di Juz 15
        for ($ayah = 1; $ayah <= 45; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 35,
                'ayah_number' => $ayah,
                'juz_number' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Ya-Sin ayat 1-83 di Juz 15
        for ($ayah = 1; $ayah <= 83; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 36,
                'ayah_number' => $ayah,
                'juz_number' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // As-Saffat ayat 1-182 di Juz 15
        for ($ayah = 1; $ayah <= 182; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 37,
                'ayah_number' => $ayah,
                'juz_number' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Sad ayat 1-88 di Juz 15
        for ($ayah = 1; $ayah <= 88; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 38,
                'ayah_number' => $ayah,
                'juz_number' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Az-Zumar ayat 1-75 di Juz 15
        for ($ayah = 1; $ayah <= 75; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 39,
                'ayah_number' => $ayah,
                'juz_number' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Juz 16: Ghafir (1-85) + Fussilat (1-54) + Asy-Syura (1-53) + Az-Zukhruf (1-89) + Ad-Dukhan (1-59) + Al-Jasiyah (1-37) + Al-Ahqaf (1-35)
        // Ghafir ayat 1-85 di Juz 16
        for ($ayah = 1; $ayah <= 85; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 40,
                'ayah_number' => $ayah,
                'juz_number' => 16,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Fussilat ayat 1-54 di Juz 16
        for ($ayah = 1; $ayah <= 54; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 41,
                'ayah_number' => $ayah,
                'juz_number' => 16,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Asy-Syura ayat 1-53 di Juz 16
        for ($ayah = 1; $ayah <= 53; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 42,
                'ayah_number' => $ayah,
                'juz_number' => 16,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Az-Zukhruf ayat 1-89 di Juz 16
        for ($ayah = 1; $ayah <= 89; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 43,
                'ayah_number' => $ayah,
                'juz_number' => 16,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Ad-Dukhan ayat 1-59 di Juz 16
        for ($ayah = 1; $ayah <= 59; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 44,
                'ayah_number' => $ayah,
                'juz_number' => 16,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Jasiyah ayat 1-37 di Juz 16
        for ($ayah = 1; $ayah <= 37; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 45,
                'ayah_number' => $ayah,
                'juz_number' => 16,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Ahqaf ayat 1-35 di Juz 16
        for ($ayah = 1; $ayah <= 35; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 46,
                'ayah_number' => $ayah,
                'juz_number' => 16,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Juz 17: Muhammad (1-38) + Al-Fath (1-29) + Al-Hujurat (1-18) + Qaf (1-45) + Az-Zariyat (1-60) + At-Tur (1-49) + An-Najm (1-62) + Al-Qamar (1-55) + Ar-Rahman (1-78) + Al-Waqi'ah (1-96) + Al-Hadid (1-29) + Al-Mujadilah (1-22)
        // Muhammad ayat 1-38 di Juz 17
        for ($ayah = 1; $ayah <= 38; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 47,
                'ayah_number' => $ayah,
                'juz_number' => 17,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Fath ayat 1-29 di Juz 17
        for ($ayah = 1; $ayah <= 29; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 48,
                'ayah_number' => $ayah,
                'juz_number' => 17,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Hujurat ayat 1-18 di Juz 17
        for ($ayah = 1; $ayah <= 18; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 49,
                'ayah_number' => $ayah,
                'juz_number' => 17,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Qaf ayat 1-45 di Juz 17
        for ($ayah = 1; $ayah <= 45; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 50,
                'ayah_number' => $ayah,
                'juz_number' => 17,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Az-Zariyat ayat 1-60 di Juz 17
        for ($ayah = 1; $ayah <= 60; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 51,
                'ayah_number' => $ayah,
                'juz_number' => 17,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // At-Tur ayat 1-49 di Juz 17
        for ($ayah = 1; $ayah <= 49; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 52,
                'ayah_number' => $ayah,
                'juz_number' => 17,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // An-Najm ayat 1-62 di Juz 17
        for ($ayah = 1; $ayah <= 62; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 53,
                'ayah_number' => $ayah,
                'juz_number' => 17,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Qamar ayat 1-55 di Juz 17
        for ($ayah = 1; $ayah <= 55; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 54,
                'ayah_number' => $ayah,
                'juz_number' => 17,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Ar-Rahman ayat 1-78 di Juz 17
        for ($ayah = 1; $ayah <= 78; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 55,
                'ayah_number' => $ayah,
                'juz_number' => 17,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Waqi'ah ayat 1-96 di Juz 17
        for ($ayah = 1; $ayah <= 96; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 56,
                'ayah_number' => $ayah,
                'juz_number' => 17,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Hadid ayat 1-29 di Juz 17
        for ($ayah = 1; $ayah <= 29; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 57,
                'ayah_number' => $ayah,
                'juz_number' => 17,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Mujadilah ayat 1-22 di Juz 17
        for ($ayah = 1; $ayah <= 22; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 58,
                'ayah_number' => $ayah,
                'juz_number' => 17,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Juz 18: Al-Hasyr (1-24) + Al-Mumtahanah (1-13) + As-Saff (1-14) + Al-Jumu'ah (1-11) + Al-Munafiqun (1-11) + At-Tagabun (1-18) + At-Talaq (1-12) + At-Tahrim (1-12) + Al-Mulk (1-30) + Al-Qalam (1-52) + Al-Haqqah (1-52) + Al-Ma'arij (1-44) + Nuh (1-28) + Al-Jinn (1-28) + Al-Muzzammil (1-20) + Al-Muddassir (1-56) + Al-Qiyamah (1-40) + Al-Insan (1-31) + Al-Mursalat (1-50) + An-Naba (1-40)
        // Al-Hasyr ayat 1-24 di Juz 18
        for ($ayah = 1; $ayah <= 24; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 59,
                'ayah_number' => $ayah,
                'juz_number' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Mumtahanah ayat 1-13 di Juz 18
        for ($ayah = 1; $ayah <= 13; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 60,
                'ayah_number' => $ayah,
                'juz_number' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // As-Saff ayat 1-14 di Juz 18
        for ($ayah = 1; $ayah <= 14; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 61,
                'ayah_number' => $ayah,
                'juz_number' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Jumu'ah ayat 1-11 di Juz 18
        for ($ayah = 1; $ayah <= 11; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 62,
                'ayah_number' => $ayah,
                'juz_number' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Munafiqun ayat 1-11 di Juz 18
        for ($ayah = 1; $ayah <= 11; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 63,
                'ayah_number' => $ayah,
                'juz_number' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // At-Tagabun ayat 1-18 di Juz 18
        for ($ayah = 1; $ayah <= 18; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 64,
                'ayah_number' => $ayah,
                'juz_number' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // At-Talaq ayat 1-12 di Juz 18
        for ($ayah = 1; $ayah <= 12; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 65,
                'ayah_number' => $ayah,
                'juz_number' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // At-Tahrim ayat 1-12 di Juz 18
        for ($ayah = 1; $ayah <= 12; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 66,
                'ayah_number' => $ayah,
                'juz_number' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Mulk ayat 1-30 di Juz 18
        for ($ayah = 1; $ayah <= 30; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 67,
                'ayah_number' => $ayah,
                'juz_number' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Qalam ayat 1-52 di Juz 18
        for ($ayah = 1; $ayah <= 52; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 68,
                'ayah_number' => $ayah,
                'juz_number' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Haqqah ayat 1-52 di Juz 18
        for ($ayah = 1; $ayah <= 52; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 69,
                'ayah_number' => $ayah,
                'juz_number' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Ma'arij ayat 1-44 di Juz 18
        for ($ayah = 1; $ayah <= 44; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 70,
                'ayah_number' => $ayah,
                'juz_number' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Nuh ayat 1-28 di Juz 18
        for ($ayah = 1; $ayah <= 28; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 71,
                'ayah_number' => $ayah,
                'juz_number' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Jinn ayat 1-28 di Juz 18
        for ($ayah = 1; $ayah <= 28; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 72,
                'ayah_number' => $ayah,
                'juz_number' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Muzzammil ayat 1-20 di Juz 18
        for ($ayah = 1; $ayah <= 20; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 73,
                'ayah_number' => $ayah,
                'juz_number' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Muddassir ayat 1-56 di Juz 18
        for ($ayah = 1; $ayah <= 56; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 74,
                'ayah_number' => $ayah,
                'juz_number' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Qiyamah ayat 1-40 di Juz 18
        for ($ayah = 1; $ayah <= 40; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 75,
                'ayah_number' => $ayah,
                'juz_number' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Insan ayat 1-31 di Juz 18
        for ($ayah = 1; $ayah <= 31; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 76,
                'ayah_number' => $ayah,
                'juz_number' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Mursalat ayat 1-50 di Juz 18
        for ($ayah = 1; $ayah <= 50; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 77,
                'ayah_number' => $ayah,
                'juz_number' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // An-Naba ayat 1-40 di Juz 18
        for ($ayah = 1; $ayah <= 40; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 78,
                'ayah_number' => $ayah,
                'juz_number' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Juz 19: An-Nazi'at (1-46) + 'Abasa (1-42) + At-Takwir (1-29) + Al-Infitar (1-19) + Al-Mutaffifin (1-36) + Al-Insyiqaq (1-25) + Al-Buruj (1-22) + At-Tariq (1-17) + Al-A'la (1-19) + Al-Gasyiyah (1-26) + Al-Fajr (1-30) + Al-Balad (1-20) + Asy-Syams (1-15) + Al-Lail (1-21) + Ad-Duha (1-11) + Asy-Syarh (1-8) + At-Tin (1-8) + Al-'Alaq (1-19) + Al-Qadr (1-5) + Al-Bayyinah (1-8) + Az-Zalzalah (1-8) + Al-'Adiyat (1-11) + Al-Qari'ah (1-11) + At-Takasur (1-8) + Al-'Asr (1-3) + Al-Humazah (1-9) + Al-Fil (1-5) + Quraisy (1-4) + Al-Ma'un (1-7) + Al-Kausar (1-3) + Al-Kafirun (1-6) + An-Nasr (1-3) + Al-Masad (1-5) + Al-Ikhlas (1-4) + Al-Falaq (1-5) + An-Nas (1-6)
        // An-Nazi'at ayat 1-46 di Juz 19
        for ($ayah = 1; $ayah <= 46; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 79,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // 'Abasa ayat 1-42 di Juz 19
        for ($ayah = 1; $ayah <= 42; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 80,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // At-Takwir ayat 1-29 di Juz 19
        for ($ayah = 1; $ayah <= 29; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 81,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Infitar ayat 1-19 di Juz 19
        for ($ayah = 1; $ayah <= 19; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 82,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Mutaffifin ayat 1-36 di Juz 19
        for ($ayah = 1; $ayah <= 36; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 83,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Insyiqaq ayat 1-25 di Juz 19
        for ($ayah = 1; $ayah <= 25; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 84,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Buruj ayat 1-22 di Juz 19
        for ($ayah = 1; $ayah <= 22; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 85,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // At-Tariq ayat 1-17 di Juz 19
        for ($ayah = 1; $ayah <= 17; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 86,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-A'la ayat 1-19 di Juz 19
        for ($ayah = 1; $ayah <= 19; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 87,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Gasyiyah ayat 1-26 di Juz 19
        for ($ayah = 1; $ayah <= 26; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 88,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Fajr ayat 1-30 di Juz 19
        for ($ayah = 1; $ayah <= 30; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 89,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Balad ayat 1-20 di Juz 19
        for ($ayah = 1; $ayah <= 20; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 90,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Asy-Syams ayat 1-15 di Juz 19
        for ($ayah = 1; $ayah <= 15; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 91,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Lail ayat 1-21 di Juz 19
        for ($ayah = 1; $ayah <= 21; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 92,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Ad-Duha ayat 1-11 di Juz 19
        for ($ayah = 1; $ayah <= 11; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 93,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Asy-Syarh ayat 1-8 di Juz 19
        for ($ayah = 1; $ayah <= 8; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 94,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // At-Tin ayat 1-8 di Juz 19
        for ($ayah = 1; $ayah <= 8; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 95,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-'Alaq ayat 1-19 di Juz 19
        for ($ayah = 1; $ayah <= 19; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 96,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Qadr ayat 1-5 di Juz 19
        for ($ayah = 1; $ayah <= 5; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 97,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Bayyinah ayat 1-8 di Juz 19
        for ($ayah = 1; $ayah <= 8; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 98,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Az-Zalzalah ayat 1-8 di Juz 19
        for ($ayah = 1; $ayah <= 8; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 99,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-'Adiyat ayat 1-11 di Juz 19
        for ($ayah = 1; $ayah <= 11; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 100,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Qari'ah ayat 1-11 di Juz 19
        for ($ayah = 1; $ayah <= 11; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 101,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // At-Takasur ayat 1-8 di Juz 19
        for ($ayah = 1; $ayah <= 8; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 102,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-'Asr ayat 1-3 di Juz 19
        for ($ayah = 1; $ayah <= 3; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 103,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Humazah ayat 1-9 di Juz 19
        for ($ayah = 1; $ayah <= 9; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 104,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Fil ayat 1-5 di Juz 19
        for ($ayah = 1; $ayah <= 5; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 105,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Quraisy ayat 1-4 di Juz 19
        for ($ayah = 1; $ayah <= 4; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 106,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Ma'un ayat 1-7 di Juz 19
        for ($ayah = 1; $ayah <= 7; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 107,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Kausar ayat 1-3 di Juz 19
        for ($ayah = 1; $ayah <= 3; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 108,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Kafirun ayat 1-6 di Juz 19
        for ($ayah = 1; $ayah <= 6; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 109,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // An-Nasr ayat 1-3 di Juz 19
        for ($ayah = 1; $ayah <= 3; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 110,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Masad ayat 1-5 di Juz 19
        for ($ayah = 1; $ayah <= 5; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 111,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Ikhlas ayat 1-4 di Juz 19
        for ($ayah = 1; $ayah <= 4; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 112,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Al-Falaq ayat 1-5 di Juz 19
        for ($ayah = 1; $ayah <= 5; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 113,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // An-Nas ayat 1-6 di Juz 19
        for ($ayah = 1; $ayah <= 6; $ayah++) {
            $ayahJuzMappings[] = [
                'surah_id' => 114,
                'ayah_number' => $ayah,
                'juz_number' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Insert semua data ke database
        DB::table('surah_ayah_juz')->insert($ayahJuzMappings);
    }
}
