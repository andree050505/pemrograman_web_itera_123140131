# 🎓 ITERA Student Productivity Hub — Personal Dashboard

Aplikasi Personal Dashboard interaktif berbasis web yang dirancang khusus untuk mendukung produktivitas dan manajemen kegiatan akademik mahasiswa **Institut Teknologi Sumatera (ITERA)**. Aplikasi ini membantu mahasiswa mengelola daftar tugas kuliah, memantau tenggat waktu (deadline), melihat kondisi cuaca real-time di kampus ITERA (Lampung Selatan), serta mendapatkan kutipan motivasi harian.

Tugas Praktikum ini dibangun dengan mengimplementasikan standar arsitektur modern **Object-Oriented Programming (OOP) ES6+**, manipulasi DOM dinamis, penyimpanan persisten **LocalStorage**, serta konsumsi **API Publik secara Asinkron (Async/Await)**.

---

## 👤 Identitas Mahasiswa

- **Nama** : Andre Prasetya Daely
- **NIM** : 123140131
- **Kelas Praktikum** : Pemrograman Aplikasi Web (PAW) RB
- **Mata Kuliah** : Pengembangan Aplikasi Web RB
- **Program Studi** : Teknik Informatika
- **Institusi** : Institut Teknologi Sumatera (ITERA)

---

## 📌 Fitur Utama Aplikasi

1. **Manajemen Tugas Kuliah Interaktif (CRUD Lengkap)**
   - **Create**: Menambahkan tugas baru dilengkapi judul, mata kuliah, tenggat waktu (deadline), tingkat prioritas (Tinggi, Sedang, Rendah), dan catatan pendukung.
   - **Read**: Menampilkan daftar tugas dalam bentuk kartu dinamis dengan penanda sisa waktu tenggat, lencana status, dan pembeda warna visual.
   - **Update**: Memperbarui status selesai/belum (toggle checklist) dan mengedit data tugas melalui modal interaktif.
   - **Delete**: Menghapus item tugas individual secara instan serta opsi pembersihan massal seluruh tugas yang sudah selesai (*Clear Completed*).

2. **Penyaringan & Pencarian Cepat (Real-time Filtering & Search)**
   - Fitur pencarian instan berdasarkan judul tugas, nama mata kuliah, atau isi catatan tambahan.
   - Filter berdasarkan status penyelesaian (*Semua*, *Belum Selesai*, *Selesai*).
   - Filter berdasarkan tingkat prioritas (*Semua*, *Tinggi*, *Sedang*, *Rendah*).

3. **Integrasi Operasi Asinkron & API Publik Riil (Async/Await)**
   - **Cuaca Real-Time ITERA (Open-Meteo API)**: Menampilkan suhu udara, kondisi cuaca, dan kecepatan angin real-time di lingkungan kampus ITERA (koordinat `-5.36`, `105.31`).
   - **Kutipan Motivasi Harian (DummyJSON Quotes API)**: Mengambil kutipan inspiratif harian secara acak beserta nama tokoh untuk membakar semangat belajar mahasiswa.
   - **Impor Sampel Tugas (JSONPlaceholder API)**: Fitur integrasi untuk mengimpor sampel data to-do dari API publik langsung ke dalam *state* dashboard.

4. **Penyimpanan Lokal Persisten (LocalStorage)**
   - Seluruh data tugas dan pengaturan tema pengguna otomatis tersimpan di `localStorage` peramban, sehingga data tidak hilang saat halaman di-*refresh* atau peramban ditutup.

5. **Antarmuka & Pengalaman Pengguna Modern (UI/UX)**
   - Jam digital dan penanggalan WIB real-time yang diperbarui setiap detik.
   - Sambutan ramah dinamis (*Selamat Pagi, Siang, Sore, Malam*).
   - Dukungan **Mode Terang & Gelap (Dark/Light Mode)** dengan palet warna kontras yang nyaman di mata.
   - Sistem notifikasi *Toast Alerts* interaktif untuk setiap aksi pengguna.
   - Tata letak responsif (*mobile-friendly*).

---

## 📸 Antarmuka Aplikasi (Screenshot)

| ☀️ Tampilan Mode Terang (*Light Mode*) | 🌙 Tampilan Mode Gelap (*Dark Mode*) |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/82ecee87-12b7-4e17-9ea5-17e2e672783d" alt="Mode Terang" width="100%"> | <img src="https://github.com/user-attachments/assets/970b3b77-cb76-4ab8-9ab4-952623c10c90" alt="Mode Gelap" width="100%"> |

---

## 💻 Pemenuhan Kriteria Fitur ES6+

Berikut adalah rincian implementasi fitur ES6+ wajib yang diterapkan dalam kode program beserta referensi baris filenya:

| No | Fitur ES6+ | Deskripsi Penggunaan | Lokasi File & Baris Kode |
| :---: | :--- | :--- | :--- |
| **1** | **`let` dan `const`** | Deklarasi variabel berbasis *block-scope* secara tepat dan konsisten di seluruh aplikasi tanpa menggunakan `var`. | • `js/TaskItem.js`: Baris 55, 56, 67, 90–92<br>• `js/DashboardApp.js`: Baris 106, 193–194, 217, 307, 354, 406–410, 583–585<br>• `js/app.js`: Baris 7 |
| **2** | **Arrow Functions (`=>`)** | Digunakan pada *event listener*, *array methods* (`.filter()`, `.map()`, `.find()`), interval jam digital, dan *callback timer*. | • `js/DashboardApp.js`: Baris 105, 111, 117, 123, 128, 134, 139, 144, 148, 153–155, 193, 246, 259, 329, 354, 358, 369, 387, 465, 499, 724, 773<br>• `js/app.js`: Baris 5 |
| **3** | **Template Literals (`` `${...}` ``)** | Interpolasi string dan *rendering* dinamis elemen HTML untuk kartu tugas, widget cuaca, kutipan, dan pesan notifikasi toast. | • `js/TaskItem.js`: Baris 95, 98, 100<br>• `js/DashboardApp.js`: Baris 212, 229, 308, 322, 362, 505–543, 585, 626–644, 697–702, 728–729, 764–768 |
| **4** | **Fungsi Asinkron (`async` / `await`)** | Mengonsumsi data dari 3 API publik riil menggunakan `fetch()`, `async/await`, dan blok penanganan galat `try...catch`. | • `fetchWeather()`: `js/DashboardApp.js` Baris 582–617<br>• `fetchDailyQuote()`: `js/DashboardApp.js` Baris 665–694<br>• `importSampleTodos()`: `js/DashboardApp.js` Baris 712–749 |
| **5** | **Classes (OOP Modern)** | Memodelkan struktur data dan memisahkan tanggung jawab kode (*Separation of Concerns*). | • `class TaskItem`: `js/TaskItem.js` Baris 7–120<br>• `class DashboardApp`: `js/DashboardApp.js` Baris 8–780 |
| **6** | **Destructuring Parameter & Assignment** | Membongkar nilai properti objek langsung pada parameter fungsi dan ekstraksi *response* JSON dari API publik. | • `js/TaskItem.js`: Baris 20–29 (`constructor`)<br>• `js/DashboardApp.js`: Baris 306 (`addTask`), Baris 328 (`updateTask`), Baris 603–604 (`current_weather`), Baris 622 (`renderWeather`), Baris 683–684 (`fetchDailyQuote`), Baris 724 (`sampleList.map`) |
| **7** | **Spread Operator (`...`) & Immutability** | Menambahkan item baru dan memperbarui *state* array tanpa memutasi data asli (*immutable state updates*). | • `js/TaskItem.js`: Baris 109–118 (`toJSON`)<br>• `js/DashboardApp.js`: Baris 295, Baris 318 (`[newTask, ...this.tasks]`), Baris 332–339 (`{ ...task.toJSON(), ... }`), Baris 740 (`[...newTasks, ...this.tasks]`) |

---

## 🏛️ Arsitektur & Struktur Direktori

Kode disusun modular mengikuti kaidah arsitektur bersih:

```
andreprasetyadaely_123140131_pertemuan2/
│
├── index.html              # Struktur semantic UI dashboard & modal
├── README.md               # Dokumentasi lengkap tugas praktikum
│
├── css/
│   └── style.css           # Styling modern, CSS Variables, animasi, dan Dark Mode
│
├── js/
│   ├── TaskItem.js         # Class model entitas tugas & kalkulasi tenggat
│   ├── DashboardApp.js     # Class controller state, localStorage, API, dan UI
│   └── app.js              # Entry point bootstrap inisialisasi aplikasi
│
└── assets/                 # Direktori aset gambar & screenshot
```

### 1. `TaskItem` Class (`js/TaskItem.js`)
Bertindak sebagai *Model* yang mempresentasikan satu entitas data tugas mahasiswa.
- **Properties**: `id`, `title`, `course`, `deadline`, `priority`, `notes`, `isCompleted`, `createdAt`.
- **Methods**:
  - `toggleStatus()`: Mengubah status selesai/belum.
  - `get isOverdue()`: Memeriksa apakah tugas sudah melewati waktu tenggat.
  - `get formattedDeadline()`: Memformat tanggal tenggat ke format lokal Indonesia (`id-ID`).
  - `getTimeRemaining()`: Menghitung sisa hari/jam sebelum deadline tiba.
  - `toJSON()`: Serialisasi objek ke *plain object* untuk disimpan ke `localStorage`.

### 2. `DashboardApp` Class (`js/DashboardApp.js`)
Bertindak sebagai *Controller & State Manager* yang mengelola siklus hidup aplikasi.
- **State**: `tasks`, `filterStatus`, `filterPriority`, `searchQuery`, `theme`, `activeEditId`.
- **Manajemen Storage**: `loadTasksFromStorage()`, `saveTasksToStorage()`, `seedInitialTasks()`.
- **Operasi CRUD**: `addTask()`, `updateTask()`, `deleteTask()`, `toggleTaskStatus()`, `handleClearCompleted()`.
- **Integrasi API**: `fetchWeather()`, `fetchDailyQuote()`, `importSampleTodos()`.
- **Rendering Dinamis**: `renderTasks()`, `renderStatistics()`, `renderWeather()`, `renderQuote()`.

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini murni menggunakan teknologi *vanilla web* (HTML5, CSS3, ES6+ JavaScript) tanpa memerlukan proses *build* atau instalasi dependensi tambahan.

1. **Buka Langsung di Peramban**:
   - Cukup klik dua kali (*double click*) pada file `index.html`, atau
   - Buka peramban favorit Anda (Chrome, Edge, Firefox), tekan `Ctrl + O`, dan pilih file `index.html`.

2. **Menggunakan Live Server (VS Code - Disarankan)**:
   - Pasang ekstensi **Live Server** di Visual Studio Code.
   - Klik kanan pada `index.html` dan pilih **Open with Live Server**.
   - Aplikasi akan otomatis berjalan pada alamat lokal `http://127.0.0.1:5500/index.html`.

---

## 🌐 Sumber API Publik yang Digunakan

1. **Open-Meteo Weather API**
   - **Endpoint**: `https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true`
   - **Kegunaan**: Menyediakan data meteorologi cuaca terkini di Kampus ITERA, Lampung Selatan tanpa membutuhkan API Key.
2. **DummyJSON Quotes API**
   - **Endpoint**: `https://dummyjson.com/quotes/random`
   - **Kegunaan**: Mengambil kutipan motivasi harian secara acak untuk membakar semangat belajar mahasiswa.
3. **JSONPlaceholder Todos API**
   - **Endpoint**: `https://jsonplaceholder.typicode.com/todos?_limit=4`
   - **Kegunaan**: Mensimulasikan pengambilan daftar to-do eksternal saat pengguna menekan tombol *Impor Sampel (API)*.

---

*Dikembangkan untuk memenuhi Tugas Praktikum Mata Kuliah Pemrograman Berbasis Web (PAW).*
