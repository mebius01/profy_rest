"""anzim URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views
from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView, DetailView
from profy.views import *

# from django.views.generic import ListView, DetailView

app_name = 'profy'


urlpatterns = [
    path('', TemplateView.as_view(template_name='profy/index.html'), name='index'),
    path('about/', TemplateView.as_view(template_name = 'profy/about.html'), name = 'about'),
    path('category/<slug:slug>/', TemplateView.as_view(template_name='profy/category.html'), name='category'),
    path('api/categories/', CategoriesList.as_view(), name='api_categories'),
    path('api/<slug:slug>/', CategoriesDetail.as_view(), name='slug_categories'),
    path('api/post/', CallsCreate.as_view(), name='calss_create'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
