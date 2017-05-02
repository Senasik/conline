# coding=utf-8
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
import os
# 工具函数导入
from webapi.tools import random_str, pack, tokenActive
import time
from Conline.settings import STATIC_URL, BASE_DIR

# model导入
from webapi.models import Course, User, Section, RecommendCourse, CollectCourse, Carousel, Tag, Record

# 日志导入
from webapi.tools import Debuglog


global user
user = -2


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
        course = Course(courseid=random_str(), creattime=now, creator=user.userid, title=body['title'], tag=body['tag'])
        course.save()
        model = {
            'courseid': course.courseid,
            'creator': course.creator,
            'title': course.title
        }
        return pack(data=model)
    except Exception as e:
        return pack(msg=e)


# 获取课程详情
@csrf_exempt
def getcoursedetail(request):
    try:
        global user
        user = tokenActive(request.COOKIES)
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


# 根据tag获取课程
@csrf_exempt
def getCourselistByTag(request):
    try:
        model = []
        # 如果没有tag,表示是获取首页的课程，按分类的前三个获取
        if request.body != '':
            body = eval(request.body)
            tag = body['tag']
            index = body['index']
            size = body['size']
            courseList = list(Course.objects.all().filter(tag=tag).order_by('-creattime'))[size*(index-1):size*index]
            for course in courseList:
                model.append(coursemodel(course))
        else:
            taglist = list(Tag.objects.all().order_by('creattime'))[0:3]
            # 获取tag之后循环获取相关课程
            for tag in taglist:
                tagcourseList = list(Course.objects.all().filter(tag=tag.tagid).order_by('creattime'))[0:5]
                # 循环格式化course
                for course in tagcourseList:
                    tagcourseList[tagcourseList.index(course)] = coursemodel(course)
                # 添加到model中
                if len(tagcourseList) != 0:
                    model.append(tagcourseList)
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
        section = Section.objects.filter(father=list(course)[0].courseid)
        section.delete()

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
        course.tag = body['tag']
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
        filetype = '.' + str(file).split('.')[-1]
        # 记录原来文件的地址，成功保存之后删除原来的
        prefile = BASE_DIR + os.sep + 'static' + os.sep + 'covers' + os.sep + course.cover
        # 保存fileurl
        course.cover = random_str() + filetype
        # 打开特定的文件进行二进制的写操作
        destination = open(BASE_DIR + os.sep + 'static' + os.sep + 'covers' + os.sep + course.cover, 'wb+')
        # 分块写入文件
        for chunk in file.chunks():
            destination.write(chunk)
        destination.close()
        course.save()
        # 删除原来的文件
        os.remove(prefile)
        return pack(data={'cover': course.cover})

    except Exception as e:
        return pack(msg=e)


# 获取推荐课程
@csrf_exempt
def getrecommendsources(request):
    try:
        model = []
        recommendcourses = []
        # 首先查看记录表里面有没有用户的内容
        user = tokenActive(request.COOKIES)
        if isinstance(user, User):
            recordlist = list(Record.objects.filter(userid=user.userid, time__gte=int(1000 * time.time())-604800000))
            if len(recordlist) == 0:
                recommendcourses = list(RecommendCourse.objects.all())
            else:
                taglist = {}
                # 记录总共有多少记录的变量
                allnum = 0
                # 循环record,记录tag比例
                for record in recordlist:
                    tag = list(Course.objects.filter(courseid=record.courseid))[0].tag
                    # 判断是否已经记录这个分类
                    if tag in taglist:
                        taglist[tag] += 1
                    else:
                        taglist[tag] = 1
                    allnum += 1
                # 把次数变为以5为基础的
                for tag in taglist:
                    num = int(round(float(taglist[tag])/allnum * 5))
                    # 获取相应tag的数量
                    recommendcourses.extend(list(Course.objects.filter(tag=tag))[0:num])
        else:
            recommendcourses = list(RecommendCourse.objects.all())
        for course in recommendcourses:
            course = list(Course.objects.filter(courseid=course.courseid))[0]
            model.append(coursemodel(course))
        return pack(data=model)

    except Exception as e:
        return pack(msg=e)


# 查询课程
@csrf_exempt
def searchCourse(request):
    try:
        model = []
        body = eval(request.body)
        # keyword为课程名的情况
        courselist = list(Course.objects.filter(title__contains=body['keyword']))
        # keyword为老师名的情况
        teacherlist = list(User.objects.filter(username__contains=body['keyword']))
        if len(teacherlist) > 0:
            for teacher in teacherlist:
                newcourselist = list(Course.objects.filter(creator=teacher.userid))
                # 不同的课程才加入
                for course in newcourselist:
                    if course not in courselist:
                        courselist.append(course)
        if len(courselist) > 0:
            for course in courselist:
                model.append(coursemodel(course))
        return pack(data=model)

    except Exception as e:
        return pack(msg=e)


# 收藏课程
@csrf_exempt
def collectCourse(request):
    try:
        body = eval(request.body)
        user = tokenActive(request.COOKIES)
        if not isinstance(user, User):
            return pack(code=user)
        # 1代表收藏，0代表取消收藏
        if body['operate'] == 1:
            course = CollectCourse(userid=user.userid, courseid=body['courseid'])
            course.save()
        elif body['operate'] == 0:
            course = CollectCourse.objects.filter(userid=user.userid, courseid=body['courseid'])
            course.delete()
        return pack()
    except Exception as e:
        return pack(msg=e)


# 查询用户收藏课程
@csrf_exempt
def getCollectCourseByUser(request):
    try:
        if request.body != '':
            userid = eval(request.body)['userid']
        else:
            global user
            user = tokenActive(request.COOKIES)
            if not isinstance(user, User):
                return pack(code=user)
            userid = user.userid
        collectcourselist = list(CollectCourse.objects.filter(userid=userid))
        # 根据获取的courseid获取courselist
        courselist = []
        for collectcourse in collectcourselist:
            course = list(Course.objects.filter(courseid=collectcourse.courseid))[0]
            courselist.append(coursemodel(course))
        return pack(data=courselist)
    except Exception as e:
        return pack(msg=e)


# 查询历史浏览课程
@csrf_exempt
def getHistoryCourse(request):
    try:
        body = eval(request.body)
        if 'userid' in body:
            userid = body['userid']
        else:
            global user
            user = tokenActive(request.COOKIES)
            if not isinstance(user, User):
                return pack(code=user)
            userid = user.userid
        historylist = list(Record.objects.filter(userid=userid, time__gte=int(1000 * time.time())-604800000).order_by('-time'))
        # 根据获取的courseid获取courselist
        courselist = []
        courseidlist = []
        for historycourse in historylist:
            course = list(Course.objects.filter(courseid=historycourse.courseid))[0]
            if course.courseid not in courseidlist:
                courselist.append(coursemodel(course))
                courseidlist.append(course.courseid)
        return pack(data=courselist)
    except Exception as e:
        return pack(msg=e)


# 获取轮播图
@csrf_exempt
def getCarouselList(request):
    try:
        courselist = list(Carousel.objects.all())
        model = []
        for course in courselist:
            course = list(Course.objects.filter(courseid=course.courseid))[0]
            model.append(coursemodel(course))
        return pack(data=model)
    except Exception as e:
        return pack(msg=e)


# 获取分类
@csrf_exempt
def getTaglist(request):
    try:
        taglist = list(Tag.objects.all())
        model = []
        for tag in taglist:
            tag = list(Tag.objects.filter(tagid=tag.tagid))[0]
            model.append({
                'tagid': tag.tagid,
                'title': tag.title
            })
        return pack(data=model)
    except Exception as e:
        return pack(msg=e)


def coursemodel(course):
    creator = list(User.objects.filter(userid=course.creator))[0]
    model = {'courseid': course.courseid,
             'title': course.title,
             'cover': course.cover,
             'tag': course.tag,
             'creator': {
                 'userid': creator.userid,
                 'username': creator.username,
             }
    }
    # 如果已登录，查询该课程是否已收藏
    if isinstance(user, User):
        collentcourse = list(CollectCourse.objects.filter(userid=user.userid, courseid=course.courseid))
        if len(collentcourse) == 1:
            model['collected'] = True
        else:
            model['collected'] = False
    else:
        model['collected'] = False

    return model
