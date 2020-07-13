# from django.shortcuts import render
# from django.views.generic import ListView, DetailView
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
# from rest_framework import viewsets
from .models import Categories, Calls
from .serializers import CategoriesSerializer, CallsSerializer

from django.core.mail import send_mail
from django.conf import settings


def send_email(name, telephone, comment):
    subject = 'Заказ звонка от {} .'.format(
        name) + 'С номера {}'.format(telephone)
    message = comment
    send_mail(subject, message, 'your_account@yhoo.com',
              [settings.DEFAULT_FROM_EMAIL], fail_silently=False)


class CategoriesList(ListAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer


class CategoriesDetail(RetrieveAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer


class CallsCreate(CreateAPIView):
    serializer_class = CallsSerializer

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        name = data.get('name')
        telephone = data.get('telephone')
        comment = data.get('comment')
        send_email(name, telephone, comment)
        return self.create(request, *args, **kwargs)
