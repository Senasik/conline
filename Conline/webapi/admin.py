# coding=utf-8
from django.contrib import admin
from webapi.models import User
from django import forms
# Register your models here.


class UserAdmin(admin.ModelAdmin):
    fields = (['username'])  # 可修改的部分
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

#
# class UserForm(forms.ModelForm):
#     class Meta:
#         model = User
#         fields = ['username']
#         widgets = {
#               'username': forms.Textarea(),
#         }
#

admin.site.register(User, UserAdmin)
