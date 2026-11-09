import { useState } from 'react';
import { Card, Badge, Field } from './ui.jsx';
import { CLASSES, KELAS } from '../data.js';

export default function SiswaList() {
  const [search, setSearch] = useState('');
  const siswaList = CLASSES[KELAS] || [];

  const filteredSiswa = siswaList.filter((nama) =>
    nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 text-[#1E293B]">
      {/* Header Halaman */}
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#1E293B]">Daftar Siswa Kelas {KELAS}</h2>
          <p className="text-sm text-[#64748B]">Manajemen data dan profil siswa yang terdaftar di kelas.</p>
        </div>
        <div className="inline-flex items-center rounded-xl bg-white px-3.5 py-2 border border-slate-200/80 shadow-sm text-xs font-semibold text-[#64748B]">
          Total Siswa: <span className="ml-1.5 text-blue-600 font-bold">{siswaList.length} Orang</span>
        </div>
      </div>

      {/* Kotak Pencarian */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <Field 
          label="Cari Siswa" 
          placeholder="Ketik nama siswa..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>

      {/* Tabel Daftar Siswa */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            <tr>
              <th className="px-5 py-3.5 w-16 text-center">No</th>
              <th className="px-5 py-3.5">Nama Lengkap</th>
              <th className="px-5 py-3.5">Kelas</th>
              <th className="px-5 py-3.5">Status Akademik</th>
              <th className="px-5 py-3.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredSiswa.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-5 py-8 text-center text-sm text-[#64748B]">
                  Siswa tidak ditemukan.
                </td>
              </tr>
            ) : (
              filteredSiswa.map((nama, idx) => (
                <tr key={nama} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-4 text-center font-medium text-[#64748B]">{idx + 1}</td>
                  <td className="px-5 py-4 font-semibold text-[#1E293B] flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold text-xs border border-blue-100">
                      {nama.slice(0, 2).toUpperCase()}
                    </span>
                    {nama}
                  </td>
                  <td className="px-5 py-4"><Badge>{KELAS}</Badge></td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 border border-emerald-100">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Aktif
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button 
                      onClick={() => alert(`Profil detail untuk ${nama}`)}
                      className="rounded-lg px-3 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      Detail
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