import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, DataKelas, PageProps, Student, Teacher } from '@/types'; // Pastikan tipe Student sudah ada
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, PlusCircle, XCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Kelas',
        href: route('datakelas.index'), // Sesuaikan dengan route Anda
    },
    {
        title: 'Tambah Data Kelas',
        href: route('datakelas.create'), // Sesuaikan dengan route Anda
    },
];

type EditProps = PageProps & {
    dataKelas: DataKelas & {
        students: Student[];
    };
    availableStudents: Student[]; // Siswa yang bisa dipilih
    teachers: Teacher[];
};

export default function Edit({ dataKelas, availableStudents, teachers }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        nama_kelas: dataKelas.nama_kelas || '',
        waliKelas_id: dataKelas.waliKelas_id,
        students: dataKelas.students.length > 0 ? dataKelas.students.map((s) => ({ student_id: s.id.toString() })) : [{ student_id: '' }],
    });

    // Fungsi untuk menangani perubahan pada dropdown siswa
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

    // Fungsi untuk menangani submit form
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('datakelas.update', dataKelas.id)); // Sesuaikan dengan route Anda
    };

    // Filter siswa yang sudah dipilih agar tidak muncul lagi di dropdown lain
    const getAvailableStudents = () => {
        const selectedStudentIds = data.students.map((s) => s.student_id).filter(Boolean);
        return availableStudents.filter((student) => !selectedStudentIds.includes(student.id.toString()));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Data Kelas" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl bg-white p-4 dark:bg-gray-800">
                <form onSubmit={submit} className="flex flex-col gap-6">
                    {/* Input untuk Nama Kelas */}
                    <div className="grid gap-2">
                        <Label htmlFor="nama_kelas">Nama Kelas</Label>
                        <Input
                            id="nama_kelas"
                            type="text"
                            required
                            autoFocus
                            value={data.nama_kelas}
                            onChange={(e) => setData('nama_kelas', e.target.value)}
                            placeholder="Contoh: Kelas 7A"
                        />
                        <InputError message={errors.nama_kelas} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="waliKelas_id">Wali Kelas</Label>
                        <select
                            id="waliKelas_id"
                            name="waliKelas_id"
                            value={data.waliKelas_id ?? ''}
                            onChange={(e) => setData('waliKelas_id', Number(e.target.value))}
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
                        <InputError message={errors.waliKelas_id} className="mt-2" />
                    </div>

                    {/* Bagian dinamis untuk menambah siswa */}
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
                                    {student.student_id && availableStudents.find((s) => s.id.toString() === student.student_id) && (
                                        <option value={student.student_id}>
                                            {availableStudents.find((s) => s.id.toString() === student.student_id)?.name}
                                        </option>
                                    )}
                                    {/* Opsi untuk siswa lain yang belum dipilih */}
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
            </div>
        </AppLayout>
    );
}
