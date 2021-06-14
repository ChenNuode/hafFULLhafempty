from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model, authenticate
from .serializers import UserSerializer
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from datetime import datetime, timedelta
import pytz

def tauth(stoken, username):
    if not Token.objects.filter(key=stoken).exists():
        return {
            'status': False,
            'response': Response(
			             {'error': 'You are not permitted to access!', 'state': 'Denied'},
			             status = status.HTTP_401_UNAUTHORIZED
			            )
        }
    else:
        AuthUser = Token.objects.get(key=stoken).user
        AuthUsername = AuthUser.username
        if username != AuthUsername:
            return {
                'status': False,
                'response': Response(
    			             {'error': 'Invalid Username!', 'state': 'Denied'},
    			             status = status.HTTP_401_UNAUTHORIZED
    			            )
                    }
        return {'status': True, 'response': AuthUser}
