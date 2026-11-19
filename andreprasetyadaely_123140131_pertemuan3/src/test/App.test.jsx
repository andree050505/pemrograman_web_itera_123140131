import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Personal Book Manager - Unit Testing', () => {
  beforeEach(() => {
    // Bersihkan data localStorage sebelum setiap pengujian dijalankan
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  // 1. Pengujian: Menampilkan daftar buku awal
  it('1. Menampilkan daftar buku awal dengan benar', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Memverifikasi bahwa buku dari INITIAL_BOOKS muncul di layar
    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
    expect(screen.getByText(/Andrea Hirata/i)).toBeInTheDocument();
    expect(screen.getByText('Bumi Manusia')).toBeInTheDocument();
    expect(screen.getByText(/Pramoedya Ananta Toer/i)).toBeInTheDocument();
  });

  // 2. Pengujian: Menambahkan buku baru
  it('2. Menambahkan buku baru ke dalam daftar', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const titleInput = screen.getByLabelText(/Judul Buku/i);
    const authorInput = screen.getByLabelText(/Nama Penulis/i);
    const statusSelect = screen.getByRole('combobox', { name: /Status Buku/i });
    const submitButton = screen.getByRole('button', { name: /Tambah Buku/i });

    // Input data buku baru
    fireEvent.change(titleInput, { target: { value: 'Cantik Itu Luka' } });
    fireEvent.change(authorInput, { target: { value: 'Eka Kurniawan' } });
    fireEvent.change(statusSelect, { target: { value: 'Milik' } });

    // Submit form
    fireEvent.click(submitButton);

    // Memverifikasi bahwa buku baru berhasil ditambahkan dan tampil di daftar
    expect(screen.getByText('Cantik Itu Luka')).toBeInTheDocument();
    expect(screen.getByText(/Eka Kurniawan/i)).toBeInTheDocument();
  });

  // 3. Pengujian: Validasi ketika input judul atau penulis kosong
  it('3. Menampilkan pesan kesalahan validasi saat judul atau penulis kosong', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: /Tambah Buku/i });

    // Klik tombol submit saat field masih kosong
    fireEvent.click(submitButton);

    // Memverifikasi pesan validasi muncul
    expect(screen.getByText('Judul buku wajib diisi.')).toBeInTheDocument();
    expect(screen.getByText('Nama penulis wajib diisi.')).toBeInTheDocument();

    // Memverifikasi visual class is-invalid pada input
    const titleInput = screen.getByLabelText(/Judul Buku/i);
    const authorInput = screen.getByLabelText(/Nama Penulis/i);
    expect(titleInput).toHaveClass('is-invalid');
    expect(authorInput).toHaveClass('is-invalid');
  });

  // 4. Pengujian: Menghapus buku dari koleksi
  it('4. Menghapus buku dari daftar koleksi', () => {
    // Mock window.confirm agar selalu return true
    vi.spyOn(window, 'confirm').mockImplementation(() => true);

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Pastikan buku "Laskar Pelangi" ada sebelum dihapus
    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();

    // Klik tombol hapus khusus pada buku "Laskar Pelangi"
    const deleteButton = screen.getByRole('button', { name: /Hapus Laskar Pelangi/i });
    fireEvent.click(deleteButton);

    // Memverifikasi fungsi confirm dipanggil dan buku terhapus
    expect(window.confirm).toHaveBeenCalled();
    expect(screen.queryByText('Laskar Pelangi')).not.toBeInTheDocument();
  });

  // 5. Pengujian: Pencarian dan filter status buku
  it('5. Memfilter dan mencari buku berdasarkan kata kunci dan status', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(/Cari berdasarkan judul atau penulis/i);

    // Uji Pencarian judul: ketik "Bumi"
    fireEvent.change(searchInput, { target: { value: 'Bumi' } });

    // Buku "Bumi Manusia" harus ada, "Laskar Pelangi" harus disembunyikan
    expect(screen.getByText('Bumi Manusia')).toBeInTheDocument();
    expect(screen.queryByText('Laskar Pelangi')).not.toBeInTheDocument();

    // Reset pencarian
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();

    // Uji Filter Status: klik tombol chip 'Sedang Dibaca'
    const sedangDibacaChip = screen.getByRole('button', { name: 'Sedang Dibaca' });
    fireEvent.click(sedangDibacaChip);

    // "Bumi Manusia" (Sedang Dibaca) harus ada, "Laskar Pelangi" (Milik) tidak boleh ada
    expect(screen.getByText('Bumi Manusia')).toBeInTheDocument();
    expect(screen.queryByText('Laskar Pelangi')).not.toBeInTheDocument();
  });

  // 6. Pengujian Tambahan: Halaman Statistik Koleksi Buku
  it('6. Menampilkan halaman statistik dengan perhitungan jumlah buku', () => {
    render(
      <MemoryRouter initialEntries={['/stats']}>
        <App />
      </MemoryRouter>
    );

    // Verifikasi header statistik
    expect(screen.getByText('Statistik Koleksi Buku')).toBeInTheDocument();

    // Memverifikasi elemen statistik tampil
    expect(screen.getByText('Total Koleksi')).toBeInTheDocument();
    expect(screen.getByText('Milik Pribadi')).toBeInTheDocument();
    expect(screen.getByText('Daftar keinginan buku berikutnya')).toBeInTheDocument();
  });
});
