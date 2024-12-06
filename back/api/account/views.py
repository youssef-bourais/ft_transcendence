from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseRedirect
from rest_framework_simplejwt.tokens import RefreshToken
from .utils import exchange_code_for_token, GetUserInfoFromProvider
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from .serializers import UserRegistrationSerializer
import json
from .permissions import IsDeveloper
from account.models import CustomUser

@api_view(['POST'])
@permission_classes([AllowAny])
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
@permission_classes([AllowAny])
@permission_classes([IsAuthenticated])
def get_user(request, id_or_name):
    """
    Retrieve user information by ID or username.
    If the request contains a number, it will search by ID.
    If it contains a string, it will search by username.
    """

    if id_or_name == "0":
        users = CustomUser.objects.all().values('id', 'username', 'email', 'photo')
        return Response({'users': list(users)}, status=status.HTTP_200_OK)

    try:
        if id_or_name.isdigit():
            user = CustomUser.objects.get(id=int(id_or_name))
        else:
            user = CustomUser.objects.get(username=id_or_name)
        
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'photo': user.photo
        }
        return Response(user_data, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
@permission_classes([IsDeveloper])
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


@api_view(["GET"])
@permission_classes([AllowAny])
def login_with_42(request):
    """
    Redirect to the 42 OAuth2 authorization page.
    """
    print("login with intra:")
    client_id = settings.CLIENT_UID
    redirect_uri = settings.REDIRECT_URI
    authorization_url = f'{settings.AUTHORIZE_URL}?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code'
    return Response({"redirectUrl": authorization_url})


@api_view(["GET"])
@permission_classes([AllowAny])
def callback_from_42(request):
    print("Received callback from OAuth provider...")
    code = request.GET.get('code')
    token_response = exchange_code_for_token(code)
    access_token = token_response.data['access_token']

    user_response = GetUserInfoFromProvider(access_token)
    if not user_response or not user_response.data:
        return Response({"error": "Failed to fetch user information"}, status=400)
    response_data = user_response.data

    email = response_data['email']
    intra_id = response_data['id']
    photo = response_data['photo']
    username = response_data['username']

    response = HttpResponseRedirect("http://127.0.0.1:8080/bridg")
    response.set_cookie('email', email)
    response.set_cookie('username', username)
    response.set_cookie('photo', photo)

    user = CustomUser.objects.filter(email=email).first()

    if user:
        if user.id != intra_id:
            user.id = intra_id
            user.photo = photo
            user.save()
    else:
        user = CustomUser.objects.create(
            id=intra_id, 
            email=email,
            username=username,
            photo=photo
        )
        user.set_unusable_password()  # Disable regular login unless a password is set
        user.save()

    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)
    refresh_token = str(refresh)

    response.set_cookie('access_token', access_token)
    response.set_cookie('refresh_token', refresh_token)
    return response
    # return Response(
    #     response_data, 
    # )
    

