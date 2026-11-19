import { useState, useEffect } from 'react';

/**
 * Custom Hook useLocalStorage
 * Menyimpan dan menyinkronkan state dengan browser localStorage.
 *
 * @param {string} key - Kunci penyimpanan di localStorage.
 * @param {*} initialValue - Nilai default jika belum ada data di localStorage.
 * @returns {[any, Function]} State saat ini dan fungsi setter.
 */
export function useLocalStorage(key, initialValue) {
  // Inisialisasi state dari localStorage secara lazy (hanya dijalankan saat initial render)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Gagal membaca data dari localStorage (key: "${key}"):`, error);
      return initialValue;
    }
  });

  // Sinkronkan state ke localStorage setiap kali key atau storedValue berubah
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Gagal menyimpan data ke localStorage (key: "${key}"):`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
