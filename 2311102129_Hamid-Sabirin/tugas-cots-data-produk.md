<div align="center">
  <br />
  <h1>LAPORAN PRAKTIKUM <br>APLIKASI BERBASIS PLATFORM</h1>
  <br />
  <h3>DATA PRODUK <br> Bootstrap, jQuery DataTables & JavaScript</h3>
  <br />
  <br />
  <br />
  <br />
  <h3>Disusun Oleh :</h3>
  <p>
    <strong>HAMID SABIRIN</strong><br>
    <strong>2311102129</strong><br>
    <strong>S1 IF-11-REG01</strong>
  </p>
  <br />
  <br />
  <h3>Dosen Pengampu :</h3>
  <p>
    <strong>Dimas Fanny Hebrasianto Permadi, S.ST., M.Kom</strong>
  </p>
  <br />
  <br />
  <h4>Asisten Praktikum :</h4>
  <strong>Apri Pandu Wicaksono</strong> <br>
  <strong>Rangga Pradarrell Fathi</strong>
  <br />
  <h3>LABORATORIUM HIGH PERFORMANCE
 <br>FAKULTAS INFORMATIKA <br>UNIVERSITAS TELKOM PURWOKERTO <br>2026</h3>
</div>

---

## 1. Dasar Teori

**CRUD (Create, Read, Update, Delete)** adalah empat operasi dasar yang digunakan dalam pengelolaan data pada sebuah aplikasi. Dalam konteks pengembangan web, CRUD diimplementasikan untuk memungkinkan pengguna menambah, menampilkan, memperbarui, dan menghapus data secara dinamis di sisi klien (*client-side*) menggunakan JavaScript tanpa perlu komunikasi ke server.

**Bootstrap** adalah framework CSS open-source yang menyediakan komponen antarmuka siap pakai seperti form, tombol, modal, dan sistem grid responsif. Bootstrap mempercepat proses desain antarmuka dengan kelas-kelas utilitas yang terstandarisasi.

**jQuery DataTables** adalah plugin berbasis jQuery yang mengubah elemen `<table>` HTML biasa menjadi tabel data yang kaya fitur, meliputi pencarian (*search*), pengurutan (*sorting*) per kolom, dan pembagian halaman (*pagination*) secara otomatis hanya dengan satu baris inisialisasi.

**Object Mapping** adalah pola penyimpanan data di JavaScript di mana setiap record disimpan sebagai nilai (*value*) dalam sebuah objek dengan kunci (*key*) unik sebagai identifiernya, contoh: `{ "p1": { id, nama, kategori, harga } }`. Pola ini memungkinkan akses, pembaruan, dan penghapusan data dalam kompleksitas waktu O(1).

---

## 2. Penjelasan Kode HTML, CSS, dan JS

Berikut ini adalah implementasi halaman manajemen data produk dengan fitur CRUD lengkap yang terdiri dari tiga file terpisah: `index.html`, `style.css`, dan `script.js`.

---

### Kode HTML (`index.html`)

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Manajemen Produk | COTS</title>
  <meta name="description" content="Halaman manajemen data produk dengan fitur CRUD, pencarian, dan pagination." />

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

  <!-- Bootstrap 5 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />

  <!-- Bootstrap Icons -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet" />

  <!-- DataTables CSS -->
  <link href="https://cdn.datatables.net/1.13.8/css/dataTables.bootstrap5.min.css" rel="stylesheet" />
  <link href="https://cdn.datatables.net/responsive/2.5.0/css/responsive.bootstrap5.min.css" rel="stylesheet" />

  <!-- Custom CSS -->
  <link href="style.css" rel="stylesheet" />
</head>
<body>

<!-- ══════════ NAVBAR ══════════ -->
<nav class="navbar-custom">
  <div class="container d-flex align-items-center justify-content-between">
    <a href="#" class="navbar-brand-logo">
      <div class="brand-icon"><i class="bi bi-box-seam-fill"></i></div>
      <div>
        <div>ProdukManager</div>
        <div class="navbar-tagline">Sistem Manajemen Produk &bull; COTS ABP 2026</div>
      </div>
    </a>
    <span class="nav-badge" id="navBadge"><i class="bi bi-box-seam me-1"></i>0 Produk</span>
  </div>
</nav>

<!-- ══════════ STATS (2 kolom × 2 baris) ══════════ -->
<section class="stats-section">
  <div class="container">
    <div class="row g-3">
      <div class="col-6 col-md-3">
        <div class="stat-card stat-card-1">
          <div class="stat-icon-box"><i class="bi bi-box-seam-fill"></i></div>
          <div>
            <div class="stat-label">Total Produk</div>
            <div class="stat-value" id="statTotal">0</div>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="stat-card stat-card-2">
          <div class="stat-icon-box"><i class="bi bi-tags-fill"></i></div>
          <div>
            <div class="stat-label">Kategori</div>
            <div class="stat-value" id="statKategori">0</div>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="stat-card stat-card-3">
          <div class="stat-icon-box"><i class="bi bi-trophy-fill"></i></div>
          <div>
            <div class="stat-label">Harga Tertinggi</div>
            <div class="stat-value" id="statMax" style="font-size:1.1rem;">Rp 0</div>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="stat-card stat-card-4">
          <div class="stat-icon-box"><i class="bi bi-graph-up-arrow"></i></div>
          <div>
            <div class="stat-label">Rata-rata Harga</div>
            <div class="stat-value" id="statAvg" style="font-size:1.1rem;">Rp 0</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════ MAIN CONTENT ══════════ -->
<main class="main-area">
  <div class="container">
    <div class="row g-4 align-items-start">

      <!-- ── FORM INPUT (Kiri) ── -->
      <div class="col-lg-4">
        <div class="card-custom">
          <div class="section-heading">
            <div class="head-icon head-icon-blue"><i class="bi bi-plus-lg"></i></div>
            <span id="formTitle">Tambah Produk</span>
          </div>

          <!-- Edit Mode Banner -->
          <div class="edit-mode-banner" id="editBanner">
            <i class="bi bi-pencil-square"></i>
            <span>Mode Edit Aktif</span>
            <button class="btn-cancel-edit" onclick="cancelEdit()">
              <i class="bi bi-x-lg"></i> Batal
            </button>
          </div>

          <form id="productForm" novalidate>
            <input type="hidden" id="editId" />

            <div class="mb-3">
              <label class="form-label-custom" for="namaProduk">Nama Produk</label>
              <input type="text" id="namaProduk" class="form-control-custom"
                placeholder="Contoh: Sepatu Lari Nike" />
              <div class="err-msg" id="errNama">
                <i class="bi bi-exclamation-circle me-1"></i>Nama produk tidak boleh kosong.
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label-custom" for="kategori">Kategori</label>
              <select id="kategori" class="form-select-custom">
                <option value="" disabled selected>-- Pilih Kategori --</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Pakaian">Pakaian</option>
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
                <option value="Olahraga">Olahraga</option>
                <option value="Kecantikan">Kecantikan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
              <div class="err-msg" id="errKategori">
                <i class="bi bi-exclamation-circle me-1"></i>Pilih kategori terlebih dahulu.
              </div>
            </div>

            <div class="mb-4">
              <label class="form-label-custom" for="harga">Harga (Rp)</label>
              <input type="number" id="harga" class="form-control-custom"
                placeholder="Contoh: 150000" min="0" />
              <div class="err-msg" id="errHarga">
                <i class="bi bi-exclamation-circle me-1"></i>Masukkan harga yang valid (≥ 0).
              </div>
            </div>

            <div class="d-flex gap-2">
              <button type="submit" class="btn-submit flex-grow-1" id="btnSubmit">
                <i class="bi bi-plus-circle-fill"></i> Tambah
              </button>
              <button type="button" class="btn-reset-form" onclick="resetForm()" title="Reset Form">
                <i class="bi bi-arrow-counterclockwise"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- ── TABEL PRODUK (Kanan) ── -->
      <div class="col-lg-8">
        <div class="card-custom">
          <div class="section-heading">
            <div class="head-icon head-icon-violet"><i class="bi bi-table"></i></div>
            <span>Daftar Produk</span>
          </div>

          <div class="table-responsive">
            <table id="produkTable" class="table w-100" style="border-collapse:collapse;">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Produk</th>
                  <th>Kategori</th>
                  <th>Harga</th>
                  <th style="text-align:center;">Aksi</th>
                </tr>
              </thead>
              <tbody id="produkBody"></tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  </div>
</main>

<!-- ══════════ MODAL HAPUS ══════════ -->
<div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header"> ... </div>
      <div class="modal-body"> ... </div>
      <div class="modal-footer gap-2">
        <button type="button" class="btn-reset-form" data-bs-dismiss="modal">Batal</button>
        <button type="button" id="confirmDelete" class="btn-hapus-modal">
          <i class="bi bi-trash3-fill"></i> Ya, Hapus
        </button>
      </div>
    </div>
  </div>
</div>

<!-- ══════════ TOAST STACK ══════════ -->
<div class="toast-stack" id="toastStack"></div>

<!-- ══════════ FOOTER ══════════ -->
<footer>
  <div class="container">
    ProdukManager &copy; 2026 &mdash; Tugas COTS ABP
  </div>
</footer>

<!-- ══════════ SCRIPTS ══════════ -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.8/js/dataTables.bootstrap5.min.js"></script>
<script src="https://cdn.datatables.net/responsive/2.5.0/js/dataTables.responsive.min.js"></script>
<script src="https://cdn.datatables.net/responsive/2.5.0/js/responsive.bootstrap5.min.js"></script>
<script src="script.js"></script>

</body>
</html>
```

---

### Kode CSS (`style.css`)

```css
:root {
  --primary:       #0ea5e9;
  --primary-dark:  #0284c7;
  --primary-light: #e0f2fe;
  --secondary:     #8b5cf6;
  --accent:        #f97316;
  --success:       #10b981;
  --warning:       #f59e0b;
  --danger:        #ef4444;
  --bg:            #f0f4f8;
  --bg-card:       #ffffff;
  --bg-input:      #f8fafc;
  --text-main:     #1e293b;
  --text-muted:    #64748b;
  --border:        #e2e8f0;
  --shadow:        0 1px 3px rgba(0,0,0,.08), 0 4px 16px rgba(0,0,0,.06);
  --shadow-lg:     0 8px 32px rgba(0,0,0,.12);
  --grad-blue:     linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%);
  --grad-violet:   linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%);
  --grad-orange:   linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  --grad-green:    linear-gradient(135deg, #10b981 0%, #34d399 100%);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: var(--bg);
  color: var(--text-main);
  min-height: 100vh;
}

.navbar-custom {
  background: #fff;
  border-bottom: 1px solid var(--border);
  padding: .875rem 0;
  box-shadow: 0 1px 8px rgba(0,0,0,.06);
}

.stat-card {
  border-radius: 14px;
  padding: 1.1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #fff;
  position: relative;
  overflow: hidden;
  transition: transform .2s, box-shadow .2s;
  box-shadow: var(--shadow);
}
.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}
.stat-card-1 { background: var(--grad-blue); }
.stat-card-2 { background: var(--grad-violet); }
.stat-card-3 { background: var(--grad-orange); }
.stat-card-4 { background: var(--grad-green); }

.card-custom {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.6rem;
  box-shadow: var(--shadow);
  transition: box-shadow .2s;
}

.form-control-custom,
.form-select-custom {
  width: 100%;
  background: var(--bg-input);
  border: 1.5px solid var(--border);
  border-radius: 10px;
  color: var(--text-main);
  padding: .62rem 1rem;
  font-size: .92rem;
  font-family: inherit;
  transition: border-color .2s, box-shadow .2s, background .2s;
}
.form-control-custom:focus,
.form-select-custom:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(14,165,233,.18);
  background: #fff;
}

.btn-submit {
  background: var(--grad-blue);
  border: none;
  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  padding: .68rem 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(14,165,233,.4);
  transition: all .2s;
}
.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(14,165,233,.5);
}

.edit-mode-banner {
  display: none;
  align-items: center;
  gap: .6rem;
  background: #eff6ff;
  border: 1.5px solid #93c5fd;
  border-radius: 10px;
  padding: .55rem 1rem;
  color: #1d4ed8;
  margin-bottom: 1rem;
  font-weight: 600;
}
.edit-mode-banner.show { display: flex; }

.badge-kategori {
  font-size: .73rem;
  font-weight: 700;
  padding: .32rem .72rem;
  border-radius: 999px;
  display: inline-block;
}
.badge-elektronik { background: #e0f2fe; color: #0369a1; }
.badge-pakaian    { background: #fce7f3; color: #be185d; }
.badge-makanan    { background: #d1fae5; color: #065f46; }
.badge-minuman    { background: #fef3c7; color: #92400e; }
.badge-olahraga   { background: #ede9fe; color: #6d28d9; }
.badge-kecantikan { background: #fce7f3; color: #9d174d; }
.badge-lainnya    { background: #f1f5f9; color: #475569; }

.btn-action {
  width: 32px; height: 32px;
  border-radius: 8px;
  border: none;
  display: inline-grid;
  place-items: center;
  cursor: pointer;
  transition: all .2s;
}
.btn-edit-row   { background: #e0f2fe; color: #0284c7; }
.btn-delete-row { background: #fee2e2; color: #dc2626; }

.toast-stack {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: .5rem;
}
.toast-item {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: .8rem 1.1rem;
  display: flex;
  align-items: center;
  gap: .7rem;
  min-width: 260px;
  box-shadow: var(--shadow-lg);
  animation: slideUp .3s ease, fadeOut .4s ease 2.8s forwards;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeOut {
  from { opacity: 1; }
  to   { opacity: 0; pointer-events: none; }
}
```

---

### Kode JavaScript (`script.js`)

```javascript
// ── DATA STORE — Object Mapping ──
const store    = {};
let nextId     = 1;
let editingId  = null;
let deletingId = null;

// ── DATATABLE INIT ──
let dt;
$(document).ready(function () {
  dt = $('#produkTable').DataTable({
    responsive: true,
    language: {
      search:            '_INPUT_',
      searchPlaceholder: 'Cari produk…',
      lengthMenu:        'Tampilkan _MENU_ data',
      info:              'Menampilkan _START_–_END_ dari _TOTAL_ produk',
      infoEmpty:         'Tidak ada data',
      infoFiltered:      '(difilter dari _MAX_ total)',
      zeroRecords:       '<div class="empty-state"><i class="bi bi-inbox-fill"></i><p>Belum ada produk.</p></div>',
      paginate: {
        first:    '<i class="bi bi-chevron-double-left"></i>',
        previous: '<i class="bi bi-chevron-left"></i>',
        next:     '<i class="bi bi-chevron-right"></i>',
        last:     '<i class="bi bi-chevron-double-right"></i>',
      }
    },
    columns: [
      { data: 'rowNum',   orderable: false, width: '48px' },
      { data: 'nama' },
      { data: 'kategori' },
      { data: 'hargaFmt' },
      { data: 'aksi',    orderable: false, className: 'text-center', width: '90px' }
    ],
    order: [[1, 'asc']],
    pageLength: 5,
    lengthMenu: [5, 10, 25, 50],
    drawCallback: function () {
      let i = this.api().page.info().start;
      this.api().rows({ page: 'current' }).every(function () {
        const d = this.data();
        d.rowNum = ++i;
        this.data(d);
      });
    }
  });

  // Data sampel awal
  addProduct('Laptop ASUS VivoBook',  'Elektronik', 8500000);
  addProduct('Kaos Polos Uniqlo',     'Pakaian',    149000);
  addProduct('Nasi Goreng Spesial',   'Makanan',    25000);
  addProduct('Sepatu Running Adidas', 'Olahraga',   750000);
  addProduct('Serum Vitamin C',       'Kecantikan', 85000);
});

// ── HELPERS ──
function formatRupiah(num) {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

function badgeClass(k) {
  const map = {
    Elektronik: 'badge-elektronik', Pakaian: 'badge-pakaian',
    Makanan: 'badge-makanan',       Minuman: 'badge-minuman',
    Olahraga: 'badge-olahraga',     Kecantikan: 'badge-kecantikan',
  };
  return map[k] || 'badge-lainnya';
}

function buildRow(p, idx) {
  return {
    id:       p.id,
    rowNum:   idx,
    nama:     p.nama,
    kategori: `<span class="badge-kategori ${badgeClass(p.kategori)}">${p.kategori}</span>`,
    hargaFmt: `<span style="font-weight:700;color:#059669;">${formatRupiah(p.harga)}</span>`,
    aksi:
      `<button class="btn-action btn-edit-row"   onclick="startEdit('${p.id}')"><i class="bi bi-pencil-fill"></i></button> ` +
      `<button class="btn-action btn-delete-row" onclick="promptDelete('${p.id}')"><i class="bi bi-trash3-fill"></i></button>`
  };
}

// ── STATS ──
function refreshStats() {
  const items = Object.values(store);
  const total = items.length;
  document.getElementById('statTotal').textContent    = total;
  document.getElementById('navBadge').innerHTML       = `<i class="bi bi-box-seam me-1"></i>${total} Produk`;
  document.getElementById('statKategori').textContent = new Set(items.map(p => p.kategori)).size;
  if (total === 0) {
    document.getElementById('statMax').textContent = 'Rp 0';
    document.getElementById('statAvg').textContent = 'Rp 0';
    return;
  }
  const prices = items.map(p => p.harga);
  document.getElementById('statMax').textContent = formatRupiah(Math.max(...prices));
  document.getElementById('statAvg').textContent = formatRupiah(
    Math.round(prices.reduce((a, b) => a + b, 0) / total)
  );
}

// ── CREATE ──
function addProduct(nama, kategori, harga) {
  const id = 'p' + nextId++;
  store[id] = { id, nama, kategori, harga };
  dt.row.add(buildRow(store[id], 0)).draw(false);
  refreshStats();
}

// ── UPDATE ──
function updateProduct(id, nama, kategori, harga) {
  store[id] = { id, nama, kategori, harga };
  dt.rows().every(function () {
    if (this.data().id === id) this.data(buildRow(store[id], 0)).invalidate();
  });
  dt.draw(false);
  refreshStats();
}

// ── FORM SUBMIT ──
document.getElementById('productForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const nama     = document.getElementById('namaProduk').value.trim();
  const kategori = document.getElementById('kategori').value;
  const harga    = parseFloat(document.getElementById('harga').value);
  setErr('errNama',     !nama);
  setErr('errKategori', !kategori);
  setErr('errHarga',    isNaN(harga) || harga < 0);
  if (!nama || !kategori || isNaN(harga) || harga < 0) return;
  if (editingId) {
    updateProduct(editingId, nama, kategori, harga);
    showToast('Produk berhasil diperbarui!', 'info');
    cancelEdit();
  } else {
    addProduct(nama, kategori, harga);
    showToast('Produk berhasil ditambahkan!', 'success');
    resetForm();
  }
});

function setErr(id, show) {
  document.getElementById(id).style.display = show ? 'block' : 'none';
}

// ── EDIT ──
function startEdit(id) {
  const p = store[id]; if (!p) return;
  editingId = id;
  document.getElementById('namaProduk').value      = p.nama;
  document.getElementById('kategori').value        = p.kategori;
  document.getElementById('harga').value           = p.harga;
  document.getElementById('formTitle').textContent = 'Edit Produk';
  document.getElementById('btnSubmit').innerHTML   = '<i class="bi bi-check-circle-fill"></i> Simpan';
  document.getElementById('editBanner').classList.add('show');
}

function cancelEdit() {
  editingId = null;
  resetForm();
  document.getElementById('formTitle').textContent = 'Tambah Produk';
  document.getElementById('btnSubmit').innerHTML   = '<i class="bi bi-plus-circle-fill"></i> Tambah';
  document.getElementById('editBanner').classList.remove('show');
  ['errNama', 'errKategori', 'errHarga'].forEach(id => setErr(id, false));
}

// ── DELETE ──
function promptDelete(id) {
  const p = store[id]; if (!p) return;
  deletingId = id;
  document.getElementById('deleteProductName').textContent = p.nama;
  new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

document.getElementById('confirmDelete').addEventListener('click', function () {
  if (!deletingId) return;
  const name = store[deletingId]?.nama || '';
  delete store[deletingId];
  dt.rows().every(function () {
    if (this.data().id === deletingId) this.remove();
  });
  dt.draw(false);
  refreshStats();
  bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
  deletingId = null;
  showToast(`"${name}" berhasil dihapus.`, 'danger');
});

// ── RESET ──
function resetForm() {
  document.getElementById('productForm').reset();
  document.getElementById('editId').value = '';
}

// ── TOAST ──
function showToast(msg, type = 'success') {
  const icons = { success: 'bi-check-lg', danger: 'bi-trash3', info: 'bi-pencil-fill' };
  const el = document.createElement('div');
  el.className = `toast-item toast-${type}`;
  el.innerHTML = `
    <div class="toast-icon-wrap"><i class="bi ${icons[type]}"></i></div>
    <span>${msg}</span>
  `;
  document.getElementById('toastStack').appendChild(el);
  setTimeout(() => el.remove(), 3300);
}
```

---

### Hasil Tampilan (Screenshot)

#### 1. Tampilan Awal Halaman

![Tampilan Awal Web](assets/1.png)

#### 2. Input Data & Data Berhasil Ditambahkan

![Form Input Produk](assets/2.png)

![Data Berhasil Ditambahkan](assets/3.png)

#### 3. Fitur Pencarian (Search)

![Fitur Searching](assets/4.png)

#### 4. Hapus Data

![Hapus Data Produk](assets/5.png)

#### 5. Edit Data

![Edit Data Produk](assets/6.png)

---

### Penjelasan Kode

#### 1. HTML (`index.html`)

- Pada baris **4–7**, tag `<meta charset="UTF-8">` memastikan karakter Indonesia seperti huruf beraksara ditampilkan dengan benar, sementara `viewport` membuat layout responsif di perangkat mobile, dan `<meta name="description">` menyediakan deskripsi halaman untuk keperluan SEO.
- Pada baris **10–23**, enam tag `<link>` digunakan untuk mengimpor semua dependensi eksternal secara paralel: *Google Fonts* (tipografi Plus Jakarta Sans), *Bootstrap 5 CSS* (komponen layout dan utilitas), *Bootstrap Icons* (ikon vektor), dua file *DataTables CSS* (tema tabel dan dukungan responsif), serta `style.css` lokal yang berisi seluruh kustomisasi tampilan.
- Pada baris **28–39**, elemen `<nav>` dengan kelas `navbar-custom` membentuk bilah navigasi atas yang menampilkan logo brand di kiri dan badge jumlah produk (`id="navBadge"`) di kanan. Badge ini diperbarui secara otomatis oleh JavaScript setiap kali data berubah.
- Pada baris **42–83**, elemen `<section class="stats-section">` berisi empat kartu statistik yang tersusun dalam grid Bootstrap 2 kolom × 2 baris (`col-6 col-md-3`). Setiap kartu memiliki `id` unik (`statTotal`, `statKategori`, `statMax`, `statAvg`) yang diisi nilainya secara dinamis oleh fungsi `refreshStats()` di JavaScript.
- Pada baris **99–105**, `<div class="edit-mode-banner" id="editBanner">` adalah banner notifikasi mode edit yang tersembunyi secara default (`display:none` via CSS). Banner ini baru muncul (dengan kelas `.show`) saat pengguna menekan tombol edit di tabel, menandakan bahwa form sedang digunakan untuk mengubah data yang ada.
- Pada baris **107–153**, elemen `<form id="productForm">` memiliki atribut `novalidate` agar validasi diserahkan sepenuhnya ke JavaScript, bukan browser bawaan. Di dalamnya terdapat input `<type="hidden" id="editId">` untuk menyimpan ID produk saat mode edit aktif, serta tiga field input: teks nama produk, dropdown kategori, dan angka harga. Setiap field dilengkapi `<div class="err-msg">` yang ditampilkan sebagai pesan kesalahan ketika validasi gagal.
- Pada baris **166–177**, elemen `<table id="produkTable">` hanya berisi `<thead>` (header kolom) yang statis. Bagian `<tbody id="produkBody">` dibiarkan kosong karena seluruh baris data diisi secara dinamis oleh jQuery DataTables melalui fungsi `dt.row.add()` di JavaScript.
- Pada baris **187–213**, elemen Modal Bootstrap dengan `id="deleteModal"` berisi dialog konfirmasi hapus. Tombol *"Ya, Hapus"* (`id="confirmDelete"`) di-*listen* oleh JavaScript untuk mengeksekusi penghapusan data dari `store` dan DataTable. Atribut `data-bs-dismiss="modal"` pada tombol Batal menutup modal tanpa aksi apapun.
- Pada baris **228–237**, semua `<script>` ditempatkan di akhir `<body>` agar tidak memblokir proses *rendering* HTML. Urutan pengimportan penting: jQuery harus dimuat lebih dulu karena DataTables bergantung padanya, Bootstrap Bundle setelahnya, lalu plugin DataTables, dan terakhir `script.js` yang berisi logika CRUD.

---

#### 2. CSS (`style.css`)

- Pada baris **1–22**, blok `:root` mendefinisikan semua *CSS Custom Properties* (variabel) yang dipakai di seluruh stylesheet. Dengan pendekatan ini, perubahan warna atau shadow cukup dilakukan di satu tempat dan otomatis berlaku ke semua elemen yang mereferensikannya.
- Pada baris **55–74**, kelas `.stat-card` menggunakan `display: flex` dan `align-items: center` untuk meratakan ikon dan teks secara horizontal. Properti `::after` digunakan untuk membuat lingkaran dekoratif transparan di sudut kanan atas kartu tanpa menambah elemen HTML ekstra. Transisi `transform` dan `box-shadow` menghasilkan efek angkat (*lift*) saat kartu dihover.
- Pada baris **76–79**, empat kelas `.stat-card-1` hingga `.stat-card-4` masing-masing menetapkan warna latar berbeda menggunakan variabel *gradient* yang sudah dideklarasikan di `:root`, sehingga keempat kartu tampil dengan warna biru, violet, oranye, dan hijau.
- Pada baris **115–128**, `.form-control-custom` dan `.form-select-custom` menggantikan tampilan input bawaan Bootstrap dengan desain kustom. Properti `transition` pada `border-color` dan `box-shadow` menghasilkan animasi halus saat input difokuskan, dan properti `font-family: inherit` memastikan teks dalam input menggunakan font yang sama dengan halaman.
- Pada baris **166–177**, `.edit-mode-banner` dikonfigurasi `display: none` secara default. Modifier kelas `.show` mengubahnya menjadi `display: flex` agar banner muncul. Perubahan visibilitas ini dikelola JS dengan `classList.add('show')` dan `classList.remove('show')`, bukan dengan mengubah atribut `style` langsung.
- Pada baris **224–241**, `.badge-kategori` bersama tujuh *modifier class* seperti `.badge-elektronik` dan `.badge-pakaian` memberikan tampilan *pill badge* berwarna berbeda untuk setiap kategori. Kombinasi warna latar dan teks dipilih agar kontrasnya memenuhi standar aksesibilitas WCAG.
- Pada baris **244–268**, `.toast-stack` menggunakan `position: fixed` untuk selalu muncul di pojok kanan bawah layar terlepas dari posisi scroll. Setiap `.toast-item` menerapkan dua animasi CSS: `slideUp` saat muncul dan `fadeOut` yang diakhiri dengan `pointer-events: none` agar elemen yang sudah memudar tidak menghalangi interaksi pengguna.
- Pada baris **270–279**, animasi `@keyframes slideUp` dan `@keyframes fadeOut` mendefinisikan pergerakan toast. `slideUp` menggeser elemen dari bawah ke posisi normal, sementara `fadeOut` dijalankan setelah 2.8 detik dengan *delay* menggunakan `animation: fadeOut .4s ease 2.8s`.

---

#### 3. JavaScript (`script.js`)

- Pada baris **3–6**, empat variabel global dideklarasikan: `store` sebagai objek kosong untuk penyimpanan data, `nextId` sebagai penghitung ID yang bertambah otomatis, `editingId` menyimpan ID produk yang sedang diedit (bernilai `null` jika dalam mode tambah), dan `deletingId` menyimpan ID produk yang antrean untuk dihapus melalui modal.
- Pada baris **10–57**, fungsi `$(document).ready()` dari jQuery memastikan seluruh DOM sudah dimuat sebelum inisialisasi DataTable dijalankan. Konfigurasi `columns` memetakan properti objek data (`rowNum`, `nama`, `kategori`, `hargaFmt`, `aksi`) ke kolom tabel. Properti `order: [[1, 'asc']]` menyebabkan tabel diurutkan berdasarkan kolom kedua (Nama Produk) secara *ascending* saat pertama dimuat.
- Pada baris **39–47**, blok `drawCallback` dieksekusi setiap kali tabel digambar ulang (*redraw*). Fungsi ini mengiterasi baris yang tampil di halaman saat ini menggunakan `rows({ page: 'current' })` untuk memperbarui nomor urut sehingga penomoran selalu dimulai dari angka yang benar meskipun pengguna berpindah halaman.
- Pada baris **62–68**, fungsi `formatRupiah()` menggunakan `Number.toLocaleString('id-ID')` yang memanfaatkan API internasionalisasi bawaan browser untuk memformat angka sesuai standar Indonesia, yaitu menggunakan titik sebagai pemisah ribuan (contoh: `8.500.000`).
- Pada baris **70–88**, fungsi `buildRow()` merakit satu objek data baris tabel yang berisi properti `kategori` berupa HTML string `<span>` dengan kelas badge dinamis, properti `hargaFmt` berupa string harga terformat, dan properti `aksi` berupa dua tombol HTML dengan `onclick` yang menyertakan ID produk sebagai argumen fungsi.
- Pada baris **91–113**, fungsi `refreshStats()` menggunakan `Object.values(store)` untuk mendapatkan semua produk, lalu menghitung total produk, jumlah kategori unik dengan `new Set(...)`, harga tertinggi lewat `Math.max(...prices)` dengan *spread operator*, dan rata-rata harga menggunakan `Array.reduce()`. Semua nilai kemudian diinjeksikan ke DOM via `.textContent`.
- Pada baris **116–143**, fungsi `addProduct()` membuat ID unik dengan format `'p' + nextId++`, menyimpan objek produk baru ke `store[id]`, lalu menambahkan baris ke DataTable melalui `dt.row.add().draw(false)`. Argumen `false` pada `draw(false)` berarti halaman tidak kembali ke halaman pertama setelah penambahan.
- Pada baris **154–173**, *event listener* `submit` pada form mengambil nilai ketiga field, melakukan validasi manual dengan fungsi `setErr()`, dan memanggil `updateProduct()` atau `addProduct()` tergantung kondisi `editingId`. Atribut `e.preventDefault()` pada baris pertama mencegah browser melakukan submisi form secara konvensional yang akan menyebabkan halaman refresh.
- Pada baris **176–190**, fungsi `startEdit()` mengambil data produk dari `store` berdasarkan ID, mengisi ulang semua field form dengan data produk tersebut, mengubah teks judul dan tombol submit, serta menampilkan `editBanner`. Fungsi `cancelEdit()` membalik semua perubahan ini dan memanggil `resetForm()`.
- Pada baris **205–218**, operator opsional `?.` pada `store[deletingId]?.nama` adalah *optional chaining* yang mencegah error jika `store[deletingId]` bernilai `undefined`. `dt.rows().every()` mengiterasi semua baris DataTable untuk menemukan dan menghapus baris dengan ID yang cocok, kemudian `dt.draw(false)` memperbarui tampilan tabel.
- Pada baris **229–240**, fungsi `showToast()` membuat elemen `<div>` baru secara dinamis, menetapkan kelas CSS yang sesuai dengan tipe notifikasi, lalu menambahkannya ke kontainer `.toast-stack`. `setTimeout(..., 3300)` memanggil `el.remove()` setelah 3,3 detik untuk menghapus elemen dari DOM setelah animasi `fadeOut` selesai.

---

## 3. Referensi

- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [jQuery DataTables Documentation](https://datatables.net/manual/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [MDN Web Docs — JavaScript Array & Object Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Google Fonts — Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
