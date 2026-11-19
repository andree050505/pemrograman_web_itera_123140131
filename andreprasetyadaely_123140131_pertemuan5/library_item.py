from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """
    Abstract Base Class untuk merepresentasikan item perpustakaan umum.
    Menerapkan konsep Abstraction dan Encapsulation.
    """

    def __init__(self, item_id: str, judul: str):
        # Atribut protected (_) dan private (__) untuk Encapsulation
        self._item_id = item_id
        self._judul = judul
        self.__is_dipinjam = False  # Private: status peminjaman

    @property
    def item_id(self) -> str:
        """Getter property untuk ID item."""
        return self._item_id

    @property
    def judul(self) -> str:
        """Getter property untuk judul item."""
        return self._judul

    @property
    def is_dipinjam(self) -> bool:
        """Getter property untuk status peminjaman (Encapsulation)."""
        return self.__is_dipinjam

    @property
    def status_peminjaman(self) -> str:
        """Mengembalikan teks status ketersediaan item."""
        return "Dipinjam" if self.__is_dipinjam else "Tersedia"

    def pinjam(self) -> bool:
        """Method untuk mengubah status item menjadi dipinjam."""
        if not self.__is_dipinjam:
            self.__is_dipinjam = True
            return True
        return False

    def kembalikan(self) -> bool:
        """Method untuk mengembalikan item."""
        if self.__is_dipinjam:
            self.__is_dipinjam = False
            return True
        return False

    @abstractmethod
    def get_detail(self) -> str:
        """
        Abstract method yang wajib diimplementasikan oleh seluruh subclass.
        Menerapkan konsep Abstraction & Polymorphism.
        """
        pass


class Book(LibraryItem):
    """
    Subclass Book (mewakili Komik/Manga) yang mewarisi LibraryItem.
    Menerapkan konsep Inheritance.
    """

    def __init__(self, item_id: str, judul: str, penulis: str, jumlah_halaman: int):
        super().__init__(item_id, judul)
        self._penulis = penulis  # Mangaka / Penulis komik
        self._jumlah_halaman = jumlah_halaman

    @property
    def penulis(self) -> str:
        return self._penulis

    @property
    def jumlah_halaman(self) -> int:
        return self._jumlah_halaman

    def get_detail(self) -> str:
        """
        Implementasi get_detail() khusus untuk Buku/Manga (Polymorphism).
        """
        return (
            f"[Buku/Manga] ID: {self._item_id} | Judul: '{self._judul}' | "
            f"Mangaka/Penulis: {self._penulis} | {self._jumlah_halaman} Halaman | "
            f"Status: {self.status_peminjaman}"
        )


class Magazine(LibraryItem):
    """
    Subclass Magazine (mewakili Majalah Manga/Pop Culture) yang mewarisi LibraryItem.
    Menerapkan konsep Inheritance.
    """

    def __init__(self, item_id: str, judul: str, edisi: str, penerbit: str):
        super().__init__(item_id, judul)
        self._edisi = edisi  # Edisi / Volume rilis majalah
        self._penerbit = penerbit

    @property
    def edisi(self) -> str:
        return self._edisi

    @property
    def penerbit(self) -> str:
        return self._penerbit

    def get_detail(self) -> str:
        """
        Implementasi get_detail() khusus untuk Majalah (Polymorphism).
        """
        return (
            f"[Majalah Manga] ID: {self._item_id} | Judul: '{self._judul}' | "
            f"Edisi: {self._edisi} | Penerbit: {self._penerbit} | "
            f"Status: {self.status_peminjaman}"
        )
