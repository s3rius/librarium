from django.db import models
from app.models.resources import Resources


class Entries(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    attachments = models.ManyToManyField(Resources)
