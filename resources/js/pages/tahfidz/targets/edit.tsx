import { CalendarField } from '@/components/CalendarField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Student, Surah, Target, type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';

interface Props {
    santri: Student[];
    surahs: Surah[];
    target: Target;
}

type FormData = {
    santri_id: number;
    surah_start: number;
    ayah_start: number | '';
    surah_end: number;
    ayah_end: number | '';
    tanggal_target: string | '';
    status: 'aktif' | 'selesai' | 'batal';
};
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Edit({ santri, surahs, target }: Props) {
    const { data, setData, processing, errors } = useForm<FormData>({
        santri_id: target.santri_id ?? 0,
        surah_start: target.surah_start ?? 0,
        ayah_start: (target.ayah_start as number | undefined) ?? '',
        surah_end: target.surah_end ?? 0,
        ayah_end: (target.ayah_end as number | undefined) ?? '',
        tanggal_target: target.tanggal_target || '',
        status: target.status,
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload: Record<string, unknown> = {};
        Object.entries(data).forEach(([k, v]) => {
            if (v !== '' && v !== null && v !== undefined) {
                payload[k] = v;
            }
        });
        // @ts-expect-error - router.put expects specific payload type but we're sending filtered data
        router.put(route('target-hafalan.update', target.id), payload);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Target Hafalan" />
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
                                    <Select value={String(data.santri_id)} onValueChange={(value) => setData('santri_id', Number(value))}>
                                        <SelectTrigger id="santri_id" aria-labelledby="santri_id">
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
                                    <input type="hidden" name="santri_id" value={String(data.santri_id)} />
                                    {errors.santri_id && <p className="text-sm text-red-500">{errors.santri_id}</p>}
                                </div>

                                <div>
                                    <CalendarField
                                        label="Tanggal Target"
                                        name="tanggal_target"
                                        value={data.tanggal_target}
                                        onChange={(v) => setData('tanggal_target', v)}
                                        required
                                    />
                                    {errors.tanggal_target && <p className="text-sm text-red-500">{errors.tanggal_target}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="surah_start">Surah Mulai</Label>
                                    <Select value={String(data.surah_start)} onValueChange={(value) => setData('surah_start', Number(value))}>
                                        <SelectTrigger id="surah_start" aria-labelledby="surah_start">
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
                                    <input type="hidden" name="surah_start" value={String(data.surah_start)} />
                                    {errors.surah_start && <p className="text-sm text-red-500">{errors.surah_start}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="ayah_start">Ayat Mulai</Label>
                                    <Input
                                        id="ayah_start"
                                        type="number"
                                        value={data.ayah_start}
                                        onChange={(e) => setData('ayah_start', e.target.value === '' ? '' : Number(e.target.value))}
                                        min="1"
                                    />
                                    {errors.ayah_start && <p className="text-sm text-red-500">{errors.ayah_start}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="surah_end">Surah Selesai</Label>
                                    <Select value={String(data.surah_end)} onValueChange={(value) => setData('surah_end', Number(value))}>
                                        <SelectTrigger id="surah_end" aria-labelledby="surah_end">
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
                                    <input type="hidden" name="surah_end" value={String(data.surah_end)} />
                                    {errors.surah_end && <p className="text-sm text-red-500">{errors.surah_end}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="ayah_end">Ayat Selesai</Label>
                                    <Input
                                        id="ayah_end"
                                        type="number"
                                        value={data.ayah_end}
                                        onChange={(e) => setData('ayah_end', e.target.value === '' ? '' : Number(e.target.value))}
                                        min="1"
                                    />
                                    {errors.ayah_end && <p className="text-sm text-red-500">{errors.ayah_end}</p>}
                                </div>
                            </div>

                            <Button type="submit" disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Update Target'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
