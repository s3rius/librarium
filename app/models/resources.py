from django.db import models
from enum import Enum


class ResourceType(Enum):
    PDF = "pdf"
    URL = "url"
    YVID = "Youtube video"


class Resources(models.Model):
    content = models.BinaryField()
    name = models.CharField(max_length=50)
    description = models.TextField()
    kind = [(tag, tag.value) for tag in ResourceType]
