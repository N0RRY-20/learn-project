import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Setoran, SetoranStatus, StatusTarget } from '@/types';

const getStatusColor = (status: SetoranStatus): string => {
    switch (status) {
        case 'belum_setor':
            return 'bg-gray-100 text-gray-800';
        case 'di_ulang':
            return 'bg-red-100 text-red-800';
        case 'lulus':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const getStatusText = (status: SetoranStatus): string => {
    switch (status) {
        case 'belum_setor':
            return 'Belum Setor';
        case 'di_ulang':
            return 'Di Ulang';
        case 'lulus':
            return 'Lulus';
        default:
            return 'Tidak Diketahui';
    }
};

const getStatusTargetColor = (status: StatusTarget): string => {
    switch (status) {
        case 'tanpa_target':
            return 'bg-gray-100 text-gray-800';
        case 'belum_tercapai':
            return 'bg-red-100 text-red-800';
        case 'sampai_target':
            return 'bg-green-100 text-green-800';
        case 'melebihi_target':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const formatTanggalHari = (tanggal?: string): string => {
    if (!tanggal) return '-';
    const d = new Date(tanggal);
    if (isNaN(d.getTime())) return '-';
    return d.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};

export const columns: ColumnDef<Setoran>[] = [
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
        id: 'target',
        header: 'Target',
        cell: ({ row }) => {
            const setoran = row.original;
            return setoran.target ? (
                <Badge className="bg-blue-100 text-blue-800">Target {setoran.target.id}</Badge>
            ) : (
                <Badge className="bg-gray-100 text-gray-800">Tanpa Target</Badge>
            );
        },
    },
    {
        id: 'surah_ayat',
        header: 'Surah & Ayat',
        cell: ({ row, table }) => {
            const setoran = row.original;
            const surahMap: Record<number, string> | undefined = table.options.meta?.surahMap;
            const startName = surahMap?.[setoran.surah_start] ?? setoran.surah_start;
            const endName = surahMap?.[setoran.surah_end] ?? setoran.surah_end;

            return setoran.surah_start === setoran.surah_end
                ? `Surah ${startName} Ayat ${setoran.ayah_start}-${setoran.ayah_end}`
                : `Surah ${startName}:${setoran.ayah_start} - Surah ${endName}:${setoran.ayah_end}`;
        },
    },
    {
        id: 'status_target',
        header: 'Status Target',
        cell: ({ row }) => {
            const setoran = row.original;
            return (
                <div>
                    <Badge className={getStatusTargetColor(setoran.status_target || 'tanpa_target')}>
                        {setoran.status_target_indonesia || 'Tanpa Target'}
                    </Badge>
                    {setoran.persentase_target && <div className="mt-1 text-xs text-gray-600">{setoran.persentase_target}%</div>}
                    {setoran.target && (
                        <div className="mt-1 text-xs text-gray-500">
                            Target: {`Surah ${setoran.target.surah_start}:${setoran.target.ayah_start}-${setoran.target.ayah_end}`}
                        </div>
                    )}
                </div>
            );
        },
    },
    {
        id: 'status_hafalan',
        header: 'Status Hafalan',
        accessorKey: 'status',
        cell: ({ row }) => {
            const setoran = row.original;
            return <Badge className={getStatusColor(setoran.status)}>{getStatusText(setoran.status)}</Badge>;
        },
    },
    {
        id: 'nilai',
        header: 'Nilai',
        accessorKey: 'nilai',
        cell: ({ row }) => row.original.nilai || '-',
    },
    {
        id: 'tanggal_setor',
        header: 'Tanggal Setor',
        accessorKey: 'tanggal_setor',
        cell: ({ row }) => formatTanggalHari(row.original.tanggal_setor),
    },
    {
        id: 'feedback',
        header: 'Feedback',
        accessorKey: 'feedback_guru',
        cell: ({ row }) => row.original.feedback_guru || '-',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const setoran = row.original;

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

                        {/* Edit */}
                        <DropdownMenuItem asChild>
                            <Link href={route('setoran-hafalan.edit', setoran.id)} className="flex items-center gap-2">
                                <Pencil className="h-4 w-4" />
                                Edit
                            </Link>
                        </DropdownMenuItem>

                        {/* Delete */}
                        <DropdownMenuItem
                            onClick={() => {
                                if (confirm('Apakah Anda yakin ingin menghapus setoran ini?')) {
                                    router.delete(route('setoran-hafalan.destroy', setoran.id));
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
