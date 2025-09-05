import { CalendarField } from '@/components/CalendarField';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Teacher } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'edit Guru',
        href: '/editGuru',
    },
];

type TeacherProps = {
    teachersData: Teacher;
};

export default function edit({ teachersData }: TeacherProps) {
    const [roles, setRoles] = useState<string[]>([]);

    const [jenisKelamin, setJenisKelamin] = useState('');
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu Tahfidz" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Form method="post" action={route('teachers.store')} disableWhileProcessing resetOnSuccess className="flex flex-col gap-6">
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        name="name"
                                        placeholder="Full name"
                                        defaultValue={teachersData.user.name ?? ''}
                                    />
                                    <InputError message={errors.name ? 'Nama wajib diisi' : ''} className="mt-2" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={2}
                                        autoComplete="email"
                                        name="email"
                                        placeholder="Email"
                                        defaultValue={teachersData.user.email ?? ''}
                                    />
                                    <InputError message={errors.email ? 'Email wajib diisi dan harus valid' : ''} className="mt-2" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" name="password" placeholder="Masukkan password" tabIndex={3} required />
                                    <InputError message={errors.password ? 'Isi Password dengan benar' : ''} className="mt-2" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="roles">Peran</Label>

                                    {['Guru Halaqah', 'Guru Mapel', 'Admin', 'Walimurid'].map((r) => (
                                        <div key={r} className="flex items-center gap-3">
                                            <Checkbox
                                                id={r}
                                                value={r}
                                                name="roles[]"
                                                checked={roles.includes(r)}
                                                onCheckedChange={(cek) => {
                                                    if (cek) {
                                                        setRoles([...roles, r]);
                                                    } else {
                                                        setRoles(roles.filter((role) => role !== r));
                                                    }
                                                }}
                                            />
                                            <Label htmlFor={r}>{r}</Label>
                                        </div>
                                    ))}
                                    <InputError message={errors.roles ? 'Pilih minimal satu peran' : ''} className="mt-2" />
                                </div>

                                {/* Jenis Kelamin */}
                                <div className="grid gap-2">
                                    <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                                    <RadioGroup value={jenisKelamin} onValueChange={setJenisKelamin} className="flex items-center gap-3">
                                        {['Laki-Laki', 'Perempuan'].map((jk) => (
                                            <div key={jk} className="flex items-center space-x-2">
                                                <RadioGroupItem value={jk} id={jk} />
                                                <Label htmlFor={jk}>{jk}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                    <input type="hidden" name="jenis_kelamin" value={jenisKelamin} />
                                    <InputError message={errors.jenis_kelamin ? 'Pilih jenis kelamin' : ''} className="mt-2" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="alamat">Alamat</Label>
                                    <Input
                                        id="alamat"
                                        type="text"
                                        name="alamat"
                                        placeholder="Alamat lengkap"
                                        tabIndex={4}
                                        required
                                        defaultValue={teachersData.alamat ?? ''}
                                    />
                                    <InputError message={errors.alamat ? 'Alamat wajib diisi' : ''} className="mt-2" />
                                </div>
                                <div className="grid gap-2">
                                    <CalendarField />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="tempat_kelahiran">Tempat Lahir</Label>
                                    <Input
                                        id="tempat_kelahiran"
                                        type="text"
                                        name="tempat_kelahiran"
                                        placeholder="Tempat lahir"
                                        tabIndex={5}
                                        required
                                        defaultValue={teachersData.tempat_kelahiran ?? ''}
                                    />
                                    <InputError message={errors.tempat_kelahiran ? 'Tempat lahir wajib diisi' : ''} className="mt-2" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="no_hp">No HP</Label>
                                    <Input
                                        id="no_hp"
                                        type="text"
                                        name="no_hp"
                                        placeholder="08123456789"
                                        tabIndex={6}
                                        defaultValue={teachersData.no_hp ?? ''}
                                    />
                                    <InputError message={errors.no_hp ? 'Nomor HP wajib diisi' : ''} className="mt-2" />
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
