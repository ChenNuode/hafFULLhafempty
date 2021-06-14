from django.contrib import admin
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    path('usernamecheck/', usernameavail.as_view()),
]

print('User Accounts Initiated.')
