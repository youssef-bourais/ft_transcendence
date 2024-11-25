
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer
import json

from django.contrib.auth.models import User
from django.http import JsonResponse


@api_view(['POST'])
def register_user(request):
    print("debug", request.data)
    serializer = UserRegistrationSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    data = json.dumps(serializer.errors)
    print("debug", data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_users(request):
    users = User.objects.all().values('id', 'username', 'email', 'password')
    users_list = list(users)
    return Response(users_list)

    # return Response({'message': 'Hi mom!'}, status=status.HTTP_200_OK)


