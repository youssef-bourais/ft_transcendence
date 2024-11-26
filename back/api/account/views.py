
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer
import json
# from django.contrib.auth.models import User
from account.models import CustomUser

@api_view(['POST'])
def register_user(request):
    print("register_user===========POST", request.data)
    serializer = UserRegistrationSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        print("good trip============")
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    data = json.dumps(serializer.errors)
    print("bad trip============", data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_user(request, id):
    print("get_user===========GET", request.data)
    if id == 0:
        users = CustomUser.objects.all().values('id', 'username', 'email', 'password')
        return Response({'users': list(users)})
    else:
        try:
            user = CustomUser.objects.get(id=id).values('id', 'username', 'email')
            user_list = list(user)
            return Response({'user': user_list})
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    # return Response({'message': 'Hi mom!'}, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def delete_user(request, id):
    print("delete_user===========DELETE", request.data)
    try:
        if(id == 0):
            print("Deleting all users")
            user = CustomUser.objects.all()
            user.delete();
            return Response({'message': 'All users deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        user = CustomUser.objects.get(id=id)
        user.delete()
        return Response({'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except CustomUser.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)  

