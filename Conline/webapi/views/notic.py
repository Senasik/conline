# coding=utf-8
from django.views.decorators.csrf import csrf_exempt, csrf_protect
import os
# 工具函数导入
from webapi.tools import random_str, pack, tokenActive
import time
# model导入
from webapi.models import Section, User, Notic

# 日志导入
from webapi.tools import Debuglog


# 获取公告列表size,index
@csrf_exempt
def getnoticlist(request):
    try:
        model = []
        body = eval(request.body)
        size = body['size']
        index = body['index']
        noticlist = Notic.objects.all().order_by('-creattime')[size*(index-1):size*index]
        for notic in noticlist:
            model.append(noticmodel(notic))
        return pack(data=model)
    except Exception as e:
        return pack(msg=e)


# 创建公告
@csrf_exempt
def creatnotic(request):
    try:
        body = eval(request.body)
        noticid = random_str()
        notic = Notic(noticid=noticid, title=body['title'], content=body['content'], creattime=int(1000 * time.time()))
        notic.save()
        return pack()
    except Exception as e:
        return pack(msg=e)


# 获取公告详情
@csrf_exempt
def getnoticdetail(request):
    try:
        body = eval(request.body)
        notic = list(Notic.objects.filter(noticid=body['noticid']))[0]
        return pack(data=noticmodel(notic))
    except Exception as e:
        return pack(msg=e)


# notic模型
def noticmodel(notic):
    model = {
        'noticid': notic.noticid,
        'title': notic.title,
        'content': notic.content,
        'creattime': notic.creattime
    }
    return model;


def moban(request):
    try:
        body = eval(request.body)

    except Exception as e:
        return pack(msg=e)
