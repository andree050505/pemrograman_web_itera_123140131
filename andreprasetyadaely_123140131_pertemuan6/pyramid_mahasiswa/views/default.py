from pyramid.view import view_config


@view_config(route_name='home', renderer='json')
def my_view(request):
    """Endpoint home yang memberikan informasi status API"""
    return {
        'status': 'success',
        'message': 'Selamat datang di RESTful API Manajemen Mahasiswa dan Mata Kuliah',
        'endpoints': {
            'mahasiswa': '/api/mahasiswa',
            'matakuliah': '/api/matakuliah'
        }
    }
