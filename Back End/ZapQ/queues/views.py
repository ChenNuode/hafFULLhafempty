from django.shortcuts import render
from django.views import View
from rest_framework.views import APIView
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from django.core import serializers
from users.serializers import UserSerializer
from .models import *
from django.utils.decorators import method_decorator
from django.contrib.auth import get_user_model, authenticate
from .serializers import *

User = get_user_model()


@method_decorator(csrf_exempt, name='dispatch')
class QueueMake(APIView):
    def post(self, request):
        data = self.request.data
        product_data = {
            'name': data.get('name'),
            'desc': data.get('desc'),
            'eta': 2,
            'lati': data.get('lati'),
            'longi': data.get('longi'),
            'creator': User.objects.get(username=data.get('username')).id,
        }
        queue = createQueueSerializer(data=product_data)
        if queue.is_valid():
            print('e')
            savedqueue = queue.save()
        else:
            print(queue.errors)
        #queue.users.set([])
        #queue.allusers.set([])
        returndata = {
            "queue_id": f"{savedqueue.id}"
        }
        return JsonResponse(returndata, status=201)

class QueueMade(APIView):
    def post(self, request):
        data = self.request.data
        user = User.objects.get(username=data.get('username'))
        queues = Queue.objects.filter(creator=user)
        data = [{
            'queue_id': queue.id,
            'queue_length': queue.users.count(),
            'name': queue.name
            } for queue in queues]
        return JsonResponse(data, status=201, safe=False)


@method_decorator(csrf_exempt, name='dispatch')
class QueueCreator(APIView):
    def post(self, request):
        data = self.request.data
        queue_id = data.get('queue_id')
        queue = Queue.objects.get(id=queue_id)
        data = QueueInfo(queue).data
        queue_length = queue.users.count()
        try:
            next_user = queue.users.all()[0]
        except:
            next_user = None
        data['queue_length'] = queue_length
        if next_user:
            data['next_user'] = {'username': next_user.username, 'id': next_user.id}
        else:
            data['next_user'] = None
        return JsonResponse(data, status=201)

@method_decorator(csrf_exempt, name='dispatch')
class QueueNext(APIView):
    def post(self, request):
        data = self.request.data
        queue_id = data.get('queue_id')
        queue = Queue.objects.get(id=queue_id)
        a = True
        b = True
        try:
            user_to_remove = queue.users.all()[0]
        except:
            user_to_remove = None
            a = False
        try:
            next_user = queue.users.all()[1]
        except:
            next_user = None
            b = False
        if a:
            queue.users.remove(user_to_remove)
        if b:
            next_user_data = {
                "username": next_user.username,
                "id": next_user.id
                }
        else:
            next_user_data = None
        data = {
            "message": "Queue has proceeded",
            "next_user": next_user_data
            }
        return JsonResponse(data, status=201)


@method_decorator(csrf_exempt, name='dispatch')
class QueueEnd(APIView):
    def post(self, request):
        data = self.request.data
        queue_id = data.get('queue_id')
        queue = Queue.objects.get(id=queue_id)
        queue.ended = True
        queue.save()
        queue.users.clear()
        data = {"message": "Queue has ended."}
        return JsonResponse(data, status=201)


@method_decorator(csrf_exempt, name='dispatch')
class QueuePause(APIView):
    def post(self, request):
        data = self.request.data
        queue_id = data.get('queue_id')
        queue = Queue.objects.get(id=queue_id)
        queue.paused = True
        queue.save()
        data = {"message": "Queue has been paused."}
        return JsonResponse(data, status=201)


@method_decorator(csrf_exempt, name='dispatch')
class UserJoinQueue(APIView):
    def post(self, request):
        data = self.request.data
        queue_id = data.get('queue_id')
        username = data.get('username')
        thequeue = Queue.objects.get(id=queue_id)
        if not thequeue.paused and not thequeue.ended:
            theuser = User.objects.get(username=username)
            thequeue.users.add(theuser)
            thequeue.allusers.add(theuser)
        data = {"message": "User has joined queue"}
        return JsonResponse(data, status=201)


@method_decorator(csrf_exempt, name='dispatch')
class UserLeaveQueue(APIView):
    def post(self, request):
        data = self.request.data
        queue_id = data.get('queue_id')
        username = data.get('username')
        queue = Queue.objects.get(id=queue_id)
        user = User.objects.get(username=username)
        queue.users.remove(user)
        data = {"message": "User has left queue"}
        return JsonResponse(data, status=201)


@method_decorator(csrf_exempt, name='dispatch')
class UserInQueue(APIView):
    def post(self, request):
        data = self.request.data
        username = data.get('username')
        theuser = User.objects.get(username=username)
        queues = theuser.queues.filter(ended=False)
        data = []
        for queue in queues:
            userids = [user.id for user in queue.users.all()]
            tempdata = {
                'queue_id': queue.id,
                'position': userids.index(theuser.id),
                'name': queue.name,
                'desc': queue.desc,
                'eta': queue.eta,
                'lati': queue.lati,
                'longi': queue.longi,
                'creator': queue.creator.username,
            }
            data.append(tempdata)
        return JsonResponse(data, status=201, safe=False)


@method_decorator(csrf_exempt, name='dispatch')
class UserAllQueues(APIView):
    def post(self, request):
        data = self.request.data
        username = data.get('username')
        user = User.objects.get(username=username)
        queues = user.allqueues.all()
        data = [queue.id for queue in queues]
        return JsonResponse(data, status=201, safe=False)


@method_decorator(csrf_exempt, name='dispatch')
class UserNearQueues(APIView):
    def post(self, request):
        data = self.request.data
        lati = float(data.get('lati'))
        longi = float(data.get('longi'))
        data = [{
            'queue_id': queue.id,
            'lati': queue.lati,
            'longi': queue.longi,
            'name': queue.name
            } for queue in Queue.objects.filter(
            lati__range=[lati-0.1, lati+0.1], longi__range=[longi-0.1, longi+0.1], ended=False, paused=False)]
        return JsonResponse(data, status=201, safe=False)
