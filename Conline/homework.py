# coding=utf-8
from django.views.decorators.csrf import csrf_exempt, csrf_protect
import os
# 工具函数导入
from webapi.tools import random_str, pack, tokenActive
import time
import subprocess
import chardet
from Conline.settings import BASE_DIR

# model导入
from webapi.models import Homework, User

# 日志导入
from webapi.tools import log


# 创建题目
@csrf_exempt
def creatHomework(request):
    try:
        body = eval(request.body)
        user = tokenActive(request.COOKIES)
        if not isinstance(user, User):
            pack(code=user)
        id = random_str()
        now = int(1000 * time.time())
        user = Homework(homeworkid=id, title=body['title'], creator=user.userid, type=body['type'], creattime=now, father=body['father'])
        if body['type'] != '2':
            user.answer = body['answer']
        if body['type'] == '0':
            user.option = body['option']
        if body['type'] == '2':
            user.input = body['input']
            user.output = body['output']
        user.save()
        return pack(data={'homeworkid': id})
    except Exception as e:
        return pack(msg=e)


# 获取题目
@csrf_exempt
def getHomework(request):
    try:
        body = eval(request.body)
        homework = list(Homework.objects.all().filter(homeworkid=body['homeworkid']))
        if len(homework) == 0:
            raise Exception('题目id错误')
        return pack(data=homeworkModel(homework))
    except Exception as e:
        return pack(msg=e)


# 获取作者题目列表
@csrf_exempt
def getHomeworkByUser(request):
    try:
        body = eval(request.body)
        homeworklist = list(Homework.objects.all().filter(creator=body['userid']))
        if len(homeworklist) == 0:
            return pack(data=[], msg='未获取到数据')
        for homework in homeworklist:
            homework = homeworkModel(homework)
        return pack(data=homeworklist)
    except Exception as e:
        return pack(msg=e)


# 获取章节题目列表
@csrf_exempt
def getHomeworkBySection(request):
    try:
        model = []
        body = eval(request.body)
        homeworklist = list(Homework.objects.all().filter(father=body['sectionid']))
        if len(homeworklist) == 0:
            return pack(data=[], msg='未获取到数据')
        for homework in homeworklist:
            model.append(homeworkModel(homework))
        return pack(data=model)
    except Exception as e:
        return pack(msg=e)


# 程序题运行
@csrf_exempt
def codeRun(request):
    try:
        body = eval(request.body)
        code = body['code']
        id = body['homeworkid']
        sfile = BASE_DIR + '/static/c/' + random_str() + '.c'
        with open(sfile, 'w') as cfile:
            cfile.write(code)
            cfile.close()
        dist = BASE_DIR + '/static/c/' + random_str()
        # 编译程序
        gcc = subprocess.Popen(['gcc', sfile, '-o', dist], stderr=subprocess.PIPE)
        gcc.wait()
        if gcc.stderr.read() != '':
	    log('error: '+gcc.stderr.read())
            raise Exception('编译出错')
        log('source ' + sfile + '\n' + dist)
        homework = list(Homework.objects.filter(homeworkid=id))[0]
        inputlist = eval(homework.input)
        outputlist = eval(homework.output)
        # 记录正确与否的list
        resultlist = []
        # 循环执行
        for input in inputlist:
            p = subprocess.Popen(dist, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            p.stdin.write(input + '\n')
            p.wait()
            # 如果出错，那么记录错误
            result = p.stdout.read()
            if result != '':
                # 获取编码
               # encoding = chardet.detect(result)['encoding']
                # 转码
               # result = result.decode(encoding).encode('utf-8')
                if p.stderr.read() != '':
                    raise Exception('type error')
                # 正确的话，记录正确
                elif result == outputlist[inputlist.index(input)]:
                    resultlist.append(True)
                else:
                    resultlist.append(False)
        os.remove(sfile)
        os.remove(dist)
        return pack(data=resultlist)
    except Exception as e:
        os.remove(sfile)
        return pack(msg=e)


@csrf_exempt
def moban(request):
    try:
        body = eval(request.body)

    except Exception as e:
        return pack(msg=e)


def homeworkModel(homework):
    return {
        'homeworkid': homework.homeworkid,
        'title': homework.title,
        'creator': homework.creator,
        'type': homework.type,
        'answer': homework.answer,
        'option': homework.option
    }
