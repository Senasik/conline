from __future__ import unicode_literals

from django.db import models

# Create your models here.


class User(models.Model):
    userid = models.CharField(primary_key=True, max_length=45)
    username = models.CharField(max_length=45)
    password = models.CharField(max_length=45)
    type = models.IntegerField(blank=True, null=True)
    token = models.CharField(max_length=45, blank=True, null=True)
