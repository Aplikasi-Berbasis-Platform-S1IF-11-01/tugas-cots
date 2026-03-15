let products = {};
let productCounter = 1;
let dataTable;

$(document).ready(function(){

dataTable = $("#productTable").DataTable({
pageLength:5
});

renderTable();

$("#productForm").on("submit",function(e){

e.preventDefault();

const id = $("#productId").val();
const nama = $("#namaProduk").val().trim();
const kategori = $("#kategoriProduk").val().trim();
const harga = $("#hargaProduk").val().trim();

if(!nama || !kategori || !harga){
alert("Semua field harus diisi!");
return;
}

if(id){
updateProduct(id,nama,kategori,harga);
}else{
createProduct(nama,kategori,harga);
}

resetForm();
renderTable();

});

$("#cancelEditBtn").click(function(){
resetForm();
});

});

function createProduct(nama,kategori,harga){

const id = "p"+productCounter++;

products[id] = {
id:id,
nama:nama,
kategori:kategori,
harga:Number(harga)
};

}

function readProducts(){
return Object.values(products);
}

function updateProduct(id,nama,kategori,harga){

if(products[id]){

products[id].nama = nama;
products[id].kategori = kategori;
products[id].harga = Number(harga);

}

}

function deleteProduct(id){

if(confirm("Apakah yakin ingin menghapus data ini?")){

delete products[id];
renderTable();

}

}

function renderTable(){

dataTable.clear();

const productList = readProducts();

productList.forEach((product,index)=>{

dataTable.row.add([

index+1,
product.nama,
product.kategori,
"Rp "+product.harga.toLocaleString("id-ID"),

`
<button class="btn btn-warning btn-sm me-1" onclick="editProduct('${product.id}')">
Edit
</button>

<button class="btn btn-danger btn-sm" onclick="deleteProduct('${product.id}')">
Hapus
</button>
`

]);

});

dataTable.draw();

}

function editProduct(id){

const product = products[id];

if(product){

$("#productId").val(product.id);
$("#namaProduk").val(product.nama);
$("#kategoriProduk").val(product.kategori);
$("#hargaProduk").val(product.harga);

$("#submitBtn").text("Update Produk");
$("#cancelEditBtn").show();

}

}

function resetForm(){

$("#productForm")[0].reset();
$("#productId").val("");

$("#submitBtn").text("Tambah Produk");
$("#cancelEditBtn").hide();

}