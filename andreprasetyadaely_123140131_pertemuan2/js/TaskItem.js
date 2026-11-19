/**
 * TaskItem.js
 * Class model untuk merepresentasikan data tugas/catatan mahasiswa.
 * Memenuhi kriteria: ES6 Class, default parameters, destructuring, methods.
 */

class TaskItem {
    /**
     * Constructor TaskItem menggunakan object destructuring pada parameter
     * @param {Object} options
     * @param {string} options.id - Identifier unik tugas
     * @param {string} options.title - Judul tugas
     * @param {string} options.course - Nama mata kuliah
     * @param {string} options.deadline - Tanggal & waktu tenggat (ISO/string)
     * @param {string} options.priority - Prioritas ('low', 'medium', 'high')
     * @param {string} options.notes - Catatan tambahan
     * @param {boolean} options.isCompleted - Status selesai/belum
     * @param {string} options.createdAt - Tanggal pembuatan tugas
     */
    constructor({
        id = Date.now().toString(),
        title = '',
        course = 'Umum',
        deadline = '',
        priority = 'medium',
        notes = '',
        isCompleted = false,
        createdAt = new Date().toISOString()
    } = {}) {
        this.id = id;
        this.title = title;
        this.course = course;
        this.deadline = deadline;
        this.priority = priority; // 'low' | 'medium' | 'high'
        this.notes = notes;
        this.isCompleted = isCompleted;
        this.createdAt = createdAt;
    }

    /**
     * Mengubah status penyelesaian tugas (toggle)
     * @returns {boolean} Status terbaru
     */
    toggleStatus() {
        this.isCompleted = !this.isCompleted;
        return this.isCompleted;
    }

    /**
     * Memeriksa apakah tugas sudah melewati batas deadline
     * @returns {boolean}
     */
    get isOverdue() {
        if (!this.deadline || this.isCompleted) return false;
        const now = new Date();
        const deadlineDate = new Date(this.deadline);
        return deadlineDate < now;
    }

    /**
     * Mengembalikan selisih waktu atau format status tenggat
     * @returns {string}
     */
    get formattedDeadline() {
        if (!this.deadline) return 'Tidak ada deadline';
        
        const dateObj = new Date(this.deadline);
        if (isNaN(dateObj.getTime())) return this.deadline;

        // Format tanggal Indonesia
        return dateObj.toLocaleDateString('id-ID', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    /**
     * Menghitung sisa hari sebelum tenggat waktu
     * Menggunakan arrow function internal & template literals
     * @returns {string}
     */
    getTimeRemaining() {
        if (!this.deadline) return 'Fleksibel';
        if (this.isCompleted) return 'Selesai';

        const diffMs = new Date(this.deadline) - new Date();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffMs < 0) {
            return `Terlambat (${Math.abs(diffDays)} hari)`;
        }
        if (diffDays === 0) {
            return diffHours <= 0 ? 'Segera berakhir' : `${diffHours} jam lagi`;
        }
        return `${diffDays} hari lagi`;
    }

    /**
     * Konversi ke plain object untuk penyimpanan localStorage
     * Menggunakan object spread
     * @returns {Object}
     */
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            course: this.course,
            deadline: this.deadline,
            priority: this.priority,
            notes: this.notes,
            isCompleted: this.isCompleted,
            createdAt: this.createdAt
        };
    }
}
