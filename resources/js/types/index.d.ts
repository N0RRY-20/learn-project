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
    roles?: string[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    roles?: string[];
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
    tanggal_lahir: string;
    tempat_kelahiran: string;
    no_hp: string | null;
    created_at: string;
    updated_at: string;

    user: User; // relasi ke tabel users
}
