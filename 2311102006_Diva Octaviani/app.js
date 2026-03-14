// Database Simulation
const DB = {
    data: {},
    nextId: 1,
    add(n, k, h) {
        const id = this.nextId++;
        this.data[id] = { id, nama: n, kategori: k, harga: +h };
    },
    del(id) {
        delete this.data[id];
    },
    update(id, n, k, h) {
        if (this.data[id])
            this.data[id] = { id, nama: n, kategori: k, harga: +h };
    },
    all() {
        return Object.values(this.data);
    },
    get(id) {
        return this.data[id];
    },
    cnt() {
        return Object.keys(this.data).length;
    }
};

// Format Rupiah
const rp = n => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
}).format(n);

// Global Variables
let dt, delId, editId, toastEl;

// Toast Notification
const toast = m => {
    $('#toastMsg').text(m);
    toastEl.show();
};

// Render Table
const render = () => {
    dt.clear();
    DB.all().forEach((p, i) => dt.row.add([
        i + 1,
        p.nama,
        p.kategori,
        rp(p.harga),
        `<div class="action-buttons">
            <button class="btn btn-edit" data-id="${p.id}">Edit</button>
            <button class="btn btn-del" data-id="${p.id}">Hapus</button>
        </div>`
    ]));
    dt.draw();
};

// Handle Form Submit - Tambah Produk
$('#form').submit(e => {
    e.preventDefault();
    const n = $('#nama').val().trim(),
        k = $('#kategori').val(),
        h = $('#harga').val();
    if (!n || !k || !h) return;
    DB.add(n, k, h);
    e.target.reset();
    render();
    toast('✓ Produk ditambahkan');
});

// Handle Edit Button Click
$(document).on('click', '.btn-edit', function () {
    editId = +$(this).data('id');
    const p = DB.get(editId);
    $('#editId').val(p.id);
    $('#editNama').val(p.nama);
    $('#editKategori').val(p.kategori);
    $('#editHarga').val(p.harga);
    new bootstrap.Modal($('#modalEdit')).show();
});

// Handle Edit Form Submit
$('#formEdit').submit(e => {
    e.preventDefault();
    const id = +$('#editId').val();
    const n = $('#editNama').val().trim();
    const k = $('#editKategori').val();
    const h = $('#editHarga').val();
    if (!n || !k || !h) return;

    DB.update(id, n, k, h);
    bootstrap.Modal.getInstance($('#modalEdit')).hide();
    render();
    toast('✓ Produk diperbarui');
});

// Handle Delete Button Click
$(document).on('click', '.btn-del', function () {
    delId = +$(this).data('id');
    $('#namaHapus').text(DB.get(delId).nama);
    new bootstrap.Modal($('#modalHapus')).show();
});

// Handle Confirm Delete
$('#konfirmasiHapus').click(() => {
    DB.del(delId);
    bootstrap.Modal.getInstance($('#modalHapus')).hide();
    render();
    toast('✓ Produk dihapus');
});

// Initialize on Document Ready
$(document).ready(() => {
    toastEl = new bootstrap.Toast($('#toast'), {
        autohide: true,
        delay: 2500
    });

    dt = $('#tabel').DataTable({
        ordering: false,
        language: {
            search: 'Cari:',
            lengthMenu: 'Tampilkan _MENU_',
            info: '_START_–_END_ dari _TOTAL_',
            paginate: { next: '›', previous: '‹' }
        },
        pageLength: 5
    });

    render();
});