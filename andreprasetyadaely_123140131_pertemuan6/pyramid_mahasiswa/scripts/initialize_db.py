import argparse
import sys
from datetime import date
import transaction

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from .. import models


def setup_models(dbsession):
    """Menambahkan data awal (seeding) mahasiswa dan mata kuliah ke database.
    Dilengkapi pengecekan agar tidak terjadi duplikasi data ketika dijalankan ulang.
    """
    # 1. Seeding Data Mahasiswa
    initial_mahasiswa = [
        {
            'nim': '12345',
            'nama': 'Budi Santoso',
            'jurusan': 'Teknik Informatika',
            'tanggal_lahir': date(2000, 5, 15),
            'alamat': 'Jl. Merdeka No. 123, Bandung'
        },
        {
            'nim': '54321',
            'nama': 'Siti Aminah',
            'jurusan': 'Sistem Informasi',
            'tanggal_lahir': date(2001, 8, 22),
            'alamat': 'Jl. Mawar No. 45, Jakarta'
        }
    ]

    for m_data in initial_mahasiswa:
        exists = dbsession.query(models.Mahasiswa).filter_by(nim=m_data['nim']).first()
        if not exists:
            m = models.Mahasiswa(**m_data)
            dbsession.add(m)
            print(f"Data Mahasiswa ditambahkan: {m_data['nim']} - {m_data['nama']}")
        else:
            print(f"Data Mahasiswa {m_data['nim']} sudah ada, melewati...")

    # 2. Seeding Data Mata Kuliah
    initial_matakuliah = [
        {
            'kode_mk': 'IF2110',
            'nama_mk': 'Pemrograman Web',
            'sks': 3,
            'semester': 3
        },
        {
            'kode_mk': 'IF3140',
            'nama_mk': 'Basis Data',
            'sks': 3,
            'semester': 5
        },
        {
            'kode_mk': 'IF2210',
            'nama_mk': 'Struktur Data',
            'sks': 3,
            'semester': 4
        }
    ]

    for mk_data in initial_matakuliah:
        exists = dbsession.query(models.Matakuliah).filter_by(kode_mk=mk_data['kode_mk']).first()
        if not exists:
            mk = models.Matakuliah(**mk_data)
            dbsession.add(mk)
            print(f"Data Mata Kuliah ditambahkan: {mk_data['kode_mk']} - {mk_data['nama_mk']}")
        else:
            print(f"Data Mata Kuliah {mk_data['kode_mk']} sudah ada, melewati...")


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        with transaction.manager:
            dbsession = env['request'].dbsession
            setup_models(dbsession)
            print("Berhasil menyelesaikan proses seeding database!")
    except OperationalError as e:
        print("Pyramid gagal terhubung ke database SQL.")
        print("Pastikan service PostgreSQL berjalan dan connection string di development.ini benar.")
        print(f"Detail error: {e}")


if __name__ == '__main__':
    main()
