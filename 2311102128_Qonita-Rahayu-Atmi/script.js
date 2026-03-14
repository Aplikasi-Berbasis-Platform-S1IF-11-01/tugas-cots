$(document).ready(function() {
    let productDB = JSON.parse(localStorage.getItem('productsDB')) || [];
    
    const table = $('#productTable').DataTable({
        data: productDB,
        columns: [
            { 
                data: null, 
                orderable: false, 
                searchable: false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { data: 'name' },
            { 
                data: 'category',
                render: function(data) {
                    return `<span class="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-2 py-1">${data}</span>`;
                }
            },
            { 
                data: 'price',
                render: function(data) {
                    return '<strong>Rp ' + Number(data).toLocaleString('id-ID') + '</strong>';
                }
            },
            {
                data: null,
                className: "text-center",
                orderable: false,
                render: function(data, type, row) {
                    return `
                        <div class="d-flex justify-content-center gap-2">
                            <button class="btn btn-sm btn-outline-primary edit-btn" data-id="${row.id}" title="Edit Data">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${row.id}" title="Hapus Data">
                                <i class="fas fa-trash-alt"></i> Hapus
                            </button>
                        </div>
                    `;
                }
            }
        ],
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/id.json',
            search: "Cari:",
            lengthMenu: "Tampilkan _MENU_ data",
            info: "_START_ - _END_ dari _TOTAL_ data",
            infoEmpty: "0 data",
            infoFiltered: "(dari _MAX_)",
            zeroRecords: "Data tidak ditemukan",
            paginate: {
                previous: '<i class="fas fa-chevron-left"></i>',
                next: '<i class="fas fa-chevron-right"></i>'
            }
        },
        responsive: true,
        order: [] 
    });

    table.on('order.dt search.dt', function () {
        let i = 1;
        table.cells(null, 0, { search: 'applied', order: 'applied' }).every(function (cell) {
            this.data(i++);
        });
    }).draw();

    function renderStats() {
        const totalProducts = productDB.length;
        
        let totalValue = 0;
        const categories = new Set();

        productDB.forEach(p => {
            totalValue += p.price || 0;
            if (p.category) {
                categories.add(p.category);
            }
        });

        $('#statTotalProducts').text(totalProducts);
        $('#statTotalValue').text('Rp ' + Number(totalValue).toLocaleString('id-ID'));
        $('#statTotalCategories').text(categories.size);
    }

    function syncTabel() {
        localStorage.setItem('productsDB', JSON.stringify(productDB));
        table.clear().rows.add(productDB).draw();
        renderStats(); 
    }

    renderStats();

    $('#productForm').on('submit', function(e) {
        e.preventDefault();

        const productData = {
            id: Date.now().toString(), 
            name: $('#productName').val(),
            category: $('#productCategory').val(),
            price: parseInt($('#productPrice').val(), 10)
        };

        productDB.push(productData);

        syncTabel();
        
        Swal.fire({
            icon: 'success',
            title: 'Data ditambahkan!',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            position: 'top-end',
            customClass: { popup: 'p-2' }
        });

        $('#productForm')[0].reset();
    });

    $('#editForm').on('submit', function(e) {
        e.preventDefault();

        const idField = $('#editProductId').val();
        
        const productData = {
            id: idField,
            name: $('#editProductName').val(),
            category: $('#editProductCategory').val(),
            price: parseInt($('#editProductPrice').val(), 10)
        };

        const index = productDB.findIndex(p => p.id === productData.id);
        if (index !== -1) {
            productDB[index] = productData;
            syncTabel();
            
            $('#editModal').modal('hide');
            
            Swal.fire({
                icon: 'success',
                title: 'Data disimpan!',
                showConfirmButton: false,
                timer: 1500,
                toast: true,
                position: 'top-end',
                customClass: { popup: 'p-2' }
            });
        }
    });

    $('#productTable tbody').on('click', '.delete-btn', function() {
        const id = $(this).data('id').toString();
        const product = productDB.find(p => p.id === id);
        
        Swal.fire({
            title: 'Hapus Produk?',
            html: `yakin ingin menghapus <strong>${product ? product.name : 'produk ini'}</strong>?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
            reverseButtons: true,
            width: '320px',
            customClass: {
                title: 'fs-5',
                htmlContainer: 'fs-6'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                productDB = productDB.filter(p => p.id !== id);
                syncTabel();
                
                Swal.fire({
                    icon: 'success',
                    title: 'Data dihapus!',
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                    position: 'top-end',
                    customClass: { popup: 'p-2' }
                });
            }
        });
    });

    $('#productTable tbody').on('click', '.edit-btn', function() {
        const id = $(this).data('id').toString();
        const product = productDB.find(p => p.id === id);
        
        if (product) {
            $('#editProductId').val(product.id);
            $('#editProductName').val(product.name);
            $('#editProductCategory').val(product.category);
            $('#editProductPrice').val(product.price);
            
            const editModal = new bootstrap.Modal(document.getElementById('editModal'));
            editModal.show();
        }
    });

});
