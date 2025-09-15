import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Student, Surah, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface Props {
    santri: Student[];
    surahs: Surah[];
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Create({ santri, surahs }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        santri_id: '',
        surah_start: '',
        ayah_start: '',
        surah_end: '',
        ayah_end: '',
        tanggal_target: '',
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('target-hafalan.store'), {
            onSuccess: () => {
                reset();
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Buat Target Hafalan Baru</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="santri_id">Santri</Label>
                                    <Select value={data.santri_id} onValueChange={(value) => setData('santri_id', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Santri" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {santri.map((s) => (
                                                <SelectItem key={s.id} value={s.id.toString()}>
                                                    {s.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.santri_id && <p className="text-sm text-red-500">{errors.santri_id}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="tanggal_target">Tanggal Target</Label>
                                    <Input
                                        id="tanggal_target"
                                        type="date"
                                        value={data.tanggal_target}
                                        onChange={(e) => setData('tanggal_target', e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                    {errors.tanggal_target && <p className="text-sm text-red-500">{errors.tanggal_target}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="surah_start">Surah Mulai</Label>
                                    <Select value={data.surah_start} onValueChange={(value) => setData('surah_start', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Surah" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {surahs.map((s) => (
                                                <SelectItem key={s.id} value={s.id.toString()}>
                                                    {s.nama_surah}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.surah_start && <p className="text-sm text-red-500">{errors.surah_start}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="ayah_start">Ayat Mulai</Label>
                                    <Input
                                        id="ayah_start"
                                        type="number"
                                        value={data.ayah_start}
                                        onChange={(e) => setData('ayah_start', e.target.value)}
                                        min="1"
                                    />
                                    {errors.ayah_start && <p className="text-sm text-red-500">{errors.ayah_start}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="surah_end">Surah Selesai</Label>
                                    <Select value={data.surah_end} onValueChange={(value) => setData('surah_end', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Surah" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {surahs.map((s) => (
                                                <SelectItem key={s.id} value={s.id.toString()}>
                                                    {s.nama_surah}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.surah_end && <p className="text-sm text-red-500">{errors.surah_end}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="ayah_end">Ayat Selesai</Label>
                                    <Input
                                        id="ayah_end"
                                        type="number"
                                        value={data.ayah_end}
                                        onChange={(e) => setData('ayah_end', e.target.value)}
                                        min="1"
                                    />
                                    {errors.ayah_end && <p className="text-sm text-red-500">{errors.ayah_end}</p>}
                                </div>
                            </div>

                            <Button type="submit" disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Buat Target'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
