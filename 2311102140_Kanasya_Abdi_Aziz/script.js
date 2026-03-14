$(document).ready(function() {
    // 1. Inisialisasi DataTable
    let table = $('#productTable').DataTable({
        language: { url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/id.json' }
    });

    // 2. Database Sederhana (Mapping Object)
    let productDatabase = {};

    // 3. Fungsi Render Tabel
    function updateTable() {
        table.clear();
        let counter = 1;

        for (let id in productDatabase) {
            let item = productDatabase[id];
            let formattedHarga = new Intl.NumberFormat('id-ID').format(item.harga);

            table.row.add([
                counter++,
                item.nama,
                `<span class="badge bg-info text-dark">${item.kategori}</span>`,
                `Rp ${formattedHarga}`,
                `<div class="btn-group">
                    <button class="btn btn-warning btn-sm" onclick="editProduct('${id}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct('${id}')">Hapus</button>
                </div>`
            ]).draw(false);
        }
    }

    // 4. Handle Simpan (Create & Update)
    $('#productForm').on('submit', function(e) {
        e.preventDefault();

        const id = $('#productId').val(); // Ambil ID hidden
        const nama = $('#nama').val();
        const kategori = $('#kategori').val();
        const harga = $('#harga').val();

        if (id) {
            // MODE UPDATE: Jika ID ada, timpa data lama
            productDatabase[id] = { nama, kategori, harga };
            alert("Data berhasil diperbarui!");
        } else {
            // MODE CREATE: Jika ID kosong, buat ID baru
            const newId = 'PROD-' + Date.now();
            productDatabase[newId] = { nama, kategori, harga };
        }

        // Reset Form & Tombol
        resetForm();
        updateTable();
    });

    // 5. Fungsi Ambil Data ke Form (Edit)
    window.editProduct = function(id) {
        const item = productDatabase[id];
        
        // Isi form dengan data lama
        $('#productId').val(id);
        $('#nama').val(item.nama);
        $('#kategori').val(item.kategori);
        $('#harga').val(item.harga);

        // Ubah tampilan tombol
        $('#submitBtn').text('Update Data').removeClass('btn-success').addClass('btn-warning');
        $('#nama').focus();
    };

    // 6. Fungsi Hapus (Delete)
    window.deleteProduct = function(id) {
        if (confirm("Hapus produk ini?")) {
            delete productDatabase[id];
            updateTable();
        }
    };

    // Fungsi Reset Form
    function resetForm() {
        $('#productForm')[0].reset();
        $('#productId').val(''); // Kosongkan ID hidden
        $('#submitBtn').text('Simpan').removeClass('btn-warning').addClass('btn-success');
    }
});