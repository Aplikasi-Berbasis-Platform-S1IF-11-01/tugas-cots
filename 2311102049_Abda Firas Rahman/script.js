let daftarProduk = [];
let tabelDT;

/* Abda Firas Rahman - 2311102049 - Tugas Cots*/

// Inisialisasi DataTable saat halaman dimuat
$(document).ready(function () {
    tabelDT = $('#tabelProduk').DataTable();
});

// Fungsi untuk menyimpan data produk
function simpanProduk() {
    let nama = $('#inputNama').val();
    let kategori = $('#inputKategori').val();
    let harga = $('#inputHarga').val();

    // Validasi input kosong
    if (nama === '' || kategori === '' || harga === '') {
        alert('Harap isi semua data produk.');
        return;
    }

    // Pembuatan object produk baru
    let produkBaru = {
        id: Date.now(),
        nama: nama,
        kategori: kategori,
        harga: harga
    };

    // Simpan ke array dan perbarui tabel
    daftarProduk.push(produkBaru);
    $('#formProduk')[0].reset();
    tampilkanKeTabel();
}

// Fungsi untuk menampilkan data dari array ke dalam DataTable
function tampilkanKeTabel() {
    tabelDT.clear();

    for (let i = 0; i < daftarProduk.length; i++) {
        let produk = daftarProduk[i];
        let tombolHapus = `<button class="btn btn-danger btn-sm" onclick="hapusProduk(${produk.id})">Hapus</button>`;

        tabelDT.row.add([
            i + 1,
            produk.nama,
            produk.kategori,
            `Rp ${produk.harga}`,
            tombolHapus
        ]);
    }

    tabelDT.draw();
}

// Fungsi untuk menghapus produk berdasarkan ID
function hapusProduk(idProduk) {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
        // Filter data untuk menghapus produk yang dipilih
        daftarProduk = daftarProduk.filter(function (produk) {
            return produk.id !== idProduk;
        });
        tampilkanKeTabel();
    }
}