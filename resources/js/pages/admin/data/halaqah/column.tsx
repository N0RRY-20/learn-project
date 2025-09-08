import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataHalaqah } from '@/types';
import { Link, router } from '@inertiajs/react';
import { ColumnDef, RowData } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react';

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        setDetailData?: (halaqah: TData) => void;
    }
}

export const columns: ColumnDef<DataHalaqah>[] = [
    {
        id: 'no',
        header: 'NO',
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'nama_halaqah',
        header: 'Nama Halaqah',
    },
    {
        accessorFn: (row) => row.teacher?.user.name,
        header: 'Pembimbing',
    },

    // Actions column
    {
        id: 'actions',
        cell: ({ row, table }) => {
            const setDetailData = table.options.meta?.setDetailData;
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
                        <DropdownMenuItem>
                            <Link href={route('datahalaqah.show', row.original.id)} className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Tambah Anggota
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        {/* Edit */}
                        <DropdownMenuItem asChild>
                            <Link href={route('datahalaqah.edit', row.original.id)} className="flex items-center gap-2">
                                <Pencil className="h-4 w-4" />
                                Edit
                            </Link>
                        </DropdownMenuItem>

                        {/* Delete */}
                        <DropdownMenuItem
                            onClick={() => {
                                if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
                                    router.delete(route('datahalaqah.destroy', row.original.id));
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
