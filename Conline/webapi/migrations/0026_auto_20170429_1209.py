# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-04-29 03:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapi', '0025_auto_20170429_1202'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Label',
            new_name='Tag',
        ),
        migrations.RenameField(
            model_name='tag',
            old_name='labelid',
            new_name='tagid',
        ),
        migrations.AlterField(
            model_name='notic',
            name='creattime',
            field=models.CharField(default=1493435371049L, max_length=45),
        ),
        migrations.AlterField(
            model_name='notic',
            name='noticid',
            field=models.CharField(default='1x2n4njB9CvcOOkI8ScIw2RO1bqCjJ', max_length=45, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='userid',
            field=models.CharField(default='h6tiTpGim1IiG30kSDeLs5cUjmZCmb', max_length=45, primary_key=True, serialize=False),
        ),
    ]
