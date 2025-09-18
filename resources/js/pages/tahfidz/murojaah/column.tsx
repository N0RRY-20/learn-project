import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Murojaah } from '@/types';
import { Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

const getStatusColor = (status: Murojaah['status']) => {
    switch (status) {
        case 'Lulus':
            return 'bg-green-100 text-green-800';
        case 'Perlu Diulang':
            return 'bg-red-100 text-red-800';
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

export const columns: ColumnDef<Murojaah>[] = [
    {
        id: 'no',
        header: 'NO',
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorFn: (row) => row.student?.name,
        id: 'student',
        header: 'Santri',
        cell: ({ row }) => row.original.student?.name ?? '-',
    },
    {
        accessorFn: (row) => row.teacher?.name,
        id: 'teacher',
        header: 'Guru',
        cell: ({ row }) => row.original.teacher?.name ?? '-',
    },
    {
        id: 'surah_ayat',
        header: 'Surah & Ayat',
        cell: ({ row, table }) => {
            const m = row.original;
            const surahMap: Record<number, string> | undefined = table.options.meta?.surahMap;
            const startName = surahMap?.[m.surah_start] ?? m.surah_start;
            const endName = surahMap?.[m.surah_end] ?? m.surah_end;

            return m.surah_start === m.surah_end
                ? `Surah ${startName} Ayat ${m.ayah_start}-${m.ayah_end}`
                : `Surah ${startName}:${m.ayah_start} - Surah ${endName}:${m.ayah_end}`;
        },
    },
    {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => <Badge className={getStatusColor(row.original.status)}>{row.original.status}</Badge>,
    },
    {
        id: 'nilai',
        header: 'Nilai',
        accessorKey: 'nilai',
        cell: ({ row }) => row.original.nilai ?? '-',
    },
    {
        id: 'tanggal_murojaah',
        header: 'Tanggal Murojaah',
        accessorKey: 'tanggal_murojaah',
        cell: ({ row }) => formatTanggalHari(row.original.tanggal_murojaah),
    },
    {
        id: 'catatan',
        header: 'Catatan',
        accessorKey: 'catatan',
        cell: ({ row }) => row.original.catatan || '-',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const m = row.original;
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

                        <DropdownMenuItem asChild>
                            <Link href={route('murojaah.edit', m.id)} className="flex items-center gap-2">
                                <Pencil className="h-4 w-4" /> Edit
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() => {
                                if (confirm('Apakah Anda yakin ingin menghapus murojaah ini?')) {
                                    router.delete(route('murojaah.destroy', m.id));
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
