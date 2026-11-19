from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPNotFound,
    HTTPBadRequest,
)
from ..models import Matakuliah


# 1. READ ALL: Menampilkan daftar seluruh mata kuliah
@view_config(route_name='matakuliah_list', renderer='json')
def matakuliah_list(request):
    """View untuk mengambil semua data mata kuliah"""
    dbsession = request.dbsession
    matakuliahs = dbsession.query(Matakuliah).order_by(Matakuliah.id.asc()).all()
    return {'matakuliahs': [m.to_dict() for m in matakuliahs]}


# 2. READ ONE: Menampilkan detail satu mata kuliah berdasarkan ID
@view_config(route_name='matakuliah_detail', renderer='json')
def matakuliah_detail(request):
    """View untuk melihat detail satu mata kuliah berdasarkan ID di URL"""
    dbsession = request.dbsession
    mk_id = request.matchdict['id']

    matakuliah = dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if matakuliah is None:
        return HTTPNotFound(json_body={'error': f'Mata kuliah dengan ID {mk_id} tidak ditemukan'})

    return {'matakuliah': matakuliah.to_dict()}


# 3. CREATE: Menambahkan data mata kuliah baru
@view_config(route_name='matakuliah_add', request_method='POST', renderer='json')
def matakuliah_add(request):
    """View untuk menambahkan mata kuliah baru dari payload JSON"""
    try:
        json_data = request.json_body
    except Exception:
        return HTTPBadRequest(json_body={'error': 'Payload request harus berupa JSON yang valid'})

    try:
        # Validasi kelengkapan field wajib
        required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']
        for field in required_fields:
            if field not in json_data or json_data[field] is None or json_data[field] == '':
                return HTTPBadRequest(json_body={'error': f'Field {field} wajib diisi!'})

        kode_mk = str(json_data['kode_mk']).strip()
        nama_mk = str(json_data['nama_mk']).strip()

        if not kode_mk:
            return HTTPBadRequest(json_body={'error': 'Field kode_mk tidak boleh kosong!'})
        if not nama_mk:
            return HTTPBadRequest(json_body={'error': 'Field nama_mk tidak boleh kosong!'})

        # Validasi sks: harus bilangan bulat positif > 0
        try:
            sks = int(json_data['sks'])
            if sks <= 0:
                return HTTPBadRequest(json_body={'error': 'SKS harus berupa bilangan bulat positif (lebih dari 0)!'})
        except (ValueError, TypeError):
            return HTTPBadRequest(json_body={'error': 'SKS harus berupa bilangan bulat!'})

        # Validasi semester: harus bilangan bulat positif > 0
        try:
            semester = int(json_data['semester'])
            if semester <= 0:
                return HTTPBadRequest(json_body={'error': 'Semester harus berupa bilangan bulat positif (lebih dari 0)!'})
        except (ValueError, TypeError):
            return HTTPBadRequest(json_body={'error': 'Semester harus berupa bilangan bulat!'})

        dbsession = request.dbsession

        # Cek apakah kode_mk sudah terdaftar (duplikat)
        existing_mk = dbsession.query(Matakuliah).filter_by(kode_mk=kode_mk).first()
        if existing_mk:
            return HTTPBadRequest(json_body={'error': f'Mata kuliah dengan kode {kode_mk} sudah terdaftar!'})

        # Simpan mata kuliah baru ke database
        matakuliah = Matakuliah(
            kode_mk=kode_mk,
            nama_mk=nama_mk,
            sks=sks,
            semester=semester
        )
        dbsession.add(matakuliah)
        dbsession.flush()

        return {'success': True, 'matakuliah': matakuliah.to_dict()}

    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


# 4. UPDATE: Mengubah data mata kuliah yang sudah ada
@view_config(route_name='matakuliah_update', request_method='PUT', renderer='json')
def matakuliah_update(request):
    """View untuk memperbarui data mata kuliah berdasarkan ID"""
    dbsession = request.dbsession
    mk_id = request.matchdict['id']

    matakuliah = dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if matakuliah is None:
        return HTTPNotFound(json_body={'error': f'Mata kuliah dengan ID {mk_id} tidak ditemukan'})

    try:
        json_data = request.json_body
    except Exception:
        return HTTPBadRequest(json_body={'error': 'Payload request harus berupa JSON yang valid'})

    try:
        # Update kode_mk jika disertakan
        if 'kode_mk' in json_data:
            new_kode = str(json_data['kode_mk']).strip()
            if not new_kode:
                return HTTPBadRequest(json_body={'error': 'Field kode_mk tidak boleh kosong!'})
            # Jika kode berubah, pastikan tidak duplikat dengan mata kuliah lain
            if new_kode != matakuliah.kode_mk:
                existing_mk = dbsession.query(Matakuliah).filter_by(kode_mk=new_kode).first()
                if existing_mk:
                    return HTTPBadRequest(json_body={'error': f'Kode mata kuliah {new_kode} sudah digunakan oleh mata kuliah lain!'})
            matakuliah.kode_mk = new_kode

        # Update nama_mk jika disertakan
        if 'nama_mk' in json_data:
            new_nama = str(json_data['nama_mk']).strip()
            if not new_nama:
                return HTTPBadRequest(json_body={'error': 'Field nama_mk tidak boleh kosong!'})
            matakuliah.nama_mk = new_nama

        # Update sks jika disertakan
        if 'sks' in json_data:
            try:
                sks = int(json_data['sks'])
                if sks <= 0:
                    return HTTPBadRequest(json_body={'error': 'SKS harus berupa bilangan bulat positif (lebih dari 0)!'})
                matakuliah.sks = sks
            except (ValueError, TypeError):
                return HTTPBadRequest(json_body={'error': 'SKS harus berupa bilangan bulat!'})

        # Update semester jika disertakan
        if 'semester' in json_data:
            try:
                semester = int(json_data['semester'])
                if semester <= 0:
                    return HTTPBadRequest(json_body={'error': 'Semester harus berupa bilangan bulat positif (lebih dari 0)!'})
                matakuliah.semester = semester
            except (ValueError, TypeError):
                return HTTPBadRequest(json_body={'error': 'Semester harus berupa bilangan bulat!'})

        return {'success': True, 'matakuliah': matakuliah.to_dict()}

    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


# 5. DELETE: Menghapus data mata kuliah
@view_config(route_name='matakuliah_delete', request_method='DELETE', renderer='json')
def matakuliah_delete(request):
    """View untuk menghapus mata kuliah berdasarkan ID"""
    dbsession = request.dbsession
    mk_id = request.matchdict['id']

    matakuliah = dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if matakuliah is None:
        return HTTPNotFound(json_body={'error': f'Mata kuliah dengan ID {mk_id} tidak ditemukan'})

    dbsession.delete(matakuliah)

    return {'success': True, 'message': f'Mata kuliah dengan ID {mk_id} berhasil dihapus'}
