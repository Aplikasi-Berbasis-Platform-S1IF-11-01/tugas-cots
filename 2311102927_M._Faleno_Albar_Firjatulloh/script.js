/**
 * Variabel Global
 * Menggunakan Array untuk menampung data produk
 */
let produkList = [];
let table;

$(document).ready(function () {
    // Inisialisasi DataTables
    table = $('#tabelProduk').DataTable({
        language: {
            search: "Cari Produk:",
            lengthMenu: "Tampilkan _MENU_ data",
            zeroRecords: "Data tidak ditemukan",
            info: "Menampilkan halaman _PAGE_ dari _PAGES_",
        }
    });

    // Event Handler: Submit Form
    $("#formProduk").on("submit", function (e) {
        e.preventDefault();

        const indexEdit = $("#indexEdit").val();
        const produk = {
            nama: $("#namaProduk").val(),
            kategori: $("#kategori").val(),
            harga: parseInt($("#harga").val())
        };

        if (indexEdit === "") {
            // Mode: Tambah Data Baru
            produkList.push(produk);
        } else {
            // Mode: Update Data
            produkList[indexEdit] = produk;
            resetForm();
        }

        renderTable();
        this.reset();
    });
});

/**
 * Fungsi untuk merender ulang isi tabel
 */
function renderTable() {
    table.clear();

    produkList.forEach((p, index) => {
        const aksiButtons = `
            <div class="d-flex gap-1">
                <button class="btn btn-warning btn-sm" onclick="editProduk(${index})">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="hapusProduk(${index})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;

        table.row.add([
            index + 1,
            p.nama,
            p.kategori,
            "Rp " + p.harga.toLocaleString('id-ID'),
            aksiButtons
        ]);
    });

    table.draw();
}

/**
 * Fungsi untuk mengambil data ke form saat tombol edit ditekan
 */
function editProduk(index) {
    const produk = produkList[index];

    $("#namaProduk").val(produk.nama);
    $("#kategori").val(produk.kategori);
    $("#harga").val(produk.harga);
    $("#indexEdit").val(index);

    // Ubah teks tombol simpan agar user tahu sedang dalam mode edit
    $("button[type='submit']").html('<i class="bi bi-check-circle"></i> Perbarui Produk').addClass("btn-info").removeClass("btn-success");
}

/**
 * Fungsi untuk menghapus data dari array
 */
function hapusProduk(index) {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
        produkList.splice(index, 1);
        renderTable();
        
        // Jika sedang mengedit data yang dihapus, reset formnya
        if ($("#indexEdit").val() == index) {
            resetForm();
        }
    }
}

/**
 * Helper: Reset Form ke kondisi awal
 */
function resetForm() {
    $("#indexEdit").val("");
    $("#formProduk")[0].reset();
    $("button[type='submit']").html('<i class="bi bi-plus-circle"></i> Simpan Produk').addClass("btn-success").removeClass("btn-info");
}