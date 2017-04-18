# coding=utf-8
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
import os
# 工具函数导入
from webapi.tools import random_str, pack, tokenActive
import time
from Conline.settings import STATIC_URL, BASE_DIR

# model导入
from webapi.models import Resource, User

# 日志导入
from webapi.tools import Debuglog


# 创建资源
@csrf_exempt
def creatResource(request):
    try:
        body = request.POST.dict()
        user = tokenActive({'token': body['token']})
        if not isinstance(user, User):
            return pack(code=user)
        # 获取上传的文件，如果没有文件，则默认为None
        file = request.FILES.get("file", None)
        if not file:
            pack(msg="no files for upload!")
        # 获取扩展名
        filetype = '.' + str(file).split('.')[-1]
        resourceid = random_str()
        fileurl = resourceid + filetype
        resource = Resource(resourceid=resourceid, fileurl=fileurl, creator=user.userid, title=body['title'], creattime=int(1000 * time.time()))
        if 'introduction' in body:
            resource.introduction = body['introduction']
        # 打开特定的文件进行二进制的写操作
        destination = open(BASE_DIR + os.sep + 'static' + os.sep + 'resources' + os.sep + fileurl, 'wb+')
        # 分块写入文件
        for chunk in file.chunks():
            destination.write(chunk)
        destination.close()
        resource.save()
        return pack()
    except Exception as e:
        return pack(msg=e)


# 查询资源
@csrf_exempt
def searchResource(request):
    try:
        body = eval(request.body)
        resourcelist = list(Resource.objects.filter(title__contains=body['keyword']))
        # 保存查询结果的数组
        model = []
        for resource in resourcelist:
            model.append(resourceModel(resource))
        return pack(data=model)
    except Exception as e:
        return pack(msg=e)


def resourceModel(resource):
    model = {
        'resourceid': resource.resourceid,
        'creattime': resource.creattime,
        'title': resource.title,
        'fileurl': resource.fileurl,
        'creator': resource.creator,
        'introduction': resource.introduction
    }
    return model
