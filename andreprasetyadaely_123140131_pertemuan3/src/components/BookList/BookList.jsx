import PropTypes from 'prop-types';
import './BookList.css';

/**
 * Komponen Reusable: BookList
 * Menampilkan daftar buku dalam kartu (card) interaktif dengan aksi Edit dan Hapus.
 */
export function BookList({ books, onEdit, onDelete }) {
  // Mapping warna atau kelas status badge
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Milik':
        return 'badge-milik';
      case 'Sedang Dibaca':
        return 'badge-sedang-dibaca';
      case 'Ingin Dibeli':
        return 'badge-ingin-dibeli';
      default:
        return 'badge-default';
    }
  };

  // Tampilan jika daftar buku kosong
  if (books.length === 0) {
    return (
      <div className="book-list-empty" data-testid="empty-book-list">
        <div className="empty-icon">📖</div>
        <h3 className="empty-title">Tidak ada buku yang ditemukan</h3>
        <p className="empty-desc">
          Coba sesuaikan kata kunci pencarian atau ubah filter status Anda, atau tambahkan buku baru melalui formulir.
        </p>
      </div>
    );
  }

  return (
    <div className="book-grid" role="region" aria-label="Daftar Buku">
      {books.map((book) => (
        <article key={book.id} className="book-card" data-testid={`book-card-${book.id}`}>
          <div className="book-card-header">
            <span className={`status-badge ${getStatusBadgeClass(book.status)}`}>
              {book.status}
            </span>
          </div>

          <div className="book-card-body">
            <h3 className="book-title" title={book.title}>
              {book.title}
            </h3>
            <p className="book-author">
              <span className="author-icon">✍️</span> {book.author}
            </p>
          </div>

          <div className="book-card-footer">
            <button
              type="button"
              className="action-btn edit-btn"
              onClick={() => onEdit(book)}
              aria-label={`Edit ${book.title}`}
            >
              ✏️ Edit
            </button>
            <button
              type="button"
              className="action-btn delete-btn"
              onClick={() => onDelete(book.id)}
              aria-label={`Hapus ${book.title}`}
            >
              🗑️ Hapus
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookList;
