# coding=utf-8
from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader, Context
from django.http import JsonResponse
import logging
import os

from myhtml.models import User
from Conline.settings import BASE_DIR

# 日志文件
htmllog = logging.getLogger('myhtml')


# Create your views here.


def test(request):
    user = [u for u in User.objects.all().filter(userid__contains=123) if len(u.userid) > 3]
    for u in user:
        u.username = '大师傅'
        u.save()
    t = loader.get_template('template.html')
    c = {'test': 'value'}
    htmllog.debug('return html')
    return HttpResponse(t.render(c))


def index():
    return


