# Personal Book Manager (Tugas Praktikum 3)

Aplikasi web manajemen koleksi buku pribadi yang dibuat menggunakan **React JS** dan **Vite**. Aplikasi ini dirancang untuk mempermudah pencatatan, pemantauan status membaca, dan pengelompokan buku favorit secara responsif dan interaktif.

---

## 1. Deskripsi Aplikasi

**Personal Book Manager** adalah aplikasi web modern berbasis single-page application (SPA) yang memungkinkan pengguna untuk:
- Mencatat judul buku, nama penulis, dan status membaca (*Milik*, *Sedang Dibaca*, atau *Ingin Dibeli*).
- Mengedit serta menghapus buku dari daftar koleksi.
- Mencari buku secara dinamis berdasarkan judul maupun nama penulis.
- Memfilter tampilan buku berdasarkan status.
- Melihat ringkasan statistik dan distribusi koleksi buku secara *real-time*.
- Menyimpan seluruh data secara otomatis ke penyimpanan lokal browser (`localStorage`) sehingga data tidak hilang saat halaman di-refresh.

---

## 2. Tujuan Pembuatan

1. Memenuhi tugas Praktikum 3 mata kuliah **Pengembangan Aplikasi Web (PAW)**.
2. Mengimplementasikan konsep modern React, seperti *Functional Components*, *Hooks* (`useState`, `useEffect`, `useMemo`), dan *Custom Hooks*.
3. Menerapkan *State Management* global menggunakan **Context API**.
4. Mengimplementasikan *Client-Side Routing* multi-halaman dengan **React Router DOM**.
5. Menerapkan validasi tipe data komponen menggunakan **PropTypes**.
6. Menulis dan menjalankan *Unit Testing* otomatis dengan **Vitest** dan **React Testing Library**.

---

## 3. Teknologi yang Digunakan

- **React JS** (v18) – Library UI berbasis komponen fungsional.
- **Vite** (v6) – Build tool dan development server modern berkecepatan tinggi.
- **JavaScript (ES6+)** – Bahasa pemrograman utama.
- **CSS3** – Styling modern, minimalis, dan responsif (Mobile & Desktop).
- **React Router DOM** (v6) – Pengelolaan navigasi antar halaman (*Home* dan *Stats*).
- **PropTypes** – Validasi tipe data props pada komponen.
- **Context API** – Pengelolaan state aplikasi secara terpusat.
- **Browser localStorage** – Penyimpanan data persisten di sisi klien.
- **Vitest & React Testing Library** – Kerangka kerja pengujian unit (Unit Testing) dan lingkungan simulasi DOM (`jsdom`).

---

## 4. Struktur Folder Proyek

```text
andre_123140131_pertemuan3/
├── public/
├── src/
│   ├── components/
│   │   ├── BookFilter/
│   │   │   ├── BookFilter.jsx
│   │   │   └── BookFilter.css
│   │   ├── BookForm/
│   │   │   ├── BookForm.jsx
│   │   │   └── BookForm.css
│   │   ├── BookList/
│   │   │   ├── BookList.jsx
│   │   │   └── BookList.css
│   │   └── Navbar/
│   │       ├── Navbar.jsx
│   │       └── Navbar.css
│   ├── context/
│   │   └── BookContext.jsx
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useBookStats.js
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   │   └── Stats/
│   │       ├── Stats.jsx
│   │       └── Stats.css
│   ├── test/
│   │   ├── setup.js
│   │   └── App.test.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 5. Fitur React yang Diterapkan

1. **Functional Components**: Seluruh komponen ditulis menggunakan paradigma fungsional modern.
2. **React Hooks**:
   - `useState`: Mengelola state form input, pesan error validasi, query pencarian, dan filter aktif.
   - `useEffect`: Sinkronisasi state form saat proses edit dan pembaruan data ke `localStorage`.
   - `useMemo`: Mengoptimalkan filter daftar buku dan kalkulasi agregasi statistik.
3. **Custom Hooks**:
   - `useLocalStorage.js`: Abstraksi untuk membaca dan menyimpan data secara reaktif ke `window.localStorage`.
   - `useBookStats.js`: Menghitung total koleksi buku, jumlah status Milik, Sedang Dibaca, dan Ingin Dibeli secara otomatis setiap kali data berubah.
4. **Context API (`BookContext.jsx`)**:
   - Menyediakan akses global terhadap koleksi buku (`books`), fungsi penambahan (`addBook`), pembaruan (`updateBook`), penghapusan (`deleteBook`), serta pengelolaan mode edit (`editingBook`, `setEditingBook`, `cancelEdit`).
5. **Reusable Components**:
   - `BookForm`: Komponen formulir tambah dan edit buku dengan validasi bawaan.
   - `BookFilter`: Komponen pencarian teks dan filter status buku.
   - `BookList`: Komponen kartu buku dengan badge status dan tombol interaksi.
   - `Navbar`: Navigasi sticky responsif dengan indikator jumlah buku.
6. **PropTypes**:
   - Seluruh komponen yang menerima props (`BookForm`, `BookFilter`, `BookList`, `Navbar`, `BookProvider`) telah dilengkapi deklarasi `propTypes` untuk memastikan integritas tipe data.

---

## 6. Instalasi Dependensi & Cara Menjalankan Aplikasi

### A. Persyaratan Awal
- Pastikan telah terinstal [Node.js](https://nodejs.org/) (versi 18 atau yang lebih baru).
- Pastikan npm sudah terpasang.

### B. Langkah Instalasi

1. Buka terminal pada direktori proyek:
   ```bash
   cd "d:/iphone/Everything/TUGAS SEM 7/paw_praktikum_3"
   ```

2. Instal dependensi proyek:
   ```bash
   npm install
   ```

### C. Menjalankan Server Pengembangan (Development)

Jalankan perintah berikut:
```bash
npm run dev
```
Setelah itu, buka tautan lokal yang ditampilkan di terminal (biasanya `http://localhost:5173/`) pada browser Anda.

### D. Melakukan Build untuk Produksi
```bash
npm run build
```

---

## 7. Menjalankan Unit Testing

Proyek ini telah dikonfigurasi dengan **Vitest** dan **React Testing Library**. Sebanyak minimal 5 skenario pengujian utama telah diimplementasikan:
1. Menampilkan daftar buku awal.
2. Menambahkan buku baru ke dalam daftar.
3. Validasi saat judul atau penulis kosong (menampilkan pesan error dan border merah).
4. Menghapus buku dari koleksi.
5. Pencarian buku dan filter status.
6. Menampilkan halaman statistik koleksi buku.

### Cara Menjalankan Pengujian:

Jalankan perintah berikut di terminal:
```bash
npm run test
```

### Hasil Eksekusi Pengujian:

```text
 RUN  v2.1.9 D:/iphone/Everything/TUGAS SEM 7/paw_praktikum_3

 ✓ src/test/App.test.jsx (6 tests) 597ms
   ✓ 1. Menampilkan daftar buku awal dengan benar
   ✓ 2. Menambahkan buku baru ke dalam daftar
   ✓ 3. Menampilkan pesan kesalahan validasi saat judul atau penulis kosong
   ✓ 4. Menghapus buku dari daftar koleksi
   ✓ 5. Memfilter dan mencari buku berdasarkan kata kunci dan status
   ✓ 6. Menampilkan halaman statistik dengan perhitungan jumlah buku

 Test Files  1 passed (1)
      Tests  6 passed (6)
```

---

## 8. Tangkapan Layar (Screenshots)

> *Silakan tempatkan file gambar hasil screenshot aplikasi asli dan screenshot terminal pada folder `screenshots/` atau lampirkan pada laporan tugas Anda.*

### 1. Halaman Beranda (Home) - Desktop & Form
<!-- Simpan screenshot tampilan beranda pada path: ./screenshots/home_page.png -->
*(Tempatkan screenshot halaman Home di sini)*
![Screenshot Halaman Home](./screenshots/home_page.png)

### 2. Validasi Form Input Kosong
<!-- Simpan screenshot feedback visual error pada path: ./screenshots/form_validation.png -->
*(Tempatkan screenshot feedback validasi error di sini)*
![Screenshot Validasi Form](./screenshots/form_validation.png)

### 3. Filter dan Pencarian Buku
<!-- Simpan screenshot fitur pencarian atau filter pada path: ./screenshots/search_filter.png -->
*(Tempatkan screenshot fitur filter & pencarian di sini)*
![Screenshot Filter dan Pencarian](./screenshots/search_filter.png)

### 4. Halaman Statistik (Stats)
<!-- Simpan screenshot halaman statistik pada path: ./screenshots/stats_page.png -->
*(Tempatkan screenshot halaman Stats di sini)*
![Screenshot Halaman Stats](./screenshots/stats_page.png)

### 5. Hasil Unit Testing di Terminal
<!-- Simpan screenshot terminal hasil uji 'npm run test' pada path: ./screenshots/unit_tests.png -->
*(Tempatkan screenshot terminal hasil testing di sini)*
![Screenshot Unit Test Terminal](./screenshots/unit_tests.png)

---

## 9. Identitas Pengembang

- **Nama**: Andre Prasetya Daely
- **NIM**: 123140131
- **Program Studi**: Teknik Informatika
- **Mata Kuliah**: Praktikum Pengembangan Aplikasi Web (PAW) - Pertemuan 3
