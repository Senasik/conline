# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-04-29 06:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapi', '0027_auto_20170429_1210'),
    ]

    operations = [
        migrations.AddField(
            model_name='tag',
            name='creattime',
            field=models.CharField(default=1493447484173L, max_length=45),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='notic',
            name='creattime',
            field=models.CharField(default=1493447435284L, max_length=45),
        ),
        migrations.AlterField(
            model_name='notic',
            name='noticid',
            field=models.CharField(default='FIVmw9Xsn77LMk7DUjEnv1lOzAFklC', max_length=45, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='tag',
            name='title',
            field=models.CharField(max_length=45, verbose_name='\u5206\u7c7b\u540d'),
        ),
        migrations.AlterField(
            model_name='user',
            name='userid',
            field=models.CharField(default='MistfVZ4TmE0LSF4dNE9jIGsW53DBN', max_length=45, primary_key=True, serialize=False),
        ),
    ]