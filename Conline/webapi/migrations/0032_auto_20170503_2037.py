# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-05-03 11:37
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapi', '0031_auto_20170502_1735'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='creattime',
            field=models.BigIntegerField(),
        ),
        migrations.AlterField(
            model_name='homework',
            name='creattime',
            field=models.BigIntegerField(),
        ),
        migrations.AlterField(
            model_name='notic',
            name='creattime',
            field=models.BigIntegerField(default=1493811455354L),
        ),
        migrations.AlterField(
            model_name='notic',
            name='noticid',
            field=models.CharField(default='B0QOHSWvEZrJLNYVvUIO0tHQ3jPIkp', max_length=45, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='resource',
            name='creattime',
            field=models.BigIntegerField(),
        ),
        migrations.AlterField(
            model_name='section',
            name='creattime',
            field=models.BigIntegerField(),
        ),
        migrations.AlterField(
            model_name='user',
            name='userid',
            field=models.CharField(default='wnaJBkn1QhVsmVptLjufVsjDpXXGs4', max_length=45, primary_key=True, serialize=False),
        ),
    ]
