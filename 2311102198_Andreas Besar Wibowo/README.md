<div align="center">
  <br />

  <h1>LAPORAN PRAKTIKUM <br>
  APLIKASI BERBASIS PLATFORM
  </h1>

  <br />

  <h3>MODUL VII <br>
 COTS (Coding On The Spot)
  </h3>

  <br />

  <img src="Images/Logo Telkom.png" alt="Logo" width="300">

  <br />
  <br />
  <br />

  <h3>Disusun Oleh :</h3>

  <p>
    <strong>Andreas Besar Wibowo</strong><br>
    <strong>2311102198</strong><br>
    <strong>S1 IF-11-REG01</strong>
  </p>

  <br />

  <h3>Dosen Pengampu :</h3>

  <p>
    <strong>Dimas Fanny Hebrasianto Permadi, S.ST., M.Kom</strong>
  </p>
  
  <br />
    <h4>Asisten Praktikum :</h4>
    <strong>Apri Pandu Wicaksono </strong> <br>
    <strong>Rangga Pradarrell Fathi</strong>
  <br />

  <h3>LABORATORIUM HIGH PERFORMANCE
 <br>FAKULTAS INFORMATIKA <br>UNIVERSITAS TELKOM PURWOKERTO <br>2026</h3>
</div>

<hr>

## Tugas
### Buatlah sebuah halaman web sederhana untuk menampilkan data produk. Pada halaman tersebut terdapat form input dan tabel data produk.
1. Gunakan **Bootstrap** untuk tampilan halaman.
2. Buat **form input** dengan field berikut:
   - Nama Produk
   - Kategori
   - Harga
3. Data yang diinput dari form harus **ditampilkan pada tabel**.
4. Gunakan **jQuery DataTables** pada tabel.
5. Tambahkan **tombol hapus** pada setiap data di tabel.
6. Pastikan tabel memiliki fitur:
   - **Search**
   - **Pagination**
7. Buat **CRUD sederhana** dengan sistem penyimpanan menggunakan **mapping object (JavaScript Object)**.
#### Ouput
- Form input produk
- Data yang dimasukkan muncul di tabel
- Tabel menggunakan **jQuery DataTables**
- Tampilan halaman menggunakan **Bootstrap**

```html
<!-- Andreas Besar Wibowo -->
<!-- 2311102198 / IF - 11 - 01 -->

<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Manajemen Produk</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    <!-- JQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

    <!-- Data Tabel -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
</head>

<body class="bg-light">

    <!-- Navigation Bar -->
    <nav class="navbar navbar-dark bg-success shadow">
        <div class="container">
            <span class="navbar-brand">
                <i class="bi bi-box-seam"></i> Sistem Data Produk
            </span>
        </div>
    </nav>

    <div class="container mt-4">

        <!-- Judul Website -->
        <div class="text-center mb-4">
            <h2 class="fw-bold">Manajemen Produk</h2>
            <p class="text-muted">
                Halaman ini digunakan untuk mengelola data produk.
                Pengguna dapat menambahkan, mengedit, dan menghapus produk
                melalui form yang tersedia.
            </p>
        </div>

        <!-- Notifikasi -->
        <div id="alertBox"></div>

        <div class="row">

            <!-- Form Input Produk -->
            <div class="col-md-4">
                <div class="card shadow">

                    <div class="card-header bg-success text-white">
                        <i class="bi bi-stack"></i> Form Produk
                    </div>

                    <div class="card-body">

                        <form id="formProduk">

                            <input type="hidden" id="editIndex">

                            <div class="mb-3">
                                <label class="form-label">Nama Produk</label>
                                <input type="text" id="namaProduk" class="form-control" required>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Kategori</label>
                                <input type="text" id="kategoriProduk" class="form-control" required>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Harga</label>
                                <input type="number" id="hargaProduk" class="form-control" required>
                            </div>

                            <button class="btn btn-success w-100">
                                <i class="bi bi-save"></i> Simpan Produk
                            </button>

                        </form>

                    </div>
                </div>
            </div>

            <!-- Tabel Data Produk -->
            <div class="col-md-8">

                <div class="card shadow">

                    <div class="card-header bg-dark text-white">
                        <i class="bi bi-table"></i> Data Produk
                    </div>

                    <div class="card-body">

                        <table id="tabelProduk" class="table table-striped">

                            <thead class="table-success">
                                <tr>
                                    <th>No</th>
                                    <th>Produk</th>
                                    <th>Kategori</th>
                                    <th>Harga</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>

                            <tbody></tbody>

                        </table>

                    </div>
                </div>

            </div>

        </div>

    </div>


    <script>

        /* Penyimpanan Data (Mapping Object) */

        let produkList = [];

        let table = $('#tabelProduk').DataTable();

        function formatRupiah(angka) {
            return "Rp " + parseInt(angka).toLocaleString("id-ID");
        }


        /* Membuat dan Mengedit */

        $("#formProduk").submit(function (e) {

            e.preventDefault();

            let produk = {
                nama: $("#namaProduk").val(),
                kategori: $("#kategoriProduk").val(),
                harga: $("#hargaProduk").val()
            };

            let index = $("#editIndex").val();

            if (index === "") {

                // CREATE
                produkList.push(produk);
                showAlert("Produk berhasil ditambahkan!");

            } else {

                // UPDATE
                produkList[index] = produk;
                showAlert("Produk berhasil diupdate!");

                $("#editIndex").val("");

            }

            renderTable();
            $("#formProduk")[0].reset();

        });


        /* Read Data */

        function renderTable() {

            table.clear();

            produkList.forEach((item, index) => {

                table.row.add([
                    index + 1,
                    "<b>" + item.nama + "</b>",
                    `<span class="badge bg-primary">${item.kategori}</span>`,
                    formatRupiah(item.harga),
                    `
                    <button class="btn btn-warning btn-sm" onclick="editData(${index})">
                        <i class="bi bi-pencil"></i>
                    </button>

                    <button class="btn btn-danger btn-sm" onclick="hapusData(${index})">
                        <i class="bi bi-trash"></i>
                    </button>
                    `
                ]);

            });

            table.draw();
        }


        /* Edit Data */

        function editData(index) {

            let data = produkList[index];

            $("#namaProduk").val(data.nama);
            $("#kategoriProduk").val(data.kategori);
            $("#hargaProduk").val(data.harga);

            $("#editIndex").val(index);

        }


        /* Hapus Data */

        function hapusData(index) {

            if (confirm("Yakin ingin menghapus produk ini?")) {

                produkList.splice(index, 1);

                renderTable();

                showAlert("Produk berhasil dihapus!", "danger");

            }

        }


        /* Notifikasi */

        function showAlert(message, type = "success") {

            $("#alertBox").html(`
                <div class="alert alert-${type} alert-dismissible fade show">
                    ${message}
                    <button class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `);

        }

    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

</body>

</html>
```
### Hasil
![Output 1](Images/Tampilan%20Web%201.png)
![Output 2](Images/Tampilan%20Web%202.png)
![Output 3](Images/Tampilan%20Web%203.png)
![Output 4](Images/Tampilan%20Web%204.png)
![Output 5](Images/Tampilan%20Web%205.png)
![Output 6](Images/Tampilan%20Web%206.png)

#### Import Library Bootstrap, JQuery, dan DataTables
Kode 
``` html
<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- JQuery -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- DataTables -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
```
- Bootstrap digunakan untuk memberi kesan yang berbeda pada tampilan halaman.
- JQuery digunakan untuk mempermudah dalam memanipulasi DOM.
- DataTables digunakan untuk memberikan fitur tabel seperti search, pagination, dan sorting.

#### Form Input Produk
Kode 
``` html
<form id="formProduk">

<input type="hidden" id="editIndex">

<div class="mb-3">
<label class="form-label">Nama Produk</label>
<input type="text" id="namaProduk" class="form-control" required>
</div>

<div class="mb-3">
<label class="form-label">Kategori</label>
<input type="text" id="kategoriProduk" class="form-control" required>
</div>

<div class="mb-3">
<label class="form-label">Harga</label>
<input type="number" id="hargaProduk" class="form-control" required>
</div>

<button class="btn btn-success w-100">
<i class="bi bi-save"></i> Simpan Produk
</button>

</form>
```
Form ini digunakan untuk menerima inputan data produk dari user yang terdiri dari :
- Nama Produk
- Kategroi
- Harga
Data yang sudah dimasukkan akan diproses dengan meenggunakan JavaScript dan JQuery untuk ditampilkan pada tabel

#### Tabel Data Produk
Kode 
``` html
<table id="tabelProduk" class="table table-striped">

<thead class="table-success">
<tr>
<th>No</th>
<th>Produk</th>
<th>Kategori</th>
<th>Harga</th>
<th>Aksi</th>
</tr>
</thead>

<tbody></tbody>

</table>
```
Tabel ini menampilkan informasi produk seperti :
- Nomor
- Nama Produk
- Kategori
- Harga
- Aksi (Edit dan Hapus)
Tabel ini menggunakan JQuery DataTables sehingga memiliki fitur search dan pagination

#### Penyimpanan Data Menggunakan Mapping Object
Kode 
``` JavaScript
let produkList = [];
```
Array produkList digunakan untuk menyimpan data produk untuk sementara pada laman browser

#### Menambahkan dan Mengupdate Data (Create & Update)
Kode 
``` JavaScript
$("#formProduk").submit(function (e) {

e.preventDefault();

let produk = {
nama: $("#namaProduk").val(),
kategori: $("#kategoriProduk").val(),
harga: $("#hargaProduk").val()
};

produkList.push(produk);

renderTable();
$("#formProduk")[0].reset();

});
```
Saat kita mengklik tombol Simpan Produk maka :
- Data dari form diambil menggunakan JQuery.
- Data dimasukkan ke dalam object produk.
- Object tersebut disimpan ke dalam array produkList.
- Tabel diperbarui dengan fungsi renderTable().

#### Menampilkan Data pada Tabel (Read)
Kode 
``` JavaScript
function renderTable() {

table.clear();

produkList.forEach((item, index) => {

table.row.add([
index + 1,
item.nama,
item.kategori,
formatRupiah(item.harga),
`
<button class="btn btn-danger btn-sm" onclick="hapusData(${index})">
Hapus
</button>
`
]);

});

table.draw();

}
```
Beberapa fungsi dari renderTable() yaitu :
- Mengambil data produk yang ada pada array produkList
- Menampilkan data tersebut kedalam tabel
- Menggunakan DataTables untuk memperbarui tampilan tabel

#### Menghapus Data Produk (Delete)
Kode 
``` JavaScript
function hapusData(index) {

if (confirm("Yakin ingin menghapus produk ini?")) {

produkList.splice(index, 1);

renderTable();

}

}
```
Fungsi ini digunakan untuk menghapus data produk berdasarkan index pada array. Setelah data dihapus, maka tabel akan diperbarui kembali.

#### Inisialisasi JQuery DataTables
Kode 
``` JavaScript
let table = $('#tabelProduk').DataTable();
```
Kode ini digunakan untuk mengaktifkan DataTables pada tabel produk sehingga tabel memiliki fitur :
- Searching
- Pagination
- Sorting Data


