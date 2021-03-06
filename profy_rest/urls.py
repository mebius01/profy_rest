"""profy_rest URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
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
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.contrib.sitemaps.views import sitemap
from profy.sitemaps import CategoriesSitemap

sitemaps = {
    'categories': CategoriesSitemap,
}

urlpatterns = [
    path('', include('profy.urls')),
    path('admin/', admin.site.urls),
    path('robots.txt', TemplateView.as_view(template_name = 'robots.txt', content_type = 'text/plain')),
    path('googlea31b0c0e5cc4a0b1.html', TemplateView.as_view(template_name = 'googlea31b0c0e5cc4a0b1.html'), name = 'googlea31b0c0e5cc4a0b1'),
    # path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap')
]
