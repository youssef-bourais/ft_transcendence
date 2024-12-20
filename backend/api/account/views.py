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

from django.contrib.auth import authenticate
from django.utils.timezone import now
from datetime import timedelta
from .utils import generate_otp, send_otp_email
# from django.http import HttpeResponse
# from django.views.decorators.csrf import csrf_exempt


# @csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    # print("register_user===========POST", request.data)
    serializer = UserRegistrationSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        # print("good trip============")
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    data = json.dumps(serializer.errors)
    # print("bad trip============", data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def custom_token_obtain_pair(request):
    username = request.data.get('username', '')
    password = request.data.get('password', '')
    otp = request.data.get('otp', None)


    print("username: ", username)
    print("password: ", password)
    print("otp: ", otp)

    if not username or not password:
        return Response(
            {"error": "Username and password are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = authenticate(username=username, password=password)
    if not user:
        return Response({"error": "Invalid username or password."}, status=status.HTTP_400_BAD_REQUEST)
    useremail = user.email
    bool = True
    if(bool):
    # if user.is_2fa_enabled:
        if not otp:
            generate_otp(user)
            send_otp_email(user)
            bool = False
            return Response({"message": f"OTP sent to your email {useremail}, Please provide it to complete login."}, status=status.HTTP_200_OK)
        else:
            if user.otp_created_at + timedelta(minutes=10) < now():
                return Response({"error": "OTP has expired. Please request a new one by trying to login again."}, status=status.HTTP_410_GONE)
            if not user.otp_code or user.otp_code != otp:
                print("code didnt match", user.otp_code, otp)
                return Response({"error": "Invalid OTP provided."}, status=status.HTTP_400_BAD_REQUEST)

    refresh = RefreshToken.for_user(user)
    return Response({
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
# @permission_classes([IsAuthenticated])
def get_user(request, id_or_name):
    """
    Retrieve user information by ID or username.
    If the request contains a number, it will search by ID.
    If it contains a string, it will search by username.
    """
    if id_or_name == "0":
        users = CustomUser.objects.all().values('id', 'username', 'email', 'photo', 'otp_code', 'otp_created_at', 'is_2fa_enabled')
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
            'photo': user.photo,
            'is_2fa_enabled':user.is_2fa_enabled
        }
        return Response(user_data, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
# @permission_classes([AllowAny])
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
    # print("login with intra:==============")
    client_id = settings.CLIENT_UID
    redirect_uri = settings.REDIRECT_URI
    authorization_url = f'{settings.AUTHORIZE_URL}?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code'

    # print("client id: ", client_id)
    # print("redirectUrl_url: ", redirect_uri)
    # print("authorization url: ", authorization_url)
    # requestingIntraApi = reques
    response = Response({"redirectUrl": authorization_url})
    response.set_cookie('12345678', 'hello')
    return response


@api_view(["GET"])
@permission_classes([AllowAny])
def callback_from_42(request):
    print("Received callback from OAuth provider...=========================================")
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
    response = HttpResponseRedirect(f"https://{MACHINE_URL}/bridg")
    # response = redirect("https://localhost/bridg")

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
    # response.set_cookie('access_token', access_token, httponly=True, path='/')
    response.set_cookie('refresh_token', refresh_token)
    return response


#for debugging
@api_view(["GET"])
@permission_classes([AllowAny])
def endpoint(request):  
    # response = redirect("http://localhost:443/")
    print("+++++++++++++++++++++++++++", request.COOKIES.get("access_token", ''))
    response = Response({"message": "Hello, world!"})
    # response.set_cookie('access_token', 'hello')
    return response


@api_view(["POST"])
@permission_classes([AllowAny])
def logouthttponly(request):
    access = request.COOKIES.get('access_token')
    access = RefreshToken(access)
    access.blacklist()
    response = Response({"message": "Logged out successfully"})
    # response.delete_cookie('access_token')
    return response


