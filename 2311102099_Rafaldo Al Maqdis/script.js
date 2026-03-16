/* ================================================================
   ProductOS — script.js
   CRUD Logic | DataTables Integration | UI Interactions
   ================================================================ */

$(function () {

  /* ──────────────────────────────────────────────
     DATA STORE
     Products stored as an array of objects.
     Each object: { id, name, category, price }
  ────────────────────────────────────────────── */
  let products = [];
  let idCounter = 1;
  let deleteTargetId = null;

  /* DataTable instance reference */
  let dataTable = null;

  /* Bootstrap modal instance */
  const deleteModalEl = document.getElementById('deleteModal');
  const deleteModal   = new bootstrap.Modal(deleteModalEl);


  /* ──────────────────────────────────────────────
     INITIALIZE DATATABLE
  ────────────────────────────────────────────── */
  function initDataTable () {
    dataTable = $('#productTable').DataTable({
      data: [],
      columns: [
        { data: 'rowNum',    orderable: false, className: 'text-center', width: '5%' },
        { data: 'name' },
        { data: 'category' },
        { data: 'price',     className: 'text-end' },
        { data: 'action',    orderable: false, searchable: false, className: 'text-center', width: '12%' }
      ],
      pageLength: 5,
      lengthMenu: [[5, 10, 25, -1], [5, 10, 25, 'All']],
      language: {
        search:         '_INPUT_',
        searchPlaceholder: 'Search products…',
        lengthMenu:     'Show _MENU_',
        info:           'Showing _START_–_END_ of _TOTAL_ entries',
        paginate: {
          previous: '<i class="bi bi-chevron-left"></i>',
          next:     '<i class="bi bi-chevron-right"></i>'
        },
        emptyTable:     'No products in inventory.',
        zeroRecords:    'No matching products found.'
      },
      drawCallback: function () {
        /* Re-bind delete buttons after each draw */
        bindDeleteButtons();
      },
      dom: '<"row align-items-center mb-3"<"col-sm-6"l><"col-sm-6"f>>rt<"row align-items-center mt-3"<"col-sm-5"i><"col-sm-7"p>>'
    });
  }


  /* ──────────────────────────────────────────────
     RENDER — convert products[] → DataTable rows
  ────────────────────────────────────────────── */
  function renderTable () {
    /* Toggle empty state vs table */
    if (products.length === 0) {
      $('#emptyState').show();
      $('#tableWrapper').hide();
    } else {
      $('#emptyState').hide();
      $('#tableWrapper').show();
    }

    /* Build DataTable row data */
    const rows = products.map((p, index) => ({
      rowNum:   `<span class="row-num">${index + 1}</span>`,
      name:     `<span style="font-weight:500;">${escapeHtml(p.name)}</span>`,
      category: `<span class="cat-badge">${escapeHtml(p.category)}</span>`,
      price:    `<span class="price-chip">${formatRupiah(p.price)}</span>`,
      action:   `<button class="btn-delete" data-id="${p.id}">
                    <i class="bi bi-trash3"></i> Delete
                 </button>`
    }));

    /* Clear and reload DataTable */
    if (dataTable) {
      dataTable.clear().rows.add(rows).draw();
    }

    /* Update stats */
    updateStats();
  }


  /* ──────────────────────────────────────────────
     STATS
  ────────────────────────────────────────────── */
  function updateStats () {
    const total      = products.length;
    const categories = new Set(products.map(p => p.category)).size;
    const totalVal   = products.reduce((sum, p) => sum + parseFloat(p.price || 0), 0);
    const avg        = total > 0 ? totalVal / total : 0;

    animateCount('#statTotal',      total);
    animateCount('#statCategories', categories);
    $('#statAvg').text(formatRupiah(avg));
    $('#statTotal2').text(formatRupiah(totalVal));

    /* Update pill badge */
    $('#countBadge').text(total + (total === 1 ? ' item' : ' items'));
  }

  function animateCount (selector, target) {
    const el    = $(selector);
    const start = parseInt(el.text()) || 0;
    const diff  = target - start;
    const steps = 12;
    let   step  = 0;
    const timer = setInterval(() => {
      step++;
      el.text(Math.round(start + (diff * step / steps)));
      if (step >= steps) clearInterval(timer);
    }, 18);
  }


  /* ──────────────────────────────────────────────
     ADD PRODUCT — form submit
  ────────────────────────────────────────────── */
  $('#productForm').on('submit', function (e) {
    e.preventDefault();

    const name     = $('#productName').val().trim();
    const category = $('#category').val();
    const price    = $('#price').val().trim();

    /* Validate */
    let valid = true;
    clearErrors();

    if (!name) {
      showError('productName', 'nameError');
      valid = false;
    }
    if (!category) {
      showError('category', 'categoryError');
      valid = false;
    }
    if (!price || isNaN(price) || parseFloat(price) < 0) {
      showError('price', 'priceError');
      valid = false;
    }
    if (!valid) return;

    /* Create product object */
    const product = {
      id:       idCounter++,
      name:     name,
      category: category,
      price:    parseFloat(price)
    };

    /* Push to array */
    products.push(product);

    /* Render table */
    renderTable();

    /* Reset form */
    this.reset();
    clearErrors();

    /* Show toast */
    showToast(`"${product.name}" added to inventory!`);
  });


  /* ──────────────────────────────────────────────
     DELETE PRODUCT
  ────────────────────────────────────────────── */
  function bindDeleteButtons () {
    /* Re-bind on every table draw to handle paginated rows */
    $(document).off('click', '.btn-delete').on('click', '.btn-delete', function () {
      const id = parseInt($(this).data('id'));
      const product = products.find(p => p.id === id);
      if (!product) return;

      deleteTargetId = id;
      $('#deleteProductName').text(product.name);
      deleteModal.show();
    });
  }

  $('#confirmDelete').on('click', function () {
    if (deleteTargetId === null) return;

    const product = products.find(p => p.id === deleteTargetId);
    const name    = product ? product.name : 'product';

    /* Remove from array */
    products = products.filter(p => p.id !== deleteTargetId);
    deleteTargetId = null;

    deleteModal.hide();

    /* Re-render */
    renderTable();
    showToast(`"${name}" removed from inventory.`, false);
  });

  /* Reset deleteTargetId if modal is dismissed without confirming */
  deleteModalEl.addEventListener('hidden.bs.modal', function () {
    deleteTargetId = null;
  });


  /* ──────────────────────────────────────────────
     VALIDATION HELPERS
  ────────────────────────────────────────────── */
  function showError (inputId, errorId) {
    $('#' + inputId).addClass('is-invalid');
    $('#' + errorId).addClass('visible');
  }
  function clearErrors () {
    $('.custom-input').removeClass('is-invalid');
    $('.invalid-feedback-custom').removeClass('visible');
  }

  /* Clear individual error on input */
  $('.custom-input').on('input change', function () {
    $(this).removeClass('is-invalid');
    /* Hide corresponding error */
    const id = $(this).attr('id');
    const errorMap = { productName: 'nameError', category: 'categoryError', price: 'priceError' };
    if (errorMap[id]) $('#' + errorMap[id]).removeClass('visible');
  });


  /* ──────────────────────────────────────────────
     TOAST NOTIFICATION
  ────────────────────────────────────────────── */
  let toastTimer = null;
  function showToast (message, isSuccess = true) {
    const toast = $('#liveToast');
    $('#toastMsg').text(message);

    /* Icon color */
    toast.find('i')
      .removeClass('bi-check-circle-fill bi-trash3-fill text-success text-danger')
      .addClass(isSuccess ? 'bi-check-circle-fill' : 'bi-trash3-fill')
      .css('color', isSuccess ? 'var(--success)' : 'var(--danger)');
    toast.css('border-color', isSuccess ? 'rgba(86,212,160,0.3)' : 'rgba(255,107,138,0.3)')
         .css('color',        isSuccess ? 'var(--success)'         : 'var(--danger)');

    toast.addClass('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.removeClass('show'), 3200);
  }


  /* ──────────────────────────────────────────────
     CURRENCY HELPER — format as Indonesian Rupiah
  ────────────────────────────────────────────── */
  function formatRupiah (amount) {
    return 'Rp ' + parseFloat(amount)
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }


  /* ──────────────────────────────────────────────
     SECURITY HELPER — prevent XSS in table content
  ────────────────────────────────────────────── */
  function escapeHtml (str) {
    return String(str)
      .replace(/&/g,  '&amp;')
      .replace(/</g,  '&lt;')
      .replace(/>/g,  '&gt;')
      .replace(/"/g,  '&quot;')
      .replace(/'/g,  '&#039;');
  }


  /* ──────────────────────────────────────────────
     INIT
  ────────────────────────────────────────────── */
  initDataTable();
  renderTable();

  /* Seed demo data for visual context (can be removed) */
  const seed = [
    { name: 'MacBook Pro M3', category: 'Electronics', price: 31990000 },
    { name: 'Noise-Cancelling Headphones', category: 'Electronics', price: 5499000 },
    { name: 'Running Shoes Pro', category: 'Sports', price: 1299000 },
    { name: 'Ceramic Coffee Mug', category: 'Home & Living', price: 85000 },
    { name: 'JavaScript: The Good Parts', category: 'Books', price: 320000 }
  ];
  seed.forEach(item => {
    products.push({ id: idCounter++, ...item });
  });
  renderTable();

});