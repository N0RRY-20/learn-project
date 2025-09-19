import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, DataKelas, PageProps, Student, Teacher } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, PlusCircle, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';

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

// Definisikan tipe props yang akan diterima dari controller
type CreateProps = PageProps & {
    students: Student[];
    teachers: Teacher[];
    kelas: DataKelas[]; // Array siswa yang belum punya kelas
};
export default function Create({ teachers, students, kelas }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        nama_halaqah: '',
        teacher_id: '',
        // State untuk siswa akan menjadi array of objects
        // Kita mulai dengan satu baris siswa kosong
        students: [{ student_id: '' }],
    });

    // State filter
    const [filterClassId, setFilterClassId] = useState<string>('');
    const [filterGender, setFilterGender] = useState<'All' | Student['gender']>('All');

    // Opsi kelas: urutkan berdasarkan nama
    const classOptions = useMemo(() => {
        return [...kelas].sort((a, b) => a.nama_kelas.localeCompare(b.nama_kelas));
    }, [kelas]);

    // Utility: normalisasi gender agar tahan perbedaan kapitalisasi/strip
    const normalizeGender = (val?: string) => (val || '').toLowerCase().replace(/-/g, '').trim();

    // Daftar siswa yang sudah difilter berdasarkan kelas & gender
    const filteredStudentsBase = useMemo(() => {
        return students.filter((s) => {
            const matchesClass = filterClassId ? s.kelas_id === Number(filterClassId) : true;
            const matchesGender = filterGender === 'All' ? true : normalizeGender(s.gender) === normalizeGender(filterGender);
            return matchesClass && matchesGender;
        });
    }, [students, filterClassId, filterGender]);

    const handleStudentChange = (index: number, student_id: string) => {
        const updatedStudents = [...data.students];
        updatedStudents[index] = { student_id };
        setData('students', updatedStudents);
    };

    // Fungsi untuk menambah baris input siswa baru
    const addStudentRow = () => {
        setData('students', [...data.students, { student_id: '' }]);
    };

    // Fungsi untuk menghapus baris input siswa
    const removeStudentRow = (index: number) => {
        const filteredStudents = data.students.filter((_, i) => i !== index);
        setData('students', filteredStudents);
    };

    const getAvailableStudents = () => {
        const selectedStudentIds = data.students.map((s) => s.student_id).filter(Boolean);
        return filteredStudentsBase.filter((student) => !selectedStudentIds.includes(student.id.toString()));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('datahalaqah.store')); // Sesuaikan dengan route Anda
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu Tahfidz" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={submit} className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="nama_halaqah">Nama Halaqah</Label>
                        <Input
                            id="nama_halaqah"
                            type="text"
                            required
                            autoFocus
                            value={data.nama_halaqah}
                            onChange={(e) => setData('nama_halaqah', e.target.value)}
                            placeholder="Contoh: Halaqah umar bn khottob"
                        />
                        <InputError message={errors.nama_halaqah} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="teacher_id">Wali Kelas</Label>
                        <select
                            id="teacher_id"
                            name="teacher_id"
                            value={data.teacher_id}
                            onChange={(e) => setData('teacher_id', e.target.value)}
                            required
                            tabIndex={2}
                            className="w-full rounded-md border border-gray-300 p-2"
                        >
                            <option value="">-- Pilih Pembimbing --</option>
                            {teachers.map((teacher) => (
                                <option key={teacher.id} value={teacher.id}>
                                    {teacher.user.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.teacher_id} className="mt-2" />
                    </div>

                    {/* Filter Siswa */}
                    <div className="grid gap-4 rounded-md border border-gray-200 p-4 dark:border-gray-700">
                        <Label>Filter Siswa</Label>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="grid gap-2">
                                <Label htmlFor="filter_class">Berdasarkan Kelas</Label>
                                <select
                                    id="filter_class"
                                    value={filterClassId}
                                    onChange={(e) => setFilterClassId(e.target.value)}
                                    className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700"
                                >
                                    <option value="">Semua Kelas</option>
                                    {classOptions.map((k) => (
                                        <option key={k.id} value={k.id}>
                                            {k.nama_kelas}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid gap-2 md:col-span-2">
                                <Label>Gender</Label>
                                <div className="flex flex-wrap items-center gap-4">
                                    <label className="inline-flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="gender_filter"
                                            value="All"
                                            checked={filterGender === 'All'}
                                            onChange={() => setFilterGender('All')}
                                        />
                                        <span>Semua</span>
                                    </label>
                                    <label className="inline-flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="gender_filter"
                                            value="Laki-laki"
                                            checked={filterGender === 'Laki-laki'}
                                            onChange={() => setFilterGender('Laki-laki')}
                                        />
                                        <span>Laki-laki</span>
                                    </label>
                                    <label className="inline-flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="gender_filter"
                                            value="Perempuan"
                                            checked={filterGender === 'Perempuan'}
                                            onChange={() => setFilterGender('Perempuan')}
                                        />
                                        <span>Perempuan</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <Label>Siswa</Label>
                        {data.students.map((student, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <select
                                    name={`students[${index}][student_id]`}
                                    value={student.student_id}
                                    onChange={(e) => handleStudentChange(index, e.target.value)}
                                    className="w-full flex-grow rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700"
                                    required
                                >
                                    <option value="">-- Pilih Siswa --</option>
                                    {/* Opsi untuk siswa yang sedang dipilih saat ini (jika sudah ada) */}
                                    {student.student_id && students.find((s) => s.id.toString() === student.student_id) && (
                                        <option value={student.student_id}>
                                            {students.find((s) => s.id.toString() === student.student_id)?.name}
                                        </option>
                                    )}
                                    {/* Opsi untuk siswa lain yang belum dipilih sesuai filter */}
                                    {getAvailableStudents().map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>

                                {/* Tombol Hapus hanya muncul jika ada lebih dari 1 baris */}
                                {data.students.length > 1 && (
                                    <Button type="button" variant="destructive" size="icon" onClick={() => removeStudentRow(index)}>
                                        <XCircle className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                        <InputError message={errors.students} className="mt-2" />
                    </div>

                    {/* Tombol untuk menambah baris siswa */}
                    <Button type="button" variant="outline" onClick={addStudentRow} className="mt-2 w-full justify-center gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Tambah Siswa
                    </Button>

                    {/* Tombol Submit Utama */}
                    <Button type="submit" className="mt-4 w-full" disabled={processing}>
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Simpan
                    </Button>
                </form>
                {/* {({ processing, errors }) => (
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
                                        <option value="">-- Pilih Pembimbing --</option>
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
                    )} */}
            </div>
        </AppLayout>
    );
}
