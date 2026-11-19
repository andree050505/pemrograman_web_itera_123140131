# Tugas Praktikum 4 – Dasar Pemrograman Python

Repositori ini berisi pengerjaan Tugas Praktikum 4 Mata Kuliah **Pengembangan Aplikasi Web / Pemrograman Python**. Seluruh program dirancang dengan kode Python yang bersih, mudah dipahami, terstruktur menggunakan fungsi dan docstring, serta memenuhi kaidah PEP 8.

---

## 1. Identitas Mahasiswa

- **Nama** : Andre Prasetya Daely
- **NIM** : 123140131
- **Program Studi** : Teknik Informatika
- **Mata Kuliah** : Praktikum Pengembangan Aplikasi Web (Pertemuan 4)

---

## 2. Struktur Proyek

```text
andreprasetyadaely_123140131_pertemuan4/
├── .gitignore
├── README.md
├── tugas1_bmi.py
├── tugas2_nilai_mahasiswa.py
├── math_operations.py
└── main.py
```

---

## 3. Deskripsi & Alur Kerja Program

### A. Soal 1 – Penghitung BMI (`tugas1_bmi.py`)

- **Deskripsi**:
  Program untuk menghitung indeks massa tubuh (Body Mass Index / BMI) seseorang berdasarkan masukan berat badan (kg) dan tinggi badan (meter).
- **Rumus BMI**:
  $$\text{BMI} = \frac{\text{berat}}{\text{tinggi} \times \text{tinggi}}$$
- **Ketentuan Kategori**:
  - BMI < 18.5 : Berat badan kurang
  - BMI < 25   : Berat badan normal
  - BMI < 30   : Berat badan berlebih
  - Selain itu : Obesitas
- **Alur Kerja**:
  1. Pengguna memasukkan berat badan (kg) dan tinggi badan (m).
  2. Program memvalidasi apakah input bernilai numerik, lebih besar dari 0, dan tinggi tidak sama dengan 0.
  3. Menghitung nilai BMI melalui fungsi `hitung_bmi()`.
  4. Menentukan kategori menggunakan struktur percabangan `if-elif-else` pada fungsi `tentukan_kategori()`.
  5. Menampilkan nilai BMI dengan format 2 angka di belakang koma (`{bmi:.2f}`) beserta kategorinya ke layar terminal.

### B. Soal 2 – Pengelolaan Nilai Mahasiswa (`tugas2_nilai_mahasiswa.py`)

- **Deskripsi**:
  Program untuk mengelola data akademik minimal 5 mahasiswa menggunakan struktur data `list` of `dict`. Program menghitung nilai akhir, menentukan grade huruf, serta mencari nilai tertinggi dan terendah.
- **Komposisi Nilai Akhir**:
  $$\text{Nilai Akhir} = (30\% \times \text{UTS}) + (40\% \times \text{UAS}) + (30\% \times \text{Tugas})$$
- **Ketentuan Grade**:
  - Nilai $\ge 80$ : Grade A
  - Nilai $\ge 70$ : Grade B
  - Nilai $\ge 60$ : Grade C
  - Nilai $\ge 50$ : Grade D
  - Nilai $< 50$  : Grade E
- **Alur Kerja**:
  1. Menyiapkan data 5 mahasiswa dalam bentuk dictionary (nama, nim, nilai_uts, nilai_uas, nilai_tugas).
  2. Melakukan perulangan (`for`) untuk menghitung nilai akhir dan menentukan grade masing-masing mahasiswa.
  3. Mencetak data seluruh mahasiswa dalam tabel terminal yang rapi dan terformat.
  4. Mencari mahasiswa dengan nilai akhir tertinggi dan terendah menggunakan perulangan.
  5. Menampilkan kesimpulan/ringkasan nilai tertinggi dan terendah di bagian bawah tabel.

### C. Soal 3 – Modul Matematika Python (`math_operations.py` & `main.py`)

- **Deskripsi**:
  Penerapan konsep modularitas pada Python dengan memisahkan definisi fungsi/konstanta ke dalam modul tersendiri (`math_operations.py`) dan memanggilnya dari file pengujian utama (`main.py`).
- **Fungsi pada `math_operations.py`**:
  - Konstanta `PI = 3.14159`
  - Persegi: `luas_persegi(sisi)` dan `keliling_persegi(sisi)`
  - Persegi Panjang: `luas_persegi_panjang(panjang, lebar)` dan `keliling_persegi_panjang(panjang, lebar)`
  - Lingkaran: `luas_lingkaran(jari_jari)` dan `keliling_lingkaran(jari_jari)`
  - Konversi Suhu: `celsius_ke_fahrenheit(celsius)` dan `celsius_ke_kelvin(celsius)`
- **Alur Kerja pada `main.py`**:
  1. Mengimpor modul menggunakan dua cara berbeda:
     - `import math_operations` (pemanggilan modul penuh)
     - `from math_operations import PI, luas_lingkaran, keliling_lingkaran, ...` (pemanggilan fungsi langsung)
  2. Menguji seluruh fungsi dengan nilai sampel uji.
  3. Menampilkan hasil kalkulasi secara berurutan dan terformat rapi pada terminal.

---

## 4. Cara Menjalankan Program melalui Terminal

Buka terminal pada VS Code (atau PowerShell / Command Prompt), pastikan direktori aktif berada pada folder project ini:

```bash
cd andreprasetyadaely_123140131_pertemuan4
```

### Menjalankan Soal 1 (Penghitung BMI)
```bash
python tugas1_bmi.py
```

### Menjalankan Soal 2 (Pengelolaan Nilai Mahasiswa)
```bash
python tugas2_nilai_mahasiswa.py
```

### Menjalankan Soal 3 (Pengujian Modul Matematika)
```bash
python main.py
```

---

## 5. Dokumentasi Screenshot Hasil Eksekusi

### Screenshot Soal 1 – Penghitung BMI (`tugas1_bmi.py`)
<img width="631" height="127" alt="Screenshot 2026-11-19 181614" src="https://github.com/user-attachments/assets/b01b88c9-c346-4d15-ac63-42fe93029e2e" />

---

### Screenshot Soal 2 – Pengelolaan Nilai Mahasiswa (`tugas2_nilai_mahasiswa.py`)
<img width="669" height="236" alt="Screenshot 2026-11-19 181703" src="https://github.com/user-attachments/assets/a60d3d8c-226c-4627-a6e1-a6908b4259a8" />


---

### Screenshot Soal 3 – Modul Matematika Python (`main.py`)
<img width="611" height="446" alt="Screenshot 2026-11-19 181741" src="https://github.com/user-attachments/assets/d5e54559-474a-492b-950d-418b82f9f9ed" />
