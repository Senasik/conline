from django.db import models

# Create your models here.


class Group(models.Model):
    name = models.CharField(unique=True, max_length=80)

    class Meta:
        app_label = 'myhtml'

class User(models.Model):

    userid = models.CharField(primary_key=True, max_length=20)
    username = models.CharField(max_length=20)
    usertype = models.IntegerField(default=1)

    class Meta:
        app_label = 'myhtml'

