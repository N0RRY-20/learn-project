import { type LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
    roles?: roles['name'][];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    roles?: roles['name'][];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface roles {
    id: number;
    name: 'Admin' | 'Guru Halaqah' | 'Walimurid' | 'Guru Mapel';
}
export interface User {
    id: number;
    name: string;
    email: string;
    roles: roles[];
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Teacher {
    id: number;
    user_id: number;
    jenis_kelamin: 'Laki-Laki' | 'Perempuan';
    alamat: string;
    birth_date: string;
    tempat_kelahiran: string;
    no_hp: string | null;
    created_at: string;
    updated_at: string;

    user: User; // relasi ke tabel users
}

// types/student.ts

export interface Student {
    id: number;
    name: string;
    nisn: string;
    class_level: string;
    birth_date: string; // Saat dikirim melalui API, tanggal biasanya berupa string (format ISO)
    gender: 'Laki-laki' | 'Perempuan'; // Tipe literal untuk pilihan yang pasti
    address: string;
    phone_number: string;
    parent_name: string;
    parent_occupation: string | null; // Bisa string atau null, karena nullable di database
    kelas_id: number;

    // Timestamps dari Laravel
    created_at: string;
    updated_at: string;
}

export interface DataHalaqah {
    id: number; // BIGINT → number
    nama_halaqah: string; // VARCHAR → string
    teacher_id: number | null; // BIGINT NULLABLE → number atau null
    students?: Student[];
    teacher: Teacher; // Relasi ke tabel teachers
}

export type DataKelas = {
    id: number;
    nama_kelas: string;
    waliKelas_id: number | null;
    students?: Student[];
    walikelas?: Teacher; // tambahin relasi guru
};

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    // Anda bisa menambahkan properti global lainnya di sini
    // contoh: flash messages, dll.
};
export interface Surah {
    id: number;
    nama_surah: string;
    jumlah_ayat: number;
}

export interface Setoran {
    id: number;
    santri_id: number;
    target_id?: number | null;
    surah_start: number;
    ayah_start: number;
    surah_end: number;
    ayah_end: number;
    status: 'belum_setor' | 'di_ulang' | 'lulus';
    feedback_guru?: string | null;
    nilai?: number | null;
    tanggal_setor: string;
    created_at?: string;
    updated_at?: string;

    // Relasi
    santri: Student;
    target?: Target | null;

    // Computed properties dari backend
    status_target?: 'tanpa_target' | 'belum_tercapai' | 'sampai_target' | 'melebihi_target';
    status_target_indonesia?: string;
    status_target_color?: string;
    persentase_target?: number;
}

// Form data types untuk useForm
export interface SetoranFormData {
    santri_id: string;
    target_id: string; // string karena form menggunakan 'null' sebagai string
    surah_start: string;
    ayah_start: string;
    surah_end: string;
    ayah_end: string;
    status: 'belum_setor' | 'di_ulang' | 'lulus';
    feedback_guru: string;
    nilai: string;

    tanggal_setor?: string; // optional, biasanya otomatis di backend
    tanggal_review?: string; // optional
}

export interface SetoranPageProps {
    setorans: Setoran[];
    surahs: Surah[];
}

export interface SetoranCreateProps {
    santri: Student[];
    surahs: Surah[];
    targets: Target[];
}

export interface SetoranEditProps {
    setoran: Setoran;
    santri: Student[];
    surahs: Surah[];
    targets: Target[];
}

// Status types untuk type safety
export type SetoranStatus = 'belum_setor' | 'di_ulang' | 'lulus';
export type StatusTarget = 'tanpa_target' | 'belum_tercapai' | 'sampai_target' | 'melebihi_target';
export interface Target {
    id: number;
    santri_id: number;
    surah_start: number;
    ayah_start: number;
    surah_end: number;
    ayah_end: number;
    tanggal_target: string;
    status: 'aktif' | 'selesai' | 'batal';
    juz_target?: number;
    santri: Student;
    setorans: Setoran[];

    // computed dari backend (opsional)
    status_target_dari_setoran?: 'tanpa_target' | 'belum_tercapai' | 'sampai_target' | 'melebihi_target' | 'belum_setor';
    status_hafalan_dari_setoran?: 'belum_setor' | 'di_ulang' | 'lulus';
    persentase_target_dari_setoran?: number;
    bisa_dihilangkan?: boolean;

    // tambahan saat flatten di frontend
    tanggal_group?: string;
}
