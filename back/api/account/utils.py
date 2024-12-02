import requests
from django.conf import settings
from rest_framework.response import Response

def GetUserInfoFromProvider(access):
    """
    Get user information from the provider using the access token.
    """
    try:
        response = requests.get(settings.USER_INFO_URL, headers={
                'Authorization': f'Bearer {access}'
            })

        user_info = response.json()
        print(user_info)
        user_data = {
            "email": user_info.get("email"),
            "username": user_info.get("login"),
            "first_name": user_info.get("first_name"),
            "last_name": user_info.get("last_name"),
            "id": user_info.get("id"),
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
