from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model, authenticate
from .serializers import *
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from django.core.files.storage import FileSystemStorage
# Create your views here.

User = get_user_model()

class usernameavail(APIView):
	def get(self, request):
		usernamecheck = self.request.GET.get('username_req')
		if User.objects.filter(username=usernamecheck).exists():
			return Response({'check': 'False'})
		else:
			return Response({'check': 'True'})
