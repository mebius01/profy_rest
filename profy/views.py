from django.shortcuts import render
from django.views.generic import ListView, DetailView
from rest_framework import viewsets
from .models import Categories
from .serializers import CategoriesSerializer

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response


class CategoriesList(generics.ListCreateAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer


class CategoriesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer
