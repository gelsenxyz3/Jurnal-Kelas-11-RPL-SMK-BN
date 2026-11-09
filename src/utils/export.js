// Simulasi unduh: membuat file di browser lalu memicu download.
export function download(filename, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  a.click();
  URL.revokeObjectURL(url);
}

export const exportJSON = (rows) => download('jurnal-kelas.json', JSON.stringify(rows, null, 2), 'application/json');

export function exportCSV(rows) {
  const head = ['Tanggal', 'Kelas', 'Mata Pelajaran', 'Guru', 'Jam Ke', 'Materi', 'Catatan', 'Hadir', 'Sakit', 'Izin', 'Alpha'];
  const q = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const lines = rows.map((j) => {
    const c = Object.values(j.absensi || {}).reduce((a, s) => ({ ...a, [s]: (a[s] || 0) + 1 }), {});
    return [j.tanggal, j.kelas, j.mapel, j.guru, j.jam, j.materi, j.catatan, c.Hadir || 0, c.Sakit || 0, c.Izin || 0, c.Alpha || 0].map(q).join(',');
  });
  download('jurnal-kelas.csv', [head.map(q).join(','), ...lines].join('\n'), 'text/csv');
}

export function exportPDF(journals, title = 'LAPORAN RIWAYAT JURNAL KELAS') {
  const printWindow = window.open('', '_blank');

  const rowsHtml = journals.map((j, i) => {
    const c = Object.values(j.absensi || {}).reduce((a, s) => ({ ...a, [s]: (a[s] || 0) + 1 }), {});
    return `
      <tr>
        <td style="padding: 8px 10px; border: 1px solid #cbd5e1; text-align: center; color: #334155;">${i + 1}</td>
        <td style="padding: 8px 10px; border: 1px solid #cbd5e1; text-align: center; color: #334155;">${j.tanggal}</td>
        <td style="padding: 8px 10px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; color: #1e293b;">${j.kelas || '-'}</td>
        <td style="padding: 8px 10px; border: 1px solid #cbd5e1; color: #334155;">${j.mapel}</td>
        <td style="padding: 8px 10px; border: 1px solid #cbd5e1; color: #334155;">${j.guru}</td>
        <td style="padding: 8px 10px; border: 1px solid #cbd5e1; text-align: center; color: #334155;">${j.jam || '-'}</td>
        <td style="padding: 8px 10px; border: 1px solid #cbd5e1; color: #334155;">${j.materi || '-'}</td>
        <td style="padding: 8px 10px; border: 1px solid #cbd5e1; text-align: center; font-size: 11px;">
          <span style="color: #16a34a; font-weight: bold;">H:${c.Hadir || 0}</span> &nbsp;|&nbsp; 
          <span style="color: #d97706; font-weight: bold;">S:${c.Sakit || 0}</span> &nbsp;|&nbsp; 
          <span style="color: #0284c7; font-weight: bold;">I:${c.Izin || 0}</span> &nbsp;|&nbsp; 
          <span style="color: #dc2626; font-weight: bold;">A:${c.Alpha || 0}</span>
        </td>
      </tr>
    `;
  }).join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          @page {
            size: A4 landscape;
            margin: 12mm;
          }
          body { 
            font-family: 'Times New Roman', Times, serif; 
            padding: 5px; 
            color: #1e293b; 
            background: #fff;
          }
          /* Kop Surat */
          .kop-container {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            margin-bottom: 8px;
            padding-bottom: 8px;
          }
          .logo-wrapper {
            position: absolute;
            left: 20px;
            top: 2px;
            width: 82px;
            height: 82px;
            border-radius: 50%;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ffffff;
            border: 1.5px solid #94a3b8;
          }
          .logo-kop {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
          .kop-text {
            text-align: center;
            width: 100%;
            padding-left: 90px;
            padding-right: 20px;
          }
          .kop-text .yayasan {
            font-size: 15px;
            font-weight: bold;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }
          .kop-text .sekolah {
            font-size: 19px;
            font-weight: bold;
            letter-spacing: 0.8px;
            margin: 3px 0;
            text-transform: uppercase;
          }
          .kop-text .detail-sk {
            font-size: 11px;
            margin-bottom: 2px;
          }
          .kop-text .alamat {
            font-size: 11px;
          }
          .kop-text .kontak {
            font-size: 10.5px;
            color: #0f172a;
            margin-top: 1px;
          }
          .line-double {
            border-top: 2.5px solid #0f172a;
            border-bottom: 1px solid #0f172a;
            height: 2px;
            margin-top: 4px;
            margin-bottom: 18px;
          }
          /* Judul & Meta */
          .judul-laporan {
            text-align: center;
            font-size: 15px;
            font-weight: bold;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            margin-bottom: 6px;
            font-family: Arial, sans-serif;
          }
          .meta-info {
            font-size: 11.5px;
            color: #475569;
            margin-bottom: 12px;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: space-between;
          }
          /* Tabel Elegan & Tidak Kaku */
          table { 
            width: 100%; 
            border-collapse: collapse; 
            font-size: 11.5px; 
            font-family: Arial, sans-serif;
          }
          th { 
            background-color: #1e3a8a; 
            color: #ffffff; 
            padding: 9px 10px; 
            border: 1px solid #1e3a8a; 
            text-align: center;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.3px;
          }
          tr:nth-child(even) { background-color: #f8fafc; }
          /* Tanda Tangan Wali Kelas */
          .ttd-section {
            margin-top: 35px;
            display: flex;
            justify-content: flex-end;
            font-family: Arial, sans-serif;
            font-size: 12px;
          }
          .ttd-box {
            text-align: center;
            width: 230px;
          }
        </style>
      </head>
      <body>

        <!-- KOP SURAT -->
        <div class="kop-container">
          <div class="logo-wrapper">
            <img src="/bn.jpg" alt="Logo Sekolah" class="logo-kop" onerror="this.parentElement.style.display='none'" />
          </div>
          <div class="kop-text">
            <div class="yayasan">YAYASAN BAGIMU NEGERIKU</div>
            <div class="sekolah">SMK BAGIMU NEGERIKU SEMARANG</div>
            <div class="detail-sk">No SK Pendirian : 420/2823/2011, NSS : 4020 363 16087, NPSN : 2036 2057</div>
            <div class="alamat">Jl. Palir Raya No. 66-68 Ngaliyan Semarang Telp. (024) 91175956</div>
            <div class="kontak">Website: www.smkbagimunegeriku.org | Email: smk_bagimunegeriku@yahoo.com</div>
          </div>
        </div>
        <div class="line-double"></div>

        <!-- JUDUL LAPORAN -->
        <div class="judul-laporan">${title}</div>
        <div class="meta-info">
          <span>Dicetak Pada: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span>Total Arsip: ${journals.length} Jurnal</span>
        </div>

        <!-- TABEL -->
        <table>
          <thead>
            <tr>
              <th style="width: 35px;">No</th>
              <th style="width: 90px;">Tanggal</th>
              <th style="width: 65px;">Kelas</th>
              <th style="width: 135px;">Mata Pelajaran</th>
              <th style="width: 140px;">Guru Pengampu</th>
              <th style="width: 50px;">Jam</th>
              <th>Materi Pembelajaran</th>
              <th style="width: 120px;">Rekap Absensi</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml.length ? rowsHtml : '<tr><td colspan="8" style="text-align:center; padding: 25px; color: #64748b;">Tidak ada data jurnal yang tersedia.</td></tr>'}
          </tbody>
        </table>

        <!-- TANDA TANGAN WALI KELAS -->
        <div class="ttd-section">
          <div class="ttd-box">
            <p>Semarang, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p style="margin-top: 4px;">Mengetahui,<br><strong>Wali Kelas</strong></p>
            <br><br><br>
            <p><strong>____________________________</strong></p>
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.close();
            }, 300);
          }
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}