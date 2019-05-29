from django.urls import path, re_path

from . import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # path('', views.index, name='index'),
    path('console', views.console, name='console'),
    # re_path('remote', views.remote_diagnostic, name='remote'),
    re_path('connect', views.ws_connect),
    re_path('client_upload/?.*', views.upload_from_client),
    re_path('upload', views.upload),
    re_path('show', views.showable),
    re_path('echo/?.*', views.echo),
    re_path('download', views.downloadable),
    re_path('macs', views.macs),
    re_path('client_mac', views.client_mac),
    re_path('test', views.test),
]

# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
