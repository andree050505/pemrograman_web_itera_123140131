from typing import List, Optional
from library_item import LibraryItem


class Library:
    """
    Class untuk mengelola seluruh koleksi item di perpustakaan.
    Menerapkan Encapsulation dengan menyimpan data di atribut private __koleksi.
    """

    def __init__(self, nama_perpustakaan: str = "Perpustakaan Manga & Pop Culture"):
        self.nama_perpustakaan = nama_perpustakaan
        # Atribut private untuk melindungi integritas data koleksi
        self.__koleksi: List[LibraryItem] = []

    def tambah_item(self, item: LibraryItem) -> bool:
        """
        Menambahkan item ke dalam koleksi perpustakaan.
        Memvalidasi agar hanya instance turunan dari LibraryItem yang dapat ditambahkan.
        """
        if not isinstance(item, LibraryItem):
            print(f"[ERROR] Gagal menambahkan: Objek bukan merupakan turunan dari LibraryItem!")
            return False

        # Cek apakah ID sudah terdaftar sebelumnya
        for existing_item in self.__koleksi:
            if existing_item.item_id == item.item_id:
                print(f"[PERINGATAN] Item dengan ID '{item.item_id}' sudah ada di perpustakaan!")
                return False

        self.__koleksi.append(item)
        print(f"[BERHASIL] Ditambahkan: '{item.judul}' (ID: {item.item_id})")
        return True

    def tampilkan_katalog(self) -> None:
        """
        Menampilkan seluruh koleksi item yang ada di perpustakaan.
        Memanfaatkan polymorphism dengan memanggil get_detail() pada setiap item.
        """
        print(f"\n=======================================================")
        print(f"      KATALOG KOLEKSI: {self.nama_perpustakaan.upper()}      ")
        print(f"=======================================================")

        if not self.__koleksi:
            print("Koleksi perpustakaan masih kosong.")
            return

        for index, item in enumerate(self.__koleksi, start=1):
            print(f"{index}. {item.get_detail()}")
        print("=======================================================\n")

    def tampilkan_item_tersedia(self) -> None:
        """
        Menampilkan daftar item yang saat ini berstatus 'Tersedia' (tidak sedang dipinjam).
        """
        print(f"\n--- DAFTAR ITEM TERSEDIA (SIAP DIPINJAM) ---")
        tersedia = [item for item in self.__koleksi if not item.is_dipinjam]

        if not tersedia:
            print("Tidak ada item yang sedang tersedia saat ini.")
            return

        for index, item in enumerate(tersedia, start=1):
            print(f"{index}. {item.get_detail()}")
        print("-------------------------------------------\n")

    def cari_berdasarkan_id(self, item_id: str) -> Optional[LibraryItem]:
        """
        Mencari item spesifik berdasarkan ID (case-insensitive).
        """
        for item in self.__koleksi:
            if item.item_id.lower() == item_id.strip().lower():
                return item
        return None

    def cari_berdasarkan_judul(self, keyword: str) -> List[LibraryItem]:
        """
        Mencari item berdasarkan kata kunci pada judul (case-insensitive).
        """
        hasil = []
        keyword_clean = keyword.strip().lower()
        for item in self.__koleksi:
            if keyword_clean in item.judul.lower():
                hasil.append(item)
        return hasil

    def get_total_item(self) -> int:
        """Mengembalikan jumlah total item dalam perpustakaan."""
        return len(self.__koleksi)
