from django.urls import path, re_path

from . import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # path('', views.index, name='index'),
    path('console', views.console, name='console'),
    re_path('remote', views.remote_diagnostic, name='remote'),
    re_path('connect', views.ws_connect),
    re_path('client_upload', views.upload_from_client),
    re_path('upload', views.upload),
    re_path('show', views.showImg),
    re_path('echo', views.echo),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
