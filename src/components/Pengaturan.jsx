import { KELAS, SCHOOL } from '../data.js';

export default function Pengaturan() {
  return (
    <div className="space-y-6 text-[#1E293B]">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[#1E293B]">Pengaturan Aplikasi</h2>
        <p className="text-sm text-[#64748B]">Kelola profil kelas, preferensi aplikasi, dan identitas sekolah.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#1E293B] border-b border-slate-100 pb-3">Informasi Kelas & Sekolah</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="block text-xs font-semibold uppercase text-[#64748B]">Nama Sekolah</span>
              <p className="font-semibold text-[#1E293B] mt-0.5">{SCHOOL}</p>
            </div>
            <div>
              <span className="block text-xs font-semibold uppercase text-[#64748B]">Kelas Aktif</span>
              <p className="font-semibold text-blue-600 mt-0.5">{KELAS}</p>
            </div>
            <div>
              <span className="block text-xs font-semibold uppercase text-[#64748B]">Versi Aplikasi</span>
              <p className="font-semibold text-slate-700 mt-0.5">v1.0.0 (Enterprise Clean White)</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#1E293B] border-b border-slate-100 pb-3">Penyimpanan & Data</h3>
          <p className="text-sm text-[#64748B]">
            Seluruh data jurnal, absensi, pelanggaran, dan catatan pembinaan tersimpan secara aman di peramban (LocalStorage).
          </p>
          <button 
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin menghapus seluruh data jurnal lokal?')) {
                localStorage.removeItem('jurnal-kelas:v1');
                window.location.reload();
              }
            }}
            className="rounded-xl bg-rose-50 border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-100 transition"
          >
            Bersihkan Seluruh Data Lokal
          </button>
        </div>
      </div>
    </div>
  );
}