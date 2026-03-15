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