/**
 * helpers.js
 * Fungsi-fungsi utilitas umum yang digunakan di seluruh aplikasi.
 */

/**
 * Format angka menjadi format Rupiah.
 * @param {number} angka
 * @returns {string} misal: "Rp 8.500.000"
 */
function formatRupiah(angka) {
  return 'Rp ' + Number(angka).toLocaleString('id-ID');
}

/**
 * Escape karakter HTML untuk mencegah XSS.
 * @param {string} str
 * @returns {string}
 */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Kembalikan class badge Bootstrap berdasarkan nama kategori.
 * @param {string} kategori
 * @returns {string} class Bootstrap badge
 */
function kategoriToBadge(kategori) {
  const map = {
    'Elektronik':          'bg-primary',
    'Pakaian':             'bg-success',
    'Makanan & Minuman':   'bg-warning text-dark',
    'Kesehatan':           'bg-info text-dark',
    'Olahraga':            'bg-danger',
    'Rumah Tangga':        'bg-secondary',
    'Lainnya':             'bg-dark',
  };
  return map[kategori] || 'bg-secondary';
}

/**
 * Tampilkan toast notifikasi Bootstrap.
 * @param {'success'|'danger'|'warning'|'info'} tipe  - warna Bootstrap
 * @param {string} pesan
 */
function tampilToast(tipe, pesan) {
  const el = document.getElementById('toast-notif');
  el.className = `toast align-items-center text-white border-0 bg-${tipe}`;
  document.getElementById('toast-pesan').textContent = pesan;
  new bootstrap.Toast(el, { delay: 3000 }).show();
}

/**
 * Tampilkan alert validasi di dalam form.
 * @param {string} pesan
 */
function tampilAlert(pesan) {
  document.getElementById('alert-pesan').textContent = pesan;
  document.getElementById('alert-validasi').classList.remove('d-none');
}

/**
 * Sembunyikan alert validasi.
 */
function tutupAlert() {
  document.getElementById('alert-validasi').classList.add('d-none');
}