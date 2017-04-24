# coding=utf-8
from __future__ import unicode_literals

from django.db import models

# Create your models here.


# 用户管理
class UserManager(models.Manager):
    def teacher(self):
        return self.filter(type=1)


# 用户表
class User(models.Model):
    userid = models.CharField(primary_key=True, max_length=45)
    username = models.CharField(unique=True, max_length=45)
    password = models.CharField(max_length=45)
    # 用户类型: 0 学生，1 老师
    type = models.IntegerField(blank=True, null=True)
    token = models.CharField(unique=True, max_length=45, blank=True, null=True)

    objects = models.Manager()
    teacher = UserManager()


# 课程表
class Course(models.Model):
    courseid = models.CharField(primary_key=True, max_length=45)
    title = models.CharField(max_length=45)
    creattime = models.CharField(max_length=45)
    creator = models.CharField(max_length=45)
    tag = models.CharField(blank=True, null=True, max_length=100)
    cover = models.CharField(blank=True, null=True, max_length=100)


# 推荐课程表
class RecommendCourse(models.Model):
    courseid = models.CharField(primary_key=True, max_length=45)


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
    noticid = models.CharField(primary_key=True, max_length=45)
    title = models.CharField(max_length=45)
    creattime = models.CharField(max_length=45)
    content = models.TextField()


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
