import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Teacher, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { columns } from './column';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Guru',
        href: '/DataGuru',
    },
];

type Indexprops = {
    teachers: Teacher[];
};

export default function Index({ teachers }: Indexprops) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu Tahfidz" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link href={route('teachers.create')}>
                    <Button className="cursor-pointer">Tambah Guru</Button>
                </Link>
                <DataTable columns={columns} data={teachers} />
            </div>
        </AppLayout>
    );
}
