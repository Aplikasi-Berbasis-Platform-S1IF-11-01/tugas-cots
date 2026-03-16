let produkList = JSON.parse(localStorage.getItem("produkList")) || [
{
nama:"Laptop",
kategori:"Elektronik",
harga:8000000
},
{
nama:"Mouse",
kategori:"Aksesoris",
harga:150000
}
];

let editIndex = -1;

let table = $('#tabelProduk').DataTable();

renderTable();

function simpanLocal(){

localStorage.setItem("produkList", JSON.stringify(produkList));

}

$("#formProduk").submit(function(e){

e.preventDefault();

let produk = {
nama:$("#namaProduk").val(),
kategori:$("#kategori").val(),
harga:$("#harga").val()
};

produkList.push(produk);

simpanLocal();

renderTable();

$("#formProduk")[0].reset();

});

function renderTable(){

table.clear();

produkList.forEach((p,index)=>{

table.row.add([
index+1,
p.nama,
p.kategori,
"Rp "+Number(p.harga).toLocaleString(),
`
<button class="btn btn-warning btn-sm" onclick="editData(${index})">Edit</button>
<button class="btn btn-danger btn-sm" onclick="hapusData(${index})">Hapus</button>
`
]).draw(false);

});

}

function editData(index){

editIndex = index;

let produk = produkList[index];

$("#editNama").val(produk.nama);
$("#editKategori").val(produk.kategori);
$("#editHarga").val(produk.harga);

let modal = new bootstrap.Modal(document.getElementById('editModal'));
modal.show();

}

function updateProduk(){

produkList[editIndex] = {
nama:$("#editNama").val(),
kategori:$("#editKategori").val(),
harga:$("#editHarga").val()
};

simpanLocal();

renderTable();

bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();

}

function hapusData(index){

if(confirm("Yakin ingin menghapus data?")){

produkList.splice(index,1);

simpanLocal();

renderTable();

}

}