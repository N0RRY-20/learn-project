import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();

// 👌 ini isi `app.tsx` yang **benar untuk client (CSR)**. Saya bedah baris per baris ya:

// ---

// ### 1. Import file CSS global

// ```ts
// import '../css/app.css';
// ```

// * Memuat TailwindCSS/stylesheet global Anda.
// * Vite akan inject CSS ini ke bundle client.

// ---

// ### 2. Import Inertia dan helper

// ```ts
// import { createInertiaApp } from '@inertiajs/react';
// import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
// import { createRoot } from 'react-dom/client';
// import { initializeTheme } from './hooks/use-appearance';
// ```

// * `createInertiaApp` → fungsi utama untuk bootstrap aplikasi Inertia di browser.
// * `resolvePageComponent` → otomatis cari file React page berdasarkan nama yang dikirim Laravel.

//   * Misal controller return:

//     ```php
//     return Inertia::render('Dashboard')
//     ```

//     maka Inertia akan cari `resources/js/pages/Dashboard.tsx`.
// * `createRoot` → API React 18 untuk render ke DOM.
// * `initializeTheme` → custom hook Anda sendiri, misalnya untuk set **dark mode / light mode**.

// ---

// ### 3. Nama aplikasi (title default)

// ```ts
// const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
// ```

// * Ambil nama app dari `.env` → `VITE_APP_NAME=NamaAppSaya`.
// * Kalau tidak ada, fallback ke `"Laravel"`.

// ---

// ### 4. Setup Inertia App

// ```ts
// createInertiaApp({
//     title: (title) => title ? `${title} - ${appName}` : appName,
//     resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
//     setup({ el, App, props }) {
//         const root = createRoot(el);
//         root.render(<App {...props} />);
//     },
//     progress: {
//         color: '#4B5563',
//     },
// });
// ```

// #### 🔎 Detail tiap bagian:

// * **`title`** → format judul tab browser.

//   * Kalau page kasih title `"Dashboard"` → hasil jadi `"Dashboard - NamaAppSaya"`.
// * **`resolve`** → fungsi untuk cari file React berdasarkan nama page.

//   * `import.meta.glob('./pages/**/*.tsx')` → scan semua file `pages/*.tsx`.
// * **`setup`** → apa yang dilakukan waktu mount app:

//   * `el` = `<div id="app">` dari Blade.
//   * `App` = root React component dari Inertia.
//   * `props` = data awal yang dikirim Laravel.
//   * `createRoot(el).render(<App {...props} />)` → mount React app ke DOM.
// * **`progress`** → konfigurasi loading bar (progress bar biru/abu-abu di atas halaman waktu pindah route).

// ---

// ### 5. Inisialisasi tema

// ```ts
// initializeTheme();
// ```

// * Setelah app jalan, panggil fungsi ini untuk set **light/dark mode** di awal load.
// * Biasanya ini akan cek `localStorage` atau `prefers-color-scheme` dari browser.

// ---

// ### 📌 Ringkasnya

// File `app.tsx` ini:

// 1. Load CSS global.
// 2. Bootstrap Inertia React.
// 3. Cari page otomatis berdasarkan nama dari Laravel.
// 4. Mount ke DOM `<div id="app">`.
// 5. Tambah fitur: **progress bar** & **theme (light/dark mode)**.

// ---

// Mau saya kasih **flow data** dari Laravel Controller → Inertia → `app.tsx` → React Page, biar kelihatan jalur data props masuk sampai ke React component?
