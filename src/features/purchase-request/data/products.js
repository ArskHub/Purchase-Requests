/**
 * Mock data katalog produk Head Office.
 * Di implementasi nyata, data ini akan datang dari API.
 */
export const CATEGORIES = ['Semua', 'Modul', 'Perlengkapan', 'Media Belajar'];

export const PRODUCTS = [
  {
    id: 'modul-calistung-1',
    name: 'Modul Calistung Level 1',
    category: 'Modul',
    price: 20000,
    stock: 500,
    unit: 'pcs',
    imageLabel: 'IMG',
  },
  {
    id: 'modul-calistung-2',
    name: 'Modul Calistung Level 2',
    category: 'Modul',
    price: 20000,
    stock: 70,
    unit: 'pcs',
    imageLabel: 'IMG',
  },
  {
    id: 'tas-ransel-anemone',
    name: 'Tas Ransel Anemone',
    category: 'Perlengkapan',
    price: 50000,
    stock: 120,
    unit: 'pcs',
    imageLabel: 'IMG',
  },
  {
    id: 'tas-desain-terbaru',
    name: 'Tas Desain Terbaru',
    category: 'Perlengkapan',
    price: 100000,
    stock: 1500,
    unit: 'pcs',
    imageLabel: 'IMG',
  },
  {
    id: 'poster-abjad-angka',
    name: 'Poster Abjad & Angka',
    category: 'Media Belajar',
    price: 15000,
    stock: 0,
    unit: 'pcs',
    imageLabel: 'IMG',
  },
  {
    id: 'kartu-flashcard-hewan',
    name: 'Kartu Flashcard Hewan',
    category: 'Media Belajar',
    price: 12000,
    stock: 8,
    unit: 'pcs',
    imageLabel: 'IMG',
  },
];

export const EXPEDITIONS = [
  { id: 'cargo-jtr', label: 'Cargo JTR', cost: 50000 },
  { id: 'cargo-jnr', label: 'Cargo JNR', cost: 50000 },
  { id: 'reguler', label: 'Reguler (JNE/J&T)', cost: 35000 },
];

export const PAYMENT_METHODS = [
  { id: 'transfer', label: 'Transfer Bank' },
  { id: 'qris', label: 'QRIS' },
  { id: 'cod', label: 'COD (Bayar di Tempat)' },
];

export const TAX_RATE = 0.11;

export const BRANCHES = ['Denpasar Utara', 'Denpasar Selatan', 'Kuta', 'Ubud'];
