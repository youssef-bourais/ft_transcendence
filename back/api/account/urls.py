
from django.urls import path
from .views import  get_user, register_user, delete_user

urlpatterns = [
    path('register/', register_user, name='register'),
    path('get/<int:id>/', get_user, name='get'),
    path('delete/<int:id>/', delete_user, name='delete'),
]
