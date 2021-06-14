from django.contrib import admin
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    path('usernamecheck/', usernameavail.as_view()),
    path('userinfo/', usercall.as_view()),
    path('signup/', create_account.as_view()),
    path('login/', login.as_view()),
    path('logout/', logout.as_view()),
    path('delete_account/', delete_account.as_view()),
]

print('User Accounts Initiated.')
