import { useState, useMemo } from 'react';
import { useBooks } from '../../context/BookContext';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import './Home.css';

/**
 * Halaman Home (Beranda)
 * Menampilkan formulir manajemen buku, filter/pencarian, dan daftar buku.
 */
export function Home() {
  const {
    books,
    editingBook,
    setEditingBook,
    cancelEdit,
    addBook,
    updateBook,
    deleteBook,
  } = useBooks();

  // State lokal untuk pencarian dan filter status
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');

  // Filter buku berdasarkan kata kunci pencarian dan status yang dipilih
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === 'Semua' || book.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [books, searchQuery, statusFilter]);

  /**
   * Menangani pengiriman form (baik tambah maupun edit)
   */
  const handleFormSubmit = (formData) => {
    if (editingBook) {
      updateBook(editingBook.id, formData);
    } else {
      addBook(formData);
    }
  };

  /**
   * Menangani klik tombol edit pada item buku
   */
  const handleEditBook = (book) => {
    setEditingBook(book);
    // Scroll mulus ke form jika pada layar kecil
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Menangani penghapusan buku dengan konfirmasi sederhana
   */
  const handleDeleteBook = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
      deleteBook(id);
    }
  };

  return (
    <div className="home-page">
      <div className="page-header">
        <h1 className="page-title">Koleksi Buku Pribadi</h1>
        <p className="page-description">
          Catat, atur status membaca, dan kelola seluruh buku favorit Anda dengan mudah.
        </p>
      </div>

      <div className="home-layout">
        {/* Kolom Kiri: Form Tambah/Edit */}
        <section className="form-section" aria-label="Formulir Buku">
          <BookForm
            onSubmit={handleFormSubmit}
            editingBook={editingBook}
            onCancelEdit={cancelEdit}
          />
        </section>

        {/* Kolom Kanan: Filter dan Daftar Buku */}
        <section className="content-section" aria-label="Daftar dan Filter Buku">
          <BookFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            totalResults={filteredBooks.length}
          />

          <div className="list-wrapper">
            <BookList
              books={filteredBooks}
              onEdit={handleEditBook}
              onDelete={handleDeleteBook}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
