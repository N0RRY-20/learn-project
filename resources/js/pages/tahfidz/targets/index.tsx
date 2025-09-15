import { DataTable } from '@/components/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Surah, Target } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { columns } from './column';

interface Props {
    targets: Record<string, Target[]>;
    targetHariIni: Target | null;
    tanggalHariIni: string;
    surahs: Surah[];
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
export default function TargetHafalanIndex({ targets, targetHariIni, surahs }: Props) {
    const flatTargets = Object.entries(targets).flatMap(([tanggal, items]) => items.map((t) => ({ ...t, tanggal_group: tanggal })));

    const surahMap = Object.fromEntries(surahs.map((s) => [s.id, s.nama_surah]));

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'aktif':
                return 'bg-blue-100 text-blue-800';
            case 'selesai':
                return 'bg-green-100 text-green-800';
            case 'batal':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'aktif':
                return 'Aktif';
            case 'selesai':
                return 'Selesai';
            case 'batal':
                return 'Batal';
            default:
                return 'Tidak Diketahui';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <Link href={route('target-hafalan.create')}>
                        {' '}
                        <Button>Buat Target Baru</Button>
                    </Link>
                </div>

                {/* Target Hari Ini */}
                {targetHariIni && (
                    <Card className="border-blue-200 bg-blue-50">
                        <CardHeader>
                            <CardTitle className="text-blue-800">Target Hari Ini</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div>
                                    <Label className="text-sm font-medium text-gray-600">Santri</Label>
                                    <p className="text-lg font-semibold">{targetHariIni.santri.name}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-600">Target Hafalan</Label>
                                    <p className="text-lg font-semibold">
                                        {targetHariIni.surah_start === targetHariIni.surah_end
                                            ? `Surah ${surahMap[targetHariIni.surah_start] ?? targetHariIni.surah_start} Ayat ${targetHariIni.ayah_start}-${targetHariIni.ayah_end}`
                                            : `Surah ${surahMap[targetHariIni.surah_start] ?? targetHariIni.surah_start}:${targetHariIni.ayah_start} - Surah ${surahMap[targetHariIni.surah_end] ?? targetHariIni.surah_end}:${targetHariIni.ayah_end}`}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-600">Status</Label>
                                    <Badge className={getStatusColor(targetHariIni.status)}>{getStatusText(targetHariIni.status)}</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <DataTable columns={columns} data={flatTargets} filterColumn="santri" meta={{ surahMap }} />
                {/* Jadi, filterColumn="santri" artinya: input cari hanya pada kolom yang id-nya santri. Ini tidak ada hubungannya dengan nama tabel DB. */}
            </div>
        </AppLayout>
    );
}
