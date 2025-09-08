import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { User, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { columns } from './column';
import DetailDialog from './detailDialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Users',
        href: '/usersData',
    },
];

type Indexprops = {
    usersData: User[];
};

export default function Index({ usersData }: Indexprops) {
    const [detailData, setDetailData] = useState<User | null>(null);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu Tahfidz" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link href={route('users.create')}>
                    <Button className="cursor-pointer">Tambah Users</Button>
                </Link>
                <DataTable columns={columns} data={usersData} meta={{ setDetailData }} />
            </div>
            <DetailDialog detailData={detailData} onClose={() => setDetailData(null)} />
        </AppLayout>
    );
}
