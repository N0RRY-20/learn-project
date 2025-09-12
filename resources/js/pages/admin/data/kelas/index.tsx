import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, DataKelas } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { columns } from './column';
import DetailDialog from './detailDialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Kelas',
        href: '/datakelas',
    },
];

type Indexprops = {
    dataKelas: DataKelas[];
};

export default function Index({ dataKelas }: Indexprops) {
    const [detailData, setDetailData] = useState<DataKelas | null>(null);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu Tahfidz" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link href={route('datakelas.create')}>
                    <Button className="cursor-pointer">Tambah Kelas</Button>
                </Link>
                <DataTable columns={columns} data={dataKelas} filterColumn="nama_kelas" meta={{ setDetailData }} />
                {/* baru sampe relasi datakelas dan teacherdata */}
                <DetailDialog detailData={detailData} onClose={() => setDetailData(null)} />
            </div>
        </AppLayout>
    );
}
