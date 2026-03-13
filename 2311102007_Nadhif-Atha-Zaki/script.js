let products = {};
let productCounter = 1;
let dataTable;

$(document).ready(function () {
  dataTable = $("#productTable").DataTable({
    pageLength: 5,
    lengthMenu: [5, 10, 25, 50],
    language: {
      search: "Cari:",
      lengthMenu: "Tampilkan _MENU_ data",
      info: "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
      paginate: {
        first: "Awal",
        last: "Akhir",
        next: "Selanjutnya",
        previous: "Sebelumnya"
      },
      zeroRecords: "Data tidak ditemukan",
      infoEmpty: "Tidak ada data tersedia",
      infoFiltered: "(disaring dari _MAX_ total data)"
    }
  });

  renderTable();

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

    resetForm();
    renderTable();
  });

  $("#cancelEditBtn").on("click", function () {
    resetForm();
  });
});

function createProduct(nama, kategori, harga) {
  const id = "p" + productCounter++;

  products[id] = {
    id: id,
    nama: nama,
    kategori: kategori,
    harga: parseInt(harga)
  };
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
        <button class="btn btn-warning btn-sm btn-action me-1" onclick="editProduct('${product.id}')">
          Edit
        </button>
        <button class="btn btn-danger btn-sm btn-action" onclick="confirmDelete('${product.id}')">
          Hapus
        </button>
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

    $("#submitBtn").text("Update Produk");
    $("#cancelEditBtn").show();
  }
}

function confirmDelete(id) {
  const yakin = confirm("Apakah Anda yakin ingin menghapus data ini?");
  if (yakin) {
    deleteProduct(id);
  }
}

function resetForm() {
  $("#productForm")[0].reset();
  $("#productId").val("");
  $("#submitBtn").text("Tambah Produk");
  $("#cancelEditBtn").hide();
}