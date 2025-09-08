import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, DataHalaqah } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { columns } from './column';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Halaqah',
        href: '/datahalaqah',
    },
];

type Indexprops = {
    halaqah: DataHalaqah[];
};

export default function Index({ halaqah }: Indexprops) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu Tahfidz" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link href={route('datahalaqah.create')}>
                    <Button className="cursor-pointer">Tambah Halaqah</Button>
                </Link>
                <DataTable columns={columns} data={halaqah} filterColumn="nama_halaqah" />
            </div>
        </AppLayout>
    );
}
