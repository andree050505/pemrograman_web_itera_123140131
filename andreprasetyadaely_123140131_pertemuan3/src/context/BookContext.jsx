import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Inisialisasi Context
export const BookContext = createContext(null);

// Data awal sebagai sampel ketika aplikasi pertama kali digunakan
const INITIAL_BOOKS = [
  {
    id: '1',
    title: 'Laskar Pelangi',
    author: 'Andrea Hirata',
    status: 'Milik',
  },
  {
    id: '2',
    title: 'Bumi Manusia',
    author: 'Pramoedya Ananta Toer',
    status: 'Sedang Dibaca',
  },
  {
    id: '3',
    title: 'Filosofi Teras',
    author: 'Henry Manampiring',
    status: 'Ingin Dibeli',
  },
  {
    id: '4',
    title: 'Atomic Habits',
    author: 'James Clear',
    status: 'Milik',
  },
];

/**
 * Provider untuk BookContext
 * Menyediakan state dan fungsi pengelolaan buku ke seluruh komponen aplikasi.
 */
export function BookProvider({ children }) {
  // Menggunakan custom hook useLocalStorage untuk persistensi data
  const [books, setBooks] = useLocalStorage('personal_books_data', INITIAL_BOOKS);

  // State untuk menyimpan data buku yang sedang diedit
  const [editingBook, setEditingBook] = useState(null);

  /**
   * Menambahkan buku baru ke dalam koleksi
   * @param {Object} newBookData - { title, author, status }
   */
  const addBook = (newBookData) => {
    const newBook = {
      id: Date.now().toString(),
      title: newBookData.title.trim(),
      author: newBookData.author.trim(),
      status: newBookData.status,
    };
    setBooks((prevBooks) => [newBook, ...prevBooks]);
  };

  /**
   * Memperbarui informasi buku yang sudah ada
   * @param {string} id - ID buku yang diedit
   * @param {Object} updatedData - { title, author, status }
   */
  const updateBook = (id, updatedData) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id
          ? {
              ...book,
              title: updatedData.title.trim(),
              author: updatedData.author.trim(),
              status: updatedData.status,
            }
          : book
      )
    );
    // Reset mode edit setelah berhasil disimpan
    setEditingBook(null);
  };

  /**
   * Menghapus buku dari koleksi berdasarkan ID
   * @param {string} id - ID buku yang akan dihapus
   */
  const deleteBook = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    // Jika buku yang sedang diedit ikut dihapus, batalkan mode edit
    if (editingBook && editingBook.id === id) {
      setEditingBook(null);
    }
  };

  /**
   * Membatalkan proses pengeditan buku
   */
  const cancelEdit = () => {
    setEditingBook(null);
  };

  const value = {
    books,
    editingBook,
    setEditingBook,
    cancelEdit,
    addBook,
    updateBook,
    deleteBook,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Custom Hook useBooks
 * Mempermudah penggunaan BookContext di komponen lain.
 */
export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }
  return context;
}

export default BookContext;
