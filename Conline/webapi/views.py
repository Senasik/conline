# coding=utf-8
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from webapi.tools import pack
# 工具函数导入
from webapi.tools import random_str, pack, tokenActive
# model导入
from webapi.models import User
# 日志导入
from webapi.tools import Debuglog

# Create your views here.


# 用户登录
@csrf_exempt
def login(request):
    try:
        # 获取求情信息
        body = eval(request.body)
        # 验证token
        user = tokenActive(request.COOKIES)
        if not isinstance(user, User):
            # 用户名密码验证
            user = list(User.objects.all().filter(username=body['username']))
            if len(user) == 0 or user[0].password != body['password']:
                raise Exception('用户名或密码错误')
            user = user[0]
            user.token = random_str()
            user.save()
        # 返回model
        model = {
            'userid': user.userid,
            'token': user.token
        }
        return pack(data=model)

    except Exception as e:
        return pack(msg=str(e))


# 用户注册
@csrf_exempt
def signup(request):
    try:
        # 获取求情信息
        body = eval(request.body)
        # 是否已注册
        if len(User.objects.all().filter(username=body['username'])):
            raise Exception('repeat')
        # 注册用户
        userid = random_str()
        token = random_str()
        user = User(userid=userid, token=token, username=body['username'], password=body['password'], type=body['type'])
        user.save()
        return pack(data={'token': token})
    except Exception as e:
        return pack(msg=e)


# 获取用户信息
@csrf_exempt
def userinfo(request):
    try:
        body = eval(request.body)
        user = tokenActive(request.COOKIES)
        if user == -2:
            return pack(code=-2)
        elif user == -3 or body['userid'] != '':
            # 如果token有效且用户的userid为空，那么表示取得是自己的信息
            # token为空则肯定是根据userid查询别人的信息
            user = list(User.objects.all().filter(userid=body.userid))
            # 如果没查到数据，返回空
            if len(user) == 0:
                return pack(data={})
            else:
                user = user[0]
        model = {
            'userid': user.userid,
            'username': user.username,
            'type': user.type,
        }
        return pack(data=model)

    except Exception as e:
        return pack(msg=e)











