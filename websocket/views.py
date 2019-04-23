from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, StreamingHttpResponse
from django.core import serializers

from .forms import RemoteForm
from .forms import MacForm
from django.views.decorators.csrf import csrf_exempt

from .models import IMG, UploadModel, MacModel
from django.conf import settings

from dwebsocket import require_websocket, accept_websocket
import threading
import time
import os
import json


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


def get_macaddr(line):
    mac = None
    if line.startswith(b'Macaddr:'):
        line = line.decode()
        mac = ":".join(line.split(":")[1:])
    return mac


def if_mac_exists(mac):
    global ws_dict
    if not ws_dict:
        return False
    else:
        try:
            print(">>>")
            print(ws_dict[mac])
            print("<<<")
            if ws_dict[mac]:
                return True
        except:
            print("error if_mac_exists")
    return True



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
                    if mac is None:
                        # print(message)
                        if local_client is not None:
                            for msg in message.split(b'\n'):
                                # message_str = message.decode()
                                if msg is not b'':
                                    local_client.send(msg)
                        # tv_ws_message.append(message)
                        break
                    if not if_mac_exists(mac):
                        # save the mac
                        MacModel(mac_addr=mac).save()
                    # update ws_dict[mac]
                    ws_dict[mac] = request.websocket
                    clients.append(request.websocket)
                    # for client in clients:
                    #     if client.is_closed():
                    #         print("closed client")
                    #         clients.remove(client)
                    #         for key in ws_dict.keys():
                    #             if ws_dict[key] is client:
                    #                 print(key)
                    #                 macdb = MacModel.objects.get(mac_addr=key)
                    #                 print(macdb)
                                    # macdb.delete()

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
def show_img(request):
    imgs = IMG.objects.all()
    content = {
        'imgs': imgs,
    }
    return render(request, 'showimg.html', content)


@csrf_exempt
def show_downloadable_files(request):
    files = UploadModel.objects.all()
    content = {
        'files': files,
    }
    return render(request, 'download.html', content)


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

            with open(file_path, 'wb+') as f:
                f.write(data.read())
    # useless render
    return render(request, 'upload.html')


@csrf_exempt
def client_mac(request):
    if request.method == 'POST':
        mac_dict = json.loads(request.body.decode('utf-8'))
        mac = mac_dict['mac']

        bind_ws_by_mac(mac)
    # useless render
    return render(request, 'upload.html')


def macs(request):
    mac = MacModel.objects.all()
    mac_json = json.dumps(serializers.serialize("json", mac))
    response = HttpResponse()
    response['Content-Type'] = "text/javascript"
    response.write(mac_json)
    return response


def bind_ws_by_mac(mac):
    print(mac)
    return ""

