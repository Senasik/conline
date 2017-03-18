# coding=utf-8
from django.views.decorators.csrf import csrf_exempt, csrf_protect
import os
# 工具函数导入
from webapi.tools import random_str, pack, tokenActive
import time

# model导入
from webapi.models import Homework, User

# 日志导入
from webapi.tools import Debuglog


# 创建题目
@csrf_exempt
def creatHomework(request):
    try:
        body = eval(request.body)
        user = tokenActive(request.COOKIES)
        if not isinstance(user, User):
            pack(code=user)
        id = random_str()
        now = int(1000 * time.time())
        user = Homework(homeworkid=id, title=body['title'], creator=user.userid, type=body['type'], answer=body['answer'], creattime=now, father=body['father'])
        if body['type'] == 0:
            user.option = body['option']
        user.save()
        return pack(data={'homeworkid': id})
    except Exception as e:
        return pack(msg=e)


# 获取题目
@csrf_exempt
def getHomework(request):
    try:
        body = eval(request.body)
        homework = list(Homework.objects.all().filter(homeworkid=body['homeworkid']))
        if len(homework) == 0:
            raise Exception('题目id错误')
        return pack(data=homeworkModel(homework))
    except Exception as e:
        return pack(msg=e)


# 获取作者题目列表
@csrf_exempt
def getHomeworkByUser(request):
    try:
        body = eval(request.body)
        homeworklist = list(Homework.objects.all().filter(creator=body['userid']))
        if len(homeworklist) == 0:
            return pack(data=[], msg='未获取到数据')
        for homework in homeworklist:
            homework = homeworkModel(homework)
        return pack(data=homeworklist)
    except Exception as e:
        return pack(msg=e)


# 获取章节题目列表
@csrf_exempt
def getHomeworkBySection(request):
    try:
        model = []
        body = eval(request.body)
        homeworklist = list(Homework.objects.all().filter(father=body['sectionid']))
        if len(homeworklist) == 0:
            return pack(data=[], msg='未获取到数据')
        for homework in homeworklist:
            model.append(homeworkModel(homework))
        return pack(data=model)
    except Exception as e:
        return pack(msg=e)


@csrf_exempt
def moban(request):
    try:
        body = eval(request.body)

    except Exception as e:
        return pack(msg=e)


def homeworkModel(homework):
    return {
        'homeworkid': homework.homeworkid,
        'title': homework.title,
        'creator': homework.creator,
        'type': homework.type,
        'answer': homework.answer,
        'option': homework.option
    }
