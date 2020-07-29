"""
Django settings for profy_rest project.

Generated by 'django-admin startproject' using Django 3.0.8.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os
from decouple import config, Csv
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = config("SECRET_KEY")
SECURE_HSTS_SECONDS = config('SECURE_HSTS_SECONDS', cast=int)
# добавляет preload директиву в заголовок
SECURE_HSTS_PRELOAD = config('SECURE_HSTS_PRELOAD', default=True, cast=bool)
# добавляет includeSubDomains директиву в заголовок
SECURE_HSTS_INCLUDE_SUBDOMAINS = config(
    'SECURE_HSTS_INCLUDE_SUBDOMAINS', default=True, cast=bool)
SECURE_CONTENT_TYPE_NOSNIFF = config(
    'SECURE_CONTENT_TYPE_NOSNIFF', default=True, cast=bool)
SECURE_BROWSER_XSS_FILTER = config(
    'SECURE_BROWSER_XSS_FILTER', default=True, cast=bool)
# все не-HTTPS запросы на HTTPS
SECURE_SSL_REDIRECT = config('SECURE_SSL_REDIRECT', default=True, cast=bool)
# Указывает использовать ли безопасные куки для сессии
SESSION_COOKIE_SECURE = config(
    'SESSION_COOKIE_SECURE', default=True, cast=bool)
# Указывает, использовать ли безопасные куки для CSRF.
CSRF_COOKIE_SECURE = config('CSRF_COOKIE_SECURE', default=True, cast=bool)
X_FRAME_OPTIONS = config('X_FRAME_OPTIONS')
DEBUG = config("DEBUG", default=True, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=Csv())

SITE_ID = 1
APPEND_SLASH = True


# Application definition
INSTALLED_APPS = [
    'profy.apps.ProfyConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'django.contrib.sitemaps',
    'rest_framework',
    'corsheaders',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'profy_rest.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


WSGI_APPLICATION = 'profy_rest.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/
LANGUAGE_CODE = 'ru'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = False
USE_TZ = True
DECIMAL_SEPARATOR = "."
DATE_INPUT_FORMATS = ['%d.%m.%Y']

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/
STATIC_ROOT = config('STATIC_ROOT')
STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'staticfile'),
)
MEDIA_ROOT = config('MEDIA_ROOT')
MEDIA_URL = '/media/'

# Data Base
DATABASES = {
    'default': {
        'ENGINE': config("DB_ENGINE"),
        'NAME': config("DB_NAME"),
        'USER': config("DB_USER"),
        'PASSWORD': config("DB_PASSWORD"),
        'HOST': config("DB_HOST"),
        'PORT': config("DB_PORT"),
    }
}

# Email
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = config("EMAIL_HOST")
EMAIL_PORT = config("EMAIL_PORT", cast=int)
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD")
EMAIL_HOST_USER = config("EMAIL_HOST_USER")
EMAIL_USE_TLS = config("EMAIL_USE_TLS")
ADMINS = config('ADMINS', cast=Csv())
DEFAULT_FROM_EMAIL = config("DEFAULT_FROM_EMAIL")


# Кєш и сессии
# CACHES = {
#     "default": {
#         "BACKEND": "django_redis.cache.RedisCache",
#         "LOCATION": "redis://127.0.0.1:6379/1",
#         "OPTIONS": {
#             "CLIENT_CLASS": "django_redis.client.DefaultClient",
#             # Время ожидания сокета
#             "SOCKET_CONNECT_TIMEOUT": 5,  # in seconds
#             "SOCKET_TIMEOUT": 5,  # in seconds
#             # исключения поведения
#             "IGNORE_EXCEPTIONS": True,
#             # пул соединений
#             "CONNECTION_POOL_KWARGS": {"max_connections": 128}
#         }
#     }
# }

# REST
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
    'DEFAULT_PARSER_CLASSES': (
        'rest_framework.parsers.JSONParser',
    )
}

# CORS
CORS_ORIGIN_ALLOW_ALL = False
CORS_ORIGIN_WHITELIST = config('CORS_ORIGIN_WHITELIST', cast=Csv())
CORS_ALLOW_METHODS = config('CORS_ALLOW_METHODS', cast=Csv())

# Fixtures
FIXTURE_DIRS = [
    os.path.join(BASE_DIR, "fixtures"),
]