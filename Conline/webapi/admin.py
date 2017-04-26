# coding=utf-8
from django.contrib import admin
from webapi.models import User, Course, RecommendCourse, Carousel, Notic
from django import forms
from webapi.tools import random_str
# Register your models here.


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
    list_display = (['userid', 'username', 'type'])  # 展示的部分
    search_fields = (['username'])  # 展示中搜索的域
    list_filter = (['type'])  # 侧边栏过滤

    def resetpassword(self, request, queryset):
        for qs in queryset:
            qs.password = 'e10adc3949ba59abbe56e057f20f883e'
            qs.save()
        self.message_user(request, '修改成功')
    resetpassword.short_description = '重置密码'
    actions = [resetpassword]
admin.site.register(User, UserAdmin)


class CourseAdmin(admin.ModelAdmin):
    fields = (['title'])  # 可修改的部分
    list_display = (['courseid', 'title'])  # 展示的部分
    search_fields = (['courseid', 'title'])  # 展示中搜索的域
admin.site.register(Course, CourseAdmin)


class RecommendCourseAdmin(admin.ModelAdmin):
    fields = (['courseid'])  # 可修改的部分
    list_display = (['courseid'])  # 展示的部分
    search_fields = (['courseid'])  # 展示中搜索的域
admin.site.register(RecommendCourse, RecommendCourseAdmin)


class CarouselAdmin(admin.ModelAdmin):
    fields = (['courseid'])  # 可修改的部分
    list_display = (['courseid'])  # 展示的部分
    search_fields = (['courseid'])  # 展示中搜索的域
admin.site.register(Carousel, CarouselAdmin)


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
