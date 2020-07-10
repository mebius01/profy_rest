from rest_framework import serializers
from .models import Categories, Calls


class CategoriesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Categories
        fields = ['id', 'title', 'description', 'description_long']


class CallsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Calls
        fields = ['name', 'telephone', 'comment']
