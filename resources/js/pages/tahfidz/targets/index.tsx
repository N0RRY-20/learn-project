import { DataTable } from '@/components/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Surah, Target } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { columns } from './column';

interface Props {
    targets: Record<string, Target[]>;
    targetHariIni: Target[]; // Ubah dari Target | null menjadi Target[]
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
                {targetHariIni && targetHariIni.length > 0 && (
                    <Card className="relative overflow-hidden border-transparent">
                        {/* Gradient Background */}
                        <div
                            className="absolute inset-0 z-0"
                            style={{
                                background: `
                                    radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
                                    radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
                                    radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
                                    radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
                                    #000000
                                `,
                            }}
                        />
                        <CardHeader className="relative z-10">
                            <CardTitle className="text-white">Target Hari Ini</CardTitle>
                            <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-3">
                                <p className="text-sm font-medium text-gray-300">Santri</p>
                                <p className="text-sm font-medium text-gray-300">Target Hafalan</p>
                                <p className="text-sm font-medium text-gray-300">Status</p>
                            </div>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="grid grid-cols-1 gap-6">
                                {targetHariIni.map((target, index) => (
                                    <div key={index} className="grid grid-cols-1 gap-2 md:grid-cols-3">
                                        {/* Kolom 1: Santri */}
                                        <div className="flex flex-col">
                                            <p className="text-sm text-white">{target.santri.name}</p>
                                        </div>

                                        {/* Kolom 2: Target Hafalan */}
                                        <div className="flex flex-col">
                                            <p className="text-sm text-white">
                                                {target.surah_start === target.surah_end
                                                    ? `Surah ${surahMap[target.surah_start] ?? target.surah_start} Ayat ${target.ayah_start}-${target.ayah_end}`
                                                    : `Surah ${surahMap[target.surah_start] ?? target.surah_start}:${target.ayah_start} - Surah ${surahMap[target.surah_end] ?? target.surah_end}:${target.ayah_end}`}
                                            </p>
                                        </div>

                                        {/* Kolom 3: Status */}
                                        <div className="flex flex-col">
                                            <Badge className={getStatusColor(target.status)}>{getStatusText(target.status)}</Badge>
                                        </div>
                                    </div>
                                ))}
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
