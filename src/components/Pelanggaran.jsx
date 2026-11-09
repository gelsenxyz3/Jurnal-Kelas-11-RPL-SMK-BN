import { useState } from 'react';
import { CLASSES, KELAS } from '../data.js';

export default function Pelanggaran() {
  const [daftarPelanggaran, setDaftarPelanggaran] = useState([
    { id: 1, nama: 'Alfaro', jenis: 'Terlambat Hadir ke Sekolah', poin: 10, tanggal: '2026-03-01' },
    { id: 2, nama: 'David', jenis: 'Tidak Memakai Atribut Lengkap', poin: 5, tanggal: '2026-03-02' }
  ]);
  
  const [namaSiswa, setNamaSiswa] = useState('');
  const [jenisPelanggaran, setJenisPelanggaran] = useState('');
  const [poin, setPoin] = useState(10);
  const [showForm, setShowForm] = useState(false);

  const siswaList = CLASSES[KELAS] || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!namaSiswa || !jenisPelanggaran) return;

    const newItem = {
      id: Date.now(),
      nama: namaSiswa,
      jenis: jenisPelanggaran,
      poin: Number(poin),
      tanggal: new Date().toISOString().split('T')[0]
    };

    setDaftarPelanggaran([newItem, ...daftarPelanggaran]);
    setNamaSiswa('');
    setJenisPelanggaran('');
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setDaftarPelanggaran(daftarPelanggaran.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6 text-[#1E293B]">
      {/* Header Halaman */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#1E293B]">Pelanggaran & Poin Siswa</h2>
          <p className="text-sm text-[#64748B]">Catatan kedisiplinan dan akumulasi poin penalti Kelas {KELAS}.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition"
        >
          {showForm ? 'Tutup Formulir' : '+ Catat Pelanggaran'}
        </button>
      </div>

      {/* Formulir Tambah Pelanggaran */}
      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#1E293B]">Formulir Catatan Pelanggaran</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2">Nama Siswa</label>
              <select 
                value={namaSiswa} 
                onChange={(e) => setNamaSiswa(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#1E293B] shadow-sm outline-none focus:border-blue-600"
                required
              >
                <option value="">Pilih Siswa...</option>
                {siswaList.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2">Bentuk Pelanggaran</label>
              <input 
                type="text" 
                placeholder="Contoh: Terlambat / Atribut tidak lengkap" 
                value={jenisPelanggaran}
                onChange={(e) => setJenisPelanggaran(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#1E293B] shadow-sm outline-none focus:border-blue-600"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2">Jumlah Poin</label>
              <input 
                type="number" 
                value={poin}
                onChange={(e) => setPoin(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#1E293B] shadow-sm outline-none focus:border-blue-600"
                min="1"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button 
              type="submit" 
              className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              Simpan Catatan
            </button>
          </div>
        </form>
      )}

      {/* Tabel Data Pelanggaran */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            <tr>
              <th className="px-5 py-3.5 w-16 text-center">No</th>
              <th className="px-5 py-3.5">Tanggal</th>
              <th className="px-5 py-3.5">Nama Siswa</th>
              <th className="px-5 py-3.5">Bentuk Pelanggaran</th>
              <th className="px-5 py-3.5 text-center">Poin</th>
              <th className="px-5 py-3.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {daftarPelanggaran.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-5 py-8 text-center text-sm text-[#64748B]">
                  Belum ada catatan pelanggaran siswa.
                </td>
              </tr>
            ) : (
              daftarPelanggaran.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-4 text-center font-medium text-[#64748B]">{idx + 1}</td>
                  <td className="px-5 py-4 text-slate-600">{item.tanggal}</td>
                  <td className="px-5 py-4 font-semibold text-[#1E293B]">{item.nama}</td>
                  <td className="px-5 py-4 text-slate-700">{item.jenis}</td>
                  <td className="px-5 py-4 text-center">
                    <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-600 border border-rose-100">
                      +{item.poin} Poin
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}