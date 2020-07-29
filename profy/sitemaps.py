from django.contrib.sitemaps import Sitemap
from .models import Categories

class CategoriesSitemap(Sitemap):
  changefreq = 'weekly'
  priority = 0.9

  def items(self):
    return Categories.objects.all()

  def lastmod(self, obj):
    return obj.created