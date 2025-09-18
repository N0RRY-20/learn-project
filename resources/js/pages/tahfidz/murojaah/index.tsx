import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Murojaah } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { columns } from './column';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
export interface MurojaahPageProps {
    murojaah: Murojaah[];
}

export default function Index({ murojaah }: MurojaahPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Murojaah Hafalan" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <Link href={route('murojaah.create')}>
                        <Button>Tambah Murojaah Hafalan</Button>
                    </Link>
                </div>
                <DataTable columns={columns} data={murojaah} filterColumn="student" />
            </div>
        </AppLayout>
    );
}
