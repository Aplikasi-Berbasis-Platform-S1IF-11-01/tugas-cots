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