# coding=utf-8
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
import os
# 工具函数导入
from webapi.tools import random_str, pack, tokenActive
import time
from Conline.settings import STATIC_URL, BASE_DIR

# model导入
from webapi.models import Course, User, Section, RecommendCourse

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


# 获取推荐课程
@csrf_exempt
def getcoursedetail(request):
    try:
        courseid = eval(request.body)['courseid']
        course = list(Course.objects.all().filter(courseid=courseid))[0]
        return pack(data=coursemodel(course))
    except Exception as e:
        return pack(msg=e)


# 获取课程列表
@csrf_exempt
def getCourseList(request):
    try:
        if request.body != '':
            userid = eval(request.body)['userid']
        else:
            user = tokenActive(request.COOKIES)
            if not isinstance(user, User):
                return pack(code=user)
            userid = user.userid
        courseList = list(Course.objects.all().filter(creator=userid))
        model = []
        for course in courseList:
            model.append(coursemodel(course))
        return pack(data=model)
    except Exception as e:
        return pack(msg=e)


# 删除课程
@csrf_exempt
def deleteCourse(request):
    try:
        body = eval(request.body)
        user = tokenActive(request.COOKIES)
        if not isinstance(user, User):
            return pack(code=user)
        if user.type == 0:
            raise Exception('学生无法删除')
        course = Course.objects.all().filter(creator=user.userid).filter(courseid=body['courseid'])
        course.delete()

        return pack()
    except Exception as e:
        return pack(msg=e)


# 编辑课程
@csrf_exempt
def editCourse(request):
    try:
        body = eval(request.body)
        user = tokenActive(request.COOKIES)
        if not isinstance(user, User):
            return pack(code=user)
        if user.type == 0:
            raise Exception('学生无法编辑')
        course = list(Course.objects.all().filter(creator=user.userid).filter(courseid=body['courseid']))[0]
        course.title = body['title']
        course.save()
        return pack()
    except Exception as e:
        return pack(msg=e)


# 添加课程封面
@csrf_exempt
def addCourseCover(request):
    try:
        body = request.POST.dict()
        user = tokenActive({'token': body['token']})
        if not isinstance(user, User):
            return pack(code=user)
        course = list(Course.objects.filter(courseid=body['courseid']))[0]
        # 获取上传的文件，如果没有文件，则默认为None
        file = request.FILES.get("file", None)
        if not file:
            pack(msg="no files for upload!")
        # 获取扩展名
        filetype = '.' + str(file).split('.')[1]
        # 保存fileurl
        course.cover = random_str() + filetype
        # 打开特定的文件进行二进制的写操作
        destination = open(BASE_DIR + '\\static\\' + '\\covers\\' + course.cover, 'wb+')
        # 分块写入文件
        for chunk in file.chunks():
            destination.write(chunk)
        destination.close()
        course.save()
        return pack(data={'cover': course.cover})

    except Exception as e:
        return pack(msg=e)


# 获取推荐课程
@csrf_exempt
def getrecommendsources(request):
    try:
        model = []
        recommendcourses = list(RecommendCourse.objects.all())
        for course in recommendcourses:
            course = list(Course.objects.filter(courseid=course.courseid))[0]
            model.append(coursemodel(course))
        return pack(data=model)

    except Exception as e:
        return pack(msg=e)


def coursemodel(course):
    creator = list(User.objects.filter(userid=course.creator))[0]
    model = {'courseid': course.courseid,
                'title': course.title,
                'cover': course.cover,
                'creator': {
                    'userid': creator.userid,
                    'username': creator.username
                }
    }
    return model
