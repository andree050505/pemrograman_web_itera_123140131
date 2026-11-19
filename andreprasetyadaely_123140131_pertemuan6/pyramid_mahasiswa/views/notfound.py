from pyramid.view import notfound_view_config
from pyramid.httpexceptions import HTTPNotFound


@notfound_view_config(renderer='json')
def notfound_view(request):
    """Custom view handler saat endpoint tidak ditemukan (HTTP 404)"""
    request.response.status = 404
    return {
        'error': 'Endpoint atau resource yang Anda cari tidak ditemukan',
        'status_code': 404
    }
