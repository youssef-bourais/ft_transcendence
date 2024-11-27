
from django.urls import path
from .views import  get_user, register_user, delete_user
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

print('im heeeer')
urlpatterns = [
    path('register/', register_user, name='register'),
    path('get/<int:id>/', get_user, name='get'),
    path('delete/<int:id>/', delete_user, name='delete'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
