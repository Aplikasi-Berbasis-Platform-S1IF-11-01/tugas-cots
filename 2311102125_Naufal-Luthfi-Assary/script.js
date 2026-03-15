let products = JSON.parse(localStorage.getItem("products")) || [
  {
    id: 1,
    namaProduk: "iPhone 20 Pro Max",
    kategori: "iPhone",
    harga: 10000000
  },
  {
    id: 2,
    namaProduk: "iPad Pro M2",
    kategori: "iPad",
    harga: 13000000
  }
];

function saveToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

function formatRupiah(angka) {
  return "Rp " + Number(angka).toLocaleString("id-ID");
}

function showToast(message, type = "success") {
  $("#toastMessage").text(message);

  const toastIcon = $("#toastIcon");
  const toastTitle = $("#toastTitle");

  toastIcon.removeClass("toast-success toast-edit toast-delete");

  if (type === "success") {
    toastIcon.text("✓");
    toastIcon.addClass("toast-success");
    toastTitle.text("Berhasil Ditambahkan");
  } else if (type === "edit") {
    toastIcon.text("✎");
    toastIcon.addClass("toast-edit");
    toastTitle.text("Berhasil Diperbarui");
  } else if (type === "delete") {
    toastIcon.text("🗑");
    toastIcon.addClass("toast-delete");
    toastTitle.text("Berhasil Dihapus");
  } else {
    toastIcon.text("✓");
    toastTitle.text("Notifikasi Sistem");
  }

  const toastElement = document.getElementById("liveToast");
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}

function resetForm() {
  $("#namaProduk").val("");
  $("#kategori").val("");
  $("#harga").val("");
}

function showPage(pageId) {
  $(".page-section").removeClass("active-page");
  $("#" + pageId).addClass("active-page");

  $(".sidebar-menu .menu-item").removeClass("active");
  $(`.sidebar-menu .menu-item[data-page="${pageId}"]`).addClass("active");

  if (pageId === "dashboardPage") {
    updateDashboard();
  }

  if (pageId === "productPage") {
    renderTable();
  }
}

function updateDashboard() {
  $("#totalProduk").text(products.length);

  const kategoriUnik = [...new Set(products.map((item) => item.kategori.toLowerCase()))];
  $("#totalKategori").text(kategoriUnik.length);

  const totalHarga = products.reduce((total, item) => total + Number(item.harga), 0);
  $("#totalHarga").text(formatRupiah(totalHarga));

  const kategoriMap = {};

  products.forEach((item) => {
    const kategoriAsli = item.kategori.trim();
    const key = kategoriAsli.toLowerCase();

    if (!kategoriMap[key]) {
      kategoriMap[key] = {
        nama: kategoriAsli,
        jumlah: 0,
        totalHarga: 0
      };
    }

    kategoriMap[key].jumlah += 1;
    kategoriMap[key].totalHarga += Number(item.harga);
  });

  const tbody = $("#kategoriTableBody");
  tbody.empty();

  const kategoriArray = Object.values(kategoriMap);

  if (kategoriArray.length === 0) {
    tbody.append(`
      <tr>
        <td colspan="5" class="text-center text-muted">Belum ada data kategori</td>
      </tr>
    `);
    return;
  }

  kategoriArray.forEach((item, index) => {
    const rataRata = item.totalHarga / item.jumlah;

    tbody.append(`
      <tr>
        <td>${index + 1}</td>
        <td><span class="category-chip">${item.nama}</span></td>
        <td>${item.jumlah}</td>
        <td>${formatRupiah(item.totalHarga)}</td>
        <td>${formatRupiah(rataRata)}</td>
      </tr>
    `);
  });
}

function renderTable() {
  if (!$("#productTable").length) return;

  if ($.fn.DataTable.isDataTable("#productTable")) {
    $("#productTable").DataTable().destroy();
  }

  const tbody = $("#productTable tbody");
  tbody.empty();

  products.forEach((product, index) => {
    tbody.append(`
      <tr>
        <td>${index + 1}</td>
        <td>${product.namaProduk}</td>
        <td>${product.kategori}</td>
        <td>${formatRupiah(product.harga)}</td>
        <td>
          <button class="btn-aksi btn-edit" onclick="editProduct(${product.id})">Edit</button>
          <button class="btn-aksi btn-hapus" onclick="deleteProduct(${product.id})">Hapus</button>
        </td>
      </tr>
    `);
  });

  $("#productTable").DataTable({
    pageLength: 5,
    lengthMenu: [[5, 10, 25, 50], [5, 10, 25, 50]],
    language: {
      search: "Cari:",
      lengthMenu: "Tampilkan _MENU_ data",
      info: "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
      zeroRecords: "Data tidak ditemukan",
      infoEmpty: "Belum ada data",
      infoFiltered: "(difilter dari _MAX_ total data)",
      paginate: {
        first: "Awal",
        last: "Akhir",
        next: ">",
        previous: "<"
      }
    }
  });
}

function addProduct(namaProduk, kategori, harga) {
  products.push({
    id: Date.now(),
    namaProduk,
    kategori,
    harga: Number(harga)
  });

  saveToLocalStorage();
}

function editProduct(id) {
  const product = products.find((item) => item.id === id);
  if (!product) return;

  $("#editProductId").val(product.id);
  $("#editNamaProduk").val(product.namaProduk);
  $("#editKategori").val(product.kategori);
  $("#editHarga").val(product.harga);

  const modal = new bootstrap.Modal(document.getElementById("editProductModal"));
  modal.show();
}

function deleteProduct(id) {
  if (!confirm("Yakin ingin menghapus data ini?")) return;

  products = products.filter((item) => item.id !== id);
  saveToLocalStorage();
  renderTable();
  updateDashboard();
  showToast("Data produk berhasil dihapus", "delete");
}

$(document).ready(function () {
  saveToLocalStorage();
  updateDashboard();
  renderTable();

  $(".sidebar-menu .menu-item").on("click", function (e) {
    e.preventDefault();
    const pageId = $(this).data("page");
    showPage(pageId);
  });

  $("#productForm").on("submit", function (e) {
    e.preventDefault();

    const namaProduk = $("#namaProduk").val().trim();
    const kategori = $("#kategori").val().trim();
    const harga = $("#harga").val().trim();

    if (!namaProduk || !kategori || !harga) {
      alert("Semua field wajib diisi.");
      return;
    }

    addProduct(namaProduk, kategori, harga);
    resetForm();
    updateDashboard();
    showPage("productPage");
    showToast("Data produk berhasil ditambahkan", "success");
  });

  $("#editProductForm").on("submit", function (e) {
    e.preventDefault();

    const id = Number($("#editProductId").val());
    const namaProduk = $("#editNamaProduk").val().trim();
    const kategori = $("#editKategori").val().trim();
    const harga = $("#editHarga").val().trim();

    if (!namaProduk || !kategori || !harga) {
      alert("Semua field wajib diisi.");
      return;
    }

    const index = products.findIndex((item) => item.id === id);

    if (index !== -1) {
      products[index] = {
        id,
        namaProduk,
        kategori,
        harga: Number(harga)
      };

      saveToLocalStorage();
      renderTable();
      updateDashboard();

      const modalElement = document.getElementById("editProductModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();

      showToast("Data produk berhasil diperbarui", "edit");
    }
  });

  $("#btnReset").on("click", function () {
    resetForm();
  });
});