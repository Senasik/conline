# coding=utf-8
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
import os
# 工具函数导入
from webapi.tools import random_str, pack, tokenActive
import time

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


# 获取课程列表
@csrf_exempt
def getCourseList(request):
    try:
        body = request.body
        user = tokenActive(request.COOKIES)
        if not isinstance(user, User):
            return pack(code=user)
        courseList = list(Course.objects.all().filter(creator=user.userid))
        model = []
        for course in courseList:
            model.append({
                'courseid': course.courseid,
                'title': course.title
            })
        return pack(data=model)
    except Exception as e:
        return pack(msg=e)




