from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from django.core import serializers
from .models import *

User = get_user_model()


@method_decorator(csrf_exempt, name='dispatch')
class QueueMake(View):
    def post(self, request):

        data = json.loads(request.body.decode("utf-8"))
        product_data = {
            'name': data.get('name'),
            'desc': data.get('desc'),
            'eta': data.get('eta'),
            'lati': data.get('lati'),
            'longi': data.get('longi'),
            'creator': User.objects.get(username=data.get('username')),
            'paused': False
            'ended': False
        }
        queue = Queue.objects.create(**product_data)
        data = {
            "queue_id": f"{queue.id}"
        }
        return JsonResponse(data, status=201)


@method_decorator(csrf_exempt, name='dispatch')
class QueueCreator(View):
    def post(self, request):

        data = json.loads(request.body.decode("utf-8"))
        queue_id = data.get('queue_id')
        queue = Queue.objects.get(id=queue_id)
        data = {
            "creator": f"{queue.creator.username}"
        }
        return JsonResponse(data, status=201)


@method_decorator(csrf_exempt, name='dispatch')
class QueueNext(View):
    def post(self, request):
        data = json.loads(request.body.decode("utf-8"))
        queue_id = data.get('queue_id')
        queue = Queue.objects.get(id=queue_id)
        user_to_remove = queue.users.all()[0]
        queue.users.remove(user_to_remove)
        data = {"message": "Queue has proceeded"}
        return JsonResponse(data, status=201)


@method_decorator(csrf_exempt, name='dispatch')
class QueueEnd(View):
    def post(self, request):
        data = json.loads(request.body.decode("utf-8"))
        queue_id = data.get('queue_id')
        queue = Queue.objects.get(id=queue_id)
        queue.ended = True
        queue.users.clear()
        data = {"message": "Queue has ended"}
        return JsonResponse(data, status=201)


@method_decorator(csrf_exempt, name='dispatch')
class QueuePause(View):
    def post(self, request):
        data = json.loads(request.body.decode("utf-8"))
        queue_id = data.get('queue_id')
        queue = Queue.objects.get(id=queue_id)
        queue.paused = True
        data = {"message": "Queue has been paused"}
        return JsonResponse(data, status=201)


@method_decorator(csrf_exempt, name='dispatch')
class UserJoinQueue(View):
    def post(self, request):
        data = json.loads(request.body.decode("utf-8"))
        queue_id = data.get('queue_id')
        username = data.get('username')
        queue = Queue.objects.get(id=queue_id)
        if !queue.paused and !queue.ended:
            user = User.objects.get(username=username)
            queue.users.add(user)
            queue.allusers.add(user)
        data = {"message": "User has joined queue"}
        return JsonResponse(data, status=201)


@method_decorator(csrf_exempt, name='dispatch')
class UserLeaveQueue(View):
    def post(self, request):
        data = json.loads(request.body.decode("utf-8"))
        queue_id = data.get('queue_id')
        username = data.get('username')
        queue = Queue.objects.get(id=queue_id)
        user = User.objects.get(username=username)
        queue.users.remove(user)
        data = {"message": "User has left queue"}
        return JsonResponse(data, status=201)


@method_decorator(csrf_exempt, name='dispatch')
class UserInQueue(View):
    def post(self, request):
        data = json.loads(request.body.decode("utf-8"))
        username = data.get('username')
        user = User.objects.get(username=username)
        queues = user.queues.filter(ended=False)
        data = {}
        for queue in queues:
            data[queue.id] = {
                usernames = [user.username for user in queue.users.all()]
                position = usernames.index(username)
                'name': queue.name,
                'desc': queue.desc,
                'eta': queue.eta,
                'lati': queue.lati,
                'longi': queue.longi,
                'creator': queue.creator,
                'position': position,
            }
        return JsonResponse(data, status=201)


@method_decorator(csrf_exempt, name='dispatch')
class UserAllQueues(View):
    def post(self, request):
        data = json.loads(request.body.decode("utf-8"))
        username = data.get('username')
        queues = user.allqueues.filter()
        data = {queue.id for queue in queues}
        data = {
            "queue_id_list": data
        }
        return JsonResponse(data, status=201)


@method_decorator(csrf_exempt, name='dispatch')
class UserNearQueues(View):
    def post(self, request):
        data = json.loads(request.body.decode("utf-8"))
        lati = data.get('lati')
        longi = data.get('longi')
        data = {queue.id for queue in Queue.objects.filter(
            lati__range=[lati-0.1, lati+0.1], longi__range=[longi-0.1, longi+0.1], ended=False, paused=False)}
        data = {
            "queue_id_list": data
        }
        return JsonResponse(data, status=201)


@method_decorator(csrf_exempt, name='dispatch')
class UserLogin(View):
    def post(self, request):
        data = json.loads(request.body.decode("utf-8"))
        username = data.get('username')
        if User.objects.filter(username=data.get('username')).exists():
            user = User.objects.get(username)
            if user.password == make_password(data.get('password')):
                reply = {"message": "You win!"}
                return JsonResponse(data, status=201)
        reply = {"message": "Failure..."}
        return JsonResponse(data, status=401)


@method_decorator(csrf_exempt, name='dispatch')
class UserAdd(View):
    def post(self, request):
        data = json.loads(request.body.decode("utf-8"))
        if (not User.objects.filter(username=data.get('username')).exists()) and len(data.get('password')) > 4:
            user_data = {
                'username': data.get('username'),
                'password': make_password(data.get('password')),
            }
            User = User.objects.create(**user_data)
            data = {"message": "User created"}
            return JsonResponse(data, status=201)
        data = {"message": "Signup info invalid"}
        return JsonResponse(data, status=401)
