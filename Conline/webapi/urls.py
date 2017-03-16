from django.conf.urls import url
from webapi.views import section, views, course, homework

urlpatterns = [
    url(r'login$', views.login),
    url(r'signup$', views.signup),
    url(r'userinfo$', views.userinfo),
    url(r'creatcourse$', course.creatCourse),
    url(r'creatsection$', section.creatSection),
    url(r'getcourselist$', course.getCourseList),
    url(r'getsectionlist', section.getSectionList),
    url(r'getsectiondetail', section.getSectionDetail),
    url(r'gethomework', homework.getHomework),
    url(r'cteathomework', homework.cteatHomework),
    url(r'gethomeworkbyuser', homework.getHomeworkByUser),

]