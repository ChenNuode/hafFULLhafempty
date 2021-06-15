# Generated by Django 2.2.6 on 2021-06-15 16:21

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('queues', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='queue',
            name='allusers',
            field=models.ManyToManyField(blank=True, null=True, related_name='allqueues', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='queue',
            name='users',
            field=models.ManyToManyField(blank=True, null=True, related_name='queues', to=settings.AUTH_USER_MODEL),
        ),
    ]
