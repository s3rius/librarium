from django.contrib.auth.models import User
from rest_framework import serializers

from app.models import Resources, Bundles


class ResourcesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resources
        fields = ('id', 'name', 'description', 'likes', 'kind')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}


class BundlesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bundles
        fields = ('id', 'name', 'description', 'attachments')
