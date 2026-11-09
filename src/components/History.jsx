import { useMemo, useState } from 'react';
import { Badge, Button, Card, Field, Modal } from './ui.jsx';
import { SUBJECTS, fmtDate, tally } from '../data.js';
import { exportCSV, exportJSON, exportPDF } from '../utils/export.js';

export default function History({ journals, onEdit, onDelete }) {
  const [q, setQ] = useState('');
  const [mapel, setMapel] = useState('Semua');
  const [tanggal, setTanggal] = useState('');
  const [toDelete, setToDelete] = useState(null);

  const rows = useMemo(() => {
    const k = q.toLowerCase();
    return journals
      .filter((j) => (mapel === 'Semua' || j.mapel === mapel) && (!tanggal || j.tanggal === tanggal))
      .filter((j) => !k || [j.guru, j.materi, j.catatan, j.kelas].some((v) => v.toLowerCase().includes(k)))
      .sort((a, b) => b.tanggal.localeCompare(a.tanggal));
  }, [journals, q, mapel, tanggal]);

  return (
    <div className="space-y-6 text-[#1E293B]">
      {/* Header Halaman */}
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#1E293B]">Riwayat Jurnal Kelas</h2>
          <p className="text-sm text-[#64748B]">Kelola, cari, dan unduh arsip laporan jurnal pembelajaran.</p>
        </div>
        <div className="inline-flex items-center rounded-xl bg-white px-3.5 py-2 border border-slate-200/80 shadow-sm text-xs font-semibold text-[#64748B]">
          Total Arsip: <span className="ml-1.5 text-blue-600 font-bold">{rows.length} Jurnal</span>
        </div>
      </div>

      {/* Filter & Kontrol Pencarian Profesional */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field 
            label="Pencarian" 
            placeholder="Cari guru, materi, atau catatan…" 
            value={q} 
            onChange={(e) => setQ(e.target.value)} 
          />
          <Field 
            label="Mata Pelajaran" 
            as="select" 
            options={['Semua', ...SUBJECTS]} 
            value={mapel} 
            onChange={(e) => setMapel(e.target.value)} 
          />
          <Field 
            label="Tanggal" 
            type="date" 
            value={tanggal} 
            onChange={(e) => setTanggal(e.target.value)} 
          />
        </div>

        {/* Baris Tombol Ekspor Berkelanjutan */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#64748B] mr-1">Ekspor Data:</span>
            <button
              disabled={!rows.length}
              onClick={() => exportCSV(rows)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
            >
              Unduh CSV
            </button>
            <button
              disabled={!rows.length}
              onClick={() => exportJSON(rows)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
            >
              Unduh JSON
            </button>
            <button
              disabled={!rows.length}
              onClick={() => exportPDF(rows, 'Laporan Riwayat Jurnal Kelas')}
              className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-500 disabled:opacity-50 active:scale-95"
            >
              Unduh PDF
            </button>
          </div>

          {(q || mapel !== 'Semua' || tanggal) && (
            <button
              onClick={() => { setQ(''); setMapel('Semua'); setTanggal(''); }}
              className="text-xs font-semibold text-rose-600 hover:underline"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* Tabel Data Riwayat */}
      {rows.length === 0 ? (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-sm">
          <p className="text-sm font-medium text-[#64748B]">Tidak ada jurnal yang cocok dengan kriteria pencarian.</p>
          <p className="text-xs text-slate-400 mt-1">Coba ubah kata kunci filter atau tanggal.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
              <tr>
                {['Tanggal', 'Kelas', 'Mata Pelajaran', 'Guru Pengampu', 'Jam', 'Materi', 'Absensi', 'Aksi'].map((h) => (
                  <th key={h} className="px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((j) => {
                const t = tally([j]);
                return (
                  <tr key={j.id} className="align-top transition-colors hover:bg-slate-50/60">
                    <td className="whitespace-nowrap px-5 py-4 font-medium text-[#1E293B]">{fmtDate(j.tanggal)}</td>
                    <td className="px-5 py-4"><Badge>{j.kelas}</Badge></td>
                    <td className="px-5 py-4 font-semibold text-[#1E293B]">{j.mapel}</td>
                    <td className="px-5 py-4 text-[#64748B]">{j.guru}</td>
                    <td className="px-5 py-4 text-[#64748B]">{j.jam}</td>
                    <td className="max-w-xs px-5 py-4 text-[#64748B] truncate">{j.materi}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-xs font-medium text-[#64748B]">
                      <span className="text-emerald-600">H:{t.Hadir}</span> · <span className="text-amber-600">S:{t.Sakit}</span> · <span className="text-sky-600">I:{t.Izin}</span> · <span className="text-rose-600">A:{t.Alpha}</span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-right">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => onEdit(j)}
                          className="rounded-lg px-2.5 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => setToDelete(j)}
                          className="rounded-lg px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      <Modal open={!!toDelete} title="Hapus Jurnal?" onClose={() => setToDelete(null)}>
        <p className="text-sm text-[#64748B]">
          Apakah Anda yakin ingin menghapus jurnal <span className="font-semibold text-[#1E293B]">{toDelete?.mapel}</span> pada tanggal <span className="font-semibold text-[#1E293B]">{toDelete && fmtDate(toDelete.tanggal)}</span>? Tindakan ini tidak dapat dibatalkan.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setToDelete(null)}>Batal</Button>
          <Button variant="danger" onClick={() => { onDelete(toDelete.id); setToDelete(null); }}>Ya, Hapus</Button>
        </div>
      </Modal>
    </div>
  );
}