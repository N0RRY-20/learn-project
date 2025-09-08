import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Student } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { columns } from './column';
import DetailDialog from './detailDialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Santri/Santriwati',
        href: '/students',
    },
];
type Indexprops = {
    students: Student[];
};
export default function Index({ students }: Indexprops) {
    const [detailData, setDetailData] = useState<Student | null>(null);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Santri/Santriwati" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link href={route('students.create')}>
                    <Button className="cursor-pointer">Tambah Santri/Santriwati</Button>
                </Link>
                <DataTable columns={columns} data={students} meta={{ setDetailData }} />
            </div>
            <DetailDialog detailData={detailData} onClose={() => setDetailData(null)} />
        </AppLayout>
    );
}
