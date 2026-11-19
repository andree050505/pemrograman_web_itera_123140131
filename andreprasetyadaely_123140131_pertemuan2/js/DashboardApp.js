/**
 * DashboardApp.js
 * Controller utama Personal Dashboard Mahasiswa ITERA
 * Mengelola state aplikasi, operasi localStorage, interaktivitas DOM,
 * serta integrasi API eksternal secara asinkron (Open-Meteo, DummyJSON, JSONPlaceholder).
 */

class DashboardApp {
    /**
     * Inisialisasi state aplikasi dan cache DOM
     */
    constructor() {
        // Konfigurasi Kunci LocalStorage
        this.STORAGE_KEY = 'itera_student_tasks_v1';
        this.THEME_KEY = 'itera_student_theme_v1';

        // State Aplikasi
        this.tasks = [];
        this.filterStatus = 'all'; // 'all' | 'pending' | 'completed'
        this.filterPriority = 'all'; // 'all' | 'low' | 'medium' | 'high'
        this.searchQuery = '';
        this.theme = localStorage.getItem(this.THEME_KEY) || 'light';
        this.activeEditId = null;

        // Inisialisasi
        this.init();
    }

    /**
     * Entry point untuk memuat data awal, event listener, dan API
     */
    init() {
        this.applyTheme(this.theme);
        this.loadTasksFromStorage();
        this.cacheDomElements();
        this.bindEvents();
        this.startRealTimeClock();
        this.renderTasks();
        this.renderStatistics();

        // Panggilan API Publik secara Asinkron (Async/Await)
        this.fetchWeather();
        this.fetchDailyQuote();
    }

    /**
     * Cache elemen-elemen DOM yang sering diakses
     */
    cacheDomElements() {
        // Header & Jam
        this.domClock = document.getElementById('digital-clock');
        this.domDate = document.getElementById('digital-date');
        this.domGreeting = document.getElementById('student-greeting');
        this.domThemeToggle = document.getElementById('theme-toggle-btn');

        // Form Tambah Tugas
        this.domTaskForm = document.getElementById('task-form');
        this.domInputTitle = document.getElementById('task-title');
        this.domInputCourse = document.getElementById('task-course');
        this.domInputDeadline = document.getElementById('task-deadline');
        this.domInputPriority = document.getElementById('task-priority');
        this.domInputNotes = document.getElementById('task-notes');

        // Kontainer & Filter
        this.domTaskList = document.getElementById('task-list-container');
        this.domEmptyState = document.getElementById('empty-state');
        this.domSearchInput = document.getElementById('search-task-input');
        this.domFilterStatus = document.getElementById('filter-status');
        this.domFilterPriority = document.getElementById('filter-priority');
        this.domClearCompletedBtn = document.getElementById('clear-completed-btn');
        this.domImportSampleBtn = document.getElementById('import-sample-btn');

        // Widget Asinkron
        this.domWeatherWidget = document.getElementById('weather-widget-content');
        this.domRefreshWeatherBtn = document.getElementById('refresh-weather-btn');
        this.domQuoteWidget = document.getElementById('quote-widget-content');
        this.domRefreshQuoteBtn = document.getElementById('refresh-quote-btn');

        // Statistik
        this.domStatTotal = document.getElementById('stat-total');
        this.domStatPending = document.getElementById('stat-pending');
        this.domStatCompleted = document.getElementById('stat-completed');
        this.domStatUrgent = document.getElementById('stat-urgent');

        // Modal Edit
        this.domEditModal = document.getElementById('edit-task-modal');
        this.domEditForm = document.getElementById('edit-task-form');
        this.domEditTitle = document.getElementById('edit-task-title');
        this.domEditCourse = document.getElementById('edit-task-course');
        this.domEditDeadline = document.getElementById('edit-task-deadline');
        this.domEditPriority = document.getElementById('edit-task-priority');
        this.domEditNotes = document.getElementById('edit-task-notes');
        this.domCloseModalBtn = document.getElementById('close-modal-btn');
        this.domCancelModalBtn = document.getElementById('cancel-modal-btn');

        // Toast Container
        this.domToastContainer = document.getElementById('toast-container');
    }

    /**
     * Daftarkan seluruh event listener menggunakan ES6 Arrow Functions
     */
    bindEvents() {
        // Toggle Dark/Light Mode
        this.domThemeToggle.addEventListener('click', () => {
            const nextTheme = this.theme === 'light' ? 'dark' : 'light';
            this.applyTheme(nextTheme);
        });

        // Form Submit: Tambah Tugas Baru
        this.domTaskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAddTask();
        });

        // Search Input (Real-time Filtering)
        this.domSearchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase().trim();
            this.renderTasks();
        });

        // Filter Dropdowns
        this.domFilterStatus.addEventListener('change', (e) => {
            this.filterStatus = e.target.value;
            this.renderTasks();
        });

        this.domFilterPriority.addEventListener('change', (e) => {
            this.filterPriority = e.target.value;
            this.renderTasks();
        });

        // Hapus Semua Tugas Selesai
        this.domClearCompletedBtn.addEventListener('click', () => {
            this.handleClearCompleted();
        });

        // Tombol Import Sampel Tugas (JSONPlaceholder API)
        this.domImportSampleBtn.addEventListener('click', () => {
            this.importSampleTodos();
        });

        // Tombol Refresh Widget Cuaca & Quote
        this.domRefreshWeatherBtn.addEventListener('click', () => {
            this.fetchWeather();
        });

        this.domRefreshQuoteBtn.addEventListener('click', () => {
            this.fetchDailyQuote();
        });

        // Modal Edit Event Listeners
        this.domCloseModalBtn.addEventListener('click', () => this.closeEditModal());
        this.domCancelModalBtn.addEventListener('click', () => this.closeEditModal());
        this.domEditForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSaveEdit();
        });

        // Menutup modal jika klik di luar box
        window.addEventListener('click', (e) => {
            if (e.target === this.domEditModal) {
                this.closeEditModal();
            }
        });
    }

    // ==========================================
    // MANAJEMEN TEMA (DARK / LIGHT)
    // ==========================================
    applyTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.THEME_KEY, theme);

        const iconSpan = document.getElementById('theme-icon');
        const textSpan = document.getElementById('theme-text');
        if (iconSpan && textSpan) {
            if (theme === 'dark') {
                iconSpan.textContent = '☀️';
                textSpan.textContent = 'Mode Terang';
            } else {
                iconSpan.textContent = '🌙';
                textSpan.textContent = 'Mode Gelap';
            }
        }
    }

    // ==========================================
    // JAM DIGITAL & GREETING REAL-TIME
    // ==========================================
    startRealTimeClock() {
        const updateClock = () => {
            const now = new Date();

            // Format Jam WIB (HH:MM:SS)
            const timeString = now.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });

            // Format Tanggal Indonesia
            const dateString = now.toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            if (this.domClock) this.domClock.textContent = `${timeString} WIB`;
            if (this.domDate) this.domDate.textContent = dateString;

            // Sambutan dinamis berdasarkan jam
            const currentHour = now.getHours();
            let greeting = 'Halo';
            if (currentHour >= 4 && currentHour < 11) {
                greeting = 'Selamat Pagi 🌅';
            } else if (currentHour >= 11 && currentHour < 15) {
                greeting = 'Selamat Siang ☀️';
            } else if (currentHour >= 15 && currentHour < 18) {
                greeting = 'Selamat Sore 🌇';
            } else {
                greeting = 'Selamat Malam 🌙';
            }

            if (this.domGreeting) {
                this.domGreeting.textContent = `${greeting}, Mahasiswa ITERA!`;
            }
        };

        updateClock();
        setInterval(updateClock, 1000);
    }

    // ==========================================
    // OPERASI LOCAL STORAGE
    // ==========================================
    loadTasksFromStorage() {
        try {
            const rawData = localStorage.getItem(this.STORAGE_KEY);
            if (rawData) {
                const parsedData = JSON.parse(rawData);
                // Map array objek ke instance class TaskItem
                this.tasks = parsedData.map(item => new TaskItem(item));
            } else {
                // Inisialisasi data bawaan untuk pertama kali
                this.seedInitialTasks();
            }
        } catch (error) {
            console.error('Gagal membaca data dari localStorage:', error);
            this.tasks = [];
        }
    }

    saveTasksToStorage() {
        try {
            const jsonArray = this.tasks.map(task => task.toJSON());
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(jsonArray));
        } catch (error) {
            console.error('Gagal menyimpan data ke localStorage:', error);
            this.showToast('Gagal menyimpan perubahan ke localStorage!', 'error');
        }
    }

    seedInitialTasks() {
        const defaultTasks = [
            new TaskItem({
                title: 'Praktikum Pemrograman Berbasis Web - Modul 2',
                course: 'Pemrograman Berbasis Web',
                deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
                priority: 'high',
                notes: 'Implementasi ES6+, Async/Await, dan LocalStorage pada Dashboard ITERA.',
                isCompleted: false
            }),
            new TaskItem({
                title: 'Review Materi Normalisasi Basis Data',
                course: 'Basis Data',
                deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
                priority: 'medium',
                notes: 'Pelajari konsep 1NF, 2NF, hingga 3NF beserta studi kasus tabel perpustakaan.',
                isCompleted: true
            }),
            new TaskItem({
                title: 'Persiapan Kuis Struktur Data',
                course: 'Struktur Data & Algoritma',
                deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
                priority: 'high',
                notes: 'Pelajari Binary Search Tree (BST) dan traversal Pre-order, In-order, Post-order.',
                isCompleted: false
            })
        ];

        this.tasks = [...defaultTasks];
        this.saveTasksToStorage();
    }

    // ==========================================
    // OPERASI CRUD DENGAN IMMUTABILITY & DESTRUCTURING
    // ==========================================

    /**
     * Tambah tugas baru menggunakan destructuring pada parameter & spread operator
     */
    addTask({ title, course, deadline, priority, notes }) {
        const newTask = new TaskItem({
            id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            title,
            course,
            deadline,
            priority,
            notes,
            isCompleted: false
        });

        // Memperbarui state secara immutable dengan Spread Operator
        this.tasks = [newTask, ...this.tasks];
        this.saveTasksToStorage();
        this.renderTasks();
        this.renderStatistics();
        this.showToast(`Tugas "${newTask.title}" berhasil ditambahkan!`, 'success');
    }

    /**
     * Update tugas dengan id tertentu menggunakan destructuring & spread operator
     */
    updateTask(id, { title, course, deadline, priority, notes }) {
        this.tasks = this.tasks.map(task => {
            if (task.id === id) {
                // Buat instance baru dengan penggabungan data lama dan pembaruan baru (immutability)
                return new TaskItem({
                    ...task.toJSON(),
                    title,
                    course,
                    deadline,
                    priority,
                    notes
                });
            }
            return task;
        });

        this.saveTasksToStorage();
        this.renderTasks();
        this.renderStatistics();
        this.showToast('Perubahan tugas berhasil disimpan!', 'success');
    }

    /**
     * Hapus tugas berdasarkan id
     */
    deleteTask(id) {
        const targetTask = this.tasks.find(t => t.id === id);
        const taskTitle = targetTask ? targetTask.title : 'Tugas';

        // Immutability: filter menghasilkan array baru
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasksToStorage();
        this.renderTasks();
        this.renderStatistics();
        this.showToast(`Tugas "${taskTitle}" berhasil dihapus.`, 'info');
    }

    /**
     * Toggle status selesai / belum selesai
     */
    toggleTaskStatus(id) {
        this.tasks = this.tasks.map(task => {
            if (task.id === id) {
                const updated = new TaskItem(task.toJSON());
                updated.toggleStatus();
                return updated;
            }
            return task;
        });

        this.saveTasksToStorage();
        this.renderTasks();
        this.renderStatistics();
    }

    /**
     * Hapus semua tugas yang berstatus selesai
     */
    handleClearCompleted() {
        const completedCount = this.tasks.filter(t => t.isCompleted).length;
        if (completedCount === 0) {
            this.showToast('Tidak ada tugas berstatus selesai untuk dihapus.', 'info');
            return;
        }

        if (confirm(`Yakin ingin menghapus ${completedCount} tugas yang sudah selesai?`)) {
            this.tasks = this.tasks.filter(t => !t.isCompleted);
            this.saveTasksToStorage();
            this.renderTasks();
            this.renderStatistics();
            this.showToast(`${completedCount} tugas selesai berhasil dibersihkan!`, 'success');
        }
    }

    // ==========================================
    // FORM HANDLERS
    // ==========================================
    handleAddTask() {
        const title = this.domInputTitle.value.trim();
        const course = this.domInputCourse.value.trim() || 'Umum';
        const deadline = this.domInputDeadline.value;
        const priority = this.domInputPriority.value;
        const notes = this.domInputNotes.value.trim();

        if (!title) {
            this.showToast('Judul tugas tidak boleh kosong!', 'error');
            return;
        }

        // Panggil method dengan object destructuring
        this.addTask({ title, course, deadline, priority, notes });
        this.domTaskForm.reset();
    }

    openEditModal(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        this.activeEditId = id;
        this.domEditTitle.value = task.title;
        this.domEditCourse.value = task.course;
        this.domEditDeadline.value = task.deadline || '';
        this.domEditPriority.value = task.priority;
        this.domEditNotes.value = task.notes || '';

        this.domEditModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeEditModal() {
        this.activeEditId = null;
        this.domEditModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleSaveEdit() {
        if (!this.activeEditId) return;

        const title = this.domEditTitle.value.trim();
        const course = this.domEditCourse.value.trim() || 'Umum';
        const deadline = this.domEditDeadline.value;
        const priority = this.domEditPriority.value;
        const notes = this.domEditNotes.value.trim();

        if (!title) {
            this.showToast('Judul tugas tidak boleh kosong!', 'error');
            return;
        }

        this.updateTask(this.activeEditId, { title, course, deadline, priority, notes });
        this.closeEditModal();
    }

    // ==========================================
    // RENDERING UI DENGAN TEMPLATE LITERALS
    // ==========================================
    getFilteredTasks() {
        return this.tasks.filter(task => {
            // Filter Status
            const matchStatus = 
                this.filterStatus === 'all' ? true :
                this.filterStatus === 'completed' ? task.isCompleted :
                !task.isCompleted;

            // Filter Prioritas
            const matchPriority = 
                this.filterPriority === 'all' ? true :
                task.priority === this.filterPriority;

            // Search Query
            const matchSearch = 
                task.title.toLowerCase().includes(this.searchQuery) ||
                task.course.toLowerCase().includes(this.searchQuery) ||
                task.notes.toLowerCase().includes(this.searchQuery);

            return matchStatus && matchPriority && matchSearch;
        });
    }

    renderTasks() {
        const filtered = this.getFilteredTasks();

        if (filtered.length === 0) {
            this.domTaskList.innerHTML = '';
            this.domEmptyState.style.display = 'block';
            return;
        }

        this.domEmptyState.style.display = 'none';

        // Render dinamis menggunakan Template Literals & Arrow Function
        this.domTaskList.innerHTML = filtered.map(task => {
            const isOverdue = task.isOverdue;
            const statusClass = task.isCompleted ? 'completed' : isOverdue ? 'overdue' : '';
            const priorityBadge = this.getPriorityBadge(task.priority);
            const remaining = task.getTimeRemaining();

            return `
                <div class="task-card ${statusClass}" data-id="${task.id}">
                    <div class="task-checkbox-col">
                        <button class="checkbox-btn ${task.isCompleted ? 'checked' : ''}" 
                                onclick="window.dashboard.toggleTaskStatus('${task.id}')"
                                title="${task.isCompleted ? 'Tandai belum selesai' : 'Tandai selesai'}">
                            ${task.isCompleted ? '✓' : ''}
                        </button>
                    </div>
                    <div class="task-body">
                        <div class="task-header-row">
                            <span class="course-badge">📚 ${this.escapeHTML(task.course)}</span>
                            <span class="priority-badge ${task.priority}">${priorityBadge}</span>
                            ${isOverdue ? '<span class="overdue-badge">⚠️ Melewati Deadline</span>' : ''}
                        </div>
                        <h3 class="task-title ${task.isCompleted ? 'text-strikethrough' : ''}">
                            ${this.escapeHTML(task.title)}
                        </h3>
                        ${task.notes ? `<p class="task-notes">📝 ${this.escapeHTML(task.notes)}</p>` : ''}
                        <div class="task-footer">
                            <span class="deadline-indicator" title="Tenggat Waktu">
                                🕒 ${task.formattedDeadline} (${remaining})
                            </span>
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="btn-action btn-edit" 
                                onclick="window.dashboard.openEditModal('${task.id}')"
                                title="Edit Tugas">
                            ✏️ Edit
                        </button>
                        <button class="btn-action btn-delete" 
                                onclick="window.dashboard.deleteTask('${task.id}')"
                                title="Hapus Tugas">
                            🗑️ Hapus
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderStatistics() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.isCompleted).length;
        const pending = total - completed;
        const urgent = this.tasks.filter(t => !t.isCompleted && (t.priority === 'high' || t.isOverdue)).length;

        if (this.domStatTotal) this.domStatTotal.textContent = total;
        if (this.domStatPending) this.domStatPending.textContent = pending;
        if (this.domStatCompleted) this.domStatCompleted.textContent = completed;
        if (this.domStatUrgent) this.domStatUrgent.textContent = urgent;
    }

    getPriorityBadge(priority) {
        switch (priority) {
            case 'high': return '🔥 Tinggi';
            case 'medium': return '⚡ Sedang';
            case 'low': return '🌱 Rendah';
            default: return 'Sedang';
        }
    }

    escapeHTML(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ==========================================
    // FUNGSI ASINKRON 1: CUACA ITERA (OPEN-METEO)
    // ==========================================
    /**
     * Mengambil data cuaca real-time kampus ITERA (Lampung Selatan)
     * Menggunakan Async / Await, Try-Catch, dan Destructuring parameter
     */
    async fetchWeather() {
        const LAT = -5.36;
        const LON = 105.31;
        const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`;

        this.domWeatherWidget.innerHTML = `
            <div class="loading-state">
                <span class="spinner"></span>
                <p>Memuat cuaca kampus ITERA...</p>
            </div>
        `;

        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Destructuring data current_weather
            const { current_weather } = data;
            const { temperature, windspeed, weathercode, time } = current_weather;

            this.renderWeather({ temperature, windspeed, weathercode, time });
        } catch (error) {
            console.error('Gagal mengambil cuaca Open-Meteo:', error);
            this.domWeatherWidget.innerHTML = `
                <div class="widget-error">
                    <span>⚠️</span>
                    <p>Gagal memuat cuaca ITERA. Periksa koneksi internet.</p>
                    <button class="btn-retry" onclick="window.dashboard.fetchWeather()">Coba Lagi</button>
                </div>
            `;
        }
    }

    /**
     * Render widget cuaca dengan Destructuring
     */
    renderWeather({ temperature, windspeed, weathercode, time }) {
        const { label, icon } = this.interpretWeatherCode(weathercode);
        const timeFormatted = time ? new Date(time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-';

        this.domWeatherWidget.innerHTML = `
            <div class="weather-card">
                <div class="weather-main">
                    <span class="weather-icon">${icon}</span>
                    <div class="weather-temp">
                        <span class="temp-val">${temperature}</span>
                        <span class="temp-unit">°C</span>
                    </div>
                </div>
                <div class="weather-details">
                    <h4 class="weather-label">${label}</h4>
                    <p class="weather-sub">📍 Kampus ITERA, Lampung Selatan</p>
                    <div class="weather-meta">
                        <span>💨 Kecepatan Angin: ${windspeed} km/h</span>
                        <span>🕒 Update: ${timeFormatted} WIB</span>
                    </div>
                </div>
            </div>
        `;
    }

    interpretWeatherCode(code) {
        // Interpretasi WMO Weather interpretation codes
        if (code === 0) return { label: 'Cerah Berawan', icon: '☀️' };
        if ([1, 2, 3].includes(code)) return { label: 'Sebagian Berawan', icon: '⛅' };
        if ([45, 48].includes(code)) return { label: 'Berkabut', icon: '🌫️' };
        if ([51, 53, 55, 61, 63, 65].includes(code)) return { label: 'Hujan Ringan', icon: '🌧️' };
        if ([80, 81, 82].includes(code)) return { label: 'Hujan Deras / Guyuran', icon: '⛈️' };
        if ([95, 96, 99].includes(code)) return { label: 'Badai Petir', icon: '⚡' };
        return { label: 'Cerah', icon: '🌤️' };
    }

    // ==========================================
    // FUNGSI ASINKRON 2: KUTIPAN HARIAN (DUMMYJSON)
    // ==========================================
    /**
     * Mengambil kutipan motivasi acak dari DummyJSON Quotes API
     * Menggunakan Async / Await
     */
    async fetchDailyQuote() {
        const endpoint = 'https://dummyjson.com/quotes/random';

        this.domQuoteWidget.innerHTML = `
            <div class="loading-state">
                <span class="spinner"></span>
                <p>Mengambil kutipan motivasi...</p>
            </div>
        `;

        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // Destructuring quote dan author
            const { quote, author } = data;

            this.renderQuote({ quote, author });
        } catch (error) {
            console.error('Gagal mengambil quote dari DummyJSON:', error);
            // Fallback quote offline jika API terkendala
            this.renderQuote({
                quote: 'Pendidikan adalah senjata paling mematikan di dunia, karena dengan pendidikan Anda dapat mengubah dunia.',
                author: 'Nelson Mandela'
            });
        }
    }

    renderQuote({ quote, author }) {
        this.domQuoteWidget.innerHTML = `
            <blockquote class="quote-box">
                <p class="quote-text">“${this.escapeHTML(quote)}”</p>
                <cite class="quote-author">— ${this.escapeHTML(author)}</cite>
            </blockquote>
        `;
    }

    // ==========================================
    // FUNGSI ASINKRON 3: IMPORT DATA DARI JSONPLACEHOLDER
    // ==========================================
    /**
     * Mengambil data todo simulasi dari JSONPlaceholder untuk inisialisasi / sampel
     * Menggunakan Async / Await dan Spread Operator untuk merging
     */
    async importSampleTodos() {
        const endpoint = 'https://jsonplaceholder.typicode.com/todos?_limit=4';

        this.showToast('Mengimpor tugas sampel dari JSONPlaceholder...', 'info');

        try {
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error('Gagal menghubungi JSONPlaceholder');

            const sampleList = await response.json();

            // Transformasi array API ke array TaskItem menggunakan Arrow Function & Destructuring
            const newTasks = sampleList.map(({ id, title, completed }) => {
                const priorityOptions = ['low', 'medium', 'high'];
                const randomPriority = priorityOptions[Math.floor(Math.random() * priorityOptions.length)];

                return new TaskItem({
                    id: `import_${id}_${Date.now()}`,
                    title: `[Sampel API] ${title}`,
                    course: 'Proyek Integrasi Web',
                    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
                    priority: randomPriority,
                    notes: 'Tugas ini diimpor secara otomatis dari endpoint JSONPlaceholder API.',
                    isCompleted: completed
                });
            });

            // Penggabungan data secara immutable menggunakan Spread Operator
            this.tasks = [...newTasks, ...this.tasks];
            this.saveTasksToStorage();
            this.renderTasks();
            this.renderStatistics();
            this.showToast(`Berhasil mengimpor ${newTasks.length} tugas sampel!`, 'success');
        } catch (error) {
            console.error('Gagal import dari JSONPlaceholder:', error);
            this.showToast('Gagal mengimpor tugas sampel dari internet.', 'error');
        }
    }

    // ==========================================
    // SISTEM NOTIFIKASI TOAST INTERAKTIF
    // ==========================================
    showToast(message, type = 'info') {
        if (!this.domToastContainer) return;

        const icons = {
            success: '✅',
            error: '❌',
            info: 'ℹ️'
        };

        const toast = document.createElement('div');
        toast.className = `toast-item toast-${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || '🔔'}</span>
            <span class="toast-msg">${this.escapeHTML(message)}</span>
        `;

        this.domToastContainer.appendChild(toast);

        // Hapus otomatis setelah 3 detik dengan transisi
        setTimeout(() => {
            toast.classList.add('toast-fadeout');
            setTimeout(() => {
                if (toast.parentElement) toast.remove();
            }, 300);
        }, 3200);
    }
}
