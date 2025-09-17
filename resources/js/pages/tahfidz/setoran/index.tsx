import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { columns } from './column';

interface Santri {
    id: number;
    name: string;
    halaqah_id: number;
}

interface Surah {
    id: number;
    nama_surah: string;
    jumlah_ayat: number;
}

interface Target {
    id: number;
    santri_id: number;
    surah_start: number;
    ayah_start: number;
    surah_end: number;
    ayah_end: number;
    tanggal_target: string;
    status: 'aktif' | 'selesai' | 'batal';
    santri: Santri;
}

interface Setoran {
    id: number;
    santri_id: number;
    target_id?: number;
    surah_start: number;
    ayah_start: number;
    surah_end: number;
    ayah_end: number;
    status: 'belum_setor' | 'di_ulang' | 'lulus';
    feedback_guru?: string;
    nilai?: number;
    tanggal_setor: string;
    santri: Santri;
    target?: Target;
    // Tambahkan computed properties dari model
    status_target?: 'tanpa_target' | 'belum_tercapai' | 'sampai_target' | 'melebihi_target';
    status_target_indonesia?: string;
    status_target_color?: string;
    persentase_target?: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
// Tambahkan method untuk mendapatkan warna status target

interface Props {
    setorans: Setoran[];
    surahs: Surah[];
}

export default function SetoranHafalanIndex({ setorans, surahs }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Setoran Hafalan" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <Link href={route('setoran-hafalan.create')}>
                        {' '}
                        <Button>Buat Target Baru</Button>
                    </Link>
                </div>

                <DataTable
                    columns={columns}
                    data={setorans}
                    filterColumn="santri"
                    meta={{
                        surahMap: Object.fromEntries(surahs.map((s) => [s.id, s.nama_surah])),
                    }}
                />
            </div>
        </AppLayout>
    );
}
