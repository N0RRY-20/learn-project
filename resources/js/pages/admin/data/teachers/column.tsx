import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Teacher } from '@/types';
import { Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

export const columns: ColumnDef<Teacher>[] = [
    {
        id: 'no',
        header: 'NO',
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorFn: (row) => row.user?.name,
        id: 'name',
        header: 'Nama',
    },
    {
        accessorFn: (row) => row.user?.email,
        id: 'email',
        header: 'Email',
    },
    {
        accessorFn: (row) => row.user?.roles.map((r: any) => r.name).join(', '),
        id: 'peran',
        header: 'Peran',
    },
    {
        accessorKey: 'jenis_kelamin',
        header: 'Jenis Kelamin',
    },
    {
        accessorKey: 'no_hp',
        header: 'No HP',
    },
    {
        accessorKey: 'alamat',
        header: 'Alamat',
    },
    {
        accessorKey: 'tanggal_lahir',
        header: 'Tanggal Lahir',
    },
    {
        accessorKey: 'tempat_kelahiran',
        header: 'Tempat Kelahiran',
    },

    // Actions column
    {
        id: 'actions',
        cell: ({ row }) => {
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
                        <DropdownMenuItem asChild>
                            <Link href={route('dashboard')} className="flex items-center gap-2">
                                <Eye className="h-4 w-4" />
                                Lihat Detail
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        {/* Edit */}
                        <DropdownMenuItem asChild>
                            <Link href={route('teachers.edit', row.original.id)} className="flex items-center gap-2">
                                <Pencil className="h-4 w-4" />
                                Edit
                            </Link>
                        </DropdownMenuItem>

                        {/* Delete */}
                        <DropdownMenuItem asChild>
                            <button
                                type="button"
                                onClick={() => router.delete(route('teachers.destroy', row.original.id))}
                                className="flex w-full items-center gap-2 text-left"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
