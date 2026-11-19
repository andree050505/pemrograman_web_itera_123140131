import { useMemo } from 'react';

/**
 * Custom Hook useBookStats
 * Menghitung dan memperbarui statistik ringkasan koleksi buku secara otomatis.
 *
 * @param {Array} books - Daftar koleksi buku.
 * @returns {Object} Ringkasan statistik (total, milik, sedangDibaca, inginDibeli).
 */
export function useBookStats(books = []) {
  const stats = useMemo(() => {
    // Validasi jika books bukan array
    const safeBooks = Array.isArray(books) ? books : [];

    const total = safeBooks.length;
    const milik = safeBooks.filter((book) => book.status === 'Milik').length;
    const sedangDibaca = safeBooks.filter((book) => book.status === 'Sedang Dibaca').length;
    const inginDibeli = safeBooks.filter((book) => book.status === 'Ingin Dibeli').length;

    return {
      total,
      milik,
      sedangDibaca,
      inginDibeli,
    };
  }, [books]);

  return stats;
}

export default useBookStats;
