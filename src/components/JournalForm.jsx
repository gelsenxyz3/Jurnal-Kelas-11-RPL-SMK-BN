import { useState } from 'react';
import { Button, Card, Field } from './ui.jsx';
import { CLASSES, STATUS, SUBJECTS } from '../data.js';

const ACTIVE = { Hadir: 'bg-emerald-500 text-white', Sakit: 'bg-amber-500 text-white', Izin: 'bg-sky-500 text-white', Alpha: 'bg-rose-500 text-white' };

// Membuat objek absensi: semua siswa kelas diberi status awal "Hadir".
const roster = (kelas, status = 'Hadir') => Object.fromEntries(CLASSES[kelas].map((n) => [n, status]));

const blank = () => {
  const kelas = Object.keys(CLASSES)[0];
  return { tanggal: new Date().toISOString().slice(0, 10), kelas, mapel: SUBJECTS[0], guru: '', jam: '1', materi: '', catatan: '', absensi: roster(kelas) };
};

// Form tambah/edit jurnal + absensi siswa. `initial` terisi saat mode edit.
export default function JournalForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState(initial || blank());
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const setKelas = (e) => setF({ ...f, kelas: e.target.value, absensi: roster(e.target.value) });
  const setStatus = (nama, s) => setF({ ...f, absensi: { ...f.absensi, [nama]: s } });

  const submit = (e) => {
    e.preventDefault();
    onSave({ ...f, id: f.id || crypto.randomUUID() });
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      {/* Judul Tunggal Halaman Jurnal */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[#1E293B]">
          {initial ? 'Edit Jurnal Pembelajaran' : 'Tulis Jurnal Pembelajaran'}
        </h2>
        <p className="text-sm text-[#64748B]">Catat kegiatan belajar mengajar dan absensi harian kelas.</p>
      </div>

      <Card>
        <h3 className="mb-4 font-semibold text-slate-900">Informasi Pembelajaran</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Tanggal" type="date" required value={f.tanggal} onChange={set('tanggal')} />
          <Field label="Kelas" as="select" options={Object.keys(CLASSES)} value={f.kelas} onChange={setKelas} />
          <Field label="Mata pelajaran" as="select" options={SUBJECTS} value={f.mapel} onChange={set('mapel')} />
          <Field label="Nama guru" required placeholder="Nama lengkap guru" value={f.guru} onChange={set('guru')} />
          <Field label="Jam ke-" placeholder="Contoh: 1-2" required value={f.jam} onChange={set('jam')} />
        </div>
        <div className="mt-4 grid gap-4">
          <Field label="Materi pembelajaran" as="textarea" rows="3" required value={f.materi} onChange={set('materi')} />
          <Field label="Catatan kelas" as="textarea" rows="2" value={f.catatan} onChange={set('catatan')} />
        </div>
      </Card>

      <Card>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-semibold text-slate-900">Absensi siswa · {f.kelas}</h3>
          <Button type="button" variant="secondary" onClick={() => setF({ ...f, absensi: roster(f.kelas) })}>Semua hadir</Button>
        </div>
        <ul className="divide-y divide-slate-100">
          {Object.entries(f.absensi).map(([nama, s]) => (
            <li key={nama} className="flex flex-wrap items-center justify-between gap-2 py-2">
              <span className="text-sm text-slate-800">{nama}</span>
              <div className="flex gap-1" role="group" aria-label={`Status ${nama}`}>
                {STATUS.map((opt) => (
                  <button
                    type="button" key={opt} onClick={() => setStatus(nama, opt)} aria-pressed={s === opt}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${s === opt ? ACTIVE[opt] + ' scale-105 shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >{opt}</button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>Batal</Button>
        <Button type="submit">Simpan jurnal</Button>
      </div>
    </form>
  );
}