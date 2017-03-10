# coding=utf-8
from random import Random
import logging
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse

# model导入
from models import User

# 日志文件
debuglog = logging.getLogger('myhtml')

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
            'username': user.username,
            'type': user.type,
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
        user = User(userid=userid, username=body['username'], password=body['password'], type=body['type'])
        user.save()
        return pack()
    except Exception as e:
        return pack(msg=repr(e)+'错误')


# 验证token是否失效，返回值-2 表示登录失效，-3 表示未登录

def tokenActive(cookie):
    try:
        # 验证token
        cookie.keys().index('token')
        user = list(User.objects.all().filter(token=cookie.get('token')))
        if len(user) == 0:
            return -2
        return user[0]
    except ValueError as e:
        # 确定是否是无token的异常
        if str(e) != "'token' is not in list":
            raise Exception(e)
        return -3


# api包装,第一个参数是数据，第二个参数是异常信息

def pack(data={}, msg='success', code=1, *args):
    '''
     第一个参数是数据，第二个参数是异常处理
    '''
    model = {
        'code': code,
        'msg': msg,
        'data': data
    }
    if msg != 'success' and code == 1:
        model['code'] = -1
    result = JsonResponse(model)
    result['Access-Control-Allow-Origin'] = 'http://c.conline.com:8080'
    result['Access-Control-Allow-Credentials'] = 'true'
    return result


# 生成随机字符串

def random_str(randomlength=30):
    str = ''
    chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
    length = len(chars) - 1
    random = Random()
    for i in range(randomlength):
        str+=chars[random.randint(0, length)]
    return str


# code表
# 1: success
# -1: 一般性错误
# -2: 登录失效
# -3: 未登录
