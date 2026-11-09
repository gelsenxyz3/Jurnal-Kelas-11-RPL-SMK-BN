import { useState } from 'react';
import { KELAS } from '../data.js';

export default function Pengumuman() {
  const [daftarPengumuman, setDaftarPengumuman] = useState([
    {
      id: 1,
      judul: 'Kumpul Kelas & Persiapan Ujian Praktik',
      kategori: 'Penting',
      tanggal: '2026-03-05',
      isi: 'Seluruh siswa Kelas 11 RPL wajib hadir tepat waktu di laboratorium komputer untuk persiapan ujian praktik pemrograman.'
    },
    {
      id: 2,
      judul: 'Pengumpulan Tugas Proyek Web',
      kategori: 'Tugas',
      tanggal: '2026-03-03',
      isi: 'Batas akhir pengumpulan repository proyek web interaktif adalah hari Jumat pukul 23:59 WIB.'
    }
  ]);

  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('Penting');
  const [isi, setIsi] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!judul || !isi) return;

    const newPengumuman = {
      id: Date.now(),
      judul,
      kategori,
      tanggal: new Date().toISOString().split('T')[0],
      isi
    };

    setDaftarPengumuman([newPengumuman, ...daftarPengumuman]);
    setJudul('');
    setIsi('');
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setDaftarPengumuman(daftarPengumuman.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6 text-[#1E293B]">
      {/* Header Halaman */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#1E293B]">Pengumuman Kelas {KELAS}</h2>
          <p className="text-sm text-[#64748B]">Informasi resmi dan pemberitahuan penting untuk siswa.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition"
        >
          {showForm ? 'Tutup Formulir' : '+ Buat Pengumuman'}
        </button>
      </div>

      {/* Formulir Buat Pengumuman */}
      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#1E293B]">Buat Pengumuman Baru</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2">Judul Pengumuman</label>
              <input 
                type="text" 
                placeholder="Contoh: Jadwal Ujian / Kerja Bakti" 
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#1E293B] shadow-sm outline-none focus:border-blue-600"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2">Kategori</label>
              <select 
                value={kategori} 
                onChange={(e) => setKategori(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#1E293B] shadow-sm outline-none focus:border-blue-600"
              >
                <option value="Penting">Penting</option>
                <option value="Tugas">Tugas</option>
                <option value="Kegiatan">Kegiatan</option>
                <option value="Umum">Umum</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2">Isi Pengumuman</label>
            <textarea 
              rows="3"
              placeholder="Tuliskan detail informasi pengumuman..." 
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#1E293B] shadow-sm outline-none focus:border-blue-600"
              required
            ></textarea>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button 
              type="submit" 
              className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              Publikasikan
            </button>
          </div>
        </form>
      )}

      {/* Daftar Kartu Pengumuman */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {daftarPengumuman.length === 0 ? (
          <div className="col-span-2 rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-[#64748B]">
            Belum ada pengumuman yang dipublikasikan.
          </div>
        ) : (
          daftarPengumuman.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                    item.kategori === 'Penting' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                    item.kategori === 'Tugas' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                    'bg-blue-50 text-blue-600 border border-blue-100'
                  }`}>
                    {item.kategori}
                  </span>
                  <span className="text-xs text-[#64748B] font-medium">{item.tanggal}</span>
                </div>
                <h3 className="text-lg font-bold text-[#1E293B]">{item.judul}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.isi}</p>
              </div>
              <div className="flex justify-end pt-2 border-t border-slate-100">
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="rounded-lg px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  Hapus Pengumuman
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}