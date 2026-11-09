import { useEffect, useMemo, useState } from 'react';
import useCountUp from '../hooks/useCountUp.js';
import { CLASSES, KELAS, SCHOOL, fmtDate, tally } from '../data.js';

const Num = ({ to, suffix = '' }) => <>{useCountUp(to)}{suffix}</>;

export default function Dashboard({ journals, go }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 150);
    return () => clearTimeout(t);
  }, []);

  const d = useMemo(() => {
    const t = tally(journals);
    const total = Object.values(t).reduce((a, b) => a + b, 0);
    const today = new Date().toISOString().slice(0, 10);
    const miss = Object.fromEntries(CLASSES[KELAS].map((n) => [n, 0]));
    
    journals.forEach((j) => {
      Object.entries(j.absensi).forEach(([n, s]) => {
        if (s !== 'Hadir' && n in miss) miss[n] += 1;
      });
    });

    return {
      t,
      total,
      pct: total ? Math.round((t.Hadir / total) * 100) : 0,
      hariIni: journals.filter((j) => j.tanggal === today).length,
      perhatian: Object.entries(miss).filter(([, c]) => c > 0).sort((a, b) => b[1] - a[1]).slice(0, 4),
      recent: [...journals].sort((a, b) => b.tanggal.localeCompare(a.tanggal)).slice(0, 5),
    };
  }, [journals]);

  const kpis = [
    ['Total Jurnal', journals.length, '', 'text-blue-600', 'bg-blue-50', 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'],
    ['Jurnal Hari Ini', d.hariIni, '', 'text-emerald-600', 'bg-emerald-50', 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'],
    ['Jumlah Siswa', CLASSES[KELAS].length, '', 'text-purple-600', 'bg-purple-50', 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'],
    ['Tingkat Kehadiran', d.pct, '%', 'text-sky-600', 'bg-sky-50', 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'],
  ];

  const pHad = d.total ? Math.round((d.t.Hadir / d.total) * 100) : 0;
  const pSak = d.total ? Math.round((d.t.Sakit / d.total) * 100) : 0;
  const pIzi = d.total ? Math.round((d.t.Izin / d.total) * 100) : 0;
  const pAlp = d.total ? Math.round((d.t.Alpha / d.total) * 100) : 0;

  return (
    <div className="space-y-6 text-[#1E293B]">
      {/* Judul Tunggal Halaman Dashboard */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[#1E293B]">Dashboard</h2>
        <p className="text-sm text-[#64748B]">Ringkasan aktivitas dan informasi penting Kelas {KELAS}.</p>
      </div>

      {/* Hero Banner dengan Foto Sekolah */}
      <div className="relative overflow-hidden rounded-2xl bg-[#172033] p-6 text-white shadow-sm md:p-8">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/sekolah.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#172033] via-[#172033]/90 to-transparent" />

        <div className="relative z-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <span className="inline-block rounded-md bg-blue-600/30 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400 border border-blue-500/20">
              {SCHOOL}
            </span>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
              Jurnal Kelas {KELAS}
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => go('form')} 
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 active:scale-95"
            >
              + Tulis Jurnal Baru
            </button>
            <button 
              onClick={() => go('riwayat')} 
              className="rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-700 active:scale-95 border border-slate-700"
            >
              Lihat Riwayat
            </button>
          </div>
        </div>
      </div>

      {/* Kartu KPI */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map(([label, val, suf, textColor, bgColor, iconPath]) => (
          <div 
            key={label} 
            className="group relative overflow-hidden rounded-2xl bg-white p-5 border border-slate-200/80 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#64748B]">{label}</p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-[#1E293B]">
                  <Num to={val} suffix={suf} />
                </p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${bgColor} ${textColor}`}>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Donut Chart & Perhatian */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-sm lg:col-span-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#1E293B]">Ringkasan Kehadiran Siswa</h3>
            <span className="text-xs text-[#64748B] bg-slate-100 px-2.5 py-1 rounded-lg">Real-time Data</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 py-2">
            <div className="relative h-48 w-48 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <circle cx="60" cy="60" r="48" fill="none" stroke="#F1F5F9" strokeWidth="14" />
                
                {/* Segmen Hadir (Biru) */}
                <circle 
                  cx="60" cy="60" r="48" fill="none" 
                  stroke="#2563EB" strokeWidth="14" pathLength="100"
                  strokeDasharray={pHad + " 100"} 
                  strokeDashoffset={0} 
                />
                
                {/* Segmen Sakit (Amber) */}
                <circle 
                  cx="60" cy="60" r="48" fill="none" 
                  stroke="#F59E0B" strokeWidth="14" pathLength="100"
                  strokeDasharray={pSak + " 100"} 
                  strokeDashoffset={-pHad} 
                />
                
                {/* Segmen Izin (Sky) */}
                <circle 
                  cx="60" cy="60" r="48" fill="none" 
                  stroke="#0EA5E9" strokeWidth="14" pathLength="100"
                  strokeDasharray={pIzi + " 100"} 
                  strokeDashoffset={-(pHad + pSak)} 
                />
                
                {/* Segmen Alpha (Rose) */}
                <circle 
                  cx="60" cy="60" r="48" fill="none" 
                  stroke="#F43F5E" strokeWidth="14" pathLength="100"
                  strokeDasharray={pAlp + " 100"} 
                  strokeDashoffset={-(pHad + pSak + pIzi)} 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-[#1E293B] tracking-tight"><Num to={d.pct} suffix="%" /></span>
                <span className="text-xs font-medium text-[#64748B] uppercase">Hadir</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 border-t border-slate-100 w-full">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1E293B]">
                <span className="h-3 w-3 rounded-full bg-blue-600"></span> Hadir ({d.t.Hadir || 0})
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1E293B]">
                <span className="h-3 w-3 rounded-full bg-amber-500"></span> Sakit ({d.t.Sakit || 0})
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1E293B]">
                <span className="h-3 w-3 rounded-full bg-sky-500"></span> Izin ({d.t.Izin || 0})
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1E293B]">
                <span className="h-3 w-3 rounded-full bg-rose-500"></span> Alpha ({d.t.Alpha || 0})
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-sm lg:col-span-2">
          <h3 className="mb-4 font-bold text-[#1E293B]">Siswa Perlu Perhatian</h3>
          {d.perhatian.length === 0 ? (
            <p className="text-sm text-[#64748B]">Belum ada catatan ketidakhadiran. Kelas dalam kondisi aman.</p>
          ) : (
            <ul className="space-y-3">
              {d.perhatian.map(([nama, c]) => (
                <li key={nama} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 border border-slate-100">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm">
                    {nama[0]}
                  </span>
                  <span className="flex-1 text-sm font-semibold text-[#1E293B]">{nama}</span>
                  <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600 border border-rose-100">
                    {c}x Alpha
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Tabel Jurnal Terbaru */}
      <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[#1E293B]">Jurnal Pembelajaran Terbaru</h3>
          <button onClick={() => go('riwayat')} className="text-xs font-semibold text-blue-600 hover:underline">
            Lihat Semua →
          </button>
        </div>
        {d.recent.length === 0 ? (
          <p className="text-sm text-[#64748B]">Belum ada jurnal tercatat.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold uppercase text-[#64748B]">
                  <th className="pb-3">Mata Pelajaran</th>
                  <th className="pb-3">Guru Pengampu</th>
                  <th className="pb-3">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {d.recent.map((j) => (
                  <tr key={j.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 font-semibold text-[#1E293B]">{j.mapel}</td>
                    <td className="py-3.5 text-[#64748B]">{j.guru}</td>
                    <td className="py-3.5 text-[#64748B] text-xs">{fmtDate(j.tanggal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}