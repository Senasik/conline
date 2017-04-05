# coding=utf-8
from django.views.decorators.csrf import csrf_exempt, csrf_protect
import os
# 工具函数导入
from webapi.tools import random_str, pack, tokenActive
import time
import chardet
from Conline.settings import STATIC_URL, BASE_DIR
import binascii
# model导入
from webapi.models import Section, User

# 日志导入
from webapi.tools import Debuglog


# 获取章节列表
@csrf_exempt
def getSectionList(request):
    try:
        model = []
        user = tokenActive(request.COOKIES)
        if isinstance(user, User) and request.body == '':
            sectionlist = list(Section.objects.all().filter(creator=user.userid))
        else:
            body = eval(request.body)
            sectionlist = list(Section.objects.all().filter(father=body['courseid']))
        if len(sectionlist) > 0:
            for section in sectionlist:
                model.append({
                    'sectionid': section.sectionid,
                    'title': section.title,
                    'creator': section.creator,
                    'type': section.type,
                    'creattime': section.creattime
                })
        return pack(data=model)
    except Exception as e:
        return pack(msg=e)


# 获取章节内容详情
@csrf_exempt
def getSectionDetail(request):
    try:
        body = eval(request.body)
        section = list(Section.objects.all().filter(sectionid=body['sectionid']))
        if len(section) == 0:
            raise Exception('课程id错误')
        section = section[0]
        model = {
            'sectionid': section.sectionid,
            'title': section.title,
            'creator': section.creator,
            'type': section.type,
            'content': section.content,
            'fileurl': section.fileurl,
            'father': section.father,
            'creattime': section.creattime
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
        section = Section(sectionid=id, creattime=now, creator=user.userid, type=body['type'], title=body['title'],
                          father=body['courseid'])
        # 获取上传的文件，如果没有文件，则默认为None
        file = request.FILES.get("file", None)
        if not file:
            pack(msg="no files for upload!")

        # 文字文件和视频文件分别处理
        if body['type'] == '1':
            # 获取扩展名
            filetype = '.' + str(file).split('.')[1]
            # 保存fileurl
            section.fileurl = random_str() + filetype
            # 打开特定的文件进行二进制的写操作
            destination = open(BASE_DIR + '\\static\\' + '\\sectionfile\\' + section.fileurl, 'wb+')
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


# 删除章节
@csrf_exempt
def deletesection(request):
    try:
        body = eval(request.body)
        user = tokenActive(request.COOKIES)
        if not isinstance(user, User):
            return pack(code=user)
        if user.type == 0:
            raise Exception('学生无法删除')
        section = Section.objects.all().filter(creator=user.userid).filter(sectionid=body['sectionid'])
        section.delete()
        return pack()

    except Exception as e:
        return pack(msg=e)


# 编辑章节
@csrf_exempt
def editSection(request):
    try:
        body = eval(request.body)
        user = tokenActive(request.COOKIES)
        if not isinstance(user, User):
            return pack(code=user)
        if user.type == 0:
            raise Exception('学生无法编辑')
        section = list(Section.objects.all().filter(creator=user.userid).filter(sectionid=body['sectionid']))[0]
        section.title = body['title']
        section.save()
        return pack()
    except Exception as e:
        return pack(msg=e)


def moban(request):
    try:
        body = eval(request.body)

    except Exception as e:
        return pack(msg=e)
