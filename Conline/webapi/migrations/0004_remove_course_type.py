# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-03-13 06:01
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('webapi', '0003_auto_20170313_1234'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='type',
        ),
    ]
