# Mini POS dre (Kasir Kantin Kampus)

Aplikasi kasir web sederhana berbasis HTML5, CSS3, dan JavaScript Vanilla yang dirancang untuk kebutuhan transaksi kasir kantin kampus. Proyek ini dibuat untuk memenuhi tugas praktikum mata kuliah **Pengembangan Aplikasi Web**.

---

## Identitas Mahasiswa

- **Nama** : Andre Prasetya Daely
- **NIM** : 123140131
- **Kelas Praktikum** : RB
- **Mata Kuliah** : Pengembangan Aplikasi Web RB

---

## Deskripsi & Tujuan Aplikasi

Aplikasi **Mini POS dre** adalah sistem kasir berbasis peramban (*web browser*) yang membantu kasir kantin dalam mencatat pesanan makanan/minuman, menghitung subtotal dan diskon otomatis, mengelola data pembayaran, serta menghitung uang kembalian atau kekurangan bayar secara akurat.

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


## Screenshot Aplikasi

Berikut adalah dokumentasi tampilan dan pengujian aplikasi Mini POS dre:

### 1. Tampilan Utama Dashboard Kasir

<img width="308" height="438" alt="S1" src="https://github.com/user-attachments/assets/9923977d-1712-497f-9f81-acf73a1e6dd2" />


### 2. Tampilan Validasi Error Formulir


<img width="248" height="335" alt="S2" src="https://github.com/user-attachments/assets/4b2dbc02-f773-42e7-b50a-dd0558e4ab4c" />



### 3. Tampilan Hasil Transaksi & Pembayaran


<img width="563" height="274" alt="S3" src="https://github.com/user-attachments/assets/aad38f0f-c19c-44e9-8076-0949183054d1" />




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
