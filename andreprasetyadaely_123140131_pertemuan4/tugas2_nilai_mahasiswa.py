"""
Program Pengelolaan Nilai Mahasiswa
Mata Kuliah: Praktikum Pemrograman Python / Pengembangan Aplikasi Web
Nama : Andre Prasetya Daely
NIM  : 123140131
"""


def hitung_nilai_akhir(uts: float, uas: float, tugas: float) -> float:
    """
    Menghitung nilai akhir mahasiswa berdasarkan bobot persentase:
    30% UTS + 40% UAS + 30% Tugas.

    Parameter:
        uts (float): Nilai Ujian Tengah Semester (UTS).
        uas (float): Nilai Ujian Akhir Semester (UAS).
        tugas (float): Nilai Tugas.

    Mengembalikan:
        float: Nilai akhir hasil perhitungan bobot.
    """
    return (0.30 * uts) + (0.40 * uas) + (0.30 * tugas)


def tentukan_grade(nilai_akhir: float) -> str:
    """
    Menentukan grade huruf mahasiswa berdasarkan nilai akhir.

    Ketentuan:
        - Nilai >= 80 : A
        - Nilai >= 70 : B
        - Nilai >= 60 : C
        - Nilai >= 50 : D
        - Nilai < 50  : E

    Parameter:
        nilai_akhir (float): Nilai akhir mahasiswa.

    Mengembalikan:
        str: Grade huruf (A, B, C, D, atau E).
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


def main():
    """Fungsi utama untuk memproses dan menampilkan data nilai mahasiswa."""
    # List berisi 5 data mahasiswa dalam bentuk dictionary
    daftar_mahasiswa = [
        {"nama": "Budi Santoso", "nim": "123140001", "nilai_uts": 85.0, "nilai_uas": 90.0, "nilai_tugas": 80.0},
        {"nama": "Siti Aminah", "nim": "123140002", "nilai_uts": 75.0, "nilai_uas": 72.0, "nilai_tugas": 82.0},
        {"nama": "Rian Pratama", "nim": "123140003", "nilai_uts": 62.0, "nilai_uas": 68.0, "nilai_tugas": 65.0},
        {"nama": "Dewi Lestari", "nim": "123140004", "nilai_uts": 95.0, "nilai_uas": 92.0, "nilai_tugas": 90.0},
        {"nama": "Eko Kurniawan", "nim": "123140005", "nilai_uts": 45.0, "nilai_uas": 40.0, "nilai_tugas": 52.0},
    ]

    # Perulangan untuk menghitung nilai akhir dan menentukan grade masing-masing mahasiswa
    for mhs in daftar_mahasiswa:
        mhs["nilai_akhir"] = hitung_nilai_akhir(
            mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"]
        )
        mhs["grade"] = tentukan_grade(mhs["nilai_akhir"])

    # Menampilkan data seluruh mahasiswa dalam tabel terminal yang rapi
    print("=" * 82)
    print("                         DAFTAR NILAI AKHIR MAHASISWA")
    print("=" * 82)
    header = f"{'No':<4} | {'NIM':<10} | {'Nama Mahasiswa':<18} | {'UTS':<6} | {'UAS':<6} | {'Tugas':<6} | {'Akhir':<7} | {'Grade':<5}"
    print(header)
    print("-" * 82)

    for i, mhs in enumerate(daftar_mahasiswa, start=1):
        print(
            f"{i:<4} | {mhs['nim']:<10} | {mhs['nama']:<18} | "
            f"{mhs['nilai_uts']:<6.1f} | {mhs['nilai_uas']:<6.1f} | {mhs['nilai_tugas']:<6.1f} | "
            f"{mhs['nilai_akhir']:<7.2f} | {mhs['grade']:<5}"
        )
    print("=" * 82)

    # Mencari mahasiswa dengan nilai akhir tertinggi dan terendah menggunakan perulangan
    mhs_tertinggi = daftar_mahasiswa[0]
    mhs_terendah = daftar_mahasiswa[0]

    for mhs in daftar_mahasiswa[1:]:
        if mhs["nilai_akhir"] > mhs_tertinggi["nilai_akhir"]:
            mhs_tertinggi = mhs
        if mhs["nilai_akhir"] < mhs_terendah["nilai_akhir"]:
            mhs_terendah = mhs

    # Menampilkan ringkasan mahasiswa dengan nilai tertinggi dan terendah
    print("\nRINGKASAN NILAI MAHASISWA:")
    print(
        f"- Nilai Tertinggi : {mhs_tertinggi['nama']} ({mhs_tertinggi['nim']}) "
        f"dengan Nilai Akhir {mhs_tertinggi['nilai_akhir']:.2f} (Grade {mhs_tertinggi['grade']})"
    )
    print(
        f"- Nilai Terendah  : {mhs_terendah['nama']} ({mhs_terendah['nim']}) "
        f"dengan Nilai Akhir {mhs_terendah['nilai_akhir']:.2f} (Grade {mhs_terendah['grade']})"
    )
    print("=" * 82)


if __name__ == "__main__":
    main()
