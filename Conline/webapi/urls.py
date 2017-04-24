# coding=utf-8
from django.conf.urls import url
from webapi.views import section, views, course, homework, notic, resource

urlpatterns = [
    # 用户
    url(r'login$', views.login),
    url(r'signup$', views.signup),
    url(r'getuserdetail$', views.getuserdetail),
    url(r'alertpwd$', views.alertpwd),
    url(r'getimg/', views.getImg),
    # 课程
    url(r'creatcourse$', course.creatCourse),
    url(r'deletecourse$', course.deleteCourse),
    url(r'getcourselist$', course.getCourseList),
    url(r'editcourse$', course.editCourse),
    url(r'getrecommendsources$', course.getrecommendsources),
    url(r'getcoursedetail$', course.getcoursedetail),
    url(r'addcoursecover$', course.addCourseCover),
    url(r'searchcourse$', course.searchCourse),
    url(r'collectcourse$', course.collectCourse),
    url(r'getcollectcoursebyuser$', course.getCollectCourseByUser),
    # 章节
    url(r'creatsection$', section.creatSection),
    url(r'getsectionlist$', section.getSectionList),
    url(r'getsectiondetail$', section.getSectionDetail),
    url(r'deletesection$', section.deletesection),
    url(r'editsection$', section.editSection),
    # 练习
    url(r'gethomework$', homework.getHomework),
    url(r'creathomework$', homework.creatHomework),
    url(r'gethomeworkbyuser$', homework.getHomeworkByUser),
    url(r'gethomeworkbysection$', homework.getHomeworkBySection),
    # 公告
    url(r'creatnotic$', notic.creatnotic),
    url(r'getnoticlist$', notic.getnoticlist),
    url(r'getnoticdetail$', notic.getnoticdetail),
    # 资源
    url(r'creatresource$', resource.creatResource),
    url(r'searchresource$', resource.searchResource),
]
