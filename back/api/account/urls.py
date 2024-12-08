
from django.urls import path, include
from .views import  get_user, register_user, delete_user, login_with_42, callback_from_42
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView,
)

urlpatterns = [
    path('register/', register_user, name='register'),
    path('get/<str:id_or_name>/', get_user, name='get'),
    path('delete/<int:id>/', delete_user, name='delete'),
    
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('auth/login/', login_with_42, name='login_with_42'),
    path('auth/callback/', callback_from_42, name='callback_from_42'),

    path('token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
]
