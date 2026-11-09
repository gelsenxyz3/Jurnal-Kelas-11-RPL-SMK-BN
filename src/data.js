// Data master: daftar kelas + siswa, mata pelajaran, dan status absensi.
// Ganti isi CLASSES sesuai data sekolah Anda.
export const SCHOOL = 'SMK Bagimu Negeriku';
export const KELAS = '11 RPL';
export const CLASSES = {
  [KELAS]: ['Alfaro', 'Andhika', 'Aril', 'David', 'Febryan', 'Gelsen', 'Gio', 'Jeanne', 'Melvin', 'Marsel', 'Mutiara', 'Oswald', 'Santiago', 'Stephen', 'Vines', 'Vinzent', 'Yohanis', 'Yokhanan'],
};
export const SUBJECTS = ['Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'Agama', 'Bahasa Jawa', 'PPKn', 'Pemrograman Flutter', 'Pemrograman Basis Data', 'PKK', 'Pemrograman React', 'BK'];
export const STATUS = ['Hadir', 'Sakit', 'Izin', 'Alpha'];

// Menghitung total tiap status absensi dari kumpulan jurnal.
export const tally = (list) =>
  list.reduce((acc, j) => {
    Object.values(j.absensi).forEach((s) => (acc[s] += 1));
    return acc;
  }, { Hadir: 0, Sakit: 0, Izin: 0, Alpha: 0 });

export const fmtDate = (d) =>
  new Date(d + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
