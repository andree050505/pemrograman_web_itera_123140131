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



## 7. Menjalankan Unit Testing

Proyek ini telah dikonfigurasi dengan **Vitest** dan **React Testing Library**. Sebanyak minimal 5 skenario pengujian utama telah diimplementasikan:
1. Menampilkan daftar buku awal.
2. Menambahkan buku baru ke dalam daftar.
3. Validasi saat judul atau penulis kosong (menampilkan pesan error dan border merah).
4. Menghapus buku dari koleksi.
5. Pencarian buku dan filter status.
6. Menampilkan halaman statistik koleksi buku.


## 8. Tangkapan Layar (Screenshots)



### 1. Halaman Beranda (Home) - Desktop & Form


<img width="497" height="128" alt="h1" src="https://github.com/user-attachments/assets/61de9dce-77f3-4795-b36d-f5a97e21cbd1" />

### 2. Validasi Form Input Kosong

<img width="211" height="239" alt="h2" src="https://github.com/user-attachments/assets/0df7e815-697b-4ba0-b13c-c52d0ea12f22" />


### 3. Filter dan Pencarian Buku

<img width="458" height="93" alt="h3" src="https://github.com/user-attachments/assets/dbf07a69-cb30-4123-a499-1cc25dcf46de" />

### 4. Halaman Statistik (Stats)

<img width="704" height="328" alt="h4" src="https://github.com/user-attachments/assets/e128d8aa-7f4f-4d0a-8988-681c3d1001d4" />


### 5. Hasil Unit Testing di Terminal

<img width="623" height="182" alt="h5" src="https://github.com/user-attachments/assets/77d33980-3d03-4663-8606-81973f9c91f3" />

