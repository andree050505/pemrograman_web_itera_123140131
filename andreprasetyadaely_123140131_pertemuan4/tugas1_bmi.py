"""
Program Penghitung Body Mass Index (BMI)
Mata Kuliah: Praktikum Pemrograman Python / Pengembangan Aplikasi Web
Nama : Andre Prasetya Daely
NIM  : 123140131
"""


def hitung_bmi(berat: float, tinggi: float) -> float:
    """
    Menghitung nilai Body Mass Index (BMI).

    Parameter:
        berat (float): Berat badan dalam satuan kilogram (kg).
        tinggi (float): Tinggi badan dalam satuan meter (m).

    Mengembalikan:
        float: Nilai BMI hasil perhitungan (berat / (tinggi * tinggi)).
    """
    return berat / (tinggi * tinggi)


def tentukan_kategori(bmi: float) -> str:
    """
    Menentukan kategori berat badan berdasarkan nilai BMI menggunakan percabangan if-elif-else.

    Ketentuan:
        - BMI < 18.5 : Berat badan kurang
        - BMI < 25   : Berat badan normal
        - BMI < 30   : Berat badan berlebih
        - Selain itu : Obesitas

    Parameter:
        bmi (float): Nilai BMI yang akan dikategorikan.

    Mengembalikan:
        str: Kategori BMI.
    """
    if bmi < 18.5:
        return "Berat badan kurang"
    elif bmi < 25:
        return "Berat badan normal"
    elif bmi < 30:
        return "Berat badan berlebih"
    else:
        return "Obesitas"


def main():
    """Fungsi utama untuk menjalankan alur program penghitung BMI."""
    print("=" * 45)
    print("       PROGRAM PENGHITUNG BMI (BODY MASS INDEX)")
    print("=" * 45)

    try:
        # Input data berat dan tinggi badan
        berat = float(input("Masukkan berat badan (kg)           : "))
        tinggi = float(input("Masukkan tinggi badan (m / contoh: 1.65): "))

        # Validasi: berat dan tinggi harus bernilai positif (> 0)
        if berat <= 0 or tinggi <= 0:
            print("\n[ERROR] Berat dan tinggi badan harus berupa angka positif (> 0) serta tinggi tidak boleh nol!")
            return

        # Penyesuaian otomatis jika pengguna memasukkan tinggi dalam satuan cm (misal: 165 bukan 1.65)
        if tinggi > 3.0:
            print(f"[INFO] Tinggi {tinggi:.0f} terdeteksi dalam cm, otomatis dikonversi menjadi {tinggi / 100:.2f} m.")
            tinggi = tinggi / 100

        # Perhitungan BMI dan penentuan kategori
        nilai_bmi = hitung_bmi(berat, tinggi)
        kategori = tentukan_kategori(nilai_bmi)

        # Output hasil perhitungan dengan 2 angka desimal menggunakan f-string
        print("-" * 45)
        print(f"Nilai BMI Anda : {nilai_bmi:.2f}")
        print(f"Kategori       : {kategori}")
        print("=" * 45)

    except ValueError:
        print("\n[ERROR] Input tidak valid! Harap masukkan data dalam bentuk angka.")


if __name__ == "__main__":
    main()
