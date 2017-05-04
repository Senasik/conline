# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-05-02 08:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapi', '0030_auto_20170502_1726'),
    ]

    operations = [
        migrations.AlterField(
            model_name='editsection',
            name='creattime',
            field=models.BigIntegerField(),
        ),
        migrations.AlterField(
            model_name='notic',
            name='creattime',
            field=models.CharField(default=1493714100528L, max_length=45),
        ),
        migrations.AlterField(
            model_name='notic',
            name='noticid',
            field=models.CharField(default='y2qs2N3qBoAIbz1Zo4eMD1hOOrU1vL', max_length=45, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='record',
            name='time',
            field=models.BigIntegerField(),
        ),
        migrations.AlterField(
            model_name='tag',
            name='creattime',
            field=models.BigIntegerField(),
        ),
        migrations.AlterField(
            model_name='user',
            name='userid',
            field=models.CharField(default='u8IppUcqFhxdxYcDgdUexYe2CBAhFi', max_length=45, primary_key=True, serialize=False),
        ),
    ]