const store    = {};
let nextId     = 1;
let editingId  = null;
let deletingId = null;

// ────────────────────────────────────────
//  DATATABLE INIT
// ────────────────────────────────────────
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
      zeroRecords:       '<div class="empty-state"><i class="bi bi-inbox-fill"></i><p>Belum ada produk. Tambah lewat form di kiri.</p></div>',
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
      { data: 'aksi',    orderable: false, className: 'text-center', width: '100px' },
      { data: 'seq',     visible: false }
    ],
    order: [[5, 'desc']],
    pageLength: 5,
    lengthMenu: [5, 10, 25, 50],
    drawCallback: function () {
      // Re-number visible rows per halaman
      let i = this.api().page.info().start;
      this.api().rows({ page: 'current' }).every(function () {
        const d = this.data();
        d.rowNum = ++i;
        this.data(d);
      });
    }
  });

  // ── Data sampel awal ──
  addProduct('Laptop ASUS VivoBook',  'Elektronik', 8500000);
  addProduct('Kaos Polos Uniqlo',     'Pakaian',    149000);
  addProduct('Nasi Goreng Spesial',   'Makanan',    25000);
  addProduct('Sepatu Running Adidas', 'Olahraga',   750000);
  addProduct('Serum Vitamin C',       'Kecantikan', 85000);
});

// ────────────────────────────────────────
//  HELPERS
// ────────────────────────────────────────
function formatRupiah(num) {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

function badgeClass(k) {
  const map = {
    Elektronik: 'badge-elektronik',
    Pakaian:    'badge-pakaian',
    Makanan:    'badge-makanan',
    Minuman:    'badge-minuman',
    Olahraga:   'badge-olahraga',
    Kecantikan: 'badge-kecantikan',
  };
  return map[k] || 'badge-lainnya';
}

function buildRow(p, idx) {
  return {
    id:       p.id,
    rowNum:   idx,
    nama:     p.nama,
    seq:      p.seq,
    kategori: `<span class="badge-kategori ${badgeClass(p.kategori)}">${p.kategori}</span>`,
    hargaFmt: `<span style="font-weight:700;color:#059669;">${formatRupiah(p.harga)}</span>`,
    aksi:
      `<div class="d-flex justify-content-center gap-2">` +
      `<button class="btn-action btn-edit-row"   onclick="startEdit('${p.id}')" title="Edit"><i class="bi bi-pencil-fill"></i></button>` +
      `<button class="btn-action btn-delete-row" onclick="promptDelete('${p.id}')" title="Hapus"><i class="bi bi-trash3-fill"></i></button>` +
      `</div>`
  };
}

// ────────────────────────────────────────
//  STATS — refresh setiap ada perubahan data
// ────────────────────────────────────────
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

// ────────────────────────────────────────
//  CRUD — CREATE
// ────────────────────────────────────────
function addProduct(nama, kategori, harga) {
  const seq = nextId++;
  const id  = 'p' + seq;
  store[id] = { id, nama, kategori, harga, seq };
  dt.row.add(buildRow(store[id], 0)).draw(); // Hilangkan false agar sort terpicu
  refreshStats();
}

// ────────────────────────────────────────
//  CRUD — UPDATE
// ────────────────────────────────────────
function updateProduct(id, nama, kategori, harga) {
  const seq = nextId++; // Tambahkan seq baru agar naik ke atas saat diupdate
  store[id] = { id, nama, kategori, harga, seq };
  dt.rows().every(function () {
    if (this.data().id === id) this.data(buildRow(store[id], 0)).invalidate();
  });
  dt.draw(); // Hilangkan false agar sort terpicu
  refreshStats();
}

// ────────────────────────────────────────
//  FORM SUBMIT
// ────────────────────────────────────────
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
  const el = document.getElementById(id);
  if (show) {
    el.classList.remove('d-none');
    el.classList.add('d-block');
  } else {
    el.classList.add('d-none');
    el.classList.remove('d-block');
  }
}

// ────────────────────────────────────────
//  EDIT
// ────────────────────────────────────────
function startEdit(id) {
  const p = store[id];
  if (!p) return;
  editingId = id;
  document.getElementById('namaProduk').value      = p.nama;
  document.getElementById('kategori').value        = p.kategori;
  document.getElementById('harga').value           = p.harga;
  document.getElementById('formTitle').textContent = 'Edit Produk';
  document.getElementById('btnSubmit').innerHTML   = '<i class="bi bi-check-circle-fill"></i> Simpan';
  document.getElementById('editBanner').classList.remove('d-none');
  document.getElementById('editBanner').classList.add('d-flex');
  document.querySelector('.col-lg-4').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function cancelEdit() {
  editingId = null;
  resetForm();
  document.getElementById('formTitle').textContent = 'Tambah Produk';
  document.getElementById('btnSubmit').innerHTML   = '<i class="bi bi-plus-circle-fill"></i> Tambah';
  document.getElementById('editBanner').classList.add('d-none');
  document.getElementById('editBanner').classList.remove('d-flex');
  ['errNama', 'errKategori', 'errHarga'].forEach(id => setErr(id, false));
}

// ────────────────────────────────────────
//  DELETE
// ────────────────────────────────────────
function promptDelete(id) {
  const p = store[id];
  if (!p) return;
  deletingId = id;
  document.getElementById('deleteProductName').textContent = p.nama;
  new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

document.getElementById('confirmDelete').addEventListener('click', function () {
  if (!deletingId) return;
  const name = store[deletingId]?.nama || '';

  // Hapus dari store
  delete store[deletingId];

  // Hapus dari DataTable
  dt.rows().every(function () {
    if (this.data().id === deletingId) this.remove();
  });
  dt.draw(false);
  refreshStats();

  bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
  deletingId = null;
  showToast(`"${name}" berhasil dihapus.`, 'danger');
});

// ────────────────────────────────────────
//  RESET FORM
// ────────────────────────────────────────
function resetForm() {
  document.getElementById('productForm').reset();
  document.getElementById('editId').value = '';
}

// ────────────────────────────────────────
//  TOAST NOTIFICATION
// ────────────────────────────────────────
function showToast(msg, type = 'success') {
  const icons = {
    success: 'bi-check-lg',
    danger:  'bi-trash3',
    info:    'bi-pencil-fill'
  };
  const el = document.createElement('div');
  el.className = `toast-item toast-${type}`;
  el.innerHTML = `
    <div class="toast-icon-wrap"><i class="bi ${icons[type] || icons.success}"></i></div>
    <span>${msg}</span>
  `;
  document.getElementById('toastStack').appendChild(el);
  setTimeout(() => el.remove(), 3300);
}
