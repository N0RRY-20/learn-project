import { CalendarField } from '@/components/CalendarField';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Santri/Santriwati',
        href: route('students'),
    },
    {
        title: 'Tambah Data',
        href: route('students.create'),
    },
];

export default function create() {
    const [jenisKelamin, setJenisKelamin] = useState('');
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu Tahfidz" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Form method="post" action={route('students.store')} disableWhileProcessing resetOnSuccess className="flex flex-col gap-6">
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nama Lengkap</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        name="name"
                                        placeholder="Full name"
                                    />
                                    <InputError message={errors.name ? 'Nama wajib diisi' : ''} className="mt-2" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="nisn">NISN</Label>
                                    <Input id="nisn" type="text" required tabIndex={2} autoComplete="nisn" name="nisn" placeholder="NISN" />
                                    <InputError message={errors.nisn ? 'NISN wajib diisi dan harus valid' : ''} className="mt-2" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="class_level">Kelas</Label>
                                    <Input
                                        id="class_level"
                                        type="text"
                                        required
                                        tabIndex={2}
                                        autoComplete="class_level"
                                        name="class_level"
                                        placeholder="Kelas"
                                    />
                                    <InputError message={errors.class_level ? 'Kelas wajib diisi dan harus valid' : ''} className="mt-2" />
                                </div>

                                {/* Jenis Kelamin */}
                                <div className="grid gap-2">
                                    <Label htmlFor="gender">Jenis Kelamin</Label>
                                    <RadioGroup value={jenisKelamin} onValueChange={setJenisKelamin} className="flex items-center gap-3">
                                        {['Laki-Laki', 'Perempuan'].map((jk) => (
                                            <div key={jk} className="flex items-center space-x-2">
                                                <RadioGroupItem value={jk} id={jk} />
                                                <Label htmlFor={jk}>{jk}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                    <input type="hidden" name="gender" value={jenisKelamin} />
                                    <InputError message={errors.gender ? 'Pilih Gender' : ''} className="mt-2" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="address">Alamat</Label>
                                    <Input id="address" type="text" name="address" placeholder="Alamat lengkap" tabIndex={4} required />
                                    <InputError message={errors.address ? 'Alamat wajib diisi' : ''} className="mt-2" />
                                </div>
                                <div className="grid gap-2">
                                    <CalendarField />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="parent_name">Nama Orangtua</Label>
                                    <Input id="parent_name" type="text" name="parent_name" placeholder="Nama Orangtua" tabIndex={5} required />
                                    <InputError message={errors.parent_name ? 'Nama Orangtua wajib diisi' : ''} className="mt-2" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="parent_occupation">Pekerjaan Orangtua</Label>
                                    <Input
                                        id="parent_occupation"
                                        type="text"
                                        name="parent_occupation"
                                        placeholder="Pekerjaan Orangtua"
                                        tabIndex={5}
                                    />
                                    <InputError message={errors.parent_occupation ? 'Pekerjaan Orangtua wajib diisi' : ''} className="mt-2" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone_number">No HP</Label>
                                    <Input id="phone_number" type="text" name="phone_number" placeholder="08123456789" tabIndex={6} />
                                    <InputError message={errors.phone_number ? 'Nomor HP wajib diisi' : ''} className="mt-2" />
                                </div>
                                <Button type="submit" className="mt-2 w-full" tabIndex={7} disabled={processing}>
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
