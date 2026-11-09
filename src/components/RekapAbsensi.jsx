import { useMemo, useState } from 'react';
import { Card, Badge, Button } from './ui.jsx';
import { CLASSES, KELAS, tally } from '../data.js';

export default function RekapAbsensi({ journals }) {
  const [filterBulan, setFilterBulan] = useState('semua');

  // Ambil daftar siswa dari kelas aktif
  const siswaList = CLASSES[KELAS] || [];

  // Hitung rekap kehadiran per siswa berdasarkan data journals
  const rekapData = useMemo(() => {
    const data = {};
    siswaList.forEach((nama) => {
      data[nama] = { Hadir: 0, Sakit: 0, Izin: 0, Alpha: 0, Total: 0 };
    });

    journals.forEach((j) => {
      // Jika ada filter bulan (format tanggal YYYY-MM-DD)
      if (filterBulan !== 'semua') {
        const bulanJurnal = j.tanggal?.slice(0, 7); // 'YYYY-MM'
        if (bulanJurnal !== filterBulan) return;
      }

      if (j.absensi) {
        Object.entries(j.absensi).forEach(([nama, status]) => {
          if (data[nama] && data[nama][status] !== undefined) {
            data[nama][status] += 1;
            data[nama].Total += 1;
          }
        });
      }
    });

    return data;
  }, [journals, siswaList, filterBulan]);

  // Daftar bulan unik dari jurnal untuk dropdown filter
  const daftarBulan = useMemo(() => {
    const setBulan = new Set();
    journals.forEach((j) => {
      if (j.tanggal) setBulan.add(j.tanggal.slice(0, 7));
    });
    return Array.from(setBulan).sort().reverse();
  }, [journals]);

  return (
    <div className="space-y-6 text-[#1E293B]">
      {/* Header Halaman */}
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#1E293B]">Rekap Absensi Siswa</h2>
          <p className="text-sm text-[#64748B]">Akumulasi kehadiran, sakit, izin, dan alpha siswa Kelas {KELAS}.</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={filterBulan} 
            onChange={(e) => setFilterBulan(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-[#1E293B] shadow-sm outline-none focus:border-blue-600"
          >
            <option value="semua">Semua Periode</option>
            {daftarBulan.map((b) => (
              <option key={b} value={b}>Bulan: {b}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabel Rekap Absensi */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            <tr>
              <th className="px-5 py-3.5 w-16 text-center">No</th>
              <th className="px-5 py-3.5">Nama Siswa</th>
              <th className="px-5 py-3.5 text-center text-emerald-600">Hadir (H)</th>
              <th className="px-5 py-3.5 text-center text-amber-600">Sakit (S)</th>
              <th className="px-5 py-3.5 text-center text-sky-600">Izin (I)</th>
              <th className="px-5 py-3.5 text-center text-rose-600">Alpha (A)</th>
              <th className="px-5 py-3.5 text-center">Total Pertemuan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {siswaList.map((nama, idx) => {
              const r = rekapData[nama] || { Hadir: 0, Sakit: 0, Izin: 0, Alpha: 0, Total: 0 };
              return (
                <tr key={nama} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5 text-center font-medium text-[#64748B]">{idx + 1}</td>
                  <td className="px-5 py-3.5 font-semibold text-[#1E293B]">{nama}</td>
                  <td className="px-5 py-3.5 text-center font-medium text-emerald-600">{r.Hadir}</td>
                  <td className="px-5 py-3.5 text-center font-medium text-amber-600">{r.Sakit}</td>
                  <td className="px-5 py-3.5 text-center font-medium text-sky-600">{r.Izin}</td>
                  <td className="px-5 py-3.5 text-center font-medium text-rose-600">
                    <span className={r.Alpha > 0 ? 'rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-600 border border-rose-100' : ''}>
                      {r.Alpha}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-center font-bold text-[#1E293B]">{r.Total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}