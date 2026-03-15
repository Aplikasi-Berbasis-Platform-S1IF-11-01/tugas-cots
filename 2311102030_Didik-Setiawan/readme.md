

<div align="center">
  <br />
  <h1>LAPORAN PRAKTIKUM <br>WEB MANAGEMENT PRODUCT
</h1>
  <br />
  <h3>TES COTS <br> JAVASCRIPT & JQUERY</h3>
  <br />
  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-vb7jyBjK-sM%2FXXfKp51LrjI%2FAAAAAAAACts%2FEjcXzlgZwSswNWXsBHMyX-6aav1mjA77QCPcBGAYYCw%2Fs1600%2FLogo_Telkom_University_potrait.png&f=1&nofb=1&ipt=9d030d54102ea96369d39fe491220e0536195abc8ee443279c1a420302206400" alt="Logo Telkom" width="300"> 
  <br /><br /><br />
  
  <h3>Disusun Oleh :</h3>
  <p>
    <strong>Didik Setiawan</strong><br>
    <strong>2311102030</strong><br>
    <strong>IF-11-REG-01</strong>
  </p>
  <br />
  
  <h3>Dosen Pengampu :</h3>
  <p><strong>Dimas Fanny Hebrasianto Permadi, S.ST., M.Kom</strong></p>
  <br />
  
  <h4>Asisten Praktikum :</h4>
  <strong>Apri Pandu Wicaksono</strong> <br>
  <strong>Rangga Pradarrell Fathi</strong>
  <br />
  
  <h3>LABORATORIUM HIGH PERFORMANCE<br>FAKULTAS INFORMATIKA<br>UNIVERSITAS TELKOM PURWOKERTO<br>2026</h3>
</div>

---

## DASAR TEORI

#### Bootstrap
Bootstrap adalah framework front-end yang dirancang untuk menyederhanakan proses pembuatan antarmuka pengguna (user interface) pada aplikasi web. Framework ini pertama kali dibangun oleh Mark Otto dan Jacob Thornton dari Twitter, kemudian diluncurkan sebagai proyek open-source pada tahun 2011.

Bootstrap menawarkan beragam komponen siap pakai berbasis HTML, CSS, dan JavaScript, mulai dari tombol, form, tabel, navigasi, card, hingga grid system. Penggunaan Bootstrap memungkinkan pengembang membangun tampilan web yang responsif dan mampu beradaptasi di berbagai ukuran layar. Di samping itu, framework ini juga mempercepat proses pengembangan karena komponen desainnya sudah tersedia secara bawaan.
#### CRUD
CRUD adalah singkatan dari Create, Read, Update, dan Delete, yang merupakan empat operasi fundamental dalam pengelolaan data pada sebuah sistem informasi. Create berfungsi untuk menambahkan data baru, Read untuk menampilkan data yang tersimpan, Update untuk memodifikasi data yang sudah ada, dan Delete untuk menghapus data dari sistem.

Konsep ini diterapkan secara luas dalam pengembangan aplikasi web maupun desktop karena hampir setiap sistem membutuhkan kemampuan mengelola data. Dalam konteks pengembangan web sederhana berbasis JavaScript, operasi CRUD dapat diimplementasikan menggunakan array atau object sebagai media penyimpanan data sementara tanpa memerlukan database.
####  jQuery DataTables
jQuery DataTables adalah plugin jQuery yang berfungsi meningkatkan interaktivitas tabel pada halaman web. Plugin ini secara otomatis menghadirkan fitur-fitur tambahan seperti pencarian, pengurutan kolom, dan paginasi pada tabel HTML biasa.

DataTables membuat data dalam tabel lebih mudah diakses dan dikelola oleh pengguna. Plugin ini juga kompatibel dengan berbagai framework front-end seperti Bootstrap sehingga tampilan tabel menjadi lebih estetis. DataTables umumnya digunakan pada aplikasi web yang menangani volume data besar dengan kebutuhan tampilan yang dinamis.



## UNGUIDED

### kode html



```bash
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Manajemen Produk</title>

  <!-- Bootstrap 5 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <!-- Bootstrap Icons -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet"/>
  <!-- DataTables + Bootstrap 5 -->
  <link href="https://cdn.datatables.net/1.13.8/css/dataTables.bootstrap5.min.css" rel="stylesheet"/>
</head>
<body class="bg-light">

  <!-- Navbar -->
  <nav class="navbar navbar-dark bg-primary shadow-sm">
    <div class="container">
      <span class="navbar-brand fw-bold fs-4">
        <i class="bi bi-box-seam me-2"></i>Manajemen Produk
      </span>
      <span class="badge bg-light text-primary fs-6" id="badge-total">0 Produk</span>
    </div>
  </nav>

  <div class="container py-4">

    <!-- FORM CARD -->
    <div class="card shadow-sm mb-4">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-semibold" id="form-title">
          <i class="bi bi-plus-circle text-primary me-2"></i>Tambah Produk
        </h5>
      </div>
      <div class="card-body">
        <div class="row g-3">
          <input type="hidden" id="edit-id"/>

          <div class="col-md-4">
            <label class="form-label fw-medium">
              Nama Produk <span class="text-danger">*</span>
            </label>
            <input type="text" id="input-nama" class="form-control" placeholder="Contoh: Laptop ASUS"/>
          </div>

          <div class="col-md-4">
            <label class="form-label fw-medium">
              Kategori <span class="text-danger">*</span>
            </label>
            <select id="input-kategori" class="form-select">
              <option value="">-- Pilih Kategori --</option>
              <option>Elektronik</option>
              <option>Pakaian</option>
              <option>Makanan &amp; Minuman</option>
              <option>Kesehatan</option>
              <option>Olahraga</option>
              <option>Rumah Tangga</option>
              <option>Lainnya</option>
            </select>
          </div>

          <div class="col-md-4">
            <label class="form-label fw-medium">
              Harga (Rp) <span class="text-danger">*</span>
            </label>
            <div class="input-group">
              <span class="input-group-text">Rp</span>
              <input type="number" id="input-harga" class="form-control" placeholder="0" min="0"/>
            </div>
          </div>

          <div class="col-12 d-flex gap-2">
            <button class="btn btn-primary px-4" id="btn-simpan">
              <i class="bi bi-save me-1"></i>Simpan
            </button>
            <button class="btn btn-outline-secondary px-4" id="btn-batal" style="display:none">
              <i class="bi bi-x-circle me-1"></i>Batal
            </button>
          </div>
        </div>

        <!-- Alert validasi -->
        <div id="alert-validasi" class="alert alert-danger alert-dismissible mt-3 d-none" role="alert">
          <i class="bi bi-exclamation-triangle me-1"></i>
          <span id="alert-pesan"></span>
          <button type="button" class="btn-close" id="btn-tutup-alert"></button>
        </div>
      </div>
    </div>

    <!-- TABLE CARD -->
    <div class="card shadow-sm">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-semibold">
          <i class="bi bi-table text-primary me-2"></i>Daftar Produk
        </h5>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table id="tabel-produk" class="table table-striped table-hover align-middle w-100">
            <thead class="table-primary">
              <tr>
                <th style="width:50px">#</th>
                <th>Nama Produk</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th style="width:140px" class="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody id="tabel-body"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Konfirmasi Hapus -->
  <div class="modal fade" id="modal-hapus" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0 pb-0">
          <h5 class="modal-title text-danger">
            <i class="bi bi-trash3 me-2"></i>Hapus Produk
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body pt-2">
          Yakin ingin menghapus produk <strong id="modal-nama-produk"></strong>?
          Tindakan ini tidak dapat dibatalkan.
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
          <button type="button" class="btn btn-danger" id="btn-konfirmasi-hapus">
            <i class="bi bi-trash3 me-1"></i>Hapus
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Toast Notifikasi -->
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index:9999">
    <div id="toast-notif" class="toast align-items-center border-0" role="alert">
      <div class="d-flex">
        <div class="toast-body fw-medium" id="toast-pesan"></div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>
  </div>

  <!-- Scripts -->
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
  <script src="https://cdn.datatables.net/1.13.8/js/dataTables.bootstrap5.min.js"></script>

  <!-- App Scripts (urutan penting) -->
  <script src="js/helpers.js"></script>
  <script src="js/storage.js"></script>
  <script src="js/datatable.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
```
##### penjelasan
Halaman utama aplikasi dibangun menggunakan Bootstrap 5 yang terdiri dari beberapa komponen utama. Bagian atas menampilkan navbar dengan judul aplikasi dan badge yang menunjukkan jumlah produk secara dinamis. Di bawahnya terdapat dua kartu (card): kartu pertama berisi form input untuk menambah atau mengedit produk dengan tiga field utama yaitu nama produk, kategori (dropdown), dan harga, serta kartu kedua berisi tabel daftar produk yang ditenagai oleh jQuery DataTables. Selain itu, halaman ini juga dilengkapi modal konfirmasi sebelum penghapusan data dan komponen toast untuk menampilkan notifikasi hasil operasi kepada pengguna.


### storage.js

```bash
/**
 * storage.js
 * Lapisan data (data layer) aplikasi.
 * Menggunakan plain object (Map) sebagai penyimpanan in-memory.
 *
 * Struktur produkMap:
 * {
 *   "p1": { id: "p1", nama: "...", kategori: "...", harga: 0 },
 *   "p2": { ... },
 *   ...
 * }
 */

const produkMap = {};
let _idCounter = 1;

/**
 * Generate ID unik untuk produk baru.
 * @returns {string}
 */
function _generateId() {
  return 'p' + _idCounter++;
}

/**
 * Tambah produk baru ke dalam map.
 * @param {string} nama
 * @param {string} kategori
 * @param {number} harga
 * @returns {object} produk yang baru ditambahkan
 */
function tambahProduk(nama, kategori, harga) {
  const id = _generateId();
  const produk = { id, nama, kategori, harga };
  produkMap[id] = produk;
  return produk;
}

/**
 * Perbarui data produk yang sudah ada.
 * @param {string} id
 * @param {string} nama
 * @param {string} kategori
 * @param {number} harga
 * @returns {object|null} produk yang diperbarui, atau null jika tidak ditemukan
 */
function updateProduk(id, nama, kategori, harga) {
  if (!produkMap[id]) return null;
  produkMap[id] = { id, nama, kategori, harga };
  return produkMap[id];
}

/**
 * Hapus produk berdasarkan ID.
 * @param {string} id
 * @returns {boolean} true jika berhasil dihapus
 */
function hapusProduk(id) {
  if (!produkMap[id]) return false;
  delete produkMap[id];
  return true;
}

/**
 * Ambil satu produk berdasarkan ID.
 * @param {string} id
 * @returns {object|null}
 */
function getProduk(id) {
  return produkMap[id] || null;
}

/**
 * Ambil semua produk sebagai array.
 * @returns {object[]}
 */
function semuaProduk() {
  return Object.values(produkMap);
}

/**
 * Jumlah produk yang tersimpan.
 * @returns {number}
 */
function jumlahProduk() {
  return Object.keys(produkMap).length;
}

// -------------------------------------------------
// Seed data awal agar tabel tidak kosong saat load
// -------------------------------------------------
(function seedData() {
  const contoh = [
    { nama: 'Laptop ASUS VivoBook',  kategori: 'Elektronik',        harga: 8500000 },
    { nama: 'Kaos Polos Premium',    kategori: 'Pakaian',           harga: 85000   },
    { nama: 'Minyak Zaitun 500ml',   kategori: 'Makanan & Minuman', harga: 65000   },
    { nama: 'Sepatu Lari Adidas',    kategori: 'Olahraga',          harga: 750000  },
    { nama: 'Masker Wajah Aloe',     kategori: 'Kesehatan',         harga: 35000   },
  ];
  contoh.forEach(c => tambahProduk(c.nama, c.kategori, c.harga));
})();
```
##### penjelasan
File storage.js berfungsi sebagai lapisan penyimpanan data (data layer) aplikasi menggunakan plain object (produkMap) sebagai struktur penyimpanan in-memory. Setiap produk direpresentasikan sebagai object dengan properti id, nama, kategori, dan harga, di mana ID dihasilkan secara otomatis menggunakan counter bertipe string (misalnya p1, p2). File ini mengekspos enam fungsi utama:

tambahProduk() — membuat entri baru di produkMap

updateProduk() — memperbarui data produk berdasarkan ID

hapusProduk() — menghapus entri menggunakan operator delete

getProduk() — mengambil satu produk berdasarkan ID

semuaProduk() — mengembalikan semua produk sebagai array via Object.values()

jumlahProduk() — mengembalikan jumlah entri via Object.keys().length


### helper.js

```bash
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
```
##### penjelasan
File helpers.js menyediakan fungsi-fungsi pembantu yang digunakan lintas modul. Fungsi formatRupiah() mengonversi angka numerik menjadi format mata uang Rupiah menggunakan toLocaleString('id-ID'). Fungsi escHtml() melakukan sanitasi string untuk mencegah serangan XSS dengan mengganti karakter khusus HTML. Fungsi kategoriToBadge() memetakan nama kategori ke class badge Bootstrap yang sesuai menggunakan object sebagai lookup table. Dua fungsi terakhir, tampilToast() dan tampilAlert(), menangani tampilan notifikasi dan pesan kesalahan validasi di antarmuka pengguna.


### datatable.js

```bash
/**
 * datatable.js
 * Menangani inisialisasi jQuery DataTable dan fungsi render tabel.
 */

let dt; // Instance DataTable (diakses dari app.js)

/**
 * Inisialisasi DataTable pada elemen #tabel-produk.
 * Dipanggil sekali saat dokumen siap (dari app.js).
 */
function initDataTable() {
  dt = $('#tabel-produk').DataTable({
    language: {
      search:       'Cari:',
      lengthMenu:   'Tampilkan _MENU_ data',
      info:         'Menampilkan _START_ - _END_ dari _TOTAL_ produk',
      infoEmpty:    'Tidak ada data',
      infoFiltered: '(disaring dari _MAX_ total data)',
      zeroRecords:  'Tidak ada produk ditemukan',
      paginate: {
        first:    'Pertama',
        last:     'Terakhir',
        next:     'Berikutnya',
        previous: 'Sebelumnya',
      },
    },
    pageLength:  5,
    lengthMenu:  [5, 10, 25, 50],
    columnDefs: [
      { orderable: false, targets: [0, 4] }, // kolom # dan Aksi tidak bisa diurutkan
    ],
    order: [[1, 'asc']], // default sort: Nama Produk ascending
  });
}

/**
 * Buat HTML tombol aksi (Edit & Hapus) untuk satu baris.
 * @param {string} id - ID produk
 * @returns {string} HTML string
 */
function buatTombolAksi(id) {
  return `
    <div class="d-flex gap-1 justify-content-center">
      <button class="btn btn-sm btn-outline-warning"
              onclick="onEditKlik('${id}')" title="Edit">
        <i class="bi bi-pencil-square"></i>
      </button>
      <button class="btn btn-sm btn-outline-danger"
              onclick="onHapusKlik('${id}')" title="Hapus">
        <i class="bi bi-trash3"></i>
      </button>
    </div>`;
}

/**
 * Render ulang seluruh isi tabel dari data di produkMap.
 * Mengosongkan tabel lalu mengisi ulang dari semuaProduk().
 */
function renderTabel() {
  dt.clear();

  semuaProduk().forEach((p, idx) => {
    dt.row.add([
      idx + 1,
      escHtml(p.nama),
      `<span class="badge ${kategoriToBadge(p.kategori)}">${escHtml(p.kategori)}</span>`,
      formatRupiah(p.harga),
      buatTombolAksi(p.id),
    ]);
  });

  dt.draw();

  // Update badge jumlah produk di navbar
  document.getElementById('badge-total').textContent = jumlahProduk() + ' Produk';
}
```
##### penjelasan
File datatable.js menangani inisialisasi dan rendering jQuery DataTables. Fungsi initDataTable() mengonfigurasi tabel dengan bahasa Indonesia, menampilkan 5 data per halaman secara default, serta menonaktifkan pengurutan pada kolom nomor urut dan kolom aksi. Fungsi renderTabel() mengosongkan tabel terlebih dahulu, lalu mengisi ulang setiap baris menggunakan data dari semuaProduk(), di mana setiap baris ditampilkan dengan badge kategori berwarna dan tombol aksi Edit serta Hapus. Setiap kali render selesai, badge jumlah produk di navbar juga diperbarui secara otomatis


### App.js

```bash
/**
 * app.js
 * Logika utama aplikasi: CRUD produk, event handler form & modal.
 * Bergantung pada: helpers.js, storage.js, datatable.js
 */

// ID produk yang sedang dalam antrian hapus
let _hapusTargetId = null;

// ============================================================
// INISIALISASI — jalankan setelah DOM & library siap
// ============================================================
$(document).ready(function () {
  initDataTable();
  renderTabel();
  bindEvents();
});

// ============================================================
// BINDING EVENT (dipusatkan, tidak pakai inline onclick di JS)
// ============================================================
function bindEvents() {
  // Tombol Simpan
  $('#btn-simpan').on('click', onSimpanKlik);

  // Tombol Batal edit
  $('#btn-batal').on('click', resetForm);

  // Tombol tutup alert
  $('#btn-tutup-alert').on('click', tutupAlert);

  // Tombol konfirmasi hapus di dalam modal
  $('#btn-konfirmasi-hapus').on('click', onKonfirmasiHapus);
}

// ============================================================
// CREATE / UPDATE — dipanggil saat klik Simpan
// ============================================================
function onSimpanKlik() {
  const id     = $('#edit-id').val().trim();
  const nama   = $('#input-nama').val().trim();
  const kat    = $('#input-kategori').val();
  const harga  = parseFloat($('#input-harga').val());

  // Validasi
  if (!nama)                    return tampilAlert('Nama produk wajib diisi.');
  if (!kat)                     return tampilAlert('Pilih kategori produk.');
  if (isNaN(harga) || harga < 0) return tampilAlert('Masukkan harga yang valid (≥ 0).');

  tutupAlert();

  if (id) {
    // UPDATE produk yang ada
    updateProduk(id, nama, kat, harga);
    tampilToast('success', `Produk "${nama}" berhasil diperbarui.`);
  } else {
    // CREATE produk baru
    tambahProduk(nama, kat, harga);
    tampilToast('success', `Produk "${nama}" berhasil ditambahkan.`);
  }

  resetForm();
  renderTabel();
}

// ============================================================
// EDIT — dipanggil dari tombol Edit di tabel (via datatable.js)
// ============================================================
function onEditKlik(id) {
  const p = getProduk(id);
  if (!p) return;

  // Isi form dengan data produk
  $('#edit-id').val(p.id);
  $('#input-nama').val(p.nama);
  $('#input-kategori').val(p.kategori);
  $('#input-harga').val(p.harga);

  // Ubah tampilan form ke mode edit
  $('#form-title').html('<i class="bi bi-pencil-square text-warning me-2"></i>Edit Produk');
  $('#btn-simpan')
    .html('<i class="bi bi-save me-1"></i>Update')
    .removeClass('btn-primary')
    .addClass('btn-warning');
  $('#btn-batal').show();

  // Scroll ke atas agar form terlihat
  $('html, body').animate({ scrollTop: 0 }, 400);
}

// ============================================================
// HAPUS — langkah 1: tampilkan modal konfirmasi
// ============================================================
function onHapusKlik(id) {
  const p = getProduk(id);
  if (!p) return;

  _hapusTargetId = id;
  $('#modal-nama-produk').text(p.nama);
  new bootstrap.Modal(document.getElementById('modal-hapus')).show();
}

// ============================================================
// HAPUS — langkah 2: eksekusi setelah konfirmasi di modal
// ============================================================
function onKonfirmasiHapus() {
  if (!_hapusTargetId) return;

  const p = getProduk(_hapusTargetId);
  const nama = p ? p.nama : '';

  hapusProduk(_hapusTargetId);
  _hapusTargetId = null;

  bootstrap.Modal.getInstance(document.getElementById('modal-hapus')).hide();
  renderTabel();
  tampilToast('danger', `Produk "${nama}" berhasil dihapus.`);
}

// ============================================================
// RESET FORM ke kondisi awal (mode tambah)
// ============================================================
function resetForm() {
  $('#edit-id, #input-nama, #input-harga').val('');
  $('#input-kategori').val('');

  $('#form-title').html('<i class="bi bi-plus-circle text-primary me-2"></i>Tambah Produk');
  $('#btn-simpan')
    .html('<i class="bi bi-save me-1"></i>Simpan')
    .removeClass('btn-warning')
    .addClass('btn-primary');
  $('#btn-batal').hide();

  tutupAlert();
}
```
##### penjelasan
File app.js mengintegrasikan seluruh modul dan menangani alur operasi CRUD secara lengkap. Saat dokumen siap, fungsi initDataTable() dan renderTabel() dipanggil, lalu semua event listener dipasang melalui bindEvents() menggunakan jQuery .on() agar terpisah dari HTML. Operasi Create dan Update ditangani oleh onSimpanKlik() yang membaca nilai form, menjalankan validasi (nama, kategori, dan harga), lalu memanggil tambahProduk() atau updateProduk() tergantung apakah field edit-id terisi. Operasi Edit diawali onEditKlik() yang mengisi form dengan data produk dan mengubah tampilan form ke mode edit. Operasi Delete dibagi dua langkah: onHapusKlik() menampilkan modal konfirmasi, dan onKonfirmasiHapus() mengeksekusi penghapusan setelah pengguna menyetujui. Setiap operasi diakhiri dengan pemanggilan renderTabel() untuk menyinkronkan tampilan tabel dengan kondisi data terkini, serta resetForm() untuk mengembalikan form ke kondisi awal.





### tampilan awal
![Alt 1](https://raw.githubusercontent.com/didiksetia1/asset/refs/heads/main/Screenshot%202026-03-15%20132956.png)


### menambahkan barang
![Alt 1](https://raw.githubusercontent.com/didiksetia1/asset/refs/heads/main/Screenshot%202026-03-15%20132601.png)


### mengubah barang
![Alt 2](https://raw.githubusercontent.com/didiksetia1/asset/refs/heads/main/Screenshot%202026-03-15%20132636.png)

### menghapus barang
![Alt 3](https://raw.githubusercontent.com/didiksetia1/asset/refs/heads/main/Screenshot%202026-03-15%20132653.png)