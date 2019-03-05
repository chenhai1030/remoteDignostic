from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    re_path('remote', views.remote_diagnostic, name='remote'),
    re_path('connect', views.ws_connect),
    re_path('echo', views.echo),
]
