<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used during authentication for various
    | messages that we need to display to the user. You are free to modify
    | these language lines according to your application's requirements.
    |
    */

    'failed' => 'These credentials do not match our records.',
    'password' => 'The provided password is incorrect.',
    'throttle' => 'Too many login attempts. Please try again in :seconds seconds.',

];





// Kalau kamu ubah ke 'locale' => 'id'

// Dan kamu buat file lang/id/auth.php seperti ini:

// return [
//     'failed' => 'Kredensial yang Anda masukkan tidak sesuai dengan data kami.',
//     'password' => 'Kata sandi yang Anda masukkan salah.',
//     'throttle' => 'Terlalu banyak percobaan login. Coba lagi dalam :seconds detik.',
// ];


// 👉 Maka saat login gagal, user akan lihat:

// Kredensial yang Anda masukkan tidak sesuai dengan data kami.


// ⚡ Jadi perbedaan langsung kelihatan: tanpa harus ngubah kode login.
// Laravel otomatis ambil teks sesuai bahasa yang aktif (locale).