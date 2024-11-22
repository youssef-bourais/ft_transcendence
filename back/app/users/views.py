# from django.shortcuts import render
#
# # Create your views here.
#
# from django.contrib.auth.models import User
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
#
# @csrf_exempt
# def register_user(request):
#     if request.method == 'POST':
#         username = request.POST.get('username')
#         password = request.POST.get('password')
#         email = request.POST.get('email')
#
#         if not username or not password or not email:
#             return JsonResponse({'error': 'All fields are required'}, status=400)
#
#         # Check if the username already exists
#         if User.objects.filter(username=username).exists():
#             return JsonResponse({'error': 'Username already exists'}, status=400)
#
#         # Create the user
#         user = User.objects.create_user(username=username, password=password, email=email)
#         return JsonResponse({'message': 'User registered successfully!'})
#
#     return JsonResponse({'error': 'Invalid request method'}, status=405)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer

class RegisterUser(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

