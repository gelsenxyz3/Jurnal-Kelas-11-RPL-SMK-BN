import { useState } from 'react';
import { KELAS } from '../data.js';

export default function Jadwal() {
  const [hariAktif, setHariAktif] = useState('Senin');

  const jadwalMingguan = {
    Senin: [
      { jam: '07:15 - 08:00', mapel: 'Upacara & Perwalian', guru: 'Guru & Wali Kelas', ruang: 'Lapangan & Kelas' },
      { jam: '08:00 - 10:00', mapel: 'Bahasa Inggris', guru: 'Miss. Siska', ruang: 'Ruang 11 RPL' },
      { jam: '10:15 - 15:30', mapel: 'Pemrograman React', guru: 'Pak. Maul', ruang: 'Lab RPL 2' },
    ],
    Selasa: [
      { jam: '07:15 - 08:00', mapel: 'Apel & Literasi', guru: 'Guru Piket', ruang: 'Lapangan & Kelas' },
      { jam: '08:00 - 10:00', mapel: 'Bahasa Indonesia', guru: 'Ibu. Desti', ruang: 'Ruang 11 RPL' },
      { jam: '10:15 - 11:45', mapel: 'Pendidikan Pancasila', guru: 'Pak. Ruddy', ruang: 'Ruang 11 RPL' },
      { jam: '11:45 - 15:30', mapel: 'Produk Kreatif & Kewirausahaan (PKK)', guru: 'Pak Maul', ruang: 'Lab RPL 2' },
    ],
    Rabu: [
      { jam: '07:15 - 08:00', mapel: 'Apel & Senam', guru: 'OSIS', ruang: 'Lapangan' },
      { jam: '08:00 - 09:30', mapel: 'Bahasa Jawa', guru: 'Ibu. Galih', ruang: 'Ruang 11 RPL' },
      { jam: '09:30 - 14:45', mapel: 'Pemrograman Flutter', guru: 'Ibu. Cornelia', ruang: 'Lab RPL 2' },
    ],
    Kamis: [
      { jam: '07:15 - 08:00', mapel: 'Apel & Literasi', guru: 'Guru Piket', ruang: 'Lapangan & Kelas' },
      { jam: '08:00 - 09:30', mapel: 'PJOK', guru: 'Bpk. Bangkit', ruang: 'Lapangan' },
      { jam: '09:30 - 15:30', mapel: 'Pemrograman Laravel', guru: 'Pak Yafet', ruang: 'Lab RPL 2' },
    ],
    Jumat: [
      { jam: '07:15 - 08:00', mapel: 'Apel & Senam', guru: 'Guru Piket & OSIS', ruang: 'Lapangan' },
      { jam: '08:00 - 10:00', mapel: 'Matematika', guru: 'Pak Anwar', ruang: 'Ruang 11 RPL' },
      { jam: '10:00 - 13:00', mapel: 'Sejarah', guru: 'Bu Ani', ruang: 'Ruang 11 RPL' },
      { jam: '13:00 - 14:30', mapel: 'Agama', guru: 'Pak Wengky', ruang: 'Ruang 11 RPL' },
      { jam: '14:00 - 15:00', mapel: 'BK', guru: 'Bu Lina', ruang: 'Ruang BK' },
    ],
  };

  const daftarHari = Object.keys(jadwalMingguan);

  return (
    <div className="space-y-6 text-[#1E293B]">
      {/* Header Halaman */}
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#1E293B]">Jadwal Pelajaran Kelas {KELAS}</h2>
          <p className="text-sm text-[#64748B]">Jadwal kegiatan belajar mengajar mingguan.</p>
        </div>
      </div>

      {/* Tab Navigasi Hari */}
      <div className="flex gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        {daftarHari.map((hari) => {
          const isActive = hariAktif === hari;
          return (
            <button
              key={hari}
              onClick={() => setHariAktif(hari)}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-[#64748B] hover:bg-slate-100 hover:text-[#1E293B] border border-slate-200/80'
              }`}
            >
              {hari}
            </button>
          );
        })}
      </div>

      {/* Tabel Jadwal Pelajaran */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            <tr>
              <th className="px-5 py-3.5 w-16 text-center">No</th>
              <th className="px-5 py-3.5">Waktu / Jam</th>
              <th className="px-5 py-3.5">Mata Pelajaran</th>
              <th className="px-5 py-3.5">Pengampu / Guru</th>
              <th className="px-5 py-3.5">Ruangan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jadwalMingguan[hariAktif].map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-5 py-4 text-center font-medium text-[#64748B]">{idx + 1}</td>
                <td className="px-5 py-4 font-semibold text-blue-600 whitespace-nowrap">{item.jam}</td>
                <td className="px-5 py-4 font-bold text-[#1E293B]">{item.mapel}</td>
                <td className="px-5 py-4 text-slate-600">{item.guru}</td>
                <td className="px-5 py-4">
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 border border-slate-200/60">
                    {item.ruang}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}