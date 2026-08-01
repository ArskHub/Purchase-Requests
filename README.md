# Purchase Requests — Form Pemesanan Stok Cabang

Technical test UI/UX & Frontend untuk PT Anemone Educipta Investa. Halaman internal
buat outlet cabang mesen stok (modul, perlengkapan, dll) langsung ke Head Office.

## Menjalankan project

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

Build production:

```bash
npm run build
npm run preview
```

## Teknologi

Dibangun pakai **React + Vite**, styling pakai **Tailwind CSS v4**. Warna dan font
didefinisikan sebagai design token (`@theme` di `src/index.css`) supaya nggak ada
hex/nama-font hardcoded tersebar di komponen.

Belum terhubung ke backend — data produk masih mock, ada di `src/features/purchase-request/data/products.js`.

## Struktur

```
src/
├── components/
│   ├── ui/                # Button, Input, QuantityInput, Badge, EmptyState
│   └── layout/             # Header, PageContainer
└── features/purchase-request/
    ├── components/         # ProductCard, ProductCatalog, CartItem, OrderSummary, PaymentMethod
    ├── hooks/useCart.js     # semua logic keranjang ada di sini
    ├── data/products.js     # mock data
    ├── utils/formatCurrency.js
    └── PurchaseRequestPage.jsx
```

Alasan dipisah gini: komponen di `components/` cuma peduli tampilan, nggak tahu-menahu
soal produk atau keranjang. Logic keranjang (nambah/kurang qty, hitung total, validasi
stok, submit) semua dikumpulin di `useCart.js` biar gampang dites/diubah tanpa nyentuh
tampilan. Data taruh terpisah di `data/products.js` jadi kalau nanti mau sambung ke API
tinggal ganti sumbernya, komponen nggak perlu diutak-atik.

## Keputusan desain

**Warna** — teal (`#15A6A0`) dan magenta (`#E23F82`) diambil dari warna logo asli "my
anemone", di atas background hampir putih. Sengaja nggak dibikin terlalu gelap/kontras,
soalnya ini halaman yang dipakai berulang-ulang tiap hari sama koordinator outlet, jadi
harus enak dipandang lama-lama.

**Font** — cuma Poppins, satu keluarga font aja buat semuanya. Hierarkinya dibentuk dari
bobot font (semi-bold buat judul & harga, regular buat teks biasa), bukan gonta-ganti
jenis font. Lebih simpel dan konsisten.

**Ikon kategori** — tiap produk pakai ikon sesuai jenisnya (buku = Modul, tas =
Perlengkapan, poster = Media Belajar) daripada kotak placeholder polos. Bantu user
scan katalog lebih cepat pas produknya udah banyak.

**Ringkasan pesanan** dibikin kayak struk — ada garis putus-putus sebelum total, dan
angka totalnya ditulis gede. Ini pattern yang udah familiar buat orang awam, jadi nggak
perlu belajar UI baru buat ngerti mana yang harus dibayar.

**Desktop**: katalog di kiri (scroll bebas), ringkasan pesanan sticky di kanan biar total
selalu kelihatan. **Mobile**: ringkasan disembunyikan jadi bottom sheet, dipanggil lewat
bottom bar yang nampilin total + tombol "Lihat Keranjang" — jempol nggak perlu scroll jauh
buat submit order.

Ada animasi kecil di beberapa tempat (kartu produk muncul bertahap, badge "di keranjang"
pop pas nambah item, bottom sheet slide-up) — semuanya otomatis mati kalau user aktifin
"reduce motion" di sistemnya.

**Validasi qty** dikunci di dua tempat: komponen `QuantityInput` (nggak bisa diketik minus
atau lebih dari stok) dan di `useCart.js` (di-clamp lagi sebelum masuk state, jaga-jaga
kalau ada yang manggil fungsinya langsung). Tombol submit disabled kalau keranjang kosong,
dan berubah jadi loading spinner pas proses submit biar nggak bisa diklik dobel.

Produk yang stoknya 0 tetap ditampilkan (nggak disembunyikan dari katalog), cuma kartunya
dibikin pudar dan quantity control-nya diganti teks "Tidak dapat dipesan saat ini".

Elemen HTML dipilih yang semantik (`fieldset`/`legend` buat metode pembayaran,
`dl`/`dt`/`dd` buat rincian harga) dan ada `aria-label` di tombol-tombol yang cuma
berisi ikon, biar tetap kepakai sama screen reader.

## Asumsi

- Wireframe desktop & mobile yang dikasih beda-beda di beberapa field (pajak, ekspedisi).
  Saya gabung jadi satu versi: Subtotal → Pajak 11% → Ongkir → Total, dengan 3 pilihan
  ekspedisi.
- Metode pembayaran digabung dari kedua referensi: Transfer Bank, QRIS, COD.
- Tombol "Riwayat Pesanan" di header baru sebatas UI, belum ada halamannya — di luar
  scope interaksi minimum yang diminta.
- Fitur pencarian & filter kategori di katalog itu tambahan saya sendiri (nggak diminta
  eksplisit), soalnya kalau produknya udah puluhan/ratusan bakal susah dicari manual.
- Pemilihan cabang di header masih statis/display-only, karena nggak ada requirement
  soal autentikasi atau multi-cabang.
