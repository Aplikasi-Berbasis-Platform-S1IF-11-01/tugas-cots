//  2311102191 
//  FAHREZA ILHAM WICAKSONO
//  👍🏿

$(document).ready(function () {
    let currentRow;

    // init datatable
    let table = $("#productTable").DataTable({
        paging: true,
        searching: true,
        stateSave: true,
        ordering: false,
        columnDefs: [
            {
                targets: 1,
                className: "fw-bold"
            },
            {
                targets: 2,
                className: "align-middle text-center"
            },
            {
                targets: 3,
                className: "fw-bold text-end"
            },
            {
                targets: 4,
                className: "align-middle text-center"
            }
        ]
    });

    // object mapping array, jika ada data pada local storage maka ambil
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // render jika ada data
    if (products.length > 0) {
        products.forEach(function (product, index) {
            table.row.add([
                index + 1,
                product.name,
                categoryBadge(product.category),
                "Rp. " + product.price,
                `
                    <button class="btn btn-warning btn-sm editBtn" data-index="${index}"><i class="ph-fill ph-pencil-simple"></i></button>
                    <button class="btn btn-danger btn-sm deleteBtn" data-index="${index}"><i class="ph-fill ph-trash"></i></button>
                `
            ]);
        });

        table.draw(false);
    }

    // menyimpan ke local storage
    function saveToLocalStorage() {
        localStorage.setItem("products", JSON.stringify(products));
    }

    // untuk menentukan kelas category
    function categoryBadge(category) {
        let badges = {
            mouse: "primary",
            keyboard: "danger",
            monitor: "warning",
            headphone: "success",
            iem: "info"
        };

        let icons = {
            mouse: "ph-mouse",
            keyboard: "ph-keyboard",
            monitor: "ph-monitor",
            headphone: "ph-headphones",
            iem: "ph-music-note"
        };

        return `
        <span class="badge bg-${badges[category]} fw-bold p-2">
            <i class="ph-fill ${icons[category]} me-2"></i>
            ${category.toUpperCase()}
        </span>`;
    }

    // create
    $("#addProductForm").submit(function (event) {
        event.preventDefault();

        let name = $('#product_name').val();
        let category = $('#category').val();
        let price = $('#price').val();

        // mapping object
        let product = {
            name: name,
            category: category,
            price: price
        };

        // save ke array dan local storage
        products.push(product);
        saveToLocalStorage();

        let index = products.length - 1;

        table.row.add([
            index + 1,
            product.name,
            categoryBadge(product.category),
            "Rp. " + product.price,
            `
                <button class="btn btn-warning btn-sm editBtn" data-index="${index}"><i class="ph-fill ph-pencil-simple"></i></button>
                <button class="btn btn-danger btn-sm deleteBtn" data-index="${index}"><i class="ph-fill ph-trash"></i></button>
            `
        ]).draw(false);

        Swal.fire({
            position: "top",
            icon: "success",
            title: "Product has been successfuly saved",
            showConfirmButton: false,
            background: '#181818ff',
            color: '#fff',
            timer: 2000
        });

        this.reset();
    });

    // get data untuk edit modal
    $("#productTable tbody").on('click', '.editBtn', function () {
        let index = $(this).data('index');
        let product = products[index];

        // mengambil data nomor baris saat ini
        currentRow = table.row($(this).closest("tr"));

        $("#edit_index").val(index);
        $("#product_name_edit").val(product.name);
        $("#category_edit").val(product.category);
        $("#price_edit").val(product.price);

        $("#editModal").modal("show");

    });


    // edit
    $("#editProductForm").submit(function (e) {
        e.preventDefault();

        let index = $("#edit_index").val();
        let name = $("#product_name_edit").val();
        let category = $("#category_edit").val();
        let price = $("#price_edit").val();

        products[index] = {
            name: name,
            category: category,
            price: price
        };

        saveToLocalStorage();

        currentRow.data([
            parseInt(index) + 1,
            name,
            categoryBadge(category),
            "Rp. " + price,
            `
                <button class="btn btn-warning btn-sm editBtn" data-index="${index}"><i class="ph-fill ph-pencil-simple"></i></button>
                <button class="btn btn-danger btn-sm deleteBtn" data-index="${index}"><i class="ph-fill ph-trash"></i></button>
            `
        ]).draw(false);

        Swal.fire({
            position: "top",
            icon: "success",
            title: "Product has been successfuly edited",
            showConfirmButton: false,
            background: '#181818ff',
            color: '#fff',
            timer: 2000
        });

        $("#editModal").modal("hide");
    });

    // delete
    $("#productTable tbody").on('click', '.deleteBtn', function () {
        let button = $(this);
        let row = table.row(button.parents('tr'));
        let index = button.data('index');

        Swal.fire({
            title: "Are you sure?",
            text: "Delete this product?",
            icon: "warning",
            position: 'top',
            showCancelButton: true,
            background: '#181818ff',
            color: '#fff',
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                // delete data dan save ke local storage
                products.splice(index, 1);
                saveToLocalStorage();

                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Product has been successfuly deleted",
                    showConfirmButton: false,
                    background: '#181818ff',
                    color: '#fff',
                    timer: 2000
                });

                row.remove().draw(false);
            }
        });
    });
});