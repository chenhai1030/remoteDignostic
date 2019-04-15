"""RemoteDignostic URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
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
from django.urls import include, path

from django.conf import settings
from django.conf.urls.static import static



# @accept_websocket
# def echo(request):
#     if request.is_websocket:
#         lock = threading.RLock()
#         try:
#             lock.acquire()
#             clients.append(request.websocket)
#             print(1111111)
#             for message in request.websocket:
#                 if not message:
#                     break
#             #     for client in clients:
#             #         client.send(message)
#         finally:
#             clients.remove(request.websocket)
#             lock.release()


urlpatterns = [
    # re_path(r'^echo$', echo),
    path('chat/', include('websocket.urls')),
    path('admin/', admin.site.urls),
]

urlpatterns \
    += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
