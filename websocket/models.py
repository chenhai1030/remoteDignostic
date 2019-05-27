from django.db import models


# Create your models here.
class MacModel(models.Model):
    mac_addr = models.CharField(max_length=20)


class UploadedClients(models.Model):
    client_macs = models.CharField(max_length=20)
    files = models.CharField(max_length=255, default="")


class IMG(models.Model):
    img = models.ImageField(upload_to='img')


class UploadModel(models.Model):
    upload_file = models.FileField(upload_to='upload')

    @property
    def file_url(self):
        if self.upload_file and hasattr(self.upload_file, 'url'):
            return self.upload_file.url

