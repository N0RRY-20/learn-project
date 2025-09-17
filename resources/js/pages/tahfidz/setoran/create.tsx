import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Student, Surah, Target, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface Props {
    santri: Student[];
    surahs: Surah[];
    targets: Target[];
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Create({ santri, surahs, targets }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        santri_id: '',
        target_id: 'null', // Default ke null (opsional)
        surah_start: '',
        ayah_start: '',
        surah_end: '',
        ayah_end: '',
        status: 'belum_setor',
        feedback_guru: '',
        nilai: '',
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Convert 'null' back to null for backend
        const formData = {
            ...data,
            target_id: data.target_id === 'null' ? null : data.target_id,
        };
        post(route('setoran-hafalan.store'), {
            data: formData,
            onSuccess: () => {
                reset();
            },
        });
    };

    const filteredTargets = data.santri_id ? targets.filter((target) => target.santri_id.toString() === data.santri_id) : [];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Input Setoran Hafalan Santri</CardTitle>
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
                                    <Label htmlFor="target_id">Target Hafalan (Opsional)</Label>
                                    <Select value={data.target_id} onValueChange={(value) => setData('target_id', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Target (Opsional)" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="null">Tanpa Target</SelectItem>
                                            {filteredTargets.map((target) => (
                                                <SelectItem key={target.id} value={target.id.toString()}>
                                                    {target.surah_start === target.surah_end
                                                        ? `Surah ${target.surah_start} Ayat ${target.ayah_start}-${target.ayah_end}`
                                                        : `Surah ${target.surah_start}:${target.ayah_start} - Surah ${target.surah_end}:${target.ayah_end}`}{' '}
                                                    ({new Date(target.tanggal_target).toLocaleDateString('id-ID')})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={data.status} onValueChange={(value: any) => setData('status', value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="belum_setor">Belum Setor</SelectItem>
                                            <SelectItem value="di_ulang">Di Ulang</SelectItem>
                                            <SelectItem value="lulus">Lulus</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="nilai">Nilai (1-100)</Label>
                                    <Input
                                        id="nilai"
                                        type="number"
                                        value={data.nilai}
                                        onChange={(e) => setData('nilai', e.target.value)}
                                        min="1"
                                        max="100"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="feedback_guru">Feedback Guru</Label>
                                <Input
                                    id="feedback_guru"
                                    value={data.feedback_guru}
                                    onChange={(e) => setData('feedback_guru', e.target.value)}
                                    placeholder="Masukkan feedback untuk santri"
                                />
                            </div>

                            <Button type="submit" disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Simpan Setoran'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
