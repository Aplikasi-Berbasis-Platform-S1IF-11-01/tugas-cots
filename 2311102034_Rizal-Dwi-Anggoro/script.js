$(document).ready(function() {
    // --- 1. INISIALISASI DATA ---
    // Mengambil data dari LocalStorage, jika kosong maka buat objek {} baru
    // Kita menggunakan format JSON agar data bisa disimpan sebagai teks permanen
    let jerseyData = JSON.parse(localStorage.getItem('jerseyV3')) || {};

    // --- 2. INISIALISASI DATATABLE (JQuery Plugin) ---
    // Mengubah tabel HTML biasa menjadi tabel pintar dengan fitur cari & halaman
    const table = $('#jerseyTable').DataTable({
        responsive: true,
        language: { 
            search: "Cari:", 
            searchPlaceholder: "Cari Jersey..." 
        }
    });

    // --- 3. FUNGSI STATISTIK (Fitur Ringkasan) ---
    // Fungsi ini menghitung angka-angka di kotak atas secara otomatis
    function updateStats() {
        const items = Object.values(jerseyData); // Mengubah objek menjadi array agar bisa dihitung
        const total = items.length; // Menghitung jumlah total produk
        
        // Mengambil kategori unik menggunakan 'Set' (agar tidak ada duplikat)
        const kategori = new Set(items.map(i => i.type)).size;
        
        // Mengumpulkan semua harga ke dalam satu list (array)
        const hargaArr = items.map(i => parseInt(i.price));
        
        // Mencari harga tertinggi dan menghitung rata-rata harga
        const tertinggi = total > 0 ? Math.max(...hargaArr) : 0;
        const rata = total > 0 ? hargaArr.reduce((a, b) => a + b, 0) / total : 0;

        // Menampilkan hasil hitungan ke layar HTML
        $('#statTotal').text(total);
        $('#statKategori').text(kategori);
        $('#statTertinggi').text(`Rp ${tertinggi.toLocaleString('id-ID')}`);
        $('#statRata').text(`Rp ${Math.round(rata).toLocaleString('id-ID')}`);
    }

    // --- 4. FUNGSI RENDER TABEL ---
    // Membersihkan tabel lama dan menggambar ulang dengan data terbaru
    function renderTable() {
        table.clear(); // Kosongkan isi tabel agar tidak double
        
        // Looping (putar) setiap ID yang ada di dalam data JSON
        Object.keys(jerseyData).forEach(id => {
            const item = jerseyData[id];
            // Menambahkan baris baru ke dalam DataTable
            table.row.add([
                `<span class="fw-bold">${item.club}</span>`,
                `<span class="badge ${item.type === 'Home' ? 'bg-primary' : 'bg-info'}">${item.type}</span>`,
                `Rp ${parseInt(item.price).toLocaleString('id-ID')}`,
                `<div class="text-center">
                    <button class="btn btn-outline-warning btn-sm me-1 btn-edit" data-id="${id}"><i class="fa fa-pen"></i></button>
                    <button class="btn btn-outline-danger btn-sm btn-delete" data-id="${id}"><i class="fa fa-trash"></i></button>
                 </div>`
            ]);
        });
        table.draw(); // Tampilkan perubahan ke layar
        updateStats(); // Perbarui angka statistik di atas
    }

    // Jalankan fungsi tampil tabel saat pertama kali web dibuka
    renderTable();

    // --- 5. FUNGSI CREATE (TAMBAH DATA) ---
    $('#jerseyForm').on('submit', function(e) {
        e.preventDefault(); // Mencegah halaman refresh saat klik simpan
        
        const id = Date.now(); // Membuat ID unik berdasarkan waktu saat ini
        
        // Mengambil input dari user dan dimasukkan ke objek
        jerseyData[id] = {
            club: $('#clubName').val(),
            type: $('#type').val(),
            price: $('#price').val()
        };
        
        saveData(); // Simpan ke memori browser
    });

    // --- 6. FUNGSI DELETE (HAPUS DATA) ---
    // Menggunakan '.on' karena tombolnya dibuat secara dinamis oleh JavaScript
    $('#jerseyTable tbody').on('click', '.btn-delete', function() {
        if(confirm('Hapus item ini?')) {
            const id = $(this).data('id'); // Ambil ID dari atribut 'data-id'
            delete jerseyData[id]; // Hapus data dari objek berdasarkan ID tersebut
            saveData();
        }
    });

    // --- 7. FUNGSI EDIT (AMBIL DATA KE MODAL) ---
    $('#jerseyTable tbody').on('click', '.btn-edit', function() {
        const id = $(this).data('id');
        const item = jerseyData[id];
        
        // Masukkan data lama ke dalam form di dalam Modal
        $('#editId').val(id);
        $('#editClub').val(item.club);
        $('#editType').val(item.type);
        $('#editPrice').val(item.price);
        
        $('#editModal').modal('show'); // Tampilkan modal edit
    });

    // --- 8. FUNGSI UPDATE (SIMPAN PERUBAHAN) ---
    $('#editForm').on('submit', function(e) {
        e.preventDefault();
        const id = $('#editId').val(); // Ambil ID yang tadi disimpan di input hidden
        
        // Timpa data lama dengan data baru dari form edit
        jerseyData[id] = {
            club: $('#editClub').val(),
            type: $('#editType').val(),
            price: $('#editPrice').val()
        };
        
        $('#editModal').modal('hide'); // Tutup modal
        saveData();
    });

    // --- 9. FUNGSI HELPER (SIMPAN KE LOCALSTORAGE) ---
    function saveData() {
        // Mengubah objek JavaScript menjadi teks JSON dan menyimpannya di browser
        localStorage.setItem('jerseyV3', JSON.stringify(jerseyData));
        renderTable(); // Gambar ulang tabel
        $('#jerseyForm')[0].reset(); // Kosongkan form input
    }
});