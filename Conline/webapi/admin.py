# coding=utf-8
from django.contrib import admin
from webapi.models import User, Course, RecommendCourse, Carousel, Notic, Tag, EditSection, Section
from django import forms
from webapi.tools import random_str
import time
# Register your models here.


# 用户管理
class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = (['userid', 'username', 'type'])
        widgets = {
            'userid': forms.TextInput(),
            'username': forms.TextInput(attrs={'required': True}),
            'type': forms.Select(choices=(('0', '学生'), ('1', '老师')))
        }


class UserAdmin(admin.ModelAdmin):
    form = UserForm
    fields = (['userid', 'username', 'type'])  # 可修改的部分
    readonly_fields = (['userid'])
    list_display = (['userid', 'username', 'get_type'])  # 展示的部分
    search_fields = (['username'])  # 展示中搜索的域
    list_filter = (['type'])  # 侧边栏过滤

    # 类型过滤
    def get_type(self, obj):
        if obj.type == 0:
            return '学生'
        else:
            return '老师'
    get_type.short_description = '用户类型'

    def resetpassword(self, request, queryset):
        for qs in queryset:
            qs.password = 'e10adc3949ba59abbe56e057f20f883e'
            qs.save()
        self.message_user(request, '修改成功')
    resetpassword.short_description = '重置密码'
    actions = [resetpassword]
admin.site.register(User, UserAdmin)


# 课程管理
class CourseAdmin(admin.ModelAdmin):
    fields = (['title'])  # 可修改的部分
    list_display = (['courseid', 'title'])  # 展示的部分
    search_fields = (['courseid', 'title'])  # 展示中搜索的域

    def save_model(self, request, obj, form, change):
        super(CourseAdmin, self).save_model(request, obj, form, change)
admin.site.register(Course, CourseAdmin)


# 推荐课程管理
class RecommendCourseAdmin(admin.ModelAdmin):
    fields = (['courseid'])  # 可修改的部分
    list_display = (['courseid'])  # 展示的部分
    search_fields = (['courseid'])  # 展示中搜索的域
admin.site.register(RecommendCourse, RecommendCourseAdmin)


# 轮播图管理
class CarouselAdmin(admin.ModelAdmin):
    fields = (['courseid'])  # 可修改的部分
    list_display = (['courseid'])  # 展示的部分
    search_fields = (['courseid'])  # 展示中搜索的域
admin.site.register(Carousel, CarouselAdmin)


# 公告管理
class NoticForm(forms.ModelForm):
    class Meta:
        model = Notic
        fields = (['noticid', 'title', 'content'])
        widgets = {
            'noticid': forms.TextInput(),
            'title': forms.TextInput(attrs={'requid': True}),
            'content': forms.Textarea(attrs={'requid': True, 'rows': 8, 'cols': 40, 'style': 'resize: none'})
        }


class NoticAdmin(admin.ModelAdmin):
    form = NoticForm
    fields = (['noticid', 'title', 'content'])  # 可修改的部分
    readonly_fields = (['noticid'])
    list_display = (['noticid', 'title'])  # 展示的部分
    search_fields = (['title'])  # 展示中搜索的域
admin.site.register(Notic, NoticAdmin)


# 分类管理
class TagAdmin(admin.ModelAdmin):
    fields = (['title'])  # 可修改的部分
    list_display = (['title'])  # 展示的部分
    search_fields = (['title'])  # 展示中搜索的域

    def save_model(self, request, obj, form, change):
        obj.tagid = random_str()
        obj.creattime = int(1000*time.time())
        super(TagAdmin, self).save_model(request, obj, form, change)
admin.site.register(Tag, TagAdmin)


# 待审核章节管理
class EditSectionForm(forms.ModelForm):
    class Meta:
        model = EditSection
        fields = (['operator', 'content'])
        widgets = {
            'operator': forms.Select(choices=(('0', '暂未通过'), ('1', '通过')))
        }


class EditSectionAdmin(admin.ModelAdmin):
    form = EditSectionForm
    list_display = (['title', 'get_time', 'get_creator', 'get_tag'])
    readonly_fields = (['title', 'get_time', 'get_creator', 'get_tag', 'content'])
    fields = (['get_creator', 'get_tag', 'operator', 'content'])
    search_fields = (['get_tag'])
    list_filter = (['operator'])

    def get_time(self, obj):
        return time.strftime("%Y/%m/%d %H:%M", time.localtime(int(obj.creattime)/1000))

    def get_creator(self, obj):
        user = list(User.objects.filter(userid=obj.creator))[0]
        return user.username

    def get_tag(self, obj):
        course = list(Course.objects.filter(courseid=obj.father))[0]
        tag = list(Tag.objects.filter(tagid=course.tag))[0]
        return tag.title

    def get_operator(self, obj):
        if obj.operator == 0:
            return '暂未通过'
        else:
            return '通过'

    def save_model(self, request, obj, form, change):
        if obj.operator == 1:
            section = Section(sectionid=obj.sectionid, title=obj.title, creattime=obj.creattime, type=obj.type, content=obj.content, fileurl=obj.fileurl, father=obj.father)
            section.save()
            edit = EditSection.objects.filter(sectionid=obj.sectionid)
            edit.delete()
        super(EditSectionAdmin, self).save_model(request, obj, form, change)

    get_time.short_description = '创建时间'
    get_creator.short_description = '创建者'
    get_tag.short_description = '所属分类'
    get_operator.short_description = '审核状态'
admin.site.register(EditSection, EditSectionAdmin)
