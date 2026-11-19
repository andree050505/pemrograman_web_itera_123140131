/**
 * app.js
 * Inisialisasi utama aplikasi Personal Dashboard Mahasiswa ITERA
 */

document.addEventListener('DOMContentLoaded', () => {
    // Instansiasi DashboardApp
    const dashboard = new DashboardApp();

    // Simpan di window untuk akses inline handler onclick pada rendering dinamis
    window.dashboard = dashboard;

    console.log('ITERA Student Productivity Hub initialized successfully.');
});
