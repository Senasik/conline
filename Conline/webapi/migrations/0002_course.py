# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-03-13 02:59
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapi', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('courseid', models.CharField(max_length=45, primary_key=True, serialize=False)),
                ('creattime', models.CharField(max_length=45)),
                ('creator', models.CharField(max_length=45)),
                ('type', models.IntegerField()),
            ],
        ),
    ]