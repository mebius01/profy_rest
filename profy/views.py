# from django.shortcuts import render
# from django.views.generic import ListView, DetailView
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
# from rest_framework import viewsets
from .models import Categories, Calls
from .serializers import CategoriesSerializer, CallsSerializer

# from rest_framework import generics
# from rest_framework.views import APIView
# from rest_framework.response import Response


class CategoriesList(ListAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer


class CategoriesDetail(RetrieveAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer


class CallsCreate(CreateAPIView):
    serializer_class = CallsSerializer
