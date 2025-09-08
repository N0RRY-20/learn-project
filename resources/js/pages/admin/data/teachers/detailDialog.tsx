import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Teacher } from '@/types'; // Pastikan path ini benar

// Definisikan tipe untuk props komponen ini
interface DetailDialogProps {
    detailData: Teacher | null;
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
                    <DialogTitle>Detail untuk :{detailData.user.name}</DialogTitle>
                    <DialogDescription>Berikut adalah detail lengkap dari data yang Anda pilih.</DialogDescription>
                </DialogHeader>
                <div className="space-y-1 text-sm">
                    <div className="flex">
                        <span className="w-32 pr-2 text-right font-medium">Nama</span>
                        <span>{detailData.user.name}</span>
                    </div>
                    <div className="flex">
                        <span className="w-32 pr-2 text-right font-medium">Email</span>
                        <span>{detailData.user.email}</span>
                    </div>
                    <div className="flex">
                        <span className="w-32 pr-2 text-right font-medium">Roles</span>
                        <span>{detailData.user.roles.map((r) => r.name).join(', ')}</span>
                    </div>
                    <div className="flex">
                        <span className="w-32 pr-2 text-right font-medium">Jenis Kelamin</span>
                        <span>{detailData.jenis_kelamin}</span>
                    </div>
                    <div className="flex">
                        <span className="w-32 pr-2 text-right font-medium">No HP</span>
                        <span>{detailData.no_hp}</span>
                    </div>
                    <div className="flex">
                        <span className="w-32 pr-2 text-right font-medium">Alamat</span>
                        <span>{detailData.alamat}</span>
                    </div>
                    <div className="flex">
                        <span className="w-32 pr-2 text-right font-medium">Tanggal Lahir</span>
                        <span>{detailData.birth_date}</span>
                    </div>
                    <div className="flex">
                        <span className="w-32 pr-2 text-right font-medium">Tempat Lahir</span>
                        <span>{detailData.tempat_kelahiran}</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
