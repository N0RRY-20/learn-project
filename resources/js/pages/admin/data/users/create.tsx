import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Users',
        href: route('usersData'),
    },
    {
        title: 'Tambah Data',
        href: route('users.create'),
    },
];

export default function create() {
    const [roles, setRoles] = useState<string[]>([]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu Tahfidz" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Form method="post" action={route('users.store')} disableWhileProcessing resetOnSuccess className="flex flex-col gap-6">
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
                                    />
                                    <InputError message={errors.name ? 'Nama wajib diisi' : ''} className="mt-2" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="text" required tabIndex={2} autoComplete="email" name="email" placeholder="Email" />
                                    <InputError message={errors.email ? 'Email wajib diisi dan harus valid' : ''} className="mt-2" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" name="password" placeholder="Masukkan password" tabIndex={3} required />
                                    <InputError message={errors.password ? 'Isi Password dengan benar' : ''} className="mt-2" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="roles">Peran</Label>

                                    {['Admin', 'Walimurid'].map((r) => (
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
