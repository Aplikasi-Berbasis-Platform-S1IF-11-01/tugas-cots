/* MOTUBA - script.js */

// Penyimpanan data dengan mapping object
const produkMap = {};
let nextId = 1;
let deleteTarget = null;
let currentFoto = null; // simpan base64 foto
let dt;
let modalHapus;

$(document).ready(function () {

  // Inisialisasi DataTables
  dt = $('#tabelProduk').DataTable({
    language: {
      search:       'Cari:',
      lengthMenu:   'Tampilkan _MENU_ data',
      info:         'Menampilkan _START_ - _END_ dari _TOTAL_ data',
      infoEmpty:    'Tidak ada data',
      paginate:     { previous: 'Sebelumnya', next: 'Berikutnya' },
      emptyTable:   'Belum ada data produk',
      zeroRecords:  'Data tidak ditemukan'
    },
    columnDefs: [{ orderable: false, targets: [1, 5] }],
    pageLength: 5,
    lengthMenu: [5, 10, 25],
    order: [[0, 'asc']],
    drawCallback: renumberRows
  });

  // Inisialisasi Modal
  modalHapus = new bootstrap.Modal(document.getElementById('modalHapus'));

  // Preview foto saat file dipilih
  document.getElementById('fotoInput').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB!');
      this.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      currentFoto = e.target.result;
      document.getElementById('previewImg').src = currentFoto;
      document.getElementById('fotoPreview').style.display = 'block';
    };
    reader.readAsDataURL(file);
  });

  // Tombol konfirmasi hapus
  document.getElementById('btnKonfirmasiHapus').addEventListener('click', function () {
    if (deleteTarget === null) return;

    const id   = deleteTarget;
    const nama = produkMap[id]?.namaProduk || '';

    // Hapus dari mapping object
    delete produkMap[id];

    // Hapus dari tabel
    dt.rows().every(function () {
      const d = this.data();
      if (d[4] && d[4].includes(`hapusProduk(${id})`)) {
        this.remove();
        return false;
      }
    });
    dt.draw(false);

    modalHapus.hide();
    deleteTarget = null;
    alert(`Produk "${nama}" berhasil dihapus.`);
  });

});

// Simpan produk (tambah atau update)
function simpanProduk() {
  const nama     = $('#namaProduk').val().trim();
  const kategori = $('#kategori').val();
  const harga    = parseInt($('#harga').val());
  const editId   = $('#editId').val();

  // Validasi
  if (!nama)               return alert('Nama produk wajib diisi!');
  if (!kategori)           return alert('Pilih kategori terlebih dahulu!');
  if (!harga || harga < 0) return alert('Masukkan harga yang valid!');

  if (editId) {
    const id   = parseInt(editId);
    const foto = currentFoto !== null ? currentFoto : produkMap[id].foto;
    produkMap[id] = { id, namaProduk: nama, kategori, harga, foto };

    dt.rows().every(function () {
      const d = this.data();
      if (d[5] && d[5].includes(`editProduk(${id})`)) {
        this.data(buatBaris(id, nama, kategori, harga, foto)).draw(false);
        return false;
      }
    });
    alert(`Produk "${nama}" berhasil diperbarui.`);
  } else {
    const id = nextId++;
    produkMap[id] = { id, namaProduk: nama, kategori, harga, foto: currentFoto };
    dt.row.add(buatBaris(id, nama, kategori, harga, currentFoto)).draw(false);
    alert(`Produk "${nama}" berhasil ditambahkan.`);
  }

  resetForm();
}

// Buat array data untuk satu baris tabel
function buatBaris(id, nama, kategori, harga, foto) {
  const gambar = foto
    ? `<img src="${foto}" alt="${nama}" style="width:60px;height:45px;object-fit:cover;border-radius:4px;cursor:pointer;" onclick="lihatFoto('${foto}')"/>`
    : `<span class="text-muted small">-</span>`;

  return [
    '', // nomor (diisi renumberRows)
    gambar,
    nama,
    kategori,
    formatRupiah(harga),
    `<button class="btn btn-warning btn-sm me-1" onclick="editProduk(${id})">Edit</button>
     <button class="btn btn-danger btn-sm"       onclick="hapusProduk(${id})">Hapus</button>`
  ];
}

// Edit — isi form dengan data yang dipilih
function editProduk(id) {
  const p = produkMap[id];
  if (!p) return;

  $('#editId').val(id);
  $('#namaProduk').val(p.namaProduk);
  $('#kategori').val(p.kategori);
  $('#harga').val(p.harga);

  // Restore foto
  currentFoto = p.foto || null;
  if (p.foto) {
    document.getElementById('previewImg').src = p.foto;
    document.getElementById('fotoPreview').style.display = 'block';
  } else {
    document.getElementById('fotoPreview').style.display = 'none';
  }
  document.getElementById('fotoInput').value = '';

  document.getElementById('formJudul').textContent = `Edit Produk #${id}`;
  document.getElementById('btnText').textContent   = 'Update';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Hapus — tampilkan modal konfirmasi
function hapusProduk(id) {
  deleteTarget = id;
  const p = produkMap[id];
  document.getElementById('namaHapus').textContent = p ? p.namaProduk : 'produk ini';
  modalHapus.show();
}

// Reset form ke kondisi awal
function resetForm() {
  $('#editId').val('');
  $('#namaProduk').val('');
  $('#kategori').val('');
  $('#harga').val('');
  currentFoto = null;
  document.getElementById('fotoInput').value = '';
  document.getElementById('fotoPreview').style.display = 'none';
  document.getElementById('previewImg').src = '';
  document.getElementById('formJudul').textContent = 'Tambah Produk';
  document.getElementById('btnText').textContent   = 'Simpan';
}

// Hapus foto dari form
function hapusFoto() {
  currentFoto = null;
  document.getElementById('fotoInput').value = '';
  document.getElementById('fotoPreview').style.display = 'none';
  document.getElementById('previewImg').src = '';
}

// Lihat foto ukuran penuh (tab baru)
function lihatFoto(src) {
  const win = window.open();
  win.document.write(`<img src="${src}" style="max-width:100%;"/>`);
}

// Penomoran baris ulang setelah setiap draw
function renumberRows() {
  let i = 1;
  $('#tabelProduk tbody tr').each(function () {
    $('td:first', this).text(i++);
  });
}

// Format angka ke Rupiah
function formatRupiah(n) {
  return 'Rp ' + parseInt(n).toLocaleString('id-ID');
}