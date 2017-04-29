# coding=utf-8
from __future__ import unicode_literals
from django.db import models
from random import Random
import time
# Create your models here.


def random_str(randomlength=30):
    str = ''
    chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
    length = len(chars) - 1
    random = Random()
    for i in range(randomlength):
        str+=chars[random.randint(0, length)]
    return str


# 用户管理
class UserManager(models.Manager):
    def teacher(self):
        return self.filter(type=1)


# 用户表
class User(models.Model):
    userid = models.CharField(primary_key=True, max_length=45, default=random_str())
    username = models.CharField(unique=True, max_length=45, verbose_name='用户名')
    password = models.CharField(max_length=45)
    # 用户类型: 0 学生，1 老师
    type = models.IntegerField(blank=True, null=True)
    token = models.CharField(unique=True, max_length=45, blank=True, null=True)
    objects = models.Manager()
    teacher = UserManager()

    class Meta:
        verbose_name = '用户'
        verbose_name_plural = '用户'


# 课程表
class Course(models.Model):
    courseid = models.CharField(primary_key=True, max_length=45)
    title = models.CharField(max_length=45,  verbose_name='课程名')
    creattime = models.CharField(max_length=45)
    creator = models.CharField(max_length=45, verbose_name='创建者')
    tag = models.CharField(blank=True, null=True, max_length=100, verbose_name='所属分类')
    cover = models.CharField(blank=True, null=True, max_length=100)

    class Meta:
        verbose_name = '课程'
        verbose_name_plural = '课程'


# 推荐课程表
class RecommendCourse(models.Model):
    courseid = models.CharField(primary_key=True, max_length=45, verbose_name='课程id')

    class Meta:
        verbose_name = '首页课程'
        verbose_name_plural = '首页课程'


# 章节表，依赖于课程表
class Section(models.Model):
    sectionid = models.CharField(primary_key=True, max_length=45)
    title = models.CharField(max_length=45)
    creattime = models.CharField(max_length=45)
    creator = models.CharField(max_length=45)
    # 课程内容类型： 0 文章；1 视频
    type = models.IntegerField()
    content = models.TextField(blank=True, null=True)
    fileurl = models.CharField(blank=True, null=True, max_length=1000)
    father = models.CharField(max_length=45)
    homeworkids = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = '章节'
        verbose_name_plural = '章节'


# 课后题表
class Homework(models.Model):
    homeworkid = models.CharField(primary_key=True, max_length=45)
    title = models.CharField(max_length=45)
    father = models.CharField(max_length=45)
    creator = models.CharField(max_length=45)
    # 课后题类型： 0 选择题；1 填空题；2 编程题
    type = models.IntegerField()
    answer = models.TextField()
    option = models.TextField(blank=True, null=True)
    creattime = models.CharField(max_length=45)


# 公告表
class Notic(models.Model):
    noticid = models.CharField(primary_key=True, max_length=45, default=random_str())
    title = models.CharField(max_length=45, verbose_name='公告名')
    creattime = models.CharField(max_length=45, default=int(1000*time.time()))
    content = models.TextField(verbose_name='公告内容')

    class Meta:
        verbose_name = '公告'
        verbose_name_plural = '公告'


# 资源表
class Resource(models.Model):
    resourceid = models.CharField(primary_key=True, max_length=45)
    title = models.CharField(max_length=45)
    creattime = models.CharField(max_length=45)
    fileurl = models.TextField()
    creator = models.CharField(max_length=45)
    introduction = models.TextField(blank=True, null=True)


# 收藏课程表
class CollectCourse(models.Model):
    courseid = models.CharField(max_length=45)
    userid = models.CharField(max_length=45)

    class Meta:
        unique_together = ("courseid", "userid")


# 轮播图表
class Carousel(models.Model):
    courseid = models.CharField(max_length=45)

    class Meta:
        verbose_name = '轮播图'
        verbose_name_plural = '轮播图'


# 分类表
class Tag(models.Model):
    tagid = models.CharField(max_length=45, primary_key=True)
    title = models.CharField(max_length=45, verbose_name='分类名')
    creattime = models.CharField(max_length=45)

    class Meta:
        verbose_name = '课程分类'
        verbose_name_plural = '课程分类'


# 待审核章节表
class EditSection(models.Model):
    sectionid = models.CharField(primary_key=True, max_length=45)
    title = models.CharField(max_length=45, verbose_name='名称')
    creattime = models.CharField(max_length=45)
    creator = models.CharField(max_length=45, verbose_name='创建者')
    # 课程内容类型： 0 文章；1 视频
    type = models.IntegerField()
    content = models.TextField(blank=True, null=True)
    fileurl = models.CharField(blank=True, null=True, max_length=1000)
    father = models.CharField(max_length=45, verbose_name='所属课程')
    # 0 不过, 1过
    operator = models.CharField(max_length=45, verbose_name='审核')

    class Meta:
        verbose_name = '待审核课程'
        verbose_name_plural = '待审核课程'
