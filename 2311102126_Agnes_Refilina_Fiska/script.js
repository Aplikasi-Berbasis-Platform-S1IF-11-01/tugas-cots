let dbProduk = {};
let table;

$(document).ready(function() {
    // Inisialisasi DataTables
    table = $('#tabelProduk').DataTable({
        "pageLength": 5,
        "dom": '<"d-flex justify-content-between align-items-center mb-3"f>rt<"d-flex justify-content-between align-items-center mt-3"ip>',
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Cari produk...",
            "paginate": { "next": "→", "previous": "←" }
        }
    });

    // Handle Submit Form
    $('#formProduk').on('submit', function(e) {
        e.preventDefault();
        
        // Mapping Object logic
        const id = $('#produkId').val() || "ID-" + Date.now();
        
        dbProduk[id] = {
            id: id,
            nama: $('#namaProduk').val(),
            kategori: $('#kategori').val(),
            harga: parseFloat($('#harga').val())
        };

        refreshUI();
        resetForm();
    });
});

// Fungsi untuk update Tabel dan Widget Statistik
function refreshUI() {
    table.clear();
    let totalAsset = 0;
    let categories = new Set();
    let count = 1;

    Object.values(dbProduk).forEach(p => {
        totalAsset += p.harga;
        categories.add(p.kategori);

        const rp = new Intl.NumberFormat('id-ID', { 
            style: 'currency', 
            currency: 'IDR', 
            minimumFractionDigits: 0 
        }).format(p.harga);

        table.row.add([
            count++,
            `<span class="fw-bold">${p.nama}</span>`,
            `<span class="badge badge-kategori">${p.kategori}</span>`,
            `<span class="text-dark fw-medium">${rp}</span>`,
            `<div class="text-center">
                <button class="btn btn-sm btn-light text-warning me-1" onclick="editData('${p.id}')" title="Edit"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-sm btn-light text-danger" onclick="hapusData('${p.id}')" title="Hapus"><i class="bi bi-trash"></i></button>
            </div>`
        ]);
    });

    table.draw();
    
    // Update Statistik Widgets
    $('#statTotal').text(Object.keys(dbProduk).length);
    $('#statKategori').text(categories.size);
    $('#statAsset').text(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalAsset));
}

// Fungsi Hapus
function hapusData(id) {
    if(confirm('Hapus item ini dari inventaris?')) {
        delete dbProduk[id];
        refreshUI();
    }
}

// Fungsi Edit
function editData(id) {
    const p = dbProduk[id];
    $('#produkId').val(p.id);
    $('#namaProduk').val(p.nama);
    $('#kategori').val(p.kategori);
    $('#harga').val(p.harga);

    $('#formHeader').text('Edit Produk');
    $('#btnSimpan').html('<i class="bi bi-check2-circle me-2"></i>Perbarui Data').removeClass('btn-primary').addClass('btn-success');
    $('#btnBatal').removeClass('d-none');
}

// Fungsi Reset
function resetForm() {
    $('#formProduk')[0].reset();
    $('#produkId').val('');
    $('#formHeader').text('Input Produk');
    $('#btnSimpan').html('<i class="bi bi-save me-2"></i>Simpan Produk').removeClass('btn-success').addClass('btn-primary');
    $('#btnBatal').addClass('d-none');
}