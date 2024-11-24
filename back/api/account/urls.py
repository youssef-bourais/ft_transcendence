
from django.urls import path
from .views import get_somthing, register_user

urlpatterns = [
    path('register/', register_user, name='register'),
    path('list/', get_somthing, name='list'),
]
