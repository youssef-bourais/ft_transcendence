
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer


@api_view(['POST'])
def register_user(request):
    serializer = UserRegistrationSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_somthing(request):
    return Response({'message': 'Hi mom!'}, status=status.HTTP_200_OK)
