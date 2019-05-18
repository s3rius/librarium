"""librarium URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from jwt_auth import views as jwt_auth_views

from app.views import entries_list, AllResourcesView, ResourceView, ContentView, PreviewView, PostsView, TestToken

urlpatterns = [
    path('admin', admin.site.urls),
    path('entries', entries_list),
    path('resources', AllResourcesView.as_view()),
    path('resource/<int:resource_id>', ResourceView.as_view()),
    path('content/<int:resource_id>/full', ContentView.as_view()),
    path('content/<int:resource_id>/preview', PreviewView.as_view()),
    path('aa', PostsView.as_view()),
    path('api-token-test', TestToken.as_view()),
    path('api-token-update', jwt_auth_views.refresh_jwt_token),
    path('api-token-auth', jwt_auth_views.jwt_token),
]
