import { useState, useEffect } from 'react';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import JournalForm from './components/JournalForm.jsx';
import History from './components/History.jsx';
import RekapAbsensi from './components/RekapAbsensi.jsx';
import SiswaList from './components/SiswaList.jsx';
import Pelanggaran from './components/Pelanggaran.jsx';
import Jadwal from './components/Jadwal.jsx';
import Pengumuman from './components/Pengumuman.jsx';
import Pembinaan from './components/Pembinaan.jsx';
import Pengaturan from './components/Pengaturan.jsx';
import useLocalStorage from './hooks/useLocalStorage.js';
import { KELAS, SCHOOL } from './data.js';

const NAV = [
  ['dashboard', 'Dashboard', 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'],
  ['form', 'Tulis Jurnal', 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'],
  ['riwayat', 'Riwayat Jurnal', 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'],
  ['siswa', 'Daftar Siswa', 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'],
  ['rekap', 'Rekap Absensi', 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'],
  ['pelanggaran', 'Pelanggaran & Poin', 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'],
  ['jadwal', 'Jadwal Pelajaran', 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'],
  ['pengumuman', 'Pengumuman', 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z'],
  ['pembinaan', 'Catatan Pembinaan', 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'],
  ['pengaturan', 'Pengaturan', 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z']
];

function Logo() {
  const [gagal, setGagal] = useState(false);
  return gagal ? (
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-extrabold text-white shadow-sm">J</div>
  ) : (
    <img src="/bn.jpg" alt="Logo Sekolah" onError={() => setGagal(true)} className="h-11 w-11 rounded-full object-cover shadow-sm border border-slate-100" />
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [journals, setJournals] = useLocalStorage('jurnal-kelas:v1', []);
  const [view, setView] = useState('dashboard');
  const [editing, setEditing] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('jurnal-kelas:user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jurnal-kelas:user');
    setUser(null);
  };

  if (!user) {
    return <Login onLoginSuccess={(u) => setUser(u)} />;
  }

  const go = (v) => { 
    setEditing(null); 
    setView(v); 
    setMobileMenuOpen(false);
  };

  const save = (j) => {
    setJournals((list) => (list.some((x) => x.id === j.id) ? list.map((x) => (x.id === j.id ? j : x)) : [j, ...list]));
    go('riwayat');
  };

  const currentNavLabel = NAV.find(([id]) => id === view)?.[1] || 'Dashboard';

  return (
    <div className="flex h-screen bg-[#F4F6FA] font-sans text-[#1E293B] overflow-hidden">
      <aside className="hidden w-64 shrink-0 flex-col bg-white border-r border-slate-200 p-4 md:flex">
        <div className="mb-6 flex items-center gap-3 px-2 pt-2">
          <Logo />
          <div>
            <p className="font-bold leading-tight text-[#1E293B]">Jurnal Kelas</p>
            <p className="text-xs text-[#64748B]">{SCHOOL}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
          {NAV.map(([id, label, iconPath]) => {
            const isActive = view === id;
            return (
              <button 
                key={id} 
                onClick={() => go(id)} 
                aria-current={isActive}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm' 
                    : 'text-[#64748B] hover:bg-slate-50 hover:text-[#1E293B]'
                }`}
              >
                <svg className={`h-5 w-5 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
                </svg>
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-slate-100 space-y-3">
          <div className="rounded-xl bg-slate-50 p-3 border border-slate-200/60 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B]">Kelas Aktif</span>
            <span className="rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">{KELAS}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full rounded-xl bg-rose-50 border border-rose-200 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-100 transition"
          >
            Keluar Akun (Logout)
          </button>
        </div>
      </aside>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex bg-slate-900/50 backdrop-blur-xs md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-72 bg-white h-full p-4 flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between px-2 pt-2">
              <div className="flex items-center gap-3">
                <Logo />
                <div>
                  <p className="font-bold leading-tight text-[#1E293B]">Jurnal Kelas</p>
                  <p className="text-xs text-[#64748B]">{SCHOOL}</p>
                </div>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
              {NAV.map(([id, label, iconPath]) => {
                const isActive = view === id;
                return (
                  <button 
                    key={id} 
                    onClick={() => go(id)} 
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm' : 'text-[#64748B] hover:bg-slate-50'
                    }`}
                  >
                    <svg className={`h-5 w-5 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
                    </svg>
                    <span>{label}</span>
                  </button>
                );
              })}
            </nav>
            <div className="pt-4 border-t border-slate-100">
              <button 
                onClick={handleLogout}
                className="w-full rounded-xl bg-rose-50 border border-rose-200 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-100 transition"
              >
                Keluar Akun (Logout)
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 overflow-y-auto p-4 pb-24 md:p-8">
        <div className="mb-5 flex items-center justify-between md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-[#1E293B] shadow-sm"
          >
            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <span>Menu ({currentNavLabel})</span>
          </button>
          <span className="rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">{KELAS}</span>
        </div>

        {/* Baris judul ganda sudah dihapus dari sini agar setiap halaman hanya menampilkan satu judul utamanya */}
        
        <div key={view + (editing?.id || '')} className="animate-fade-up">
          {view === 'dashboard' && <Dashboard journals={journals} go={go} />}
          {view === 'form' && <JournalForm key={editing?.id || 'new'} initial={editing} onSave={save} onCancel={() => go('riwayat')} />}
          {view === 'riwayat' && (
            <History journals={journals} onEdit={(j) => { setEditing(j); setView('form'); }}
              onDelete={(id) => setJournals((l) => l.filter((x) => x.id !== id))} />
          )}
          {view === 'siswa' && <SiswaList />}
          {view === 'rekap' && <RekapAbsensi journals={journals} />}
          {view === 'pelanggaran' && <Pelanggaran />}
          {view === 'jadwal' && <Jadwal />}
          {view === 'pengumuman' && <Pengumuman />}
          {view === 'pembinaan' && <Pembinaan />}
          {view === 'pengaturan' && <Pengaturan />}
        </div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 grid grid-cols-3 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden shadow-lg">
        {[['dashboard', 'Dashboard'], ['form', 'Tulis'], ['riwayat', 'Riwayat']].map(([id, label]) => (
          <button key={id} onClick={() => go(id)} className={`py-3 text-xs font-semibold transition ${view === id ? 'text-blue-600 font-bold' : 'text-slate-500'}`}>{label}</button>
        ))}
      </nav>
    </div>
  );
}