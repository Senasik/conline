# coding=utf-8
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
import os
# 工具函数导入
from webapi.tools import random_str, pack, tokenActive
import time
import chardet
from Conline.settings import STATIC_URL, BASE_DIR
import binascii
# model导入
from webapi.models import Course, User, Section

# 日志导入
from webapi.tools import Debuglog


# 创建课程
@csrf_exempt
def creatCourse(request):
    try:
        body = eval(request.body)
        user = tokenActive(request.COOKIES)
        if not isinstance(user, User):
            return pack(code=user)
        # 如果是学生，那么不让创建
        if user.type == 0:
            return pack(msg='学生无法创建课程')
        # 获取当前时间戳
        now = int(1000 * time.time())
        course = Course(courseid=random_str(), creattime=now, creator=user.userid, title=body['title'])
        course.save()
        model = {
            'courseid': course.courseid,
            'creator': course.creator,
            'title': course.title
        }
        return pack(data=model)
    except Exception as e:
        return pack(msg=e)


# 创建章节内容
@csrf_exempt
def creatSection(request):
    try:
        body = request.POST.dict()
        user = tokenActive({'token': body['token']})
        if not isinstance(user, User):
            return pack(code=user)
        # 如果是学生，那么不让创建
        if user.type == 0:
            return pack(msg='学生无法创建课程')
        # 获取当前时间戳
        now = int(1000 * time.time())
        id = random_str()
        section = Section(sectionid=id, creattime=now, creator=user.userid, type=body['type'], title=body['title'], father=body['courseid'])
        # 获取上传的文件，如果没有文件，则默认为None
        file = request.FILES.get("file", None)
        if not file:
            pack(msg="no files for upload!")

        # 文字文件和视频文件分别处理
        if body['type'] == '1':
            # 获取扩展名
            filetype = '.' + str(file).split('.')[1]
            # 保存fileurl
            section.fileurl = random_str()+filetype
            # 打开特定的文件进行二进制的写操作
            destination = open(BASE_DIR+'\\static\\'+'\\sectionfile\\'+section.fileurl, 'wb+')
            # 分块写入文件
            for chunk in file.chunks():
                destination.write(chunk)
            destination.close()
        elif body['type'] == '0':
            filecontent = file.read()
            # 获取编码方式
            encodetype = chardet.detect(filecontent)['encoding']
            section.content = filecontent.decode(encodetype)
        section.save()

        return pack()
    except Exception as e:
        return pack(msg=e)
