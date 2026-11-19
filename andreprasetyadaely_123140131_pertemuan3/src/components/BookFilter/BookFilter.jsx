import PropTypes from 'prop-types';
import './BookFilter.css';

/**
 * Komponen Reusable: BookFilter
 * Menyediakan kolom pencarian teks (judul/penulis) dan tombol filter status buku.
 */
export function BookFilter({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  totalResults,
}) {
  const statusOptions = ['Semua', 'Milik', 'Sedang Dibaca', 'Ingin Dibeli'];

  return (
    <div className="book-filter-container">
      {/* Baris Pencarian */}
      <div className="filter-search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Cari berdasarkan judul atau penulis..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Pencarian judul atau penulis"
        />
        {searchQuery && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
            aria-label="Hapus pencarian"
          >
            ✕
          </button>
        )}
      </div>

      {/* Baris Filter Status */}
      <div className="filter-status-wrapper">
        <span className="filter-label">Filter Status:</span>
        <div className="status-chips" role="group" aria-label="Kategori status filter">
          {statusOptions.map((status) => (
            <button
              key={status}
              type="button"
              className={`chip-btn ${statusFilter === status ? 'active' : ''}`}
              onClick={() => onStatusChange(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Informasi Jumlah Hasil */}
      <div className="filter-info">
        <span>
          Menampilkan <strong>{totalResults}</strong> buku
        </span>
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  statusFilter: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  totalResults: PropTypes.number.isRequired,
};

export default BookFilter;
