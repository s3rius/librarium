import magic
from django.contrib.auth.models import User
from django.db import models
from model_utils import Choices
from pdf2image import convert_from_bytes


class Resources(models.Model):
    TYPES = Choices('BOOK', 'URL', 'VIDEO')
    content = models.BinaryField()
    likes = models.BigIntegerField(default=0)
    name = models.CharField(max_length=50)
    description = models.TextField()
    kind = models.CharField(max_length=40, choices=TYPES, default='BOOK')
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def get_content_mime(self):
        m = magic.Magic(mime=True, uncompress=True)
        return m.from_buffer(self.content)

    def get_content_preview(self, dpi=100):
        if self.get_content_mime() == 'application/pdf':
            images = convert_from_bytes(self.content, dpi=dpi, last_page=1, fmt='jpg')
            return images[0]
        else:
            return None


class LibUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_pic = models.BinaryField()


class Bundles(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    attachments = models.ManyToManyField(Resources)
