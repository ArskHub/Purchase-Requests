# Purchase Requests — Form Pemesanan Stok Cabang

Implementasi frontend untuk Technical Test UI/UX & Frontend (PT Anemone Educipta Investa).

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

Untuk build production:

```bash
npm run build
npm run preview
```

## Teknologi yang Digunakan

- **React 19** + **Vite** — dipilih karena setup cepat dan struktur folder pada soal (`components/`, `features/`) memang mengikuti pola React.
- **Tailwind CSS v4** (`@tailwindcss/vite`) — utility-first, konfigurasi warna/tipografi didefinisikan sebagai design token via `@theme` di `src/index.css`, bukan hardcoded di tiap komponen.
- Tidak terhubung ke backend. Data produk memakai mock data statis di `src/features/purchase-request/data/products.js`.

## Struktur Komponen

```
src/
├── components/
│   ├── ui/                # Komponen generik, reusable di seluruh aplikasi
│   │   ├── Button          # varian primary/secondary/ghost + state loading & disabled
│   │   ├── Input           # input generik (dipakai untuk search produk)
│   │   ├── QuantityInput    # stepper qty, validasi min 0 & max stok
│   │   ├── Badge            # label status (tersedia/menipis/habis)
│   │   └── EmptyState       # tampilan kosong (dipakai untuk keranjang kosong)
│   └── layout/
│       ├── Header
│       └── PageContainer
└── features/
    └── purchase-request/
        ├── components/
        │   ├── ProductCard     # 1 kartu produk + status stok + quantity control
        │   ├── ProductCatalog  # daftar produk (mapping), search & filter kategori
        │   ├── CartItem        # 1 baris item di keranjang
        │   ├── OrderSummary    # ringkasan, ekspedisi, total, submit
        │   └── PaymentMethod   # pilihan metode pembayaran
        ├── hooks/
        │   └── useCart.js      # SEMUA business logic keranjang ada di sini
        ├── data/
        │   └── products.js     # mock data produk, ekspedisi, metode bayar
        ├── utils/
        │   └── formatCurrency.js
        └── PurchaseRequestPage.jsx   # menggabungkan semua komponen di atas
```

Prinsip pemisahan: **data** (mock/`data/`), **business logic** (`hooks/useCart.js`), dan
**presentation component** (komponen `.jsx` di atas hanya menerima data via props dan
memanggil callback — tidak menyimpan logic perhitungan sendiri) dipisah agar tidak
tercampur dalam satu file.

## Keputusan UI/UX Utama

- **Identitas visual**: palet diambil langsung dari warna logo asli "my anemone" — teal
  (`--color-primary`) dan magenta (`--color-accent`) di atas latar hampir-putih yang sejuk,
  sengaja dibuat cerah dan rendah kontras (bukan tone gelap/pekat) supaya nyaman dipakai
  berlama-lama dan terasa seperti produk startup modern, bukan dashboard korporat yang berat.
- **Tipografi**: satu keluarga font — *Poppins* — dipakai konsisten untuk semuanya (judul,
  harga/total, label, tombol). Poppins dipilih karena geometris, ramah, dan sangat familiar
  di produk-produk Indonesia; bobot (weight) yang berbeda dipakai untuk membangun hierarki
  (semi-bold untuk judul & angka penting, regular/medium untuk teks fungsional) alih-alih
  mencampur dua keluarga font berbeda.
- **Ikon kategori, bukan placeholder "IMG"**: tiap produk memakai ikon line-art sesuai
  kategorinya (buku untuk Modul, tas untuk Perlengkapan, poster untuk Media Belajar) —
  lebih cepat dikenali dan terasa lebih matang dibanding kotak abu-abu bertuliskan "IMG".
- **Indikator stok ringkas**: badge warna (hijau/kuning/merah) dengan angka langsung,
  tanpa elemen dekoratif berlebihan, supaya status stok bisa dibaca dalam satu lirikan.
- **Ringkasan pesanan sebagai "kartu nota"**: header aksen ungu muda, garis putus-putus
  sebelum total, dan angka total ditulis besar dengan font display — meniru kejelasan
  struk/nota fisik yang sudah familiar bagi koordinator outlet.
- **Layout desktop**: dua kolom — katalog (scroll bebas, dengan filter kategori
  bergaya tab underline) di kiri, ringkasan pesanan *sticky* di kanan.
- **Layout mobile**: katalog full-width dengan sticky bottom bar (total + tombol "Lihat
  Keranjang") yang membuka ringkasan pesanan sebagai bottom sheet — tombol submit tetap
  mudah dijangkau ibu jari tanpa scroll panjang.
- **Micro-interaction**: hero & sidebar fade-in saat halaman dimuat, kartu produk muncul
  bertahap (staggered), badge "di keranjang" & jumlah item di ringkasan pop saat berubah,
  bottom sheet mobile slide-up dengan easing, pesan sukses submit muncul dengan scale-in.
  Semuanya dihormati `prefers-reduced-motion` untuk pengguna yang sensitif terhadap animasi.
- **Validasi jumlah**: `QuantityInput` mengunci nilai antara `0` dan `stock` produk baik
  lewat tombol +/- maupun input manual (karakter non-angka otomatis dibuang).
- **State tombol submit**: disabled saat keranjang kosong, berubah jadi *loading spinner*
  saat proses submit (simulasi 1.5 detik), lalu menampilkan pesan sukses via
  `role="status"` (aksesibel untuk screen reader) dan keranjang otomatis dikosongkan.
- **Kondisi produk habis**: kartu produk jadi sedikit pudar, quantity control diganti
  teks "Tidak dapat dipesan saat ini" — mencegah interaksi pada produk yang stoknya 0
  tanpa menyembunyikan produknya dari katalog.
- **Aksesibilitas dasar**: elemen semantik (`header`, `main`, `fieldset`/`legend`,
  `dl`/`dt`/`dd`), label ARIA pada tombol qty, `aria-pressed` pada filter kategori,
  `focus-visible` ring yang jelas, dan `prefers-reduced-motion` dihormati.

## Asumsi yang Dibuat

- Wireframe awal (low-fidelity) menampilkan field pajak, kategori, dan ekspedisi yang
  berbeda-beda antara referensi desktop & mobile yang diberikan — diasumsikan versi
  final memakai: Subtotal → Pajak 11% → Ongkir → Total, dengan 3 pilihan ekspedisi.
- 3 metode pembayaran (Transfer Bank, QRIS, COD) digabung dari kedua referensi yang ada.
- Fitur "Order History" pada header disediakan sebagai tombol namun belum diimplementasi
  isinya (di luar cakupan minimum interaksi pada soal).
- Kategori & fitur pencarian produk pada katalog ditambahkan sebagai peningkatan UX
  (bukan diminta eksplisit di soal) karena jumlah produk pada implementasi nyata bisa
  banyak — memudahkan koordinator outlet menemukan produk dengan cepat.
- Karena tidak ada requirement autentikasi/multi-cabang, pemilihan cabang di header
  bersifat statis (display only).

## Catatan Terkait Deliverable Figma

Deliverable ini dikerjakan dengan asisten AI (Claude) yang tidak memiliki akses langsung
untuk membuat file Figma. Desain high-fidelity direalisasikan langsung dalam bentuk kode
(React + Tailwind) mengikuti seluruh keputusan desain di atas; screenshot dari
implementasi ini dapat dijadikan acuan bila dibutuhkan versi Figma terpisah.
