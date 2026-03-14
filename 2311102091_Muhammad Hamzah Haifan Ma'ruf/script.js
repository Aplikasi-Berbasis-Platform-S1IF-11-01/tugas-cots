let productMap = {};
let dataTable = null;

const productForm = document.getElementById("productForm");
const editId = document.getElementById("editId");
const namaProduk = document.getElementById("namaProduk");
const kategori = document.getElementById("kategori");
const harga = document.getElementById("harga");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const tableBody = document.querySelector("#productTable tbody");

function formatRupiah(number) {
  return "Rp " + Number(number).toLocaleString("id-ID");
}

function generateId() {
  return "PRD-" + Date.now();
}

function resetForm() {
  productForm.reset();
  editId.value = "";
  submitBtn.textContent = "Simpan Produk";
}

function renderTable() {
  const productArray = Object.values(productMap);

  if (dataTable) {
    dataTable.destroy();
  }

  tableBody.innerHTML = "";

  if (productArray.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-secondary">Belum ada data produk.</td>
      </tr>
    `;
  } else {
    productArray.forEach((product, index) => {
      tableBody.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${product.nama}</td>
          <td>${product.kategori}</td>
          <td>${formatRupiah(product.harga)}</td>
          <td>
            <button class="btn btn-edit-action" onclick="editProduct('${product.id}')">Edit</button>
            <button class="btn btn-delete-action" onclick="deleteProduct('${product.id}')">Hapus</button>
          </td>
        </tr>
      `;
    });
  }

  dataTable = $("#productTable").DataTable({
    responsive: true,
    pageLength: 5,
    lengthMenu: [5, 10, 25, 50],
    language: {
      search: "Cari:",
      lengthMenu: "Tampilkan _MENU_ data",
      info: "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
      paginate: {
        first: "Awal",
        last: "Akhir",
        next: "›",
        previous: "‹"
      },
      zeroRecords: "Data tidak ditemukan",
      infoEmpty: "Belum ada data",
      infoFiltered: "(difilter dari _MAX_ total data)"
    }
  });
}

function editProduct(id) {
  const product = productMap[id];
  if (!product) return;

  editId.value = product.id;
  namaProduk.value = product.nama;
  kategori.value = product.kategori;
  harga.value = product.harga;
  submitBtn.textContent = "Update Produk";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function deleteProduct(id) {
  const confirmDelete = confirm("Yakin ingin menghapus data produk ini?");
  if (!confirmDelete) return;

  delete productMap[id];
  renderTable();
  resetForm();
}

productForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = editId.value || generateId();

  productMap[id] = {
    id: id,
    nama: namaProduk.value.trim(),
    kategori: kategori.value,
    harga: harga.value
  };

  renderTable();
  resetForm();
});

resetBtn.addEventListener("click", function () {
  resetForm();
});

productMap = {
  "PRD-1001": {
    id: "PRD-1001",
    nama: "DigiDaw Mouse X1",
    kategori: "Mouse",
    harga: 275000
  },
  "PRD-1002": {
    id: "PRD-1002",
    nama: "DigiDaw Keyboard K87",
    kategori: "Keyboard",
    harga: 450000
  },
  "PRD-1003": {
    id: "PRD-1003",
    nama: "DigiDaw Monitor Vision 24",
    kategori: "Monitor",
    harga: 1850000
  }
};

renderTable();