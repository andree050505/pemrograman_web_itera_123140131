import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(here, 'README.md')) as f:
    README = f.read()

requires = [
    'plaster_pastedeploy',
    'pyramid',
    'pyramid_jinja2',
    'pyramid_debugtoolbar',
    'pyramid_tm',
    'pyramid_retry',
    'waitress',
    'alembic',
    'SQLAlchemy',
    'transaction',
    'zope.sqlalchemy',
    'psycopg2-binary',
    'psycopg[binary]',
]

tests_require = [
    'WebTest >= 1.3.1',  # py3 compat
    'pytest >= 3.7.4',
    'pytest-cov >= 2.5.1',
]

setup(
    name='pyramid_mahasiswa',
    version='0.0',
    description='RESTful API Manajemen Mahasiswa dan Mata Kuliah dengan Pyramid Framework',
    long_description=README,
    classifiers=[
        'Programming Language :: Python',
        'Framework :: Pyramid',
        'Topic :: Internet :: WWW/HTTP',
        'Topic :: Internet :: WWW/HTTP :: WSGI :: Application',
    ],
    author='Andre Prasetya Daely',
    author_email='andre@example.com',
    url='',
    keywords='web pyramid pylons restful api sqlalchemy postgresql alembic',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    extras_require={
        'testing': tests_require,
    },
    install_requires=requires,
    entry_points={
        'paste.app_factory': [
            'main = pyramid_mahasiswa:main',
        ],
        'console_scripts': [
            'initialize_pyramid_mahasiswa_db = pyramid_mahasiswa.scripts.initialize_db:main',
        ],
    },
)
