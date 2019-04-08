from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, StreamingHttpResponse
from wsgiref.util import FileWrapper

from .forms import RemoteForm, ConsoleForm
from .forms import MacForm
from django.views.decorators.csrf import csrf_exempt

from .models import IMG, UploadModel
from django.conf import settings

from dwebsocket import require_websocket, accept_websocket
import threading
import time
import os


clients = []
local_client = None
ws_dict = {}

tv_ws_message = []


def index(request):
    return render(request, 'diagnostic.html', {})


@csrf_exempt
def console(request):
    if request.method == 'POST':
        message = request.POST.__getitem__('value')
        # print(message)
        for client in clients:
            client.send(message)
    return render(request, 'console.html', {})


def remote_diagnostic(request):
    if request.method == 'POST':
        form = RemoteForm(request.POST)
        if form.is_valid():
            for client in clients:
                message = form.cleaned_data['command']
                client.send(message)
        else:
            return HttpResponse("error")
    # else:
    #     global local_client
    #     local_client = None

    return render(request, 'remote_diagnostic.html', {})


def client_mac_list(request, mac):
    form = MacForm()
    return render(request, 'remote_diagnostic.html', {'form': form})


def get_macaddr(line):
    mac = None
    if line.startswith(b'Macaddr:'):
        line = line.decode()
        mac = ":".join(line.split(":")[1:])
    return mac


@require_websocket
def ws_connect(request):
    global local_client
    global ws_dict
    if request.is_websocket:
        if request.websocket.is_closed():
            print("ws is closed!")
        lock = threading.RLock()
        try:
            lock.acquire()
            for message in request.websocket:
                if not message:
                    for key in ws_dict:
                        if ws_dict[key] == request.websocket:
                            if request.websocket.is_closed():
                                del ws_dict[key]
                                break
                    break
                else:
                    mac = get_macaddr(message)
                    if mac is not None:
                        ws_dict = {mac: request.websocket}
                        clients.append(request.websocket)
                        for client in clients:
                            if client.is_closed():
                                clients.remove(client)

                # print(message)
                if local_client is not None:
                    for msg in message.split(b'\n'):
                    # message_str = message.decode()
                        if msg is not b'':
                            local_client.send(msg)
                # tv_ws_message.append(message)
        finally:
        #     clients.remove(request.websocket)
            lock.release()


@require_websocket
def echo(request):
    global local_client
    if request.is_websocket:
        lock = threading.RLock()
        try:
            lock.acquire()
            if local_client is None:
                local_client = request.websocket

            for message in local_client:
                if not message:
                    if request.websocket.is_closed():
                        local_client = None
                        print("local ws closed!!")

                    # for client in locals_clients:
                    #     client.send(message)
        finally:
            # clients.remove(request.websocket)
            lock.release()


@csrf_exempt
def showImg(request):
    imgs = IMG.objects.all()
    content = {
        'imgs': imgs,
    }
    return render(request, 'showimg.html', content)


# file uploaded from client
@csrf_exempt
def upload_from_client(request):
    if request.method == 'POST':
        if request.FILES.get('img') is not None:
            new_file = IMG(
                img=request.FILES.get('img')
            )
        else:
            new_file = UploadModel(
                upload_file=request.FILES.get('upload')
            )
        new_file.save()
    return render(request, 'upload.html')


# file send to client
@csrf_exempt
def upload_to_client(request):
    if request.method == 'POST':
        if request.FILES.get('img') is not None:
            new_file = UploadModel(
                upload_file=request.FILES.get('upload')
            )
        new_file.save()
    return render(request, 'upload.html')


@csrf_exempt
def upload(request):
    if request.method == 'POST':
        for file in request.FILES:
            data = request.FILES.get(file)
            file_path = os.path.join(settings.MEDIA_ROOT, 'upload', file)
            # print(">>>")
            # print(file_path)
            # print("<<<")
            with open(file_path, 'wb+') as f:
                f.write(data.read())
    return render(request, 'upload.html')
