from django.conf.urls import url
from webapi import views

urlpatterns = [
    url(r'login$', views.login),
    url(r'signup$', views.signup),
]
