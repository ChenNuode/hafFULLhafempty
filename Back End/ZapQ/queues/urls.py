from django.urls import path, include
from .views import *

urlpatterns = [
    path('business/create_queue/', QueueMake.as_view()),
    path('business/my_queue/', QueueCreator.as_view()),
    path('business/list_queue/', QueueMade.as_view()),
    path('business/advance_queue/', QueueNext.as_view()),
    path('business/end_queue/', QueueEnd.as_view()),
    path('business/pause_queue/', QueuePause.as_view()),

    path('user/join_queue/', UserJoinQueue.as_view()),
    path('user/leave_queue/', UserLeaveQueue.as_view()),
    path('user/get_nearby_queues/', UserNearQueues.as_view()),
    path('user/get_queue/', UserInQueue.as_view()),
    path('user/get_queue_info/', UserQueueInfo.as_view()),
    path('user/get_queue_details/', UserQueueDetails.as_view()),
    path('user/get_all_queue_ids/', UserAllQueues.as_view()),
    path('user/search_queue/', QueueSearch.as_view()),
    path('user/pushback_queue/', PushBackQueue.as_view()),
]
