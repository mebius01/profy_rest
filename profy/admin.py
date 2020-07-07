from django.contrib import admin
from .models import Calls, Categories
# Register your models here.


class CallsAdmin(admin.ModelAdmin):
    list_display = ('name', 'id', 'telephone', 'comment', 'created')


class CategoriesAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'description', 'created')
    prepopulated_fields = {'slug': ('title', )}


admin.site.register(Calls, CallsAdmin)
admin.site.register(Categories, CategoriesAdmin)
