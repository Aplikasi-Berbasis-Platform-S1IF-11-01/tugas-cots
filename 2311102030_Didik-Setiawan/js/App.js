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