# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-03-24 02:45
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapi', '0016_course_tag'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notic',
            fields=[
                ('noticid', models.CharField(max_length=45, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=45)),
                ('creattime', models.CharField(max_length=45)),
                ('contant', models.TextField()),
            ],
        ),
    ]
