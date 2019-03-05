from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

from .forms import RemoteForm
from .forms import MacForm

from dwebsocket import require_websocket, accept_websocket
import threading


clients = []
local_client = None
ws_dict = {}

tv_ws_message = []


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def remote_diagnostic(request):
    if request.method == 'POST':
        form = RemoteForm(request.POST)
        if form.is_valid():
            for client in clients:
                message = form.cleaned_data['command']
                client.send(message)
        else:
            return HttpResponse("error")
    else:
        global local_client
        local_client = None

    return render(request, 'remote_diagnostic.html', {})


def client_mac_list(request, mac):
    form = MacForm()
    return render(request, 'remote_diagnostic.html', {'form': form})


@require_websocket
def ws_connect(request):
    if request.is_websocket:
        lock = threading.RLock()
        try:
            lock.acquire()
            for message in request.websocket:
                if not message:
                    break
                if not clients:
                    clients.append(request.websocket)
                # print("ws_connect: ")
                # print(locals_clients)
                # get Macaddr
                #for client in local_client:
                if local_client is not None:
                    local_client.send(message)
                # tv_ws_message.append(message)
        finally:
        #     clients.remove(request.websocket)
            lock.release()


@accept_websocket
def echo(request):
    global local_client
    if request.is_websocket:
        lock = threading.RLock()
        try:
            lock.acquire()
            if not local_client:
            #   locals_clients.append(request.websocket)
                local_client = request.websocket
            print(local_client)
            # print(locals_clients)
            for message in request.websocket:
                if not message:
                    break
                if local_client is not None:
                    local_client.send(message)
                # for client in locals_clients:
                #     client.send(message)
        finally:
            # clients.remove(request.websocket)
            lock.release()
