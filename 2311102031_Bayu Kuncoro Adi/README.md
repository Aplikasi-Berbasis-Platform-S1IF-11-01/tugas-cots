<div align="center">
  <br />
  <h1>LAPORAN PRAKTIKUM <br>APLIKASI BERBASIS PLATFORM</h1>
  <br />
  <h3>DATA PRODUK <br> Bootstrap, jQuery DataTables & JavaScript</h3>
  <br />
  <br />
 <img src="Telkom.png" alt ="logo" width = "300"> 
  <br />
  <br />
  <h3>Disusun Oleh :</h3>
  <p>
    <strong>Bayu Kuncoro Adi</strong><br>
    <strong>2311102031</strong><br>
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

**CRUD (Create, Read, Update, Delete)** adalah empat operasi dasar yang digunakan untuk mengelola data dalam sebuah aplikasi. Dalam pengembangan aplikasi web, konsep CRUD memungkinkan pengguna untuk menambahkan data baru, menampilkan data yang sudah ada, memperbarui data, serta menghapus data secara dinamis. Proses pengelolaan data ini juga dapat dilakukan pada sisi klien (*client-side*) dengan memanfaatkan JavaScript, sehingga beberapa interaksi dapat dijalankan tanpa harus selalu berkomunikasi langsung dengan server.

**Bootstrap** merupakan sebuah *framework* CSS yang bersifat **open-source** dan menyediakan berbagai komponen antarmuka yang siap digunakan, seperti formulir, tombol, modal, serta sistem tata letak berbasis grid yang responsif. Dengan tersedianya banyak kelas utilitas yang telah terstandarisasi, Bootstrap membantu pengembang mempercepat proses pembuatan tampilan antarmuka website tanpa perlu menulis seluruh kode CSS dari awal.

**jQuery DataTables** adalah plugin yang dikembangkan menggunakan jQuery dan digunakan untuk meningkatkan fungsionalitas elemen `<table>` pada HTML. Plugin ini memungkinkan tabel memiliki fitur tambahan seperti pencarian data (*search*), pengurutan data berdasarkan kolom (*sorting*), serta pembagian halaman (*pagination*) secara otomatis. Seluruh fitur tersebut dapat diaktifkan hanya dengan melakukan proses inisialisasi sederhana.

**Object Mapping** merupakan teknik penyimpanan data dalam JavaScript yang memanfaatkan struktur objek. Pada metode ini, setiap data disimpan sebagai pasangan **key** dan **value**, di mana *key* berfungsi sebagai identitas unik untuk mengakses data tersebut. Sebagai contoh struktur `{ "p1": { id, nama, kategori, harga } }`. Pendekatan ini mempermudah proses pengambilan, pembaruan, maupun penghapusan data karena dapat dilakukan secara langsung dengan kompleksitas waktu yang sangat efisien, yaitu **O(1)**.

---

## 2. Penjelasan Kode HTML, CSS, dan JS


---

### Kode HTML (`index.html`)

```html
<!DOCTYPE html>
<html lang="id">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Camera Catalog - Bayu Kuncoro</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<link rel="stylesheet"
href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">

<link rel="stylesheet" href="style.css">

</head>

<body>

<div class="container py-4">

<!-- HEADER -->
<div class="header-box text-center mb-4">

<h1>📷 Camera Product Catalog</h1>
<p>Product Management - Bayu Kuncoro Adi</p>
<p>2311102031</p>

</div>


<!-- FORM -->

<div class="card form-box mb-4">

<div class="card-body">

<h5 class="mb-3">Tambah Produk</h5>

<form id="productForm">

<input type="hidden" id="productId">

<div class="row g-2">

<div class="col-md-4">
<input type="text"
class="form-control"
placeholder="Nama Produk"
id="namaProduk"
required>
</div>

<div class="col-md-4">
<input type="text"
class="form-control"
placeholder="Kategori"
id="kategoriProduk"
required>
</div>

<div class="col-md-4">
<input type="number"
class="form-control"
placeholder="Harga"
id="hargaProduk"
required>
</div>

</div>

<div class="mt-3">

<button class="btn btn-primary" id="submitBtn">
Tambah Produk
</button>

<button type="button"
class="btn btn-secondary"
id="cancelEditBtn"
style="display:none">

Batal Edit

</button>

</div>

</form>

</div>

</div>



<!-- KATALOG PRODUK -->

<h4 class="mb-3">Katalog Produk</h4>

<div class="row g-3" id="catalog"></div>



<!-- TABEL -->

<h4 class="mt-4 mb-3">Database Produk</h4>

<table id="productTable"
class="table table-striped">

<thead>

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



<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>

<script src="script.js"></script>

</body>
</html>
```

---

### Kode CSS (`style.css`)

```css
body{

background: linear-gradient(135deg,#a5f3fc,#f0f9ff,#fef9c3);

font-family:'Segoe UI';

}


/* HEADER */

.header-box{

background:white;

padding:20px;

border-radius:12px;

box-shadow:0 6px 15px rgba(0,0,0,0.1);

}

.header-box h1{

font-weight:bold;

color:#2563eb;

}


/* FORM */

.form-box{

border:none;

border-radius:12px;

box-shadow:0 6px 15px rgba(0,0,0,0.08);

}

.form-control{

border-radius:8px;

}


/* CATALOG */

.catalog-card{

background:white;

padding:18px;

border-radius:12px;

box-shadow:0 5px 12px rgba(0,0,0,0.1);

transition:all 0.25s;

}

.catalog-card:hover{

transform:translateY(-6px) scale(1.03);

box-shadow:0 10px 20px rgba(0,0,0,0.15);

}

.catalog-title{

font-weight:bold;

font-size:16px;

color:#1e293b;

}

.catalog-category{

font-size:13px;

color:#64748b;

}

.catalog-price{

font-size:15px;

color:#0284c7;

font-weight:600;

margin-top:5px;

}


/* BUTTON */

.btn{

border-radius:8px;

}


/* TABLE */

table{

background:white;

border-radius:10px;

overflow:hidden;

}

thead{

background:#2563eb;

color:white;

}
```

---

### Kode JavaScript (`script.js`)

```javascript
let products = {};
let counter = 1;
let table;

$(document).ready(function(){

table = $("#productTable").DataTable({
pageLength:5
});

loadData();
renderTable();
renderCatalog();

$("#productForm").submit(function(e){

e.preventDefault();

let id=$("#productId").val();
let nama=$("#namaProduk").val();
let kategori=$("#kategoriProduk").val();
let harga=$("#hargaProduk").val();

if(id){
updateProduct(id,nama,kategori,harga);
}else{
createProduct(nama,kategori,harga);
}

saveData();
renderTable();
renderCatalog();
resetForm();

});

$("#cancelEditBtn").click(function(){
resetForm();
});

});


function createProduct(nama,kategori,harga){

let id="p"+counter++;

products[id]={
id:id,
nama:nama,
kategori:kategori,
harga:parseInt(harga)
};

}


function updateProduct(id,nama,kategori,harga){

products[id].nama=nama;
products[id].kategori=kategori;
products[id].harga=parseInt(harga);

}


function deleteProduct(id){

if(confirm("Hapus produk?")){

delete products[id];

saveData();
renderTable();
renderCatalog();

}

}


function editProduct(id){

let p=products[id];

$("#productId").val(p.id);
$("#namaProduk").val(p.nama);
$("#kategoriProduk").val(p.kategori);
$("#hargaProduk").val(p.harga);

$("#submitBtn").text("Update Produk");
$("#cancelEditBtn").show();

}


function renderTable(){

table.clear();

let list=Object.values(products);

list.forEach((p,index)=>{

table.row.add([

index+1,

p.nama,

p.kategori,

"Rp "+Number(p.harga).toLocaleString("id-ID"),

`
<button class="btn btn-warning btn-sm"
onclick="editProduct('${p.id}')">Edit</button>

<button class="btn btn-danger btn-sm"
onclick="deleteProduct('${p.id}')">Hapus</button>
`

]);

});

table.draw();

}


function renderCatalog(){

let html="";
let list=Object.values(products);

list.forEach(p=>{

html+=`

<div class="col-md-3">

<div class="catalog-card">

<div class="catalog-title">${p.nama}</div>

<div class="catalog-category">${p.kategori}</div>

<div class="catalog-price">
Rp ${Number(p.harga).toLocaleString("id-ID")}
</div>

</div>

</div>

`;

});

$("#catalog").html(html);

}


function resetForm(){

$("#productForm")[0].reset();
$("#productId").val("");

$("#submitBtn").text("Tambah Produk");
$("#cancelEditBtn").hide();

}


function saveData(){

localStorage.setItem(
"products",
JSON.stringify(products)
);

}


function loadData(){

let data=localStorage.getItem("products");

if(data){

products=JSON.parse(data);

counter=Object.keys(products).length+1;

}

}
```

---

### Hasil Tampilan (Screenshot)

#### 1. Tampilan Awal Halaman

![Tampilan Awal Web]
<img src="tampilan awal.png" alt="Foto Produk">

#### 2. Input Data & Data Berhasil Ditambahkan

![Form Input Produk]
<img src="tambah produk.png" alt="Foto Produk">

![Data Berhasil Ditambahkan]
<img src="tambah produk.png" alt="Foto Produk">

#### 3. Fitur Pencarian (Search)

![Fitur Searching]
<img src="search produk.png" alt="Foto Produk">

#### 4. Edit Data

![Edit Data Produk]
<img src="edit produk.png" alt="Foto Produk">

#### 5. Hapus Data

![Hapus Data Produk]
<img src="hapus produk.png" alt="Foto Produk">

---

### Penjelasan Kode

#### 1. HTML (`index.html`)

File index.html merupakan struktur utama dari halaman web yang digunakan untuk menampilkan antarmuka sistem CRUD produk. Pada bagian awal terdapat deklarasi <!DOCTYPE html> yang menandakan bahwa dokumen menggunakan standar HTML5. Selanjutnya tag <html lang="id"> menunjukkan bahwa bahasa utama yang digunakan pada halaman adalah Bahasa Indonesia. Pada bagian <head> terdapat beberapa elemen penting seperti <meta charset="UTF-8"> yang berfungsi untuk mengatur sistem pengkodean karakter agar berbagai simbol dan huruf dapat ditampilkan dengan benar, serta <meta name="viewport"> yang berfungsi agar halaman dapat tampil secara responsif pada berbagai perangkat seperti komputer, tablet, maupun smartphone. Selain itu terdapat tag <title> yang menentukan judul halaman yaitu CRUD Products Bayu Kuncoro Adi. Pada bagian ini juga dimuat Bootstrap CSS melalui CDN untuk mempermudah pembuatan tampilan antarmuka serta DataTables CSS yang digunakan untuk menambahkan fitur interaktif pada tabel seperti pencarian, pengurutan data, dan pagination. File CSS eksternal style.css juga dimuat untuk memberikan tambahan tampilan visual khusus pada halaman.

Pada bagian <body> terdapat beberapa komponen utama. Pertama adalah header section yang berisi judul halaman CRUD Products, nama pembuat yaitu Bayu Kuncoro Adi, serta NIM 2311102031. Bagian ini berfungsi sebagai identitas halaman sekaligus informasi pembuat program. Selanjutnya terdapat bagian statistik produk yang terdiri dari tiga kotak informasi yang menampilkan jumlah total produk, jumlah kategori yang tersedia, serta total nilai harga dari seluruh produk. Informasi ini ditampilkan secara dinamis menggunakan JavaScript. Setelah itu terdapat layout utama halaman yang menggunakan sistem grid Bootstrap dengan dua kolom. Kolom pertama berisi form input produk yang digunakan untuk menambahkan maupun memperbarui data produk. Form ini memiliki beberapa field seperti nama produk, kategori produk, dan harga produk. Selain itu terdapat tombol Tambah Produk untuk menyimpan data serta tombol Batal Edit yang akan muncul ketika pengguna sedang mengedit data. Kolom kedua berisi tabel data produk yang menampilkan daftar produk yang telah dimasukkan. Tabel ini memiliki kolom nomor, nama produk, kategori, harga, serta aksi yang berisi tombol Edit dan Hapus. Pada bagian akhir dokumen dimuat beberapa file JavaScript eksternal seperti jQuery, DataTables, serta file script.js yang berfungsi untuk mengatur logika program dan interaksi pengguna.

---

#### 2. CSS (`style.css`)

File style.css berfungsi untuk mengatur tampilan visual halaman agar terlihat lebih menarik, modern, dan tidak kaku. Pada bagian awal terdapat pengaturan untuk elemen body yang menggunakan properti background: linear-gradient(...) sehingga menghasilkan latar belakang berupa gradasi warna biru muda hingga putih yang memberikan kesan bersih dan profesional. Selain itu digunakan properti font-family: 'Segoe UI' untuk memberikan tampilan teks yang lebih modern dan mudah dibaca. Selanjutnya terdapat pengaturan untuk elemen .header-box yang digunakan sebagai wadah judul halaman. Elemen ini diberi warna latar putih, padding, sudut melengkung menggunakan border-radius, serta efek bayangan menggunakan box-shadow sehingga terlihat seperti kartu informasi yang menonjol dari latar belakang.

Bagian berikutnya mengatur tampilan statistik produk melalui selector .stat-card. Elemen ini diberi padding, sudut melengkung, serta efek bayangan agar terlihat seperti kartu dashboard yang modern. Selain itu terdapat pengaturan untuk elemen .card yang digunakan sebagai wadah form dan tabel. Card diberi border-radius agar sudutnya terlihat lebih halus sehingga tampilan halaman tidak terlihat kaku. Pada bagian berikutnya terdapat pengaturan untuk elemen tombol menggunakan selector .btn yang diberi border-radius agar tombol terlihat lebih modern dan nyaman digunakan. Terakhir terdapat pengaturan untuk tabel yang digunakan untuk menampilkan data produk. Ukuran font pada tabel dibuat sedikit lebih kecil agar data dapat ditampilkan dengan rapi dan mudah dibaca. Dengan adanya file CSS ini, tampilan halaman menjadi lebih estetis dan memberikan pengalaman pengguna yang lebih baik.
---

#### 3. JavaScript (`script.js`)

File script.js merupakan bagian yang mengatur logika utama dari sistem CRUD produk serta interaksi pengguna pada halaman web. Pada bagian awal dideklarasikan beberapa variabel global seperti products, counter, dan table. Variabel products digunakan untuk menyimpan seluruh data produk dalam bentuk object mapping, di mana setiap produk memiliki key unik seperti p1, p2, dan seterusnya. Variabel counter digunakan untuk menghasilkan ID produk secara otomatis setiap kali data baru ditambahkan, sedangkan variabel table digunakan untuk menyimpan objek DataTables yang mengatur tampilan tabel.

Ketika halaman selesai dimuat, fungsi $(document).ready() akan dijalankan. Pada bagian ini dilakukan proses inisialisasi DataTables agar tabel memiliki fitur seperti pencarian data, pengurutan kolom, serta pagination. Selain itu juga dijalankan fungsi loadData() untuk mengambil data produk yang sebelumnya telah disimpan di LocalStorage, sehingga data tetap tersimpan meskipun halaman di-refresh. Setelah itu fungsi renderTable() dipanggil untuk menampilkan data produk ke dalam tabel, serta fungsi updateStats() untuk memperbarui informasi statistik seperti jumlah produk, jumlah kategori, dan total nilai harga produk.

Program ini memiliki beberapa fungsi utama yang merepresentasikan konsep CRUD. Fungsi createProduct() digunakan untuk menambahkan data produk baru ke dalam object products. Fungsi updateProduct() digunakan untuk memperbarui data produk yang sudah ada ketika pengguna melakukan proses edit. Fungsi deleteProduct() digunakan untuk menghapus data produk dari object dan kemudian memperbarui tampilan tabel. Fungsi editProduct() digunakan untuk mengambil data produk tertentu dan menampilkannya kembali pada form agar pengguna dapat melakukan perubahan. Selain itu terdapat fungsi renderTable() yang bertugas menampilkan seluruh data produk ke dalam tabel DataTables secara dinamis. Fungsi ini juga menambahkan tombol Edit dan Hapus pada setiap baris data.

Selain fungsi CRUD, program ini juga memiliki fitur tambahan seperti updateStats() yang digunakan untuk menghitung jumlah total produk, jumlah kategori unik, serta total nilai harga produk. Perhitungan ini dilakukan menggunakan metode array seperti map(), reduce(), dan Set. Program juga memiliki fungsi saveData() dan loadData() yang digunakan untuk menyimpan dan mengambil data dari LocalStorage sehingga data tidak hilang ketika halaman dimuat ulang. Dengan adanya file JavaScript ini, halaman web tidak hanya menampilkan informasi statis, tetapi juga mampu mengelola data produk secara dinamis dan interaktif sesuai dengan konsep CRUD.
---

## 3. Referensi

- [Data Table](https://editor.datatables.net/examples/simple/simple?utm)
- [CRUD](https://roytuts.com/bootstrap-datatable-crud-using-codeigniter-mysql-ajax/?utm)
- [Bootstrap Icons](https://roytuts.com/bootstrap-datatable-crud-using-codeigniter-mysql-ajax/)