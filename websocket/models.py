from django.db import models


# Create your models here.
class SimpleModel(models.Model):
    mac_list = models.CharField(max_length=64)


class IMG(models.Model):
    img = models.ImageField(upload_to='img')


class UploadModel(models.Model):
    upload_file = models.ImageField(upload_to='upload')

