from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model, authenticate
from .serializers import *
from .tauth import tauth
from django.core import serializers
from rest_framework.authtoken.models import Token

# Create your views here.

User = get_user_model()

class usernameavail(APIView):
	def get(self, request):
		usernamecheck = self.request.GET.get('username')
		if User.objects.filter(username=usernamecheck).exists():
			return Response({'check': 'False'})
		else:
			return Response({'check': 'True'})

class usercall(APIView):
	def get(self, request):
		specuser = self.request.GET.get('username')
		if specuser == "ALL":
			return Response(UserSerializer(User.objects.all(), many=True).data)
		userlist = User.objects.filter(username=specuser)
		serializer = UserSerializer(userlist, many=True)
		return Response(serializer.data)

class create_account(APIView):
	def post(self, request):
		usersignup = UserCreation(data=self.request.data)
		if usersignup.is_valid():
			usersignup.save()
			username = request.data.get('username')
			password = request.data.get('password')
			UserLogin = authenticate(username=username, password=password)
			logintoken = Token.objects.create(user=UserLogin)
			return Response({'token': logintoken.key, 'state': 'Success'}, status=status.HTTP_200_OK)
		return Response({'errors': usersignup.errors, 'state': 'Denied'}, status=status.HTTP_400_BAD_REQUEST)

class delete_account(APIView):
	def post(self, request):
		vtoken = self.request.data.get('Token')
		username = self.request.data.get('username')
		password = self.request.data.get('password')
		UserVerify = authenticate(username=username, password=password)
		if not UserVerify:
			return Response({'error': 'Invalid login details. Account refuses to be deleted.', 'state': 'Denied'}, status=status.HTTP_401_UNAUTHORIZED)
		if not tauth(vtoken, UserVerify.username)['status']:
			return Response({'error': 'Invalid login token! Account refuses to be deleted.', 'state': 'Denied'}, status=status.HTTP_401_UNAUTHORIZED)
		UserVerify.delete()
		return Response({'state': 'Success'})

class logout(APIView):
	def get(self, request):
		stoken = self.request.GET.get('Token')
		if not Token.objects.filter(key=stoken).exists():
			return Response({'error': 'No user logged in with this token!', 'state': 'Denied'}, status=status.HTTP_400_BAD_REQUEST)
		logoutuser = Token.objects.get(key=stoken).user
		Token.objects.get(key=stoken).delete()
		return Response({'user': logoutuser.username, 'state': 'Success'})

class login(APIView):
	def post(self, request):
		username = self.request.data.get('username')
		password = self.request.data.get('password')
		if username is None or password is None or username == '' or password == '':
			return Response(
				{
				'error': 'Please enter both a Username and Password!',
				'state': 'Denied'
				},
				status = status.HTTP_400_BAD_REQUEST
			)
		UserLogin = authenticate(username=username, password=password)
		if not UserLogin:
			return Response(
				{
				'error': 'Your Username or Password is invalid!',
				'state': 'Denied'
				},
				status = status.HTTP_401_UNAUTHORIZED
			)
		if Token.objects.filter(user=UserLogin).exists():
			Token.objects.filter(user=UserLogin).delete()
		usertoken = Token.objects.create(user=UserLogin)
		return Response({'token': usertoken.key, 'state': 'Success'}, status=status.HTTP_200_OK)
