
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer


def printRequest(request):

    print("Request Object:", request)
    print("Request Method:", request.method) 
    print("Request Headers:", request.headers)
    print("Request Data:", request.data) 


class RegisterUser(APIView):
    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        print("serializers: ",serializer)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
