# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-03-13 07:18
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapi', '0006_auto_20170313_1516'),
    ]

    operations = [
        migrations.AddField(
            model_name='section',
            name='content',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='section',
            name='fileurl',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]
