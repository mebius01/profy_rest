from django.db import models
from django.template.defaultfilters import slugify
# Create your models here.


class Calls(models.Model):
    name = models.CharField(max_length=250)
    telephone = models.CharField(max_length=250)
    comment = models.TextField(max_length=800)
    answer = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = ("Звонок")
        verbose_name_plural = ("Звонки")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Calls_detail", kwargs={"pk": self.pk})


class Categories(models.Model):
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250, verbose_name='URL',)
    description = models.TextField(blank=True, default='')
    description_long = models.TextField(blank=True, default='')
    img = models.ImageField(upload_to='img/')
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = ("Категория")
        verbose_name_plural = ("Категории")

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("Categories_detail", kwargs={"slug": self.slug})
