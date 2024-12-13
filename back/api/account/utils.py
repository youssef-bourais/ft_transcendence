import requests
from django.conf import settings
from rest_framework.response import Response
import random
from django.utils.timezone import now
from django.core.mail import send_mail
from django.conf import settings

def GetUserInfoFromProvider(access):
    """
    Get user information from the provider using the access token.
    """
    try:
        response = requests.get(settings.USER_INFO_URL, headers={
                'Authorization': f'Bearer {access}'
            })

        user_info = response.json()
        # print(user_info)
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



def generate_otp(user):
    """
    Generate opt code and updated otp creation time and save them to db
    """
    user.otp_code = str(random.randint(100000, 999999)) 
    print("otp generated ", user.otp_code)
    user.otp_created_at = now() 
    print("time at  ", user.otp_created_at)
    user.save()
    return 


import logging

logger = logging.getLogger(__name__)

def send_otp_email(user):
    """
    Generate opt code and updated otp creation time and save them to db
    """
    print("sned_otp_email=======================================\n")
    try:
        subject = "Your OTP Code"
        message = f"Hi {user.username}, Your OTP code is: {user.otp_code}. It is valid for 5 minutes."

        from_email = settings.EMAIL_HOST_USER
        # from_email = settings.OTP_EMAIL
        recipient_list = [user.email]
        print("subject: ", subject)
        print("message: ", message)
        print("from_email: ", from_email)
        print("recipient_list: ", recipient_list)
        send_mail(subject, message, from_email, recipient_list, fail_silently=False)
    except Exception as e:
        logger.error(f"Error sending email to {user.email}: {e}")
