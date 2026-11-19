# Praktikum Pengembangan aplikasi Web  Pertemuan 6
## RESTful API Manajemen Mahasiswa & Mata Kuliah dengan Pyramid Framework

### Identitas
- **Nama** : Andre Prasetya Daely
- **NIM**          : 123140131
- **Kelas**        : RB


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

## 3. Pengujian API dengan cURL

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
