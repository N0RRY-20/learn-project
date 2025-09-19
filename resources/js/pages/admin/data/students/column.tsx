import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Student } from '@/types';
import { Link, router } from '@inertiajs/react';
import { ColumnDef, RowData } from '@tanstack/react-table';
import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        setDetailData?: (student: TData) => void;
    }
}

export const columns: ColumnDef<Student>[] = [
    {
        id: 'no',
        header: 'NO',
        cell: ({ row }) => row.index + 1,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: 'Nama Lengkap',
    },
    {
        accessorKey: 'nisn',
        header: 'NISN',
    },
    {
        id: 'kelas',
        header: 'Kelas',
        accessorFn: (row: Student) => row.dataKelas?.nama_kelas ?? row.data_kelas?.nama_kelas ?? '-',
        filterFn: 'includesString',
    },
    {
        id: 'halaqah',
        header: 'Halaqah',
        accessorFn: (row: Student) => row.datahalaqah?.nama_halaqah ?? '-',
        filterFn: 'includesString',
    },
    {
        accessorKey: 'gender',
        header: 'Jenis Kelamin',
        filterFn: 'includesString',
    },
    {
        accessorKey: 'birth_date',
        header: 'Tanggal Lahir',
    },
    {
        accessorKey: 'address',
        header: 'Alamat',
    },
    {
        accessorKey: 'parent_name',
        header: 'Nama Orang Tua',
    },
    {
        accessorKey: 'phone_number',
        header: 'No HP',
    },
    {
        accessorKey: 'parent_occupation',
        header: 'Pekerjaan Orang Tua',
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
                        <DropdownMenuItem onClick={() => setDetailData?.(row.original)}>
                            <Eye className="h-4 w-4" />
                            Lihat Detail
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
                                if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
                                    router.delete(route('students.destroy', row.original.id));
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
