import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Target } from '@/types';
import { Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, NonBinaryIcon, Pencil, Trash2 } from 'lucide-react';

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

const formatTanggalHari = (tanggal?: string) => {
    if (!tanggal) return '-';
    const d = new Date(tanggal + 'T00:00:00'); // aman timezone
    return d.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};
export const columns: ColumnDef<Target>[] = [
    {
        id: 'no',
        header: 'NO',
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorFn: (row) => row.santri?.name,
        id: 'santri',
        header: 'Santri',
        cell: ({ row }) => row.original.santri?.name ?? '-',
    },
    {
        id: 'target_hafalan',
        header: 'Target Hafalan',
        cell: ({ row }) => {
            const t = row.original;
            return t.surah_start === t.surah_end
                ? `Surah ${t.surah_start} Ayat ${t.ayah_start}-${t.ayah_end}`
                : `Surah ${t.surah_start}:${t.ayah_start} - Surah ${t.surah_end}:${t.ayah_end}`;
        },
    },
    {
        id: 'juz',
        header: 'Juz',
        cell: () => <span className="text-sm text-gray-600">Auto</span>,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const t = row.original;
            return (
                <div>
                    <Badge className={getStatusColor(t.status)}>{getStatusText(t.status)}</Badge>
                    {t.setorans && t.setorans.length > 0 && (
                        <div className="mt-1 text-xs">
                            <div className="text-gray-600">
                                Status Target: <span className="font-medium">{t.status_target_dari_setoran || 'Belum Setor'}</span>
                            </div>
                            <div className="text-gray-600">
                                Status Hafalan: <span className="font-medium">{t.status_hafalan_dari_setoran || 'Belum Setor'}</span>
                            </div>
                            {t.persentase_target_dari_setoran && t.persentase_target_dari_setoran > 0 && (
                                <div className="text-gray-600">
                                    Pencapaian: <span className="font-medium">{t.persentase_target_dari_setoran}%</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            );
        },
    },
    {
        id: 'setoran',
        header: 'Setoran',
        cell: ({ row }) => {
            const t = row.original;
            return t.setorans && t.setorans.length > 0 ? (
                <div>
                    <Badge className="bg-green-100 text-green-800">{t.setorans.length} Setoran</Badge>
                    {t.bisa_dihilangkan && (
                        <div className="mt-1">
                            <Badge className="bg-blue-100 text-xs text-blue-800">✅ Selesai & Lulus</Badge>
                        </div>
                    )}
                </div>
            ) : (
                <Badge className="bg-gray-100 text-gray-800">Belum Setor</Badge>
            );
        },
    },
    {
        id: 'tanggal',
        header: 'Tanggal',
        cell: ({ row }) => formatTanggalHari(row.original.tanggal_group),
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const t = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        {/* Lihat Detail */}
                        <DropdownMenuItem
                            onClick={() => {
                                const status = prompt('Ubah status ke: aktif | selesai | batal', t.status) as Target['status'] | null;
                                if (status && ['aktif', 'selesai', 'batal'].includes(status)) {
                                    router.put(route('target-hafalan.update', t.id), { status });
                                }
                            }}
                        >
                            <NonBinaryIcon className="h-4 w-4" />
                            Update Status
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        {/* Edit */}
                        <DropdownMenuItem asChild>
                            <Link href={route('students.edit', row.original.id)} className="flex items-center gap-2">
                                <Pencil className="h-4 w-4" />
                                Edit
                            </Link>
                        </DropdownMenuItem>

                        {/* Delete */}
                        <DropdownMenuItem
                            onClick={() => {
                                if (confirm('Apakah Anda yakin ingin menghapus target ini?')) {
                                    router.delete(route('target-hafalan.destroy', t.id));
                                }
                            }}
                            className="flex cursor-pointer items-center gap-2 text-red-500"
                        >
                            <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
