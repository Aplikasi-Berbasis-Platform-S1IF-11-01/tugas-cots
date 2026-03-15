/**
 * storage.js
 * Lapisan data (data layer) aplikasi.
 * Menggunakan plain object (Map) sebagai penyimpanan in-memory.
 *
 * Struktur produkMap:
 * {
 *   "p1": { id: "p1", nama: "...", kategori: "...", harga: 0 },
 *   "p2": { ... },
 *   ...
 * }
 */

const produkMap = {};
let _idCounter = 1;

/**
 * Generate ID unik untuk produk baru.
 * @returns {string}
 */
function _generateId() {
  return 'p' + _idCounter++;
}

/**
 * Tambah produk baru ke dalam map.
 * @param {string} nama
 * @param {string} kategori
 * @param {number} harga
 * @returns {object} produk yang baru ditambahkan
 */
function tambahProduk(nama, kategori, harga) {
  const id = _generateId();
  const produk = { id, nama, kategori, harga };
  produkMap[id] = produk;
  return produk;
}

/**
 * Perbarui data produk yang sudah ada.
 * @param {string} id
 * @param {string} nama
 * @param {string} kategori
 * @param {number} harga
 * @returns {object|null} produk yang diperbarui, atau null jika tidak ditemukan
 */
function updateProduk(id, nama, kategori, harga) {
  if (!produkMap[id]) return null;
  produkMap[id] = { id, nama, kategori, harga };
  return produkMap[id];
}

/**
 * Hapus produk berdasarkan ID.
 * @param {string} id
 * @returns {boolean} true jika berhasil dihapus
 */
function hapusProduk(id) {
  if (!produkMap[id]) return false;
  delete produkMap[id];
  return true;
}

/**
 * Ambil satu produk berdasarkan ID.
 * @param {string} id
 * @returns {object|null}
 */
function getProduk(id) {
  return produkMap[id] || null;
}

/**
 * Ambil semua produk sebagai array.
 * @returns {object[]}
 */
function semuaProduk() {
  return Object.values(produkMap);
}

/**
 * Jumlah produk yang tersimpan.
 * @returns {number}
 */
function jumlahProduk() {
  return Object.keys(produkMap).length;
}

// -------------------------------------------------
// Seed data awal agar tabel tidak kosong saat load
// -------------------------------------------------
(function seedData() {
  const contoh = [
    { nama: 'Laptop ASUS VivoBook',  kategori: 'Elektronik',        harga: 8500000 },
    { nama: 'Kaos Polos Premium',    kategori: 'Pakaian',           harga: 85000   },
    { nama: 'Minyak Zaitun 500ml',   kategori: 'Makanan & Minuman', harga: 65000   },
    { nama: 'Sepatu Lari Adidas',    kategori: 'Olahraga',          harga: 750000  },
    { nama: 'Masker Wajah Aloe',     kategori: 'Kesehatan',         harga: 35000   },
  ];
  contoh.forEach(c => tambahProduk(c.nama, c.kategori, c.harga));
})();