import { useEffect } from 'react';

// Tombol dengan beberapa varian warna.
const VARIANTS = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
  secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50',
  danger: 'bg-rose-600 text-white hover:bg-rose-700',
  ghost: 'text-slate-600 hover:bg-slate-100',
};
export const Button = ({ variant = 'primary', className = '', ...props }) => (
  <button
    className={`inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
    {...props}
  />
);

// Kartu pembungkus konten.
export const Card = ({ className = '', children, ...p }) => (
  <div className={`animate-fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`} {...p}>{children}</div>
);

// Badge berwarna; nama tone cocok dengan status absensi.
const TONES = {
  Hadir: 'bg-emerald-100 text-emerald-700',
  Sakit: 'bg-amber-100 text-amber-700',
  Izin: 'bg-sky-100 text-sky-700',
  Alpha: 'bg-rose-100 text-rose-700',
  default: 'bg-indigo-100 text-indigo-700',
};
export const Badge = ({ tone = 'default', children }) => (
  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${TONES[tone]}`}>{children}</span>
);

// Input serbaguna: input, textarea, atau select (lewat prop `as` dan `options`).
export function Field({ label, as: As = 'input', options = [], className = '', ...props }) {
  const base =
    'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200';
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      {As === 'select' ? (
        <select className={base} {...props}>
          {options.map((o) => (<option key={o}>{o}</option>))}
        </select>
      ) : (
        <As className={base} {...props} />
      )}
    </label>
  );
}

// Dialog modal; tutup dengan tombol Esc atau klik latar.
export function Modal({ open, title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-3 text-lg font-semibold text-slate-900">{title}</h2>
        {children}
      </div>
    </div>
  );
}
