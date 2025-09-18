import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Murojaah, MurojaahFormData, MurojaahStatus, Student, Surah } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Murojaah Hafalan', href: '/murojaah' },
];

interface EditProps {
    murojaah: Murojaah;
    santri: Student[];
    surahs: Surah[];
}

export default function Edit({ murojaah, santri, surahs }: EditProps) {
    const { data, setData, put, processing, errors } = useForm<MurojaahFormData>({
        student_id: murojaah.student_id.toString(),
        surah_start: murojaah.surah_start.toString(),
        ayah_start: murojaah.ayah_start.toString(),
        surah_end: murojaah.surah_end.toString(),
        ayah_end: murojaah.ayah_end.toString(),
        status: murojaah.status,
        nilai: murojaah.nilai?.toString() ?? '',
        catatan: murojaah.catatan ?? '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('murojaah.update', murojaah.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Murojaah Hafalan" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Murojaah Santri</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Santri */}
                            <div>
                                <Label htmlFor="student_id">Santri</Label>
                                <Select value={data.student_id} onValueChange={(value) => setData('student_id', value)}>
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
                                {errors.student_id && <p className="text-sm text-red-500">{errors.student_id}</p>}
                            </div>

                            {/* Surah & Ayat Start */}
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
                                </div>
                                <div>
                                    <Label htmlFor="ayah_start">Ayat Mulai</Label>
                                    <Input
                                        id="ayah_start"
                                        type="number"
                                        value={data.ayah_start}
                                        onChange={(e) => setData('ayah_start', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Surah & Ayat End */}
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
                                </div>
                                <div>
                                    <Label htmlFor="ayah_end">Ayat Selesai</Label>
                                    <Input id="ayah_end" type="number" value={data.ayah_end} onChange={(e) => setData('ayah_end', e.target.value)} />
                                </div>
                            </div>

                            {/* Status & Nilai */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={data.status} onValueChange={(value: MurojaahStatus) => setData('status', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Perlu Diulang">Perlu Diulang</SelectItem>
                                            <SelectItem value="Lulus">Lulus</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="nilai">Nilai</Label>
                                    <Input
                                        id="nilai"
                                        type="number"
                                        value={data.nilai}
                                        onChange={(e) => setData('nilai', e.target.value)}
                                        min={0}
                                        max={100}
                                    />
                                </div>
                            </div>

                            {/* Catatan */}
                            <div>
                                <Label htmlFor="catatan">Catatan</Label>
                                <Input
                                    id="catatan"
                                    value={data.catatan}
                                    onChange={(e) => setData('catatan', e.target.value)}
                                    placeholder="Masukkan catatan"
                                />
                            </div>

                            <Button type="submit" disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
