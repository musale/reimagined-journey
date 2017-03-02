"""Routing for user account processes."""
from django.conf.urls import url

from v11 import views

urlpatterns = [
    url(r'^$', views.file_upload, name='file_upload'),
]
