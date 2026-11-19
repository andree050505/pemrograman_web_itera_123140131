"""
Program Utama Pengujian Modul math_operations (main.py)
Mata Kuliah: Praktikum Pemrograman Python / Pengembangan Aplikasi Web
Nama : Andre Prasetya Daely
NIM  : 123140131
"""

# Cara Impor 1: Mengimpor seluruh modul secara utuh
import math_operations

# Cara Impor 2: Mengimpor konstanta dan fungsi spesifik secara langsung
from math_operations import (
    PI,
    luas_lingkaran,
    keliling_lingkaran,
    celsius_ke_fahrenheit,
    celsius_ke_kelvin,
)


def main():
    """Fungsi utama untuk memanggil dan menguji seluruh fungsi pada modul math_operations."""
    print("=" * 65)
    print("           PENGUJIAN MODUL OPERASI MATEMATIKA & SUHU")
    print("=" * 65)

    # ---------------------------------------------------------
    # 1. Pengujian Persegi
    # Menggunakan metode pemanggilan Cara Impor 1 (math_operations.<fungsi>)
    # ---------------------------------------------------------
    sisi = 6.0
    luas_p = math_operations.luas_persegi(sisi)
    kel_p = math_operations.keliling_persegi(sisi)

    print("\n[1] Bangun Datar: Persegi")
    print("    Metode Pemanggilan : math_operations.<fungsi>")
    print(f"    - Panjang Sisi        : {sisi}")
    print(f"    - Luas Persegi        : {luas_p:.2f}")
    print(f"    - Keliling Persegi    : {kel_p:.2f}")

    # ---------------------------------------------------------
    # 2. Pengujian Persegi Panjang
    # Menggunakan metode pemanggilan Cara Impor 1 (math_operations.<fungsi>)
    # ---------------------------------------------------------
    panjang = 8.0
    lebar = 5.0
    luas_pp = math_operations.luas_persegi_panjang(panjang, lebar)
    kel_pp = math_operations.keliling_persegi_panjang(panjang, lebar)

    print("\n[2] Bangun Datar: Persegi Panjang")
    print("    Metode Pemanggilan : math_operations.<fungsi>")
    print(f"    - Panjang             : {panjang}")
    print(f"    - Lebar               : {lebar}")
    print(f"    - Luas Persegi Panjang: {luas_pp:.2f}")
    print(f"    - Keliling P. Panjang : {kel_pp:.2f}")

    # ---------------------------------------------------------
    # 3. Pengujian Lingkaran
    # Menggunakan metode pemanggilan Cara Impor 2 (pemanggilan langsung)
    # ---------------------------------------------------------
    jari_jari = 7.0
    luas_ling = luas_lingkaran(jari_jari)
    kel_ling = keliling_lingkaran(jari_jari)

    print("\n[3] Bangun Datar: Lingkaran")
    print("    Metode Pemanggilan : from math_operations import ...")
    print(f"    - Konstanta PI        : {PI}")
    print(f"    - Jari-jari (r)       : {jari_jari}")
    print(f"    - Luas Lingkaran      : {luas_ling:.2f}")
    print(f"    - Keliling Lingkaran  : {kel_ling:.2f}")

    # ---------------------------------------------------------
    # 4. Pengujian Konversi Suhu
    # Menggunakan metode pemanggilan Cara Impor 2 (pemanggilan langsung)
    # ---------------------------------------------------------
    suhu_celsius = 100.0
    suhu_fahrenheit = celsius_ke_fahrenheit(suhu_celsius)
    suhu_kelvin = celsius_ke_kelvin(suhu_celsius)

    print("\n[4] Konversi Suhu")
    print("    Metode Pemanggilan : from math_operations import ...")
    print(f"    - Suhu Celsius        : {suhu_celsius:.1f} C")
    print(f"    - Suhu Fahrenheit     : {suhu_fahrenheit:.2f} F")
    print(f"    - Suhu Kelvin         : {suhu_kelvin:.2f} K")

    print("\n" + "=" * 65)
    print("        SELURUH FUNGSI PADA MODUL BERHASIL DIUJI COBA")
    print("=" * 65)


if __name__ == "__main__":
    main()
