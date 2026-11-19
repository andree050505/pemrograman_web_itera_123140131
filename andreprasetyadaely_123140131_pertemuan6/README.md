# Praktikum Pemrograman Web - Pertemuan 6
## RESTful API Manajemen Mahasiswa & Mata Kuliah dengan Pyramid Framework

### Identitas Mahasiswa
- **Nama Lengkap** : Andre Prasetya Daely
- **NIM**          : 123140131
- **Kelas**        : RB
- **Mata Kuliah**  : Praktikum Pemrograman Web (PAW)

---

## 1. Deskripsi Aplikasi
Aplikasi ini adalah implementasi **RESTful API** berbasis framework **Pyramid**, menggunakan **PostgreSQL** sebagai sistem basis data relasional, **SQLAlchemy** sebagai Object-Relational Mapper (ORM), dan **Alembic** untuk manajemen migrasi skema database.

Aplikasi ini melanjutkan modul praktikum sebelumnya (Manajemen Mahasiswa) dengan menambahkan modul baru **Manajemen Mata Kuliah** yang mendukung operasi lengkap **CRUD (Create, Read, Update, Delete)** dengan validasi input yang ketat dan respons berstandar HTTP (200 OK, 400 Bad Request, 404 Not Found).

---

## 2. Arsitektur & Teknologi yang Digunakan
- **Python 3.10+ / 3.11** : Bahasa pemrograman utama.
- **Pyramid Framework** : Mid-sized web framework dengan prinsip *"Pay only for what you eat"*, mengandalkan URL Dispatch dan konfigurasi eksplisit.
- **PostgreSQL** : Database relasional enterprise-grade.
- **SQLAlchemy ORM** : Pemetaan tabel database ke dalam class Python.
- **zope.sqlalchemy & pyramid_tm** : Manajemen transaksi otomatis yang terikat dengan daur hidup (lifecycle) request HTTP.
- **Alembic** : Version control dan migrasi skema basis data.
- **Waitress** : WSGI HTTP server production-ready untuk Python.

---

## 3. Struktur Folder Project
```text
andreprasetyadaely_123140131_pertemuan6/
├── development.ini              # Konfigurasi server development & database
├── production.ini               # Konfigurasi server production
├── setup.py                     # Dependensi dan metadata package aplikasi
├── README.md                    # Dokumentasi lengkap proyek
├── .gitignore                   # Pengecualian file cache dan venv
└── pyramid_mahasiswa/           # Python package aplikasi
    ├── __init__.py              # Entry point aplikasi WSGI & konfigurasi router
    ├── routes.py                # Definisi URL dispatch dan pemetaan endpoint
    ├── alembic/                 # Skrip migrasi database Alembic
    │   ├── env.py               # Runner environment Alembic
    │   ├── script.py.mako       # Template revisi Alembic
    │   └── versions/            # Riwayat berkas migrasi
    │       ├── 20261112_create_mahasiswa_table.py
    │       └── 20261119_create_matakuliah_table.py
    ├── models/                  # Lapisan ORM (Object Relational Mapping)
    │   ├── __init__.py          # Engine SQLAlchemy & Session Factory
    │   ├── meta.py              # Declarative Base metadata
    │   ├── mahasiswa.py         # Model ORM Mahasiswa
    │   └── matakuliah.py        # Model ORM Mata Kuliah (Tugas 6)
    ├── scripts/                 # CLI utility scripts
    │   ├── __init__.py
    │   └── initialize_db.py     # Script seeding data awal mahasiswa & mata kuliah
    └── views/                   # Lapisan View Controller logika bisnis
        ├── __init__.py
        ├── default.py           # Endpoint root '/'
        ├── notfound.py          # Custom handler HTTP 404
        ├── mahasiswa.py         # Controller CRUD Mahasiswa
        └── matakuliah.py        # Controller CRUD Mata Kuliah (Tugas 6)
```

---

## 4. Persiapan Database PostgreSQL
Sebelum menjalankan aplikasi, pastikan service PostgreSQL sudah berjalan dan buat user serta database baru:

Buka terminal / command prompt:
```bash
psql -U postgres
```

Eksekusi perintah SQL berikut:
```sql
-- 1. Buat database
CREATE DATABASE pyramid_mahasiswa;

-- 2. Buat user dan password
CREATE USER pyramid_user WITH ENCRYPTED PASSWORD 'pyramid_pass';

-- 3. Berikan hak akses penuh ke database
GRANT ALL PRIVILEGES ON DATABASE pyramid_mahasiswa TO pyramid_user;

-- 4. Berikan izin ke schema public (khusus PostgreSQL 15 ke atas)
\c pyramid_mahasiswa
GRANT ALL ON SCHEMA public TO pyramid_user;

-- Keluar dari psql
\q
```

> **Catatan:** Jika Anda menggunakan kredensial yang berbeda (misalnya password default `postgres`), sesuaikan baris `sqlalchemy.url` pada file `development.ini`:
> ```ini
> sqlalchemy.url = postgresql://pyramid_user:pyramid_pass@localhost:5432/pyramid_mahasiswa
> ```

---

## 5. Instalasi & Setup Lingkungan Pengembangan

### Langkah 1: Masuk ke Direktori Proyek
```bash
cd andreprasetyadaely_123140131_pertemuan6
```

### Langkah 2: Buat & Aktifkan Virtual Environment
```bash
# Membuat virtual environment
python -m venv venv

# Aktivasi di Windows (PowerShell):
venv\Scripts\Activate.ps1

# Aktivasi di Windows (Command Prompt):
venv\Scripts\activate.bat

# Aktivasi di Linux/macOS:
source venv/bin/activate
```

### Langkah 3: Install Dependensi Aplikasi (Editable Mode)
```bash
pip install --upgrade pip setuptools
pip install -e .
```

---

## 6. Migrasi Database & Seeding Data

### Langkah 1: Terapkan Migrasi Alembic
Jalankan migrasi hingga versi terbaru (`head`) untuk membuat tabel `mahasiswa` dan tabel `matakuliah`:
```bash
alembic -c development.ini upgrade head
```

### Langkah 2: Jalankan Seeding Data Awal
Eksekusi script seeding untuk mengisi data awal mahasiswa dan 3 data awal mata kuliah:
```bash
python -m pyramid_mahasiswa.scripts.initialize_db development.ini
```

*Data awal Mata Kuliah yang dimasukkan:*
1. **IF2110** – Pemrograman Web (SKS: 3, Semester: 3)
2. **IF3140** – Basis Data (SKS: 3, Semester: 5)
3. **IF2210** – Struktur Data (SKS: 3, Semester: 4)

---

## 7. Menjalankan Server Pyramid
Jalankan server pengembangan dengan fitur *auto-reload*:
```bash
pserve development.ini --reload
```
Server akan aktif di: **`http://localhost:6543`** atau **`http://127.0.0.1:6543`**.

---

## 8. Dokumentasi Endpoint RESTful API

### A. Endpoint Manajemen Mata Kuliah (Fitur Baru Pertemuan 6)

| No | HTTP Method | Endpoint | Fungsi | Status Berhasil |
|:---:|:---:|:---|:---|:---:|
| 1 | **GET** | `/api/matakuliah` | Menampilkan seluruh mata kuliah | `200 OK` |
| 2 | **GET** | `/api/matakuliah/{id}` | Menampilkan detail mata kuliah berdasarkan ID | `200 OK` |
| 3 | **POST** | `/api/matakuliah` | Menambahkan mata kuliah baru | `200 OK` |
| 4 | **PUT** | `/api/matakuliah/{id}` | Memperbarui data mata kuliah | `200 OK` |
| 5 | **DELETE**| `/api/matakuliah/{id}` | Menghapus data mata kuliah | `200 OK` |

#### Ketentuan Validasi Mata Kuliah:
- `kode_mk`: Wajib diisi, unik (tidak boleh duplikat).
- `nama_mk`: Wajib diisi.
- `sks`: Wajib diisi, bilangan bulat positif ($> 0$).
- `semester`: Wajib diisi, bilangan bulat positif ($> 0$).

---

### B. Endpoint Manajemen Mahasiswa (Praktikum Sebelumnya)

| No | HTTP Method | Endpoint | Fungsi | Status Berhasil |
|:---:|:---:|:---|:---|:---:|
| 1 | **GET** | `/api/mahasiswa` | Menampilkan seluruh mahasiswa | `200 OK` |
| 2 | **GET** | `/api/mahasiswa/{id}` | Menampilkan detail mahasiswa berdasarkan ID | `200 OK` |
| 3 | **POST** | `/api/mahasiswa` | Menambahkan mahasiswa baru | `200 OK` |
| 4 | **PUT** | `/api/mahasiswa/{id}` | Memperbarui data mahasiswa | `200 OK` |
| 5 | **DELETE**| `/api/mahasiswa/{id}` | Menghapus data mahasiswa | `200 OK` |

---

## 9. Panduan Pengujian API dengan cURL

### 1. GET: Menampilkan Seluruh Mata Kuliah
```bash
curl -X GET http://localhost:6543/api/matakuliah
```
**Contoh Respons (200 OK):**
```json
{
  "matakuliahs": [
    {
      "id": 1,
      "kode_mk": "IF2110",
      "nama_mk": "Pemrograman Web",
      "sks": 3,
      "semester": 3
    },
    {
      "id": 2,
      "kode_mk": "IF3140",
      "nama_mk": "Basis Data",
      "sks": 3,
      "semester": 5
    },
    {
      "id": 3,
      "kode_mk": "IF2210",
      "nama_mk": "Struktur Data",
      "sks": 3,
      "semester": 4
    }
  ]
}
```

---

### 2. GET: Menampilkan Detail Mata Kuliah Berdasarkan ID
```bash
curl -X GET http://localhost:6543/api/matakuliah/1
```
**Contoh Respons (200 OK):**
```json
{
  "matakuliah": {
    "id": 1,
    "kode_mk": "IF2110",
    "nama_mk": "Pemrograman Web",
    "sks": 3,
    "semester": 3
  }
}
```

---

### 3. POST: Menambahkan Mata Kuliah Baru
```bash
curl -X POST http://localhost:6543/api/matakuliah \
  -H "Content-Type: application/json" \
  -d "{\"kode_mk\": \"IF4020\", \"nama_mk\": \"Kecerdasan Buatan\", \"sks\": 3, \"semester\": 7}"
```
**Contoh Respons (200 OK):**
```json
{
  "success": true,
  "matakuliah": {
    "id": 4,
    "kode_mk": "IF4020",
    "nama_mk": "Kecerdasan Buatan",
    "sks": 3,
    "semester": 7
  }
}
```

---

### 4. PUT: Memperbarui Data Mata Kuliah
```bash
curl -X PUT http://localhost:6543/api/matakuliah/1 \
  -H "Content-Type: application/json" \
  -d "{\"nama_mk\": \"Pemrograman Berbasis Web Lanjut\", \"sks\": 4}"
```
**Contoh Respons (200 OK):**
```json
{
  "success": true,
  "matakuliah": {
    "id": 1,
    "kode_mk": "IF2110",
    "nama_mk": "Pemrograman Berbasis Web Lanjut",
    "sks": 4,
    "semester": 3
  }
}
```

---

### 5. DELETE: Menghapus Mata Kuliah
```bash
curl -X DELETE http://localhost:6543/api/matakuliah/4
```
**Contoh Respons (200 OK):**
```json
{
  "success": true,
  "message": "Mata kuliah dengan ID 4 berhasil dihapus"
}
```

---

### 6. Pengujian Validasi Input (Error 400 Bad Request)

#### A. Mengirim field tidak lengkap:
```bash
curl -X POST http://localhost:6543/api/matakuliah \
  -H "Content-Type: application/json" \
  -d "{\"nama_mk\": \"Jaringan Komputer\"}"
```
**Respons (400 Bad Request):**
```json
{
  "error": "Field kode_mk wajib diisi!"
}
```

#### B. Mengirim nilai SKS tidak valid (nol atau negatif):
```bash
curl -X POST http://localhost:6543/api/matakuliah \
  -H "Content-Type: application/json" \
  -d "{\"kode_mk\": \"IF2000\", \"nama_mk\": \"Testing\", \"sks\": -2, \"semester\": 1}"
```
**Respons (400 Bad Request):**
```json
{
  "error": "SKS harus berupa bilangan bulat positif (lebih dari 0)!"
}
```

#### C. Mengirim kode mata kuliah duplikat:
```bash
curl -X POST http://localhost:6543/api/matakuliah \
  -H "Content-Type: application/json" \
  -d "{\"kode_mk\": \"IF2110\", \"nama_mk\": \"Pemrograman Web Duplikat\", \"sks\": 3, \"semester\": 3}"
```
**Respons (400 Bad Request):**
```json
{
  "error": "Mata kuliah dengan kode IF2110 sudah terdaftar!"
}
```

---

### 7. Pengujian Resource Tidak Ditemukan (Error 404 Not Found)
```bash
curl -X GET http://localhost:6543/api/matakuliah/999
```
**Respons (404 Not Found):**
```json
{
  "error": "Mata kuliah dengan ID 999 tidak ditemukan"
}
```

---

## 10. Checklist Penilaian Tugas Praktikum 6
- [x] Struktur folder `[NAMA]_[NIM]_pertemuan6` (`andreprasetyadaely_123140131_pertemuan6`).
- [x] Model `Matakuliah` dibuat dengan atribut `id`, `kode_mk` (unique), `nama_mk`, `sks`, `semester`, dan method `to_dict()`.
- [x] Model didaftarkan di `models/__init__.py` bersama `Mahasiswa`.
- [x] Migrasi database Alembic dibuat dan diterapkan tanpa menghapus tabel `mahasiswa`.
- [x] Script `initialize_db.py` menambahkan minimal 3 data mata kuliah awal tanpa duplikasi saat di-re-run.
- [x] Lima endpoint CRUD (`GET`, `GET by ID`, `POST`, `PUT`, `DELETE`) diimplementasikan di `views/matakuliah.py`.
- [x] Validasi input lengkap: cek kelengkapan field, tipe integer, nilai positif $> 0$, dan penanganan error duplikat kode mata kuliah.
- [x] Route didaftarkan dengan benar di `routes.py` menggunakan predikat `request_method`.
- [x] Dokumentasi lengkap `README.md` dan `.gitignore`.
