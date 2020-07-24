from rest_framework import serializers
from .models import Categories, Calls


class CategoriesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Categories
        fields = ['id', 'title', 'slug', 'description', 'description_long', 'img']
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }


class CallsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Calls
        fields = ['name', 'telephone', 'comment']
