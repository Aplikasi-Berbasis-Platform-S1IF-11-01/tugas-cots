<div align="center">
  <br />
  <h1>LAPORAN PRAKTIKUM <br>APLIKASI BERBASIS PLATFORM</h1>
  <br />
  <h3>DATA PRODUK <br> Bootstrap, jQuery DataTables & JavaScript</h3>
  <br />
  <br />
 <img src="Assets/logo.jpeg" alt ="logo" width = "300"> 
  <br />
  <br />
  <h3>Disusun Oleh :</h3>
  <p>
    <strong>Yoga Hogantara</strong><br>
    <strong>2311102153</strong><br>
    <strong>S1 IF-11-01</strong>
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

* **CRUD (Create, Read, Update, Delete)**
CRUD adalah empat operasi standar yang wajib ada untuk mengelola data di dalam aplikasi. Lewat operasi ini, pengguna bisa menambah, melihat, mengubah, dan menghapus informasi. Dalam konteks web *front-end*, semua proses manipulasi data ini bisa dieksekusi langsung di *browser* menggunakan JavaScript, sehingga kita tidak perlu repot melakukan pertukaran data dengan *server*.

* **Bootstrap**
Bootstrap merupakan *framework* CSS *open-source* yang sangat membantu kita untuk mendesain tampilan web dengan cepat. Daripada membuat *styling* dari nol, kita tinggal memakai komponen antarmuka yang sudah disediakan, seperti form, tombol, jendela *pop-up* (modal), hingga sistem *grid*. Hasilnya, desain web bisa lebih rapi dan otomatis responsif saat dibuka di berbagai ukuran layar.

* **jQuery DataTables**
Plugin berbasis jQuery ini fungsinya untuk "menyulap" elemen tabel HTML biasa menjadi jauh lebih interaktif. Hanya dengan satu baris kode inisialisasi, tabel kita akan langsung memiliki fitur pencarian, pengurutan data berdasarkan kolom (*sorting*), serta pembagian halaman (*pagination*) secara otomatis.

* **Object Mapping**
Ini adalah teknik penyimpanan data di JavaScript yang memanfaatkan struktur objek. Setiap data disimpan berpasangan sebagai *key* dan *value*, di mana *key*-nya bertindak sebagai penanda atau ID unik (contohnya: `{ "p1": { id, nama, kategori, harga } }`). Pendekatan ini sangat efisien karena membuat proses pencarian, pembaruan, dan penghapusan data menjadi sangat cepat (kompleksitas waktu O(1)). Sistem bisa langsung melompat ke ID yang dituju tanpa perlu menelusuri data satu per satu.
---

## 2. Penjelasan Kode HTML, CSS, dan JS


---

### Kode HTML (`index.html`)

```html
<!DOCTYPE html>
<html lang="id" data-bs-theme="dark">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>YHota | Yoga Hogantara</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" href="style.css" />
</head>

<body>
    <nav class="navbar navbar-dark px-4 py-3 mb-4 custom-navbar-box">
        <span class="navbar-brand fw-bold fs-5">🎸 YHota's - Guitar ORI</span>
    </nav>

    <div class="container py-5">
        <div class="header-box text-center mb-5">
            <h1 class="fw-bold mb-2">YHota's Guitar</h1>
            <p class="mb-0 text-light">
                <strong></strong> Yoga Hogantara &nbsp;|&nbsp; <strong></strong> 2311102153
            </p>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="card border-0 custom-card">
                    <div class="card-body p-4">
                        <div
                            class="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-3">
                            <h4 class="card-title mb-0 border-0 pb-0">Stok Gitar</h4>
                            <button type="button" class="btn btn-custom-primary" id="btnTambahData"
                                data-bs-toggle="modal" data-bs-target="#gitarModal">
                                + Tambah Gitar Baru
                            </button>
                        </div>

                        <div class="table-responsive">
                            <table id="productTable" class="table table-hover align-middle w-100">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Tipe/Seri Gitar</th>
                                        <th>Kategori / Merek</th>
                                        <th>Harga</th>
                                        <th class="text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="gitarModal" tabindex="-1" aria-labelledby="modalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content custom-card">
                <div class="modal-header border-secondary">
                    <h5 class="modal-title fw-bold text-white" id="modalTitle">Form Data Gitar</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <form id="productForm">
                        <input type="hidden" id="productId" />

                        <div class="mb-3">
                            <label for="namaProduk" class="form-label">Tipe/Seri Gitar</label>
                            <input type="text" class="form-control" id="namaProduk"
                                placeholder="Contoh: PRS SE Custom 24" required />
                        </div>

                        <div class="mb-3">
                            <label for="kategoriProduk" class="form-label">Kategori / Merek</label>
                            <input type="text" class="form-control" id="kategoriProduk"
                                placeholder="Contoh: Elektrik / PRS" required />
                        </div>

                        <div class="mb-4">
                            <label for="hargaProduk" class="form-label">Harga (Rp)</label>
                            <input type="number" class="form-control" id="hargaProduk"
                                placeholder="Masukkan nominal harga" min="0" required />
                        </div>

                        <div class="d-grid gap-2">
                            <button type="submit" class="btn btn-custom-primary" id="submitBtn">
                                Simpan Data Gitar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
    <script src="script.js"></script>
</body>

</html>
```

---

### Kode CSS (`style.css`)

```css
body {
    background-color: #2c313c;
    color: #f8f9fa;
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.custom-navbar-box {
    background-color: #21252b !important;
    border-bottom: 3px solid #3b71ca;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.custom-card {
    background-color: #21252b !important;
    border: 1px solid #3e4451 !important;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.card-title {
    font-weight: 700;
    color: #ffffff;
    border-bottom: 2px solid #3b71ca;
    display: inline-block;
    padding-bottom: 8px;
}

.form-label {
    font-weight: 600;
    font-size: 0.9rem;
    color: #abb2bf;
}

.form-control {
    background-color: #ffffff !important;
    color: #212529 !important;
    border: 1px solid #ced4da;
    border-radius: 4px;
}

.form-control::placeholder {
    color: #6c757d !important;
}

.form-control:focus {
    border-color: #3b71ca;
    box-shadow: 0 0 0 0.25rem rgba(59, 113, 202, 0.25);
}

.btn-custom-primary {
    background-color: #3b71ca;
    border-color: #3b71ca;
    color: #ffffff;
    font-weight: 500;
}

.btn-custom-primary:hover {
    background-color: #2b5db0;
    border-color: #2b5db0;
    color: #ffffff;
}

.table {
    color: #abb2bf;
}

.table th {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
    color: #ffffff !important;
}

.btn-action {
    min-width: 70px;
}

.dataTables_wrapper .dataTables_filter input,
.dataTables_wrapper .dataTables_length select {
    background-color: #ffffff;
    color: #212529;
    border-radius: 4px;
    border: 1px solid #ced4da;
    padding: 4px 10px;
    outline: none;
}

.dataTables_wrapper .dataTables_info,
.dataTables_wrapper .dataTables_length,
.dataTables_wrapper .dataTables_filter {
    color: #abb2bf !important;
}
```

---

### Kode JavaScript (`script.js`)

```javascript
let products = {
    "p1": { id: "p1", nama: "PRS SE Custom 24", kategori: "Gitar Elektrik", harga: 14500000 },
    "p2": { id: "p2", nama: "Gibson Les Paul Standard", kategori: "Gitar Elektrik", harga: 45000000 },
    "p3": { id: "p3", nama: "Fender Stratocaster Am-Pro II", kategori: "Gitar Elektrik", harga: 28500000 },
    "p4": { id: "p4", nama: "Yamaha F310", kategori: "Gitar Akustik", harga: 1750000 },
    "p5": { id: "p5", nama: "Cort AD810 OP", kategori: "Gitar Akustik", harga: 1400000 }
};

let productCounter = 6;
let dataTable;
let gitarModalInstance;

$(document).ready(function () {
    gitarModalInstance = new bootstrap.Modal(document.getElementById('gitarModal'));

    dataTable = $("#productTable").DataTable({
        pageLength: 5,
        lengthMenu: [5, 10, 25, 50],
        language: {
            search: "Cari Gitar:",
            lengthMenu: "Tampilkan _MENU_ data",
            info: "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
            paginate: {
                first: "Awal",
                last: "Akhir",
                next: "Selanjutnya",
                previous: "Sebelumnya"
            },
            zeroRecords: "Data gitar tidak ditemukan",
            infoEmpty: "Tidak ada data tersedia",
            infoFiltered: "(disaring dari _MAX_ total data)"
        }
    });

    renderTable();

    $("#btnTambahData").on("click", function () {
        resetForm();
        $("#modalTitle").text("Tambah Data Gitar");
        $("#submitBtn").text("Simpan Data Gitar");
    });

    $("#productForm").on("submit", function (e) {
        e.preventDefault();

        const id = $("#productId").val();
        const nama = $("#namaProduk").val().trim();
        const kategori = $("#kategoriProduk").val().trim();
        const harga = $("#hargaProduk").val().trim();

        if (!nama || !kategori || !harga) {
            alert("Semua field harus diisi!");
            return;
        }

        if (id) {
            updateProduct(id, nama, kategori, harga);
        } else {
            createProduct(nama, kategori, harga);
        }

        renderTable();
        gitarModalInstance.hide();
    });
});

function createProduct(nama, kategori, harga) {
    const id = "p" + productCounter++;
    products[id] = { id: id, nama: nama, kategori: kategori, harga: parseInt(harga) };
}

function readProducts() {
    return Object.values(products);
}

function updateProduct(id, nama, kategori, harga) {
    if (products[id]) {
        products[id].nama = nama;
        products[id].kategori = kategori;
        products[id].harga = parseInt(harga);
    }
}

function deleteProduct(id) {
    if (products[id]) {
        delete products[id];
        renderTable();
    }
}

function renderTable() {
    dataTable.clear();
    const productList = readProducts();

    productList.forEach((product, index) => {
        dataTable.row.add([
            index + 1,
            product.nama,
            product.kategori,
            "Rp " + Number(product.harga).toLocaleString("id-ID"),
            `
        <div class="text-center">
          <button class="btn btn-custom-primary btn-sm btn-action me-1" onclick="editProduct('${product.id}')">
            Edit
          </button>
          <button class="btn btn-outline-danger btn-sm btn-action" onclick="confirmDelete('${product.id}')">
            Hapus
          </button>
        </div>
      `
        ]);
    });
    dataTable.draw();
}

function editProduct(id) {
    const product = products[id];
    if (product) {
        $("#productId").val(product.id);
        $("#namaProduk").val(product.nama);
        $("#kategoriProduk").val(product.kategori);
        $("#hargaProduk").val(product.harga);
        $("#modalTitle").text("Edit Data Gitar");
        $("#submitBtn").text("Update Stok");
        gitarModalInstance.show();
    }
}

function confirmDelete(id) {
    const yakin = confirm("Apakah Anda yakin ingin menghapus data gitar ini?");
    if (yakin) {
        deleteProduct(id);
    }
}

function resetForm() {
    $("#productForm")[0].reset();
    $("#productId").val("");
}
```

---

### Hasil Tampilan (Screenshot)

#### 1. Tampilan Awal Halaman

![Tampilan Awal Web](Assets/1.PNG)

#### 2. Input Data & Data Berhasil Ditambahkan

![Form Input Produk](Assets/2.PNG)

![Data Berhasil Ditambahkan](Assets/3.PNG)

#### 3. Fitur Pencarian (Search)

![Fitur Searching](Assets/4.PNG)

#### 4. Edit Data

![Edit Data Produk](Assets/5.PNG)

#### 5. Hapus Data

![Hapus Data Produk](Assets/6.PNG)

---

### Penjelasan Kode

# Penjelasan Kode: Sistem Inventaris YHota's Guitar

Aplikasi ini adalah sistem manajemen inventaris berbasis web sederhana untuk mendata stok gitar. Aplikasi ini sudah dilengkapi fitur CRUD (Create, Read, Update, Delete) yang berjalan di sisi klien (browser) menggunakan HTML, CSS, JavaScript (jQuery), dan DataTables.

## 1. Struktur Halaman (`index.html`)
struktur utama

* **Layout & Tema:** Menggunakan *framework* Bootstrap 5 dengan pengaturan tema gelap (`data-bs-theme="dark"`). 
* **Tabel Interaktif:** Terdapat struktur tabel HTML dasar yang sengaja dibiarkan kosong pada bagian badannya (`<tbody></tbody>`) karena datanya akan diisi secara dinamis melalui JavaScript.
* **Formulir Pop-up (Modal):** Menggunakan fitur Modal Bootstrap dengan ID `gitarModal` untuk menampilkan formulir tambah/edit data tanpa harus berpindah halaman. Formulir ini mencakup isian untuk Nama/Tipe, Kategori, Harga, dan satu input tersembunyi (`productId`) untuk keperluan fitur Edit.

---

## 2. Tampilan Visual (`style.css`)
styling

* **Tema Gelap Kustom:** Latar belakang diatur menjadi abu-abu gelap (`#2c313c`) dan elemen *card* (kartu) dibuat sedikit lebih gelap (`#21252b`) agar terbentuk kontras yang pas.
* **Aksen Warna:** Menggunakan warna biru (`#3b71ca`) sebagai warna utama untuk garis bawah judul dan tombol aksi. Saat disorot (hover), warna tombol berubah menjadi biru yang lebih gelap (`#2b5db0`).
* **Penyesuaian DataTables:** Memodifikasi gaya bawaan DataTables (seperti kotak pencarian dan pilihan jumlah entri) agar latar belakangnya tetap putih dengan teks gelap, sehingga mudah dibaca di atas tema situs yang gelap.

---

## 3. Logika Program (`script.js`)
otak dari aplikasi 

### A. Penyimpanan Data Awal
* Aplikasi menyimpan lima data gitar awal (seperti PRS, Gibson, Fender, dll.) di dalam sebuah variabel objek bernama `products`. Karena aplikasi ini tidak terhubung ke *database* di server, data ini bersifat sementara (disimpan di memori browser) dan akan kembali ke wujud aslinya jika halaman dimuat ulang (di-refresh).

### B. Menampilkan Data (Read)
* **Inisialisasi DataTables:** Memanggil `$("#productTable").DataTable(...)` untuk menyulap tabel biasa menjadi tabel canggih yang otomatis memiliki fitur pencarian, penomoran halaman (pagination), dan filter. Teks bawaan antarmuka DataTables juga sudah diterjemahkan ke bahasa Indonesia.
* **Fungsi `renderTable()`:** Fungsi ini bertugas mengambil sekumpulan data dari objek `products`, mengosongkan tabel lama, lalu memasukkan data yang diperbarui satu per satu. Fungsi ini juga memformat angka harga ke dalam format Rupiah (`toLocaleString("id-ID")`) serta menyisipkan tombol aksi (Edit & Hapus) di setiap baris.

### C. Menambah & Mengedit Data (Create & Update)
* **Tambah Data Baru:** Saat tombol "+ Tambah Gitar Baru" diklik, sistem akan mengosongkan isian form (`resetForm()`) dan mengubah teks tombol menjadi "Simpan Data Gitar".
* **Edit Data:** Saat tombol "Edit" di dalam tabel diklik, fungsi `editProduct(id)` dipanggil. Sistem akan mencari data gitar tersebut, memunculkan modal, lalu mengisi kotak form secara otomatis sesuai data yang dipilih.
* **Simpan (Submit):** Ketika formulir dikirim, program menahan efek *refresh* bawaan browser menggunakan `e.preventDefault()`. Program mengecek: jika ada ID tersembunyi, berarti ia harus *memperbarui* data lama (`updateProduct()`). Jika ID kosong, ia akan membuat ID baru berurutan (`p6`, `p7`, dst) dan *menambah* data tersebut (`createProduct()`).

### D. Menghapus Data (Delete)
* Saat tombol "Hapus" diklik, program akan memunculkan dialog peringatan standar melalui fungsi `confirmDelete(id)`. 
* Jika pengguna menekan "OK", fungsi `deleteProduct(id)` akan dijalankan untuk menghapus data secara spesifik dari objek `products` dan segera merender ulang tabel agar item tersebut hilang dari layar.
---

## 3. Referensi

- [MDN Web Docs - HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN Web Docs - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [jQuery DataTables Documentation](https://datatables.net/manual/)
- [jQuery API Documentation](https://api.jquery.com/)
- [MDN Web Docs — JavaScript Array & Object Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
