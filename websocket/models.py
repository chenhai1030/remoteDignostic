from django.db import models


# Create your models here.
class SimpleModel(models.Model):
    mac_list = models.CharField(max_length=64)
