// ========================================================
// Mini POS (Kasir Kantin Kampus)
// JavaScript Vanilla untuk Logika Aplikasi
// ========================================================

// Key untuk localStorage
const STORAGE_KEY = "MINI_POS_KERANJANG";

// State data keranjang (dimuat dari localStorage saat inisialisasi)
let keranjang = [];

// Elemen DOM
const formBarang = document.getElementById("formBarang");
const inputNama = document.getElementById("namaBarang");
const inputHarga = document.getElementById("hargaBarang");
const inputQty = document.getElementById("qtyBarang");
const inputUangBayar = document.getElementById("uangBayar");

const errorNama = document.getElementById("errorNama");
const errorHarga = document.getElementById("errorHarga");
const errorQty = document.getElementById("errorQty");

const bodyKeranjang = document.getElementById("bodyKeranjang");
const itemCount = document.getElementById("itemCount");
const elTotalBelanja = document.getElementById("totalBelanja");
const elDiskon = document.getElementById("diskon");
const elTotalAkhir = document.getElementById("totalAkhir");

const paymentStatusBox = document.getElementById("paymentStatusBox");
const statusLabel = document.getElementById("statusLabel");
const statusValue = document.getElementById("statusValue");
const infoKembalian = document.getElementById("infoKembalian");
const btnResetTransaksi = document.getElementById("btnResetTransaksi");

// ========================================================
// Utility: Format Angka ke Rupiah
// ========================================================
function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(angka);
}

// ========================================================
// LocalStorage: Simpan dan Muat Data
// ========================================================
function simpanKeLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(keranjang));
}

function muatDariLocalStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      keranjang = JSON.parse(data);
    } catch (e) {
      keranjang = [];
    }
  } else {
    keranjang = [];
  }
}

// ========================================================
// Validasi Form Input Barang
// ========================================================
function bersihkanError() {
  errorNama.textContent = "";
  errorHarga.textContent = "";
  errorQty.textContent = "";

  inputNama.classList.remove("is-invalid");
  inputHarga.classList.remove("is-invalid");
  inputQty.classList.remove("is-invalid");
}

function validasiInput(nama, harga, qty) {
  let isValid = true;
  bersihkanError();

  // 1. Validasi Nama Barang (wajib diisi, minimal 3 karakter)
  if (!nama || nama.trim().length < 3) {
    errorNama.textContent = "Nama barang wajib diisi, minimal 3 karakter.";
    inputNama.classList.add("is-invalid");
    isValid = false;
  }

  // 2. Validasi Harga (angka dan minimal Rp500)
  const numHarga = Number(harga);
  if (harga === "" || isNaN(numHarga) || numHarga < 500) {
    errorHarga.textContent = "Harga wajib berupa angka dan minimal Rp500.";
    inputHarga.classList.add("is-invalid");
    isValid = false;
  }

  // 3. Validasi Qty (bilangan bulat minimal 1)
  const numQty = Number(qty);
  if (qty === "" || !Number.isInteger(numQty) || numQty < 1) {
    errorQty.textContent = "Qty wajib berupa bilangan bulat minimal 1.";
    inputQty.classList.add("is-invalid");
    isValid = false;
  }

  return isValid;
}

// ========================================================
// Penambahan & Penghapusan Barang
// ========================================================
function tambahBarang(event) {
  event.preventDefault();

  const nama = inputNama.value;
  const harga = inputHarga.value;
  const qty = inputQty.value;

  if (!validasiInput(nama, harga, qty)) {
    return;
  }

  const barangBaru = {
    id: Date.now(),
    nama: nama.trim(),
    harga: Number(harga),
    qty: Number(qty)
  };

  keranjang.push(barangBaru);
  simpanKeLocalStorage();

  // Reset form setelah berhasil
  formBarang.reset();
  inputQty.value = "1";
  bersihkanError();
  inputNama.focus();

  renderKeranjang();
}

function hapusBarang(id) {
  keranjang = keranjang.filter((item) => item.id !== id);
  simpanKeLocalStorage();
  renderKeranjang();
}

// ========================================================
// Kalkulasi Transaksi & Render Keranjang
// ========================================================
function hitungTotal() {
  const totalBelanja = keranjang.reduce((acc, item) => acc + item.harga * item.qty, 0);

  // Diskon 10% jika belanja minimal Rp50.000
  let diskon = 0;
  if (totalBelanja >= 50000) {
    diskon = totalBelanja * 0.1;
  }

  const totalAkhir = totalBelanja - diskon;

  return { totalBelanja, diskon, totalAkhir };
}

function updatePembayaran(totalAkhir) {
  const uangBayarValue = inputUangBayar.value.trim();

  // Reset class status
  paymentStatusBox.classList.remove("status-success", "status-warning");

  if (totalAkhir === 0) {
    statusLabel.textContent = "Status Pembayaran:";
    statusValue.textContent = "Keranjang belanja kosong";
    infoKembalian.textContent = formatRupiah(0);
    return;
  }

  if (uangBayarValue === "") {
    statusLabel.textContent = "Status Pembayaran:";
    statusValue.textContent = "Silakan masukkan uang bayar";
    infoKembalian.textContent = formatRupiah(0);
    return;
  }

  const uangBayar = Number(uangBayarValue);

  if (isNaN(uangBayar) || uangBayar < 0) {
    statusLabel.textContent = "Status Pembayaran:";
    statusValue.textContent = "Nominal uang bayar tidak valid";
    infoKembalian.textContent = formatRupiah(0);
    paymentStatusBox.classList.add("status-warning");
    return;
  }

  if (uangBayar >= totalAkhir) {
    const kembalian = uangBayar - totalAkhir;
    statusLabel.textContent = "Status: Pembayaran Cukup";
    statusValue.textContent = "Kembalian:";
    infoKembalian.textContent = formatRupiah(kembalian);
    paymentStatusBox.classList.add("status-success");
  } else {
    const kekurangan = totalAkhir - uangBayar;
    statusLabel.textContent = "Status: Pembayaran Kurang";
    statusValue.textContent = "Kekurangan Pembayaran:";
    infoKembalian.textContent = formatRupiah(kekurangan);
    paymentStatusBox.classList.add("status-warning");
  }
}

function renderKeranjang() {
  bodyKeranjang.innerHTML = "";

  if (keranjang.length === 0) {
    bodyKeranjang.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">
          Keranjang belanja masih kosong. Tambahkan barang di formulir samping.
        </td>
      </tr>
    `;
    itemCount.textContent = "0 Item";
  } else {
    itemCount.textContent = `${keranjang.length} Item`;

    keranjang.forEach((item, index) => {
      const subtotal = item.harga * item.qty;
      const row = document.createElement("tr");

      row.innerHTML = `
        <td class="text-center">${index + 1}</td>
        <td><strong>${escapeHtml(item.nama)}</strong></td>
        <td>${formatRupiah(item.harga)}</td>
        <td class="text-center">${item.qty}</td>
        <td><strong>${formatRupiah(subtotal)}</strong></td>
        <td class="text-center">
          <button type="button" class="btn btn-danger" onclick="hapusBarang(${item.id})">
            Hapus
          </button>
        </td>
      `;

      bodyKeranjang.appendChild(row);
    });
  }

  // Hitung total dan perbarui tampilan ringkasan
  const { totalBelanja, diskon, totalAkhir } = hitungTotal();
  elTotalBelanja.textContent = formatRupiah(totalBelanja);
  elDiskon.textContent = formatRupiah(diskon);
  elTotalAkhir.textContent = formatRupiah(totalAkhir);

  // Perbarui status kalkulasi uang bayar
  updatePembayaran(totalAkhir);
}

// Utility pencegah XSS pada input nama barang
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ========================================================
// Transaksi Baru (Reset Keranjang & LocalStorage)
// ========================================================
function resetTransaksi() {
  if (keranjang.length === 0 && !inputUangBayar.value) {
    alert("Keranjang sudah kosong.");
    return;
  }

  const konfirmasi = confirm("Apakah Anda yakin ingin memulai transaksi baru? Keranjang belanja akan dikosongkan.");
  if (konfirmasi) {
    keranjang = [];
    localStorage.removeItem(STORAGE_KEY);
    inputUangBayar.value = "";
    bersihkanError();
    formBarang.reset();
    inputQty.value = "1";
    renderKeranjang();
  }
}

// ========================================================
// Event Listeners & Inisialisasi
// ========================================================
formBarang.addEventListener("submit", tambahBarang);

inputUangBayar.addEventListener("input", () => {
  const { totalAkhir } = hitungTotal();
  updatePembayaran(totalAkhir);
});

btnResetTransaksi.addEventListener("click", resetTransaksi);

// Inisialisasi aplikasi saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
  muatDariLocalStorage();
  renderKeranjang();
});
