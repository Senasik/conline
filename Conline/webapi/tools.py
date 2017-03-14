# coding=utf-8
from random import Random
from django.http import JsonResponse

from webapi.models import User

import logging
# 日志文件
Debuglog = logging.getLogger('debug')


# api包装,第一个参数是数据，第二个参数是异常信息

def pack(data={}, msg='success', code=1):
    msg = codeMsg(code, msg)
    model = {
        'code': code,
        'msg': str(msg),
        'data': data
    }
    # 一般性错误归为-1
    if msg != 'success' and code == 1:
        model['code'] = -1
    result = JsonResponse(model)
    result['Access-Control-Allow-Origin'] = 'http://c.conline.com:8080'
    result['Access-Control-Allow-Credentials'] = 'true'
    return result


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


# 根据code获得相应的msg
def codeMsg(code, msg):
    # code表
    # -2: 登录失效
    # -3: 未登录
    msg = msg
    if code == -2:
        msg = '登录失效'
    elif code == -3:
        msg = '未登录'
    return msg


# 生成随机字符串

def random_str(randomlength=30):
    str = ''
    chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
    length = len(chars) - 1
    random = Random()
    for i in range(randomlength):
        str+=chars[random.randint(0, length)]
    return str