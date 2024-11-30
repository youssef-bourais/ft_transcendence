
import re
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.conf import settings
from .permissions import IsDeveloper
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer
import json
from account.models import CustomUser
from django.shortcuts import redirect
from django.http import HttpRequest, HttpResponse, JsonResponse
import requests

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
# @permission_classes([IsAuthenticated])
@permission_classes([AllowAny])
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
    client_id = settings.CLIENT_UID
    redirect_uri = settings.REDIRECT_URI
    authorization_url = f'{settings.AUTHORIZE_URL}?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code'
    return Response({"redirectUrl": authorization_url})
    # return redirect(authorization_url)

# @api_view(["GET"])
# @permission_classes([AllowAny])
# def callback_from_42(request):
#     print("from intra.................")
#     code = request.GET.get('code')
#     response = exchange_code_for_token(code)
#     data = response.data
#     access_token = data['access_token']
#     print("access_token", access_token)
#     response = GetUserInfoFromProvider(access_token)
#     user_data = response.data
#     print("user_data: ", user_data)
#     # response['Access-Control-Allow-Origin:'] = 'http://127.0.0.1:8080/'
#     return response

from django.http import HttpResponseRedirect
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


    spa_url = "http://127.0.0.1:8080/profile"
    redirect_url = f"{spa_url}?email={response_data['email']}&username={response_data['username']}&photo={response_data['photo']}"
    return HttpResponseRedirect(redirect_url)
    # return Response(
    #     response_data, 
    #     headers={"Access-Control-Allow-Origin": "http://127.0.0.1:8080"}
    # )

def GetUserInfoFromProvider(access):
    """
    Get user information from the provider using the access token.
    """
    try:
        response = requests.get(settings.USER_INFO_URL, headers={
                'Authorization': f'Bearer {access}'
            })

        user_info = response.json()
        user_data = {
            "email": user_info.get("email"),
            "username": user_info.get("login"),
            "first_name": user_info.get("first_name"),
            "last_name": user_info.get("last_name"),
        }
        image_data = user_info.get("image", {}) #geting the image dic
        user_data["photo"] = image_data.get("link", None) 

        if response.status_code == 200:
            return Response(user_data, response.status_code)
        else:
            return Response(
                {"error": "Failed to exchange token", "details": response.json()},
                status=response.status_code,
            )
    except requests.exceptions.RequestException as e:
        return Response({"error": "Network error", "details": str(e)}, status=500)


def exchange_code_for_token(code):
    """
    Exchange the authorization code received from the client for an access token.
    """
    token_url = settings.TOKEN_URL 
    data = {
        'grant_type': 'authorization_code',
        'client_id': settings.CLIENT_UID,
        'client_secret': settings.CLIENT_SECRET,
        'code': code,
        'redirect_uri': settings.REDIRECT_URI,
        # 'scope': 'identify'
    }

    try:
        response = requests.post(token_url, data=data)

        if response.status_code == 200:
            return Response(response.json(), status=200) 
        else:
            return Response(
                {"error": "Failed to exchange token", "details": response.json()},
                status=response.status_code,
            )

    except requests.exceptions.RequestException as e:
        return Response({"error": "Network error", "details": str(e)}, status=500)
