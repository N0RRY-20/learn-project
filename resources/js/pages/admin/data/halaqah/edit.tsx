import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, DataHalaqah, Teacher } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Halaqah',
        href: route('datahalaqah.index'),
    },
    {
        title: 'Tambah Data',
        href: route('datahalaqah.create'),
    },
];

type EditProps = {
    datahalaqah: DataHalaqah;
    teachers: Teacher[];
};
export default function edit({ datahalaqah, teachers }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu Tahfidz" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Form
                    method="put"
                    action={route('datahalaqah.update', datahalaqah.id)}
                    disableWhileProcessing
                    resetOnSuccess
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="nama_halaqah">Nama Halaqah</Label>
                                    <Input
                                        id="nama_halaqah"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="nama_halaqah"
                                        name="nama_halaqah"
                                        placeholder="Nama Halaqah"
                                        defaultValue={datahalaqah.nama_halaqah}
                                    />
                                    <InputError message={errors.nama_halaqah ? 'wajib diisi' : ''} className="mt-2" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="teacher_id">Pembimbing</Label>
                                    <select
                                        id="teacher_id"
                                        name="teacher_id"
                                        required
                                        tabIndex={2}
                                        className="w-full rounded-md border border-gray-300 p-2"
                                    >
                                        {teachers.map((teacher) => (
                                            <option key={teacher.id} value={teacher.id}>
                                                {teacher.user.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.teacher_id ? ' wajib diisi ' : ''} className="mt-2" />
                                </div>

                                <Button type="submit" className="mt-2 w-full" tabIndex={3} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Simpan
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
