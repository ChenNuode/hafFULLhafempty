from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import *

class createQueueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Queue
        fields = ('name', 'desc', 'longi', 'lati', 'creator', 'eta', 'image')

class QueueInfo(serializers.ModelSerializer):
    creator = serializers.CharField(source='creator.username')
    class Meta:
        model = Queue
        fields = ('name', 'desc', 'longi', 'lati', 'creator', 'eta', 'image')

class QueueImage(serializers.ModelSerializer):
    class Meta:
        model = Queue
        fields = ('image', 'name')
