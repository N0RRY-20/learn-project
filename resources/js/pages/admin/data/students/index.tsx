import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Student } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { columns } from './column';
import DetailDialog from './detailDialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Santri/Santriwati',
        href: '/students',
    },
];

const ALL_VALUE = '__ALL__';

type Indexprops = {
    students: Student[];
};
export default function Index({ students }: Indexprops) {
    const [detailData, setDetailData] = useState<Student | null>(null);

    // Options Kelas unik dari data
    const kelasOptions = useMemo(() => {
        const set = new Set<string>();
        students.forEach((s) => {
            const nama = (s.dataKelas?.nama_kelas ?? s.data_kelas?.nama_kelas)?.trim();
            if (nama) set.add(nama);
        });
        return Array.from(set).sort((a, b) => a.localeCompare(b));
    }, [students]);

    // State filter lokal (hanya untuk kontrol UI)
    const [filterKelas, setFilterKelas] = useState<string>('');
    const [filterGender, setFilterGender] = useState<string>('');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Santri/Santriwati" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link href={route('students.create')}>
                    <Button className="cursor-pointer">Tambah Santri/Santriwati</Button>
                </Link>
                <DataTable
                    columns={columns}
                    data={students}
                    meta={{ setDetailData }}
                    filterColumn="name"
                    renderFilters={(table) => (
                        <div className="flex items-center gap-2">
                            {/* Filter Kelas */}
                            <div className="min-w-[200px]">
                                <Select
                                    value={filterKelas || undefined}
                                    onValueChange={(value) => {
                                        if (value === ALL_VALUE) {
                                            setFilterKelas(ALL_VALUE);
                                            table.getColumn('kelas')?.setFilterValue(undefined);
                                        } else {
                                            setFilterKelas(value);
                                            table.getColumn('kelas')?.setFilterValue(value);
                                        }
                                    }}
                                >
                                    <SelectTrigger aria-label="Filter Kelas">
                                        <SelectValue placeholder="Filter Kelas" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={ALL_VALUE}>Semua Kelas</SelectItem>
                                        {kelasOptions.map((k) => (
                                            <SelectItem key={k} value={k}>
                                                {k}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Filter Gender */}
                            <div className="min-w-[180px]">
                                <Select
                                    value={filterGender || undefined}
                                    onValueChange={(value) => {
                                        if (value === ALL_VALUE) {
                                            setFilterGender(ALL_VALUE);
                                            table.getColumn('gender')?.setFilterValue(undefined);
                                        } else {
                                            setFilterGender(value);
                                            table.getColumn('gender')?.setFilterValue(value);
                                        }
                                    }}
                                >
                                    <SelectTrigger aria-label="Filter Jenis Kelamin">
                                        <SelectValue placeholder="Filter Jenis Kelamin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={ALL_VALUE}>Semua Gender</SelectItem>
                                        <SelectItem value="Laki-Laki">Laki-Laki</SelectItem>
                                        <SelectItem value="Perempuan">Perempuan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}
                />
            </div>
            <DetailDialog detailData={detailData} onClose={() => setDetailData(null)} />
        </AppLayout>
    );
}
