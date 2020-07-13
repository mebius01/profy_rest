import dramatiq

from django.core.mail import send_mail

from .models import Calls

@dramatiq.actor
def email_customer(id, subject, message):
    customer = Calls.get(pk=id)
    send_mail(subject, message, "consmebius@gmail.com", [customer.email])