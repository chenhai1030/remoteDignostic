from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, StreamingHttpResponse
from django.core import serializers
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile


from django.views.decorators.csrf import csrf_exempt

from .models import IMG, UploadModel, MacModel, UploadedClients
from django.conf import settings


from dwebsocket import require_websocket, accept_websocket
import threading

import os
import json

from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore, register_events, register_job


from collections import defaultdict




# struct:
# key : value
# mac : request.websocket
ws_dict = {}
web_ws_dict = {}

# struct:
# key : value
# mac : [message list]
tv_ws_message = defaultdict(list)


try:
    # 实例化调度器
    scheduler = BackgroundScheduler()
    # 调度器使用DjangoJobStore()
    scheduler.add_jobstore(DjangoJobStore(), "default")
    # 设置定时任务，选择方式为interval，时间间隔为1s
    # 另一种方式为每天固定时间执行任务，对应代码为：
    # @register_job(scheduler, 'cron', day_of_week='mon-fri', hour='9', minute='30', second='10',id='task_time')
    @register_job(scheduler,"interval", seconds=1)
    def dispatch_message():
        global web_ws_dict

        try:
            if not web_ws_dict:
                return
            else:
                for key in web_ws_dict.keys():
                    # msg_len = len(tv_ws_message[key])
                    # if msg_len > 0:
                        # # print("dispatch_message mac: " + key)
                        # for msg in tv_ws_message[key].pop(0).split(b'\n'):
                        #     if msg is not b'':
                        #         web_ws_dict[key].send(msg)
                        web_ws_dict[key].send("FunLogEnd")
        except:
            pass


    @register_job(scheduler, "interval", seconds=600)
    def manager_clients_info():
        macs = MacModel.objects.all()
        for mac in macs:
            if mac.mac_addr in ws_dict.keys():
                print(mac.mac_addr)
            else:
                MacModel.objects.filter(mac_addr=mac.mac_addr).delete()


    register_events(scheduler)
    scheduler.start()
except Exception as e:
    print(e)
    scheduler.shutdown()


def index(request):
    return render(request, 'diagnostic.html', {})


@csrf_exempt
def console(request):
    if request.method == 'POST':
        message = request.POST.__getitem__('value')

        mac = get_macaddr(request.get_full_path().encode(encoding="utf-8"))
        if mac is not None:
            try:
                ws_dict[mac].send(message)
                tv_ws_message[mac].clear()
            except Exception as e:
                print(e)

    return render(request, 'console.html', {})

#
# def remote_diagnostic(request):
#     if request.method == 'POST':
#         form = RemoteForm(request.POST)
#         if form.is_valid():
#             for client in clients:
#                 message = form.cleaned_data['command']
#                 client.send(message)
#         else:
#             return HttpResponse("error")
#
#     return render(request, 'remote_diagnostic.html', {})


@require_websocket
def test(request):
    try:
        for message in request.websocket:
            request.websocket.send(message)
    finally:
        pass


def get_macaddr(line):
    if line.startswith(b'Macaddr:'):
        line = line.decode()
        mac = ":".join(line.split(":")[1:])
    elif line.find(b"macaddr") != -1:
        line = line.decode()
        mac_start_pos = line.index("macaddr=") + 8
        mac = line[mac_start_pos:mac_start_pos+12]
    else:
        line = line.decode()
        mac = "".join(line.split("/")[3:])
    return mac


def if_mac_exists(mac):
    global ws_dict
    if not ws_dict:
        return False
    else:
        try:
            if ws_dict[mac]:
                return True
        except:
            print("error if_mac_exists " + mac)
    return False


@require_websocket
def ws_connect(request):
    global ws_dict

    if request.websocket.is_closed():
        print("ws is closed!")
    # lock = threading.RLock()
    try:
        # lock.acquire()
        for message in request.websocket:
            if not message:
                for key in list(ws_dict.keys()):
                    if ws_dict[key] == request.websocket:
                        if request.websocket.is_closed():
                            del ws_dict[key]

            else:
                if message.startswith(b'Macaddr:'):
                    mac = get_macaddr(message)
                    # format mac from xx:xx:xx:xx:xx to xxxxxxxxxx
                    mac_format = mac.replace(":", "")
                    if not if_mac_exists(mac_format):
                        if not MacModel.objects.filter(mac_addr=mac).exists():
                            # save the mac
                            # save mac as xx:xx:xx:xx:xx
                            MacModel(mac_addr=mac).save()
                    # update ws_dict[mac]

                    ws_dict[mac_format] = request.websocket
                    # clients.append(request.websocket)
                else:
                    # if local_client is not None:
                    #     for msg in message.split(b'\n'):
                    #         if msg is not b'':
                    #             local_client.send(msg)
                    # print("append_message: " + str(message))
                    append_message(request.websocket, message)

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
        pass
    #     clients.remove(request.websocket)
    #     lock.release()


@require_websocket
def echo(request):
    global web_ws_dict
    if request.is_websocket:
        lock = threading.RLock()
        try:
            lock.acquire()

            mac = get_macaddr(request.get_full_path().encode(encoding="utf-8"))
            if mac is not None:
                web_ws_dict[mac] = request.websocket

            for message in request.websocket:
                if not message:
                    if request.websocket.is_closed():
                        print("local ws closed!!")

                    # for client in locals_clients:
                    #     client.send(message)
        finally:
            # clients.remove(request.websocket)
            lock.release()


def save_file(file_obj, mac, type):
    sub_folder = 'upload'
    if type == "img":
        file_name = file_obj.img.name
        file = file_obj.img.file
        sub_folder = 'img'
        # img = Image.open(file)
        # img.save(file_path)
    else:
        file_name = file_obj.upload_file.name
        file = file_obj.upload_file.file

    file_path = os.path.join(sub_folder, mac, file_name)
    default_storage.save(file_path, ContentFile(file.read()))

    # if not UploadedClients.objects.filter(client_macs=mac).exists():
    #     UploadedClients(client_macs=mac).save()
    UploadedClients(files=file_path, client_macs=mac).save()


@csrf_exempt
def showable(request):
    client_macs = UploadedClients.objects.filter().values("client_macs").distinct()
    content = {
        # 'imgs': imgs,
        'client_macs': client_macs,
    }
    return render(request, 'show.html', content)


@csrf_exempt
def downloadable(request):
    client_macs = UploadedClients.objects.filter().values("client_macs").distinct()

    content = {
        'client_macs': client_macs,
    }
    return render(request, 'download.html', content)


@csrf_exempt
def show_files(request):
    mac = request.get_full_path().split("/")[-1]
    files = UploadedClients.objects.filter(client_macs=mac)
    content = {
        'mac': mac,
        'files': files,
    }
    return render(request, 'show_files.html', content)


# file uploaded from client
@csrf_exempt
def upload_from_client(request):
    if request.method == 'POST':
        mac = get_macaddr(request.path.encode(encoding="utf-8"))
        if request.FILES.get('img') is not None:
            new_file = IMG(
                img=request.FILES.get('img')
            )
            save_file(new_file, mac, "img")
        else:
            new_file = UploadModel(
                upload_file=request.FILES.get('upload')
            )
            save_file(new_file, mac, "file")
        # new_file.save()
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

    # useless render
    return render(request, 'upload.html')


def macs(request):
    mac = MacModel.objects.all()
    mac_json = json.dumps(serializers.serialize("json", mac))
    response = HttpResponse()
    response['Content-Type'] = "text/javascript"
    response.write(mac_json)
    return response


# def uploaded_clients(request):
#     uploaded_client = UploadedClients.objects.all()
#     mac_json = json.dumps(serializers.serialize("json", uploaded_client))
#     response = HttpResponse()
#     response['Content-Type'] = "text/javascript"
#     response.write(mac_json)
#     return response


def append_message(ws_client, msg):
    for key in web_ws_dict.keys():
        # print("append_message mac: " + key)
        try:
            if ws_dict[key] == ws_client:
                tv_ws_message[key].append(msg)
                msg_len = len(tv_ws_message[key])
                if msg_len > 0:
                    # print("dispatch_message mac: " + key)
                    for msg in tv_ws_message[key].pop(0).split(b'\n'):
                        if msg is not b'':
                            web_ws_dict[key].send(msg)
        except:
            pass
    return



