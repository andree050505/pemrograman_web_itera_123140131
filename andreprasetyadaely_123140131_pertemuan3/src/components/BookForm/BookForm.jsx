import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './BookForm.css';

/**
 * Komponen Reusable: BookForm
 * Menangani penambahan buku baru dan pengeditan buku yang sudah ada,
 * lengkap dengan validasi input dan visual feedback pesan error.
 */
export function BookForm({
  onSubmit,
  editingBook = null,
  onCancelEdit = () => {},
}) {
  // State form lokal
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'Milik',
  });

  // State untuk menyimpan pesan kesalahan validasi
  const [errors, setErrors] = useState({
    title: '',
    author: '',
  });

  // Sinkronisasi data form ketika prop editingBook berubah
  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title,
        author: editingBook.author,
        status: editingBook.status,
      });
      // Bersihkan error saat beralih ke mode edit
      setErrors({ title: '', author: '' });
    } else {
      // Reset ke nilai default saat mode tambah
      setFormData({
        title: '',
        author: '',
        status: 'Milik',
      });
      setErrors({ title: '', author: '' });
    }
  }, [editingBook]);

  /**
   * Menangani perubahan nilai input form
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Hapus pesan error jika pengguna mulai mengetik
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Menandai input saat blur (onBlur)
   */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [name]: name === 'title' ? 'Judul buku wajib diisi.' : 'Nama penulis wajib diisi.',
      }));
    }
  };

  /**
   * Fungsi validasi seluruh data form sebelum disubmit
   * @returns {boolean} Apakah form valid
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Judul buku wajib diisi.';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Nama penulis wajib diisi.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /**
   * Menangani pengiriman formulir (submit)
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Batalkan submit jika validasi gagal
    }

    // Kirim data ke parent/handler
    onSubmit(formData);

    // Reset form jika bukan mode edit
    if (!editingBook) {
      setFormData({
        title: '',
        author: '',
        status: 'Milik',
      });
      setErrors({ title: '', author: '' });
    }
  };

  return (
    <div className="book-form-card">
      <div className="form-header">
        <h2 className="form-title">
          {editingBook ? '✏️ Edit Informasi Buku' : '➕ Tambah Buku Baru'}
        </h2>
        <p className="form-subtitle">
          {editingBook
            ? 'Perbarui detail buku yang dipilih di bawah ini.'
            : 'Masukkan detail buku untuk ditambahkan ke koleksi.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="book-form">
        {/* Input Judul Buku */}
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Judul Buku <span className="required-star">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className={`form-input ${errors.title ? 'is-invalid' : ''}`}
            placeholder="Contoh: Laskar Pelangi"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && (
            <span id="title-error" className="error-message" role="alert">
              {errors.title}
            </span>
          )}
        </div>

        {/* Input Nama Penulis */}
        <div className="form-group">
          <label htmlFor="author" className="form-label">
            Nama Penulis <span className="required-star">*</span>
          </label>
          <input
            id="author"
            name="author"
            type="text"
            className={`form-input ${errors.author ? 'is-invalid' : ''}`}
            placeholder="Contoh: Andrea Hirata"
            value={formData.author}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.author}
            aria-describedby={errors.author ? 'author-error' : undefined}
          />
          {errors.author && (
            <span id="author-error" className="error-message" role="alert">
              {errors.author}
            </span>
          )}
        </div>

        {/* Dropdown Status Buku */}
        <div className="form-group">
          <label htmlFor="status" className="form-label">
            Status Buku
          </label>
          <select
            id="status"
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Milik">Milik</option>
            <option value="Sedang Dibaca">Sedang Dibaca</option>
            <option value="Ingin Dibeli">Ingin Dibeli</option>
          </select>
        </div>

        {/* Tombol Aksi Form */}
        <div className="form-actions">
          {editingBook && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelEdit}
            >
              Batal
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {editingBook ? 'Simpan Perubahan' : 'Tambah Buku'}
          </button>
        </div>
      </form>
    </div>
  );
}

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  editingBook: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
  onCancelEdit: PropTypes.func,
};

export default BookForm;
