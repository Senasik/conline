from django.conf.urls import url
from webapi import views, course

urlpatterns = [
    url(r'login$', views.login),
    url(r'signup$', views.signup),
    url(r'userinfo$', views.userinfo),
    url(r'creatcourse', course.creatCourse),
    url(r'creatsection', course.creatSection),
]
