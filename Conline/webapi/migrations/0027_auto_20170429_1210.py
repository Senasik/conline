# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-04-29 03:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapi', '0026_auto_20170429_1209'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='label',
        ),
        migrations.AlterField(
            model_name='notic',
            name='creattime',
            field=models.CharField(default=1493435435408L, max_length=45),
        ),
        migrations.AlterField(
            model_name='notic',
            name='noticid',
            field=models.CharField(default='uJJkQYpphiHL9erczSsk77Ltxf09EW', max_length=45, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='userid',
            field=models.CharField(default='0ME2b2ySzHsbvORCPQvxWt2RrejvuG', max_length=45, primary_key=True, serialize=False),
        ),
    ]
