import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

interface Santri {
    id: number;
    name: string;
    halaqah_id: number;
}

interface Surah {
    id: number;
    nama_surah: string;
    jumlah_ayat: number;
}

interface Target {
    id: number;
    santri_id: number;
    surah_start: number;
    ayah_start: number;
    surah_end: number;
    ayah_end: number;
    tanggal_target: string;
    status: 'aktif' | 'selesai' | 'batal';
    santri: Santri;
}

interface Setoran {
    id: number;
    santri_id: number;
    target_id?: number;
    surah_start: number;
    ayah_start: number;
    surah_end: number;
    ayah_end: number;
    status: 'belum_setor' | 'di_ulang' | 'lulus';
    feedback_guru?: string;
    nilai?: number;
    tanggal_setor: string;
    santri: Santri;
    target?: Target;
    // Tambahkan computed properties dari model
    status_target?: 'tanpa_target' | 'belum_tercapai' | 'sampai_target' | 'melebihi_target';
    status_target_indonesia?: string;
    status_target_color?: string;
    persentase_target?: number;
}

// Tambahkan method untuk mendapatkan warna status target
const getStatusTargetColor = (status: string) => {
    switch (status) {
        case 'tanpa_target':
            return 'bg-gray-100 text-gray-800';
        case 'belum_tercapai':
            return 'bg-red-100 text-red-800';
        case 'sampai_target':
            return 'bg-green-100 text-green-800';
        case 'melebihi_target':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

interface Props {
    setorans: Setoran[];
    santri: Santri[];
    surahs: Surah[];
    targets: Target[];
}

export default function SetoranHafalanIndex({ setorans, santri, surahs, targets }: Props) {
    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        santri_id: '',
        target_id: 'null', // Ubah default value
        surah_start: '',
        ayah_start: '',
        surah_end: '',
        ayah_end: '',
        status: 'di_ulang' as 'belum_setor' | 'di_ulang' | 'lulus',
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
                setShowForm(false);
            },
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'belum_setor':
                return 'bg-gray-100 text-gray-800';
            case 'di_ulang':
                return 'bg-red-100 text-red-800';
            case 'lulus':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'belum_setor':
                return 'Belum Setor';
            case 'di_ulang':
                return 'Di Ulang';
            case 'lulus':
                return 'Lulus';
            default:
                return 'Tidak Diketahui';
        }
    };

    // Filter targets berdasarkan santri yang dipilih
    const filteredTargets = data.santri_id ? targets.filter((target) => target.santri_id.toString() === data.santri_id) : [];

    return (
        <div className="space-y-6 p-4">
            <Head title="Setoran Hafalan" />

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Setoran Hafalan</h1>
                <Button onClick={() => setShowForm(!showForm)}>{showForm ? 'Tutup Form' : 'Input Setoran Baru'}</Button>
            </div>

            {/* Form Input Setoran */}
            {showForm && (
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
            )}

            {/* Tabel Setoran */}
            <Card>
                <CardHeader>
                    <CardTitle>Data Setoran Hafalan</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border border-gray-300 px-4 py-2">Santri</th>
                                    <th className="border border-gray-300 px-4 py-2">Target</th>
                                    <th className="border border-gray-300 px-4 py-2">Surah & Ayat</th>
                                    <th className="border border-gray-300 px-4 py-2">Status Target</th>
                                    <th className="border border-gray-300 px-4 py-2">Status Hafalan</th>
                                    <th className="border border-gray-300 px-4 py-2">Nilai</th>
                                    <th className="border border-gray-300 px-4 py-2">Tanggal Setor</th>
                                    <th className="border border-gray-300 px-4 py-2">Feedback</th>
                                </tr>
                            </thead>
                            <tbody>
                                {setorans.map((setoran) => (
                                    <tr key={setoran.id}>
                                        <td className="border border-gray-300 px-4 py-2">{setoran.santri.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {setoran.target ? (
                                                <Badge className="bg-blue-100 text-blue-800">
                                                    Target {setoran.target.id}
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-gray-100 text-gray-800">
                                                    Tanpa Target
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {setoran.surah_start === setoran.surah_end
                                                ? `Surah ${setoran.surah_start} Ayat ${setoran.ayah_start}-${setoran.ayah_end}`
                                                : `Surah ${setoran.surah_start}:${setoran.ayah_start} - Surah ${setoran.surah_end}:${setoran.ayah_end}`}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <Badge className={getStatusTargetColor(setoran.status_target || 'tanpa_target')}>
                                                {setoran.status_target_indonesia || 'Tanpa Target'}
                                            </Badge>
                                            {setoran.persentase_target && (
                                                <div className="text-xs text-gray-600 mt-1">
                                                    {setoran.persentase_target}%
                                                </div>
                                            )}
                                            {/* Debug info */}
                                            <div className="text-xs text-gray-500 mt-1">
                                                Target: {setoran.target ? `Surah ${setoran.target.surah_start}:${setoran.target.ayah_start}-${setoran.target.ayah_end}` : 'None'}
                                            </div>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <Badge className={getStatusColor(setoran.status)}>
                                                {getStatusText(setoran.status)}
                                            </Badge>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{setoran.nilai || '-'}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {new Date(setoran.tanggal_setor).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{setoran.feedback_guru || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
