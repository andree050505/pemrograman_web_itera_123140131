import { Link } from 'react-router-dom';
import { useBooks } from '../../context/BookContext';
import { useBookStats } from '../../hooks/useBookStats';
import './Stats.css';

/**
 * Halaman Stats (Statistik Koleksi Buku)
 * Menampilkan ringkasan jumlah buku secara keseluruhan dan berdasarkan statusnya.
 */
export function Stats() {
  const { books } = useBooks();
  // Menggunakan custom hook useBookStats
  const { total, milik, sedangDibaca, inginDibeli } = useBookStats(books);

  // Perhitungan persentase koleksi
  const calculatePercentage = (count) => {
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
  };

  const statCards = [
    {
      id: 'total',
      title: 'Total Koleksi',
      count: total,
      percentage: 100,
      icon: '📚',
      colorClass: 'card-total',
      description: 'Semua buku yang tercatat di sistem',
    },
    {
      id: 'milik',
      title: 'Milik Pribadi',
      count: milik,
      percentage: calculatePercentage(milik),
      icon: '✅',
      colorClass: 'card-milik',
      description: 'Buku yang sudah Anda miliki',
    },
    {
      id: 'reading',
      title: 'Sedang Dibaca',
      count: sedangDibaca,
      percentage: calculatePercentage(sedangDibaca),
      icon: '📖',
      colorClass: 'card-reading',
      description: 'Buku yang sedang aktif Anda baca',
    },
    {
      id: 'wishlist',
      title: 'Ingin Dibeli',
      count: inginDibeli,
      percentage: calculatePercentage(inginDibeli),
      icon: '🔖',
      colorClass: 'card-wishlist',
      description: 'Daftar keinginan buku berikutnya',
    },
  ];

  return (
    <div className="stats-page">
      <div className="stats-header">
        <div>
          <h1 className="stats-title">Statistik Koleksi Buku</h1>
          <p className="stats-subtitle">
            Ringkasan data koleksi dan progres membaca buku pribadi Anda.
          </p>
        </div>
        <Link to="/" className="btn btn-secondary back-btn">
          ← Kembali ke Beranda
        </Link>
      </div>

      {/* Grid Kartu Statistik */}
      <div className="stats-grid">
        {statCards.map((card) => (
          <div key={card.id} className={`stat-card ${card.colorClass}`}>
            <div className="stat-card-top">
              <span className="stat-icon">{card.icon}</span>
              <span className="stat-percentage">{card.percentage}%</span>
            </div>
            <div className="stat-count">{card.count}</div>
            <div className="stat-label">{card.title}</div>
            <div className="stat-desc">{card.description}</div>
            {card.id !== 'total' && (
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${card.percentage}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Rincian Tambahan */}
      <div className="stats-summary-card">
        <h2 className="summary-title">Ringkasan Distribusi Buku</h2>
        <div className="distribution-bars">
          <div className="distribution-item">
            <div className="item-label">
              <span>Milik Pribadi ({milik} buku)</span>
              <span>{calculatePercentage(milik)}%</span>
            </div>
            <div className="dist-bar bg-milik" style={{ width: `${calculatePercentage(milik)}%` }} />
          </div>

          <div className="distribution-item">
            <div className="item-label">
              <span>Sedang Dibaca ({sedangDibaca} buku)</span>
              <span>{calculatePercentage(sedangDibaca)}%</span>
            </div>
            <div className="dist-bar bg-reading" style={{ width: `${calculatePercentage(sedangDibaca)}%` }} />
          </div>

          <div className="distribution-item">
            <div className="item-label">
              <span>Ingin Dibeli ({inginDibeli} buku)</span>
              <span>{calculatePercentage(inginDibeli)}%</span>
            </div>
            <div className="dist-bar bg-wishlist" style={{ width: `${calculatePercentage(inginDibeli)}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
