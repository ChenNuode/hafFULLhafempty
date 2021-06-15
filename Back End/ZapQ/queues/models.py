from django.db import models
from django.contrib.auth import get_user_model
from sortedm2m.fields import SortedManyToManyField

User = get_user_model()

class Queue(models.Model):
    name = models.CharField(max_length=200)
    desc = models.CharField(max_length=200)
    eta = models.PositiveIntegerField()  # in minutes
    lati = models.DecimalField(max_digits=9, decimal_places=6)
    longi = models.DecimalField(max_digits=9, decimal_places=6)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, blank=False)
    paused = models.BooleanField(default=False)
    ended = models.BooleanField(default=False)
    users = SortedManyToManyField(User, related_name='queues', null=True, blank=True)
    allusers = SortedManyToManyField(User, related_name='allqueues', null=True, blank=True)
