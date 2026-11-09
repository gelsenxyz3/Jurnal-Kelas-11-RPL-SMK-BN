/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'] },
      colors: {
        'app-bg': '#F8FAFC',      // 1. Latar Belakang Utama
        'app-surface': '#FFFFFF', // 2. Latar Belakang Kartu / Panel
        'app-primary': '#4F46E5', // 3. Warna Utama (Brand, Tombol, Navigasi Aktif)
        'app-text': '#0F172A',    // 4. Warna Teks Utama & Judul
      },
      keyframes: {
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(14px)' }, '100%': { opacity: 1, transform: 'none' } },
        aurora: { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
      animation: { 'fade-up': 'fade-up .5s ease-out both', aurora: 'aurora 9s ease infinite', float: 'float 6s ease-in-out infinite' },
    },
  },
  plugins: [],
};