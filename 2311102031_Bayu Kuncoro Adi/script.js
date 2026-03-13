let products = {};
let counter = 1;
let table;

$(document).ready(function(){

table = $("#productTable").DataTable({
pageLength:5
});

loadData();

renderTable();
updateStats();


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

if(confirm("Yakin hapus produk?")){

delete products[id];

saveData();

renderTable();

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
onclick="editProduct('${p.id}')">

Edit

</button>

<button class="btn btn-danger btn-sm"
onclick="deleteProduct('${p.id}')">

Hapus

</button>
`

]);

});

table.draw();

updateStats();

}


function resetForm(){

$("#productForm")[0].reset();

$("#productId").val("");

$("#submitBtn").text("Tambah Produk");

$("#cancelEditBtn").hide();

}


function updateStats(){

let list=Object.values(products);

$("#totalProduk").text(list.length);

let kategori=[...new Set(list.map(p=>p.kategori))];

$("#totalKategori").text(kategori.length);

let total=list.reduce((sum,p)=>sum+p.harga,0);

$("#totalNilai").text(
"Rp "+Number(total).toLocaleString("id-ID")
);

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