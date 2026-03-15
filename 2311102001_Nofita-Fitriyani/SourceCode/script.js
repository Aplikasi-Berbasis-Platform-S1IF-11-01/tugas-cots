let dataProduk = [
  {
    nama: "Buku Tulis",
    kategori: "Alat Tulis",
    harga: 5000
  },
  {
    nama: "Pulpen",
    kategori: "Alat Tulis",
    harga: 3000
  }
];

let tabelData;

$(document).ready(function () {
  tampilkanDataKeTabel();

  tabelData = $("#tabelProduk").DataTable({
    pageLength: 5,
    lengthMenu: [5, 10, 25, 50],
    language: {
      search: "Cari:",
      lengthMenu: "Tampilkan _MENU_ data",
      info: "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
      paginate: {
        first: "Awal",
        last: "Akhir",
        next: "Next",
        previous: "Prev"
      },
      zeroRecords: "Data tidak ditemukan",
      infoEmpty: "Belum ada data",
      infoFiltered: "(disaring dari _MAX_ total data)"
    }
  });

  $("#formProduk").on("submit", function (e) {
    e.preventDefault();
    simpanProduk();
  });

  $("#tombolReset").on("click", function () {
    resetForm();
  });
});

function simpanProduk() {
  let namaProduk = $("#namaProduk").val().trim();
  let kategoriProduk = $("#kategoriProduk").val().trim();
  let hargaProduk = $("#hargaProduk").val().trim();
  let indexEdit = $("#indexEdit").val();

  if (namaProduk === "" || kategoriProduk === "" || hargaProduk === "") {
    alert("Semua field harus diisi!");
    return;
  }

  let objekProduk = {
    nama: namaProduk,
    kategori: kategoriProduk,
    harga: parseInt(hargaProduk)
  };

  if (indexEdit == -1) {
    dataProduk.push(objekProduk);
    alert("Data berhasil ditambahkan.");
  } else {
    dataProduk[indexEdit] = objekProduk;
    alert("Data berhasil diupdate.");
  }

  tampilkanUlangDataTable();
  resetForm();
}

function tampilkanDataKeTabel() {
  let isiTabel = "";

  dataProduk.forEach(function (produk, index) {
    isiTabel += `
      <tr>
        <td>${index + 1}</td>
        <td>${produk.nama}</td>
        <td>${produk.kategori}</td>
        <td>Rp ${produk.harga.toLocaleString("id-ID")}</td>
        <td>
          <button class="btn btn-warning btn-sm btn-aksi" onclick="editProduk(${index})">
            Edit
          </button>
          <button class="btn btn-danger btn-sm" onclick="hapusProduk(${index})">
            Hapus
          </button>
        </td>
      </tr>
    `;
  });

  $("#tabelProduk tbody").html(isiTabel);
}

function tampilkanUlangDataTable() {
  tabelData.destroy();
  tampilkanDataKeTabel();

  tabelData = $("#tabelProduk").DataTable({
    pageLength: 5,
    lengthMenu: [5, 10, 25, 50],
    language: {
      search: "Cari:",
      lengthMenu: "Tampilkan _MENU_ data",
      info: "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
      paginate: {
        first: "Awal",
        last: "Akhir",
        next: "Next",
        previous: "Prev"
      },
      zeroRecords: "Data tidak ditemukan",
      infoEmpty: "Belum ada data",
      infoFiltered: "(disaring dari _MAX_ total data)"
    }
  });
}

function editProduk(index) {
  let produk = dataProduk[index];

  $("#namaProduk").val(produk.nama);
  $("#kategoriProduk").val(produk.kategori);
  $("#hargaProduk").val(produk.harga);
  $("#indexEdit").val(index);

  $("#tombolSimpan").text("Update");
}

function hapusProduk(index) {
  let konfirmasi = confirm("Yakin ingin menghapus data ini?");

  if (konfirmasi) {
    dataProduk.splice(index, 1);
    tampilkanUlangDataTable();
    resetForm();
    alert("Data berhasil dihapus.");
  }
}

function resetForm() {
  $("#formProduk")[0].reset();
  $("#indexEdit").val(-1);
  $("#tombolSimpan").text("Simpan");
}