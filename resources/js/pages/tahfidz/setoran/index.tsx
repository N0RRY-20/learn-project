import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Setoran, Surah } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { columns } from './column';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
export interface SetoranPageProps {
    setorans: Setoran[];
    surahs: Surah[];
}
export default function SetoranHafalanIndex({ setorans, surahs }: SetoranPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Setoran Hafalan" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <Link href={route('setoran-hafalan.create')}>
                        <Button>Tambah Setoran Hafalan</Button>
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
