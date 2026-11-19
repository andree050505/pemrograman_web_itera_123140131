import { Routes, Route, Navigate } from 'react-router-dom';
import { BookProvider, useBooks } from './context/BookContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';

/**
 * Komponen Konten Utama
 * Membaca data buku dari BookContext untuk diteruskan ke Navbar dan Routes
 */
function AppContent() {
  const { books } = useBooks();

  return (
    <div className="app-wrapper">
      <Navbar totalBooks={books.length} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          {/* Fallback route jika rute tidak ditemukan */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>
          &copy; {new Date().getFullYear()} <strong>Personal Book Manager</strong>. Tugas Praktikum Pengembangan Aplikasi Web.
        </p>
      </footer>
    </div>
  );
}

/**
 * Komponen Utama Aplikasi (App)
 * Membungkus aplikasi dengan BookProvider untuk state management global
 */
export function App() {
  return (
    <BookProvider>
      <AppContent />
    </BookProvider>
  );
}

export default App;
