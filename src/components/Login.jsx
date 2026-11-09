import { useState } from 'react';
import { SCHOOL } from '../data.js';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const SEMBOYAN_SEKOLAH = "Unggul dalam Prestasi, Berbudi dalam Prilaku";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validasi akun tunggal khusus
    if (username === 'rpl15@gmail.com' && password === 'rpl15solid') {
      const userData = { 
        namaLengkap: 'Wali Kelas / Admin RPL 15', 
        username: username, 
        loginAt: new Date().toISOString() 
      };
      localStorage.setItem('jurnal-kelas:user', JSON.stringify(userData));
      onLoginSuccess(userData);
    } else {
      setError('Username atau password khusus salah! Gunakan akun resmi kelas.');
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-blue-900 px-4 font-sans text-[#1E293B]">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl space-y-6 border border-blue-100">
        
        {/* Header / Logo Sekolah Bulat & Semboyan */}
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 border-2 border-blue-200 shadow-md overflow-hidden">
            <img 
              src="/bn.jpg" 
              alt="Logo Sekolah" 
              onError={(e) => { e.target.style.display = 'none'; }} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Jurnal Kelas Digital</h1>
            <p className="text-xs font-semibold text-blue-600 mt-0.5">{SCHOOL}</p>
            <p className="text-xs italic text-slate-500 mt-1.5 px-4 font-medium">"{SEMBOYAN_SEKOLAH}"</p>
          </div>
        </div>

        {/* Notifikasi Error */}
        {error && (
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-center text-xs font-semibold text-rose-600">
            {error}
          </div>
        )}

        {/* Form Login Tunggal */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Username</label>
            <input 
              type="text" 
              placeholder="rpl15@gmail.com" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition placeholder:text-xs placeholder:text-slate-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="rpl15solid" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 pr-12 text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition placeholder:text-xs placeholder:text-slate-400"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                )}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-500 transition mt-2"
          >
            Masuk ke Aplikasi
          </button>
        </form>

        {/* Informasi Akses Khusus */}
        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-[11px] text-slate-400">
            Akses masuk khusus menggunakan kredensial resmi Jurnal Kelas.
          </p>
        </div>

      </div>
    </div>
  );
}