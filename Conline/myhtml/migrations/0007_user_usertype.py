# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-03-07 12:12
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myhtml', '0006_auto_20170307_2107'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='usertype',
            field=models.IntegerField(default=1),
        ),
    ]
