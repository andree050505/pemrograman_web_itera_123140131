# Mini POS (Kasir Kantin Kampus)

Aplikasi kasir web sederhana berbasis HTML5, CSS3, dan JavaScript Vanilla yang dirancang untuk kebutuhan transaksi kasir kantin kampus. Proyek ini dibuat untuk memenuhi tugas praktikum mata kuliah **Pengembangan Aplikasi Web**.

---

## Identitas Mahasiswa

- **Nama** : Andre Prasetya Daely
- **NIM** : 123140131
- **Kelas Praktikum** : Pemrograman Aplikasi Web (PAW) - ITERA
- **Mata Kuliah** : Pengembangan Aplikasi Web

---

## Deskripsi & Tujuan Aplikasi

Aplikasi **Mini POS (Kasir Kantin Kampus)** adalah sistem kasir berbasis peramban (*web browser*) yang membantu kasir kantin dalam mencatat pesanan makanan/minuman, menghitung subtotal dan diskon otomatis, mengelola data pembayaran, serta menghitung uang kembalian atau kekurangan bayar secara akurat.

Tujuan pembuatan aplikasi ini meliputi:
1. Memahami manipulasi *Document Object Model* (DOM) menggunakan JavaScript Vanilla.
2. Mengimplementasikan validasi input formulir secara dinamis di sisi klien (*client-side validation*).
3. Mengaplikasikan penyimpanan data persisten lokal peramban menggunakan `localStorage` dengan format JSON.
4. Menerapkan kalkulasi matematika otomatis (subtotal, total belanja, diskon, dan kembalian).

---

## Teknologi yang Digunakan

- **HTML5**: Struktur semantik elemen web (formulir, tabel transaksi, kartu informasi).
- **CSS3**: Tata letak modern (*CSS Grid* & *Flexbox*), styling komponen, responsivitas tampilan perangkat bergerak (*responsive web design*).
- **JavaScript Vanilla (ES6+)**: Logika aplikasi, event handling, manipulasi DOM, dan validasi formulir tanpa ketergantungan library/framework luar.
- **Web Storage API (`localStorage`)**: Media penyimpanan data keranjang belanja yang persisten di peramban pengguna.
- **JSON (`JSON.stringify()` & `JSON.parse()`)**: Serialisasi dan deserialisasi data keranjang belanja saat disimpan atau dibaca dari `localStorage`.

---

## Daftar Fitur yang Diimplementasikan

### 1. Validasi Formulir Barang
- **Nama Barang**: Wajib diisi dengan panjang minimal 3 karakter.
- **Harga Satuan**: Wajib berupa nilai numerik dan minimal Rp500.
- **Jumlah (Qty)**: Wajib berupa bilangan bulat positif (*integer*) minimal 1.
- Pesan kesalahan (*error message*) ditampilkan tepat di bawah elemen input yang tidak valid dengan warna merah.
- Reset formulir otomatis ketika data barang berhasil divalidasi dan ditambahkan ke keranjang.

### 2. Pengelolaan Keranjang Belanja
- Tabel dinamis dengan kolom: **No**, **Nama Barang**, **Harga**, **Qty**, **Subtotal**, dan **Aksi**.
- Tombol **Hapus** pada setiap baris barang untuk menghapus item yang dipilih.
- Penghitungan ulang total transaksi secara *real-time* saat item ditambah atau dihapus.
- Tombol **Transaksi Baru** yang mengosongkan seluruh keranjang belanja dan membersihkan `localStorage` setelah konfirmasi pengguna (*dialog confirm*).

### 3. Kalkulator Otomatis Transaksi
- **Subtotal**: Dihitung dari formula `Harga × Qty`.
- **Total Belanja**: Akumulasi seluruh subtotal barang di keranjang belanja.
- **Diskon Otomatis 10%**: Otomatis terpasang jika total belanja mencapai minimal Rp50.000.
- **Total Akhir**: Total belanja dikurangi potongan diskon (`Total Belanja − Diskon`).
- **Input Uang Bayar**: Menghitung secara otomatis saat kasir mengetik nominal pembayaran (*input event*).
- **Informasi Pembayaran**:
  - Menampilkan jumlah **Kembalian** berwarna hijau jika uang bayar mencukupi atau lebih.
  - Menampilkan informasi **Kekurangan Pembayaran** berwarna merah jika uang bayar kurang.
- Seluruh nilai mata uang diformat menggunakan standar Rupiah Indonesia (contoh: `Rp 50.000`).

### 4. Penyimpanan Lokal Persisten (`localStorage`)
- Mengonversi array objek transaksi ke format string JSON menggunakan `JSON.stringify()`.
- Membaca dan mengurai kembali data menggunakan `JSON.parse()` ketika halaman dimuat.
- Data keranjang belanja tetap tersimpan dan tidak hilang meskipun halaman di-*refresh* atau peramban ditutup.

---

## Struktur Folder Proyek

```text
pemrograman_web_itera_123140131/
└── andreprasetyadaely_123140131_pertemuan1/
    ├── index.html       # Struktur utama antarmuka kasir
    ├── style.css        # Desain visual, tata letak, dan responsivitas
    ├── script.js        # Logika validasi, kalkulasi, DOM, dan localStorage
    ├── README.md        # Dokumentasi lengkap proyek
    └── modul/           # Folder pendukung materi/modul praktikum
```

---

## Penjelasan Teknis Singkat

### A. Validasi Formulir (`validasiInput`)
Validasi dilakukan sebelum data dimasukkan ke dalam array keranjang. Logika memeriksa:
1. `nama.trim().length >= 3`
2. `!isNaN(Number(harga)) && Number(harga) >= 500`
3. `Number.isInteger(Number(qty)) && Number(qty) >= 1`
Jika salah satu kondisi gagal, class `.is-invalid` ditambahkan pada input dan pesan error diinjeksikan ke elemen span di bawahnya.

### B. Kalkulasi Transaksi (`hitungTotal` & `updatePembayaran`)
- Fungsi `hitungTotal()` menggunakan metode array `reduce()` untuk mengakumulasikan nilai `item.harga * item.qty`.
- Kondisi percabangan `if (totalBelanja >= 50000)` mengaktifkan potongan diskon 10% (`totalBelanja * 0.1`).
- `updatePembayaran()` mendengarkan event perubahan input uang bayar dan menghitung selisih uang bayar terhadap total akhir.

### C. Mekanisme `localStorage`
- Fungsi `simpanKeLocalStorage()` menyimpan array `keranjang` ke kunci `"MINI_POS_KERANJANG"` menggunakan `JSON.stringify(keranjang)`.
- Fungsi `muatDariLocalStorage()` membaca kunci tersebut saat event `DOMContentLoaded` dan mengembalikannya menjadi array JavaScript melalui `JSON.parse()`.

---

## Cara Menjalankan Aplikasi

Aplikasi ini dapat dijalankan langsung di komputer lokal menggunakan **Visual Studio Code** dan ekstensi **Live Server**:

1. **Buka Folder Proyek di VS Code**:
   - Buka aplikasi Visual Studio Code.
   - Pilih menu **File** &rarr; **Open Folder...**, lalu arahkan ke folder proyek ini.
2. **Pasang Ekstensi Live Server** (jika belum terpasang):
   - Klik ikon *Extensions* pada sidebar kiri (atau tekan `Ctrl + Shift + X`).
   - Cari ekstensi bernama **Live Server** (oleh *Ritwick Dey*).
   - Klik tombol **Install**.
3. **Jalankan Aplikasi**:
   - Buka file `index.html`.
   - Klik kanan pada editor lalu pilih **Open with Live Server**, atau klik tombol **Go Live** pada *status bar* di sudut kanan bawah VS Code.
   - Peramban (*browser*) bawaan akan terbuka secara otomatis di alamat `http://127.0.0.1:5500/index.html`.
4. **Alternatif Tanpa Live Server**:
   - Klik ganda langsung pada file `index.html` dari File Explorer Windows untuk membukanya di browser apa pun (Google Chrome, Microsoft Edge, Mozilla Firefox).

---

## Screenshot Aplikasi

Berikut adalah dokumentasi tampilan dan pengujian aplikasi Mini POS:

### 1. Tampilan Utama Dashboard Kasir
*Tampilan antarmuka utama saat aplikasi pertama kali dimuat dengan keranjang belanja kosong.*

![Tampilan Utama Aplikasi](screenshot-utama.png)
*(Ganti tautan di atas dengan file screenshot utama Anda)*

### 2. Tampilan Validasi Error Formulir
*Tampilan ketika input nama, harga, atau qty tidak memenuhi kriteria validasi (muncul pesan teks merah).*

![Tampilan Validasi Error](screenshot-error.png)
*(Ganti tautan di atas dengan file screenshot pengujian error Anda)*

### 3. Tampilan Hasil Transaksi & Pembayaran
*Tampilan saat beberapa item barang dimasukkan ke keranjang, diskon 10% aktif (belanja >= Rp50.000), serta penghitungan uang bayar dan kembalian.*

![Tampilan Hasil Transaksi](screenshot-transaksi.png)
*(Ganti tautan di atas dengan file screenshot transaksi Anda)*

---

## Skenario Pengujian yang Telah Teruji

| No | Skenario Pengujian | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 1 | Input nama < 3 karakter, harga < 500, qty < 1 | Pesan error merah muncul di bawah masing-masing input | Berhasil |
| 2 | Tambah barang valid | Barang masuk ke keranjang, formulir di-reset | Berhasil |
| 3 | Perhitungan subtotal | Subtotal = Harga × Qty per baris barang | Berhasil |
| 4 | Diskon otomatis 10% | Aktif jika total belanja >= Rp 50.000 | Berhasil |
| 5 | Input uang bayar cukup | Status hijau & nominal kembalian ditampilkan | Berhasil |
| 6 | Input uang bayar kurang | Status merah & nominal kekurangan ditampilkan | Berhasil |
| 7 | Hapus item | Item terhapus dan seluruh total diperbarui | Berhasil |
| 8 | Refresh browser | Data keranjang tetap utuh (tersimpan di `localStorage`) | Berhasil |
| 9 | Tombol Transaksi Baru | Muncul konfirmasi, keranjang & `localStorage` dibersihkan | Berhasil |
