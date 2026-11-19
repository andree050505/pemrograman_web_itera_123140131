"""
Program Utama: Sistem Manajemen Perpustakaan Sederhana (Tema: Manga & Komik)
Nama Mahasiswa  : Andre Prasetya Daely
NIM             : 123140131
Kelas Praktikum : RB
"""

from library_item import Book, Magazine
from library import Library


def main():
    print("=" * 65)
    print("      SISTEM MANAJEMEN PERPUSTAKAAN MANGA & POP CULTURE       ")
    print("                TUGAS 5 - PEMROGRAMAN WEB/OOP                 ")
    print("=" * 65)

    # 1. Inisialisasi Objek Perpustakaan (Class & Object)
    perpustakaan = Library("Perpustakaan Manga Andre")

    # 2. Pembuatan Objek Book dan Magazine (Inheritance)
    print("\n[1] MENAMBAHKAN KOLEKSI BUKU/MANGA DAN MAJALAH...")
    manga1 = Book(
        item_id="BK001",
        judul="One Piece Vol. 100",
        penulis="Eiichiro Oda",
        jumlah_halaman=208
    )
    manga2 = Book(
        item_id="BK002",
        judul="Jujutsu Kaisen Vol. 0",
        penulis="Gege Akutami",
        jumlah_halaman=200
    )
    manga3 = Book(
        item_id="BK003",
        judul="Chainsaw Man Vol. 1",
        penulis="Tatsuki Fujimoto",
        jumlah_halaman=192
    )

    majalah1 = Magazine(
        item_id="MG001",
        judul="Weekly Shonen Jump",
        edisi="Edisi Khusus No. 45",
        penerbit="Shueisha"
    )
    majalah2 = Magazine(
        item_id="MG002",
        judul="Monthly Shonen Sunday",
        edisi="Vol. 11 - Winter Issue",
        penerbit="Shogakukan"
    )

    # Menambahkan ke koleksi perpustakaan
    perpustakaan.tambah_item(manga1)
    perpustakaan.tambah_item(manga2)
    perpustakaan.tambah_item(manga3)
    perpustakaan.tambah_item(majalah1)
    perpustakaan.tambah_item(majalah2)

    # Pengujian validasi (mencoba menambahkan tipe yang tidak valid)
    print("\n-- Uji Validasi Penambahan Item yang Tidak Sesuai --")
    item_tidak_valid = "String Judul Bukan LibraryItem"
    perpustakaan.tambah_item(item_tidak_valid)  # type: ignore

    # 3. Menampilkan Seluruh Katalog Perpustakaan
    print("\n[2] MENAMPILKAN SELURUH KATALOG KOLEKSI PERPUSTAKAAN...")
    perpustakaan.tampilkan_katalog()

    # 4. Demonstrasi Polymorphism
    print("[3] DEMONSTRASI POLYMORPHISM (Panggilan method get_detail()):")
    print("    Method get_detail() dipanggil dari objek berbeda jenis (Book & Magazine)")
    daftar_sampel = [manga1, majalah1]
    for item in daftar_sampel:
        # Polymorphism: method yang sama menghasilkan format output berbeda sesuai kelasnya
        print(f" -> Output: {item.get_detail()}")

    # 5. Simulasi Peminjaman Item & Status Ketersediaan (Encapsulation)
    print("\n[4] SIMULASI PEMINJAMAN DAN CEK STATUS KETERSEDIAAN...")
    print(f"Status '{manga1.judul}' sebelum dipinjam : {manga1.status_peminjaman}")
    print(f"Meminjam '{manga1.judul}'...")
    manga1.pinjam()
    print(f"Status '{manga1.judul}' setelah dipinjam  : {manga1.status_peminjaman}")

    print(f"\nMeminjam '{majalah2.judul}'...")
    majalah2.pinjam()

    # Tampilkan hanya item yang masih tersedia
    perpustakaan.tampilkan_item_tersedia()

    # 6. Pencarian Item Berdasarkan ID dan Judul
    print("[5] FITUR PENCARIAN ITEM...")

    # Pencarian berdasarkan ID
    id_cari = "BK002"
    print(f"\n>> Mencari item dengan ID: '{id_cari}'")
    hasil_id = perpustakaan.cari_berdasarkan_id(id_cari)
    if hasil_id:
        print(f"   [Ditemukan]: {hasil_id.get_detail()}")
    else:
        print(f"   [Tidak Ditemukan] Tidak ada item dengan ID '{id_cari}'.")

    # Pencarian ID yang tidak ada
    id_salah = "BK999"
    print(f"\n>> Mencari item dengan ID: '{id_salah}'")
    hasil_salah = perpustakaan.cari_berdasarkan_id(id_salah)
    if hasil_salah:
        print(f"   [Ditemukan]: {hasil_salah.get_detail()}")
    else:
        print(f"   [Tidak Ditemukan] Tidak ada item dengan ID '{id_salah}'.")

    # Pencarian berdasarkan Judul
    keyword_cari = "Shonen"
    print(f"\n>> Mencari item dengan kata kunci judul: '{keyword_cari}'")
    hasil_judul = perpustakaan.cari_berdasarkan_judul(keyword_cari)
    if hasil_judul:
        print(f"   Ditemukan {len(hasil_judul)} item:")
        for idx, item in enumerate(hasil_judul, start=1):
            print(f"   {idx}. {item.get_detail()}")
    else:
        print(f"   [Tidak Ditemukan] Tidak ada item yang memuat judul '{keyword_cari}'.")

    print("\n" + "=" * 65)
    print("             PENGUJIAN SISTEM SELESAI DENGAN SUKSES!           ")
    print("=" * 65)


if __name__ == "__main__":
    main()
