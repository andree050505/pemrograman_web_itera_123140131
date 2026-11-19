"""
Modul Operasi Matematika dan Konversi Suhu (math_operations.py)
Mata Kuliah: Praktikum Pemrograman Python / Pengembangan Aplikasi Web
Nama : Andre Prasetya Daely
NIM  : 123140131
"""

# Konstanta Nilai Pi
PI = 3.14159


# ==========================================
# 1. Bangun Datar: Persegi
# ==========================================

def luas_persegi(sisi: float) -> float:
    """
    Menghitung luas bangun datar persegi.

    Rumus:
        Luas = sisi * sisi

    Parameter:
        sisi (float): Panjang sisi persegi.

    Mengembalikan:
        float: Luas persegi.
    """
    return sisi * sisi


def keliling_persegi(sisi: float) -> float:
    """
    Menghitung keliling bangun datar persegi.

    Rumus:
        Keliling = 4 * sisi

    Parameter:
        sisi (float): Panjang sisi persegi.

    Mengembalikan:
        float: Keliling persegi.
    """
    return 4 * sisi


# ==========================================
# 2. Bangun Datar: Persegi Panjang
# ==========================================

def luas_persegi_panjang(panjang: float, lebar: float) -> float:
    """
    Menghitung luas bangun datar persegi panjang.

    Rumus:
        Luas = panjang * lebar

    Parameter:
        panjang (float): Panjang persegi panjang.
        lebar (float): Lebar persegi panjang.

    Mengembalikan:
        float: Luas persegi panjang.
    """
    return panjang * lebar


def keliling_persegi_panjang(panjang: float, lebar: float) -> float:
    """
    Menghitung keliling bangun datar persegi panjang.

    Rumus:
        Keliling = 2 * (panjang + lebar)

    Parameter:
        panjang (float): Panjang persegi panjang.
        lebar (float): Lebar persegi panjang.

    Mengembalikan:
        float: Keliling persegi panjang.
    """
    return 2 * (panjang + lebar)


# ==========================================
# 3. Bangun Datar: Lingkaran
# ==========================================

def luas_lingkaran(jari_jari: float) -> float:
    """
    Menghitung luas bangun datar lingkaran.

    Rumus:
        Luas = PI * (jari_jari ^ 2)

    Parameter:
        jari_jari (float): Jari-jari lingkaran.

    Mengembalikan:
        float: Luas lingkaran.
    """
    return PI * (jari_jari ** 2)


def keliling_lingkaran(jari_jari: float) -> float:
    """
    Menghitung keliling bangun datar lingkaran.

    Rumus:
        Keliling = 2 * PI * jari_jari

    Parameter:
        jari_jari (float): Jari-jari lingkaran.

    Mengembalikan:
        float: Keliling lingkaran.
    """
    return 2 * PI * jari_jari


# ==========================================
# 4. Konversi Suhu
# ==========================================

def celsius_ke_fahrenheit(celsius: float) -> float:
    """
    Mengonversi suhu dari satuan Celsius ke Fahrenheit.

    Rumus:
        Fahrenheit = (9 / 5 * celsius) + 32

    Parameter:
        celsius (float): Suhu dalam skala Celsius.

    Mengembalikan:
        float: Nilai suhu dalam skala Fahrenheit.
    """
    return (9 / 5 * celsius) + 32


def celsius_ke_kelvin(celsius: float) -> float:
    """
    Mengonversi suhu dari satuan Celsius ke Kelvin.

    Rumus:
        Kelvin = celsius + 273.15

    Parameter:
        celsius (float): Suhu dalam skala Celsius.

    Mengembalikan:
        float: Nilai suhu dalam skala Kelvin.
    """
    return celsius + 273.15
