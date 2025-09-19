import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Student } from '@/types'; // Pastikan path ini benar

// Definisikan tipe untuk props komponen ini
interface DetailDialogProps {
    detailData: Student | null;
    onClose: () => void; // Fungsi untuk menutup dialog
}

export default function DetailDialog({ detailData, onClose }: DetailDialogProps) {
    // Jika tidak ada data, jangan render apa-apa (atau render null)
    if (!detailData) {
        return null;
    }

    return (
        <Dialog
            open={!!detailData} // Dialog terbuka jika detailData ada isinya
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    onClose(); // Panggil fungsi onClose saat dialog ditutup
                }
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detail untuk :{detailData.name}</DialogTitle>
                    <DialogDescription>Berikut adalah detail lengkap dari data yang Anda pilih.</DialogDescription>
                </DialogHeader>
                <div className="space-y-1 text-sm">
                    <div className="flex gap-4">
                        <span className="w-40 pr-2 text-right font-medium">Nama Lengkap</span>
                        <span>{detailData.name}</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="w-40 pr-2 text-right font-medium">NISN</span>
                        <span>{detailData.nisn || '-'}</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="w-40 pr-2 text-right font-medium">Kelas</span>
                        <span>{detailData.dataKelas?.nama_kelas || detailData.data_kelas?.nama_kelas || '-'}</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="w-40 pr-2 text-right font-medium">Halaqah</span>
                        <span>{detailData.datahalaqah?.nama_halaqah || '-'}</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="w-40 pr-2 text-right font-medium">Jenis Kelamin</span>
                        <span>{detailData.gender}</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="w-40 pr-2 text-right font-medium">Tanggal Lahir</span>
                        <span>{detailData.birth_date}</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="w-40 pr-2 text-right font-medium">Alamat</span>
                        <span>{detailData.address || '-'}</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="w-40 pr-2 text-right font-medium">Nama Orang Tua</span>
                        <span>{detailData.parent_name || '-'}</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="w-40 pr-2 text-right font-medium">No. Telepon</span>
                        <span>{detailData.phone_number || '-'}</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="w-40 pr-2 text-right font-medium">Pekerjaan Orang Tua</span>
                        <span>{detailData.parent_occupation || '-'}</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
