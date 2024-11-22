
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        # Make sure to hash the password before storing it
        user = User.objects.create_user(**validated_data)
        return user
