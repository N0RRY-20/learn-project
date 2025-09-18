import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, MurojaahFormData, MurojaahStatus } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Murojaah Hafalan', href: '/murojaah' },
];

interface MurojaahCreateProps {
    santri: { id: number; name: string }[];
    surahs: { id: number; nama_surah: string }[];
    message?: string;
}

export default function Create({ santri, surahs, message }: MurojaahCreateProps) {
    const { data, setData, post, processing, errors, reset } = useForm<MurojaahFormData>({
        student_id: '',
        surah_start: '',
        ayah_start: '',
        surah_end: '',
        ayah_end: '',
        tanggal_murojaah: new Date().toISOString().split('T')[0], // Set default ke hari ini
        status: 'Perlu Diulang',
        nilai: '',
        catatan: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('murojaah.store'), { onSuccess: () => reset() });
    };

    // Kalau tidak ada halaqah
    if (message) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Tambah Murojaah Hafalan" />
                <div className="p-6 text-center text-red-500">{message}</div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Murojaah Hafalan" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Input Murojaah Santri/SantriWati</CardTitle>
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
                                    {errors.surah_start && <p className="text-sm text-red-500">{errors.surah_start}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="ayat_awal">Ayat Mulai</Label>
                                    <Input
                                        id="ayat_awal"
                                        type="number"
                                        value={data.ayah_start}
                                        onChange={(e) => setData('ayah_start', e.target.value)}
                                        min="1"
                                        required
                                    />
                                    {errors.ayah_start && <p className="text-sm text-red-500">{errors.ayah_start}</p>}
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
                                    {errors.surah_end && <p className="text-sm text-red-500">{errors.surah_end}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="ayat_akhir">Ayat Selesai</Label>
                                    <Input
                                        id="ayat_akhir"
                                        type="number"
                                        value={data.ayah_end}
                                        onChange={(e) => setData('ayah_end', e.target.value)}
                                        min="1"
                                        required
                                    />
                                    {errors.ayah_end && <p className="text-sm text-red-500">{errors.ayah_end}</p>}
                                </div>
                            </div>

                            {/* Tanggal Murojaah */}
                            <div>
                                <Label htmlFor="tanggal_murojaah">Tanggal Murojaah</Label>
                                <Input
                                    id="tanggal_murojaah"
                                    type="date"
                                    value={data.tanggal_murojaah}
                                    onChange={(e) => setData('tanggal_murojaah', e.target.value)}
                                    required
                                />
                                {errors.tanggal_murojaah && <p className="text-sm text-red-500">{errors.tanggal_murojaah}</p>}
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
                                    {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="nilai">Nilai</Label>
                                    <Input
                                        id="nilai"
                                        type="number"
                                        value={data.nilai}
                                        onChange={(e) => setData('nilai', e.target.value)}
                                        min="0"
                                        max="100"
                                    />
                                    {errors.nilai && <p className="text-sm text-red-500">{errors.nilai}</p>}
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
                                {errors.catatan && <p className="text-sm text-red-500">{errors.catatan}</p>}
                            </div>

                            <Button type="submit" disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
