#
# from django.urls import path
# from .views import register_user
#
# urlpatterns = [
#     path('register/', register_user),  # /register will now call register_user
# ]
#


from django.urls import path
from .views import RegisterUser

urlpatterns = [
    path('register/', RegisterUser.as_view(), name='register')
]
