
from django.urls import path
from .views import  list_users, register_user

urlpatterns = [
    path('register/', register_user, name='register'),
    path('list/', list_users, name='list'),
]
