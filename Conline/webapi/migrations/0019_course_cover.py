# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-04-05 12:33
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapi', '0018_auto_20170324_1155'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='cover',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
