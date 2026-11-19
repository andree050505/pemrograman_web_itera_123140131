# Tugas 5 - Sistem Manajemen Perpustakaan Sederhana

##  Identitas 

* **Nama Lengkap** : Andre Prasetya Daely
* **NIM** : 123140131
* **Kelas Praktikum** : RB

---

##  Deskripsi Singkat Sistem

Sistem ini dirancang untuk mengelola koleksi perpustakaan yang mencakup berbagai item bacaan seperti **Buku/Manga** dan **Majalah**. Sistem menyediakan kemampuan untuk:
1. Menambahkan item baru dengan validasi tipe data berbasis class parent.
2. Menampilkan seluruh katalog koleksi yang terdaftar.
3. Menampilkan daftar item yang sedang tersedia (belum dipinjam).
4. Melakukan simulasi peminjaman item dan pembaruan status ketersediaan.
5. Mencari koleksi berdasarkan **ID** unik maupun kata kunci pada **Judul**.

---

##  Penerapan 5 Konsep OOP

### 1. Abstraction (Abstraksi)
* **Penerapan**: Menggunakan modul bawaan `abc` (`ABC` dan `@abstractmethod`) untuk membuat abstract base class `LibraryItem`.
* **Bagian Kode**: Method `@abstractmethod def get_detail(self):` pada class `LibraryItem` di [library_item.py]
* **Fungsi**: Memaksa seluruh subclass turunan (`Book` dan `Magazine`) untuk mendefinisikan implementasi konkrit method `get_detail()`.

### 2. Inheritance (Pewarisan)
* **Penerapan**: Class `Book` dan `Magazine` merupakan subclass yang mewarisi atribut dan method dari superclass `LibraryItem`.
* **Bagian Kode**: `class Book(LibraryItem):` dan `class Magazine(LibraryItem):` menggunakan `super().__init__(item_id, judul)` untuk menginisialisasi atribut turunan.

### 3. Encapsulation (Enkapsulasi)
* **Penerapan**: Melindungi atribut sensitif menggunakan visibilitas protected (`_`) dan private (`__`) serta menyediakan akses terkontrol melalui `@property`.
* **Bagian Kode**:
  * `self.__is_dipinjam` pada class `LibraryItem` bersifat private sehingga tidak dapat diubah sembarangan dari luar kelas.
  * Disediakan property `@property def is_dipinjam(self):` dan `@property def status_peminjaman(self):` untuk membaca nilai status secara aman.
  * Perubahan status hanya diizinkan melalui method `pinjam()` dan `kembalikan()`.
  * Atribut `__koleksi` pada class `Library` bersifat private untuk menjamin integritas data daftar item.

### 4. Polymorphism (Polimorfisme)
* **Penerapan**: Satu interface method yang sama (`get_detail()`) menghasilkan perilaku atau format keluaran yang berbeda sesuai dengan tipe objek yang memanggilnya.
* **Bagian Kode**:
  * Pada `Book`: menampilkan detail judul, mangaka/penulis, jumlah halaman, dan status.
  * Pada `Magazine`: menampilkan detail judul, nomor edisi, penerbit, dan status.
  * Saat loop koleksi di [library.py] `main.py`, pemanggilan `item.get_detail()` secara dinamis menyesuaikan objek item yang sedang diproses.

### 5. Class dan Object
* **Penerapan**: Membuat cetak biru (*blueprint*) berupa class (`LibraryItem`, `Book`, `Magazine`, `Library`) dan melakukan instansiasi objek riil (misal objek komik `One Piece Vol. 100`, majalah `Weekly Shonen Jump`, dan objek perpustakaan `perpustakaan`).

---

### Penjelasan File:
1. **`library_item.py`**:
   * Berisi abstract class `LibraryItem` dengan atribut ID, judul, dan status peminjaman private.
   * Mendefinisikan abstract method `get_detail()`.
   * Berisi subclass `Book` (dengan atribut tambahan `penulis` dan `jumlah_halaman`).
   * Berisi subclass `Magazine` (dengan atribut tambahan `edisi` dan `penerbit`).
2. **`library.py`**:
   * Berisi class `Library` yang mengelola list koleksi (`__koleksi`).
   * Memiliki method `tambah_item()`, `tampilkan_katalog()`, `tampilkan_item_tersedia()`, `cari_berdasarkan_id()`, dan `cari_berdasarkan_judul()`.
3. **`main.py`**:
   * File titik masuk (*entry point*) untuk menguji seluruh fungsi sistem secara menyeluruh, termasuk penambahan item, tampilan katalog, simulasi peminjaman, demonstrasi polimorfisme, dan pencarian.
4. **`.gitignore`**:
   * Mengabaikan file cache Python (`__pycache__`) dan file konfigurasi IDE agar repository tetap bersih.
5. **`README.md`**:
   * Dokumentasi lengkap proyek, identitas mahasiswa, serta tempat screenshot pengujian.



## 📷 Screenshot Hasil Program

Bagian ini disediakan untuk melampirkan screenshot hasil eksekusi program di terminal:

<img width="779" height="421" alt="Screenshot 2026-11-19 192637" src="https://github.com/user-attachments/assets/2e5696e0-f624-4a69-a6d5-e0c5bf396181" />
<img width="803" height="383" alt="Screenshot 2026-11-19 192646" src="https://github.com/user-attachments/assets/45f0c12e-bd27-42f0-b7be-6e3af324465c" />


