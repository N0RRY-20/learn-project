import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DataHalaqah } from '@/types';

interface DetailDialogProps {
    detailData: DataHalaqah | null;
    onClose: () => void;
}

export default function DetailDialog({ detailData, onClose }: DetailDialogProps) {
    if (!detailData) return null;

    return (
        <Dialog
            open={!!detailData}
            onOpenChange={(isOpen) => {
                if (!isOpen) onClose();
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detail Kelas: {detailData.nama_halaqah}</DialogTitle>
                    <DialogDescription>Berikut detail lengkap kelas ini.</DialogDescription>
                </DialogHeader>

                <div className="space-y-2 text-sm">
                    {/* Nama kelas */}
                    <div className="flex">
                        <span className="w-32 pr-2 text-right font-medium">Nama Kelas</span>
                        <span>{detailData.nama_halaqah}</span>
                    </div>

                    {/* Wali kelas */}
                    <div className="flex">
                        <span className="w-32 pr-2 text-right font-medium">Wali Kelas</span>
                        <span>{detailData.teacher?.user?.name ?? '-'}</span>
                    </div>

                    {/* Anggota siswa */}
                    <div>
                        <span className="block font-medium">Daftar Murid</span>
                        <ul className="list-disc pl-6">
                            {detailData.students?.map((s) => (
                                <li key={s.id}>{s.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
