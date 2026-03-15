$(document).ready(function () {
    let table = $('#tabelProduk').DataTable({
        language: {
            search: "Cari:",
            lengthMenu: "Tampilkan _MENU_ data",
            info: "Menampilkan _START_ sampai _END_ dari _TOTAL_ produk",
            paginate: { next: "Lanjut", previous: "Kembali" },
            emptyTable: "Belum ada produk yang ditambahkan."
        }
    });

    let produkMap = {};
    let counter = 1;

    $('#formProduk').on('submit', function (e) {
        e.preventDefault();

        let editId = $('#editId').val();
        let nama = $('#namaProduk').val();
        let kategori = $('#kategori').val();
        let harga = $('#harga').val();
        let hargaFormat = `Rp ${parseInt(harga).toLocaleString('id-ID')}`;

        let aksiButtons = function (idTarget) {
            return `
            <button type="button" class="btn btn-warning btn-sm me-1 text-dark" onclick="editProduk(${idTarget})">Edit</button>
            <button type="button" class="btn btn-danger btn-sm" onclick="hapusProduk(${idTarget}, this)">Hapus</button>
        `;
        };

        if (editId === "") {
            let id = counter++;
            produkMap[id] = { id, nama, kategori, harga };

            let rowNode = table.row.add([
                id, nama, kategori, hargaFormat, aksiButtons(id)
            ]).draw(false).node();
            $(rowNode).attr('id', 'row-' + id);

        } else {
            produkMap[editId] = { id: parseInt(editId), nama, kategori, harga };

            table.row('#row-' + editId).data([
                editId, nama, kategori, hargaFormat, aksiButtons(editId)
            ]).draw(false);

            batalEdit();
            alert("Data berhasil diperbarui!"); 
        }

        if (editId === "") this.reset();
    });

    window.editProduk = function (id) {
        let data = produkMap[id];

        $('#editId').val(data.id);
        $('#namaProduk').val(data.nama);
        $('#kategori').val(data.kategori);
        $('#harga').val(data.harga);

        $('#formTitle').text("Edit Produk (ID: " + data.id + ")").removeClass('bg-primary').addClass('bg-warning text-dark');
        $('#btnSubmit').text("Update").removeClass('btn-success').addClass('btn-warning text-dark');
        $('#btnCancel').removeClass('d-none');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.batalEdit = function () {
        $('#formProduk')[0].reset();
        $('#editId').val('');
        $('#formTitle').text("Input Produk Baru").removeClass('bg-warning text-dark').addClass('bg-primary text-white');
        $('#btnSubmit').text("Simpan").removeClass('btn-warning text-dark').addClass('btn-success');
        $('#btnCancel').addClass('d-none');
    };

    window.hapusProduk = function (id, btn) {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            delete produkMap[id];
            table.row($(btn).parents('tr')).remove().draw();
            if ($('#editId').val() == id) batalEdit();
        }
    };
});