from django.contrib import admin

# Register your models here.
from app.models import Resources, Bundles

admin.site.register(Resources)
admin.site.register(Bundles)
