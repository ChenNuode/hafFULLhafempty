from django.urls import path, include
from .views import *

urlpatterns = [
    path('business/create_queue/', QueueMake.as_view()),
    path('business/my_queue/', QueueMaker.as_view()),
    path('business/advance_queue/', QueueNext.as_view()),
    path('business/end_queue/', QueueEnd.as_view()),
    path('business/pause_queue/', QueuePause.as_view()),

    path('user/join_queue/', UserJoinQueue.as_view()),
    path('user/leave_queue/', UserLeaveQueue.as_view()),
    path('user/get_nearby_queues/', UserNearQueues.as_view()),
    path('user/get_queue/', UserInQueue.as_view()),
    path('user/get_all_queue_ids/', UserAllQueues.as_view()),

    path('signup/', UserAdd.as_view()),
    path('login/', UserLogin.as_view()),
]
