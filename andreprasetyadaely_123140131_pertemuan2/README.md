#  ITERA Student Productivity Hub

Aplikasi Personal Dashboard berbasis web yang dirancang khusus untuk mendukung produktivitas dan manajemen kegiatan akademik mahasiswa.

---

##  Identitas 

- **Nama** : Andre Prasetya Daely
- **NIM** : 123140131
- **Kelas Praktikum** : RB
- **Mata Kuliah** : Pengembangan Aplikasi Web RB

---

##  Fitur Utama Aplikasi

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

##  Antarmuka Aplikasi (Screenshot)

|  Tampilan Mode Terang (*Light Mode*) |  Tampilan Mode Gelap (*Dark Mode*) |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/82ecee87-12b7-4e17-9ea5-17e2e672783d" alt="Mode Terang" width="100%"> | <img src="https://github.com/user-attachments/assets/970b3b77-cb76-4ab8-9ab4-952623c10c90" alt="Mode Gelap" width="100%"> |


---




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

##  Sumber API Publik yang Digunakan

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


