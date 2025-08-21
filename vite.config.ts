import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
});

// dari chatgpt
// Mantap 👍 mari kita bedah satu per satu `vite.config.ts` Anda.

// ---

// ### 1. **Import plugin dan helper**

// ```ts
// import tailwindcss from '@tailwindcss/vite';
// import react from '@vitejs/plugin-react';
// import laravel from 'laravel-vite-plugin';
// import { resolve } from 'node:path';
// import { defineConfig } from 'vite';
// ```

// * `@tailwindcss/vite` → integrasi **TailwindCSS** langsung ke Vite.
// * `@vitejs/plugin-react` → bikin Vite bisa kompilasi React (JSX/TSX).
// * `laravel-vite-plugin` → plugin resmi Laravel buat konek Vite ↔ Laravel.
// * `resolve` dari Node → bantu bikin alias path.
// * `defineConfig` → cara resmi mendefinisikan config Vite dengan TypeScript support.

// ---

// ### 2. **Export konfigurasi utama**

// ```ts
// export default defineConfig({
//     plugins: [
//         laravel({
//             input: ['resources/css/app.css', 'resources/js/app.tsx'],
//             ssr: 'resources/js/ssr.tsx',
//             refresh: true,
//         }),
//         react(),
//         tailwindcss(),
//     ],
// ```

// #### 📌 `plugins`

// * **`laravel({...})`**

//   * `input`: daftar file entry yang Vite akan build:

//     * `resources/css/app.css` → file CSS utama.
//     * `resources/js/app.tsx` → entry point React (client-side).
//   * `ssr`: file entry untuk **Server-Side Rendering** → `resources/js/ssr.tsx`.
//   * `refresh: true` → aktifkan **Hot Module Reloading (HMR)** → saat Anda save file Laravel Blade/JS/TS/CSS, browser auto-refresh.

// * **`react()`**

//   * Plugin untuk parsing JSX/TSX, mendukung Fast Refresh (hot reload React).

// * **`tailwindcss()`**

//   * Integrasi Tailwind agar Vite bisa compile class utility Tailwind.

// ---

// ### 3. **Konfigurasi esbuild**

// ```ts
//     esbuild: {
//         jsx: 'automatic',
//     },
// ```

// * Atur cara Vite/ESBuild compile JSX.
// * `automatic` → tidak perlu import `React` di setiap file TSX/JSX.

//   ```tsx
//   // Bisa langsung
//   export default function App() {
//     return <h1>Hello</h1>
//   }
//   // tanpa perlu: import React from 'react'
//   ```

// ---

// ### 4. **Resolve alias**

// ```ts
//     resolve: {
//         alias: {
//             'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
//         },
//     },
// });
// ```

// * Alias `ziggy-js` diarahkan ke folder `vendor/tightenco/ziggy`.
// * Artinya saat di React Anda tulis:

//   ```ts
//   import { route } from 'ziggy-js';
//   ```

//   → sebenarnya di-resolve ke `vendor/tightenco/ziggy`.

// ---

// ### 📌 Kesimpulan peran file ini

// * **`app.tsx`** → client-side entry (CSR).
// * **`ssr.tsx`** → server-side entry (SSR).
// * Laravel plugin di Vite tahu harus build **dua bundle berbeda**.
// * `tailwindcss` + `react` bikin dev experience mulus.
// * Alias Ziggy bikin bisa pakai helper route di React.

// ---

// 👉 Jadi inti config ini: **ngasih tau Vite “tolong build untuk 2 dunia: browser (`app.tsx`) dan server (`ssr.tsx`) + support React + Tailwind + Laravel refresh.”**

// ---

// Mau saya bikinkan diagram sederhana: **1 config Vite → hasilkan 2 bundle (client dan server)** biar makin kebayang alurnya?
