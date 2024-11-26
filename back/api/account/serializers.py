
from rest_framework import serializers
# from django.contrib.auth.models import  CustomUser
from django.utils.html import escape
from django.core.validators import validate_email as django_validate_email
from account.models import CustomUser

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate_email(self, value):
        value = escape(value)
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_username(self, value):
        value = escape(value)
        if CustomUser.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def validate(self, attrs):
        attrs['password'] = escape(attrs['password'])
        attrs['password2'] = escape(attrs['password2'])
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError("Passwords do not match.")
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2') 
        # object.create_user hash the password whene storing it in the database
        user = CustomUser.objects.create_user(**validated_data)
        return user


    # def validate_email(self, value):
    #     value = escape(value)
    #     if not value:
    #         raise serializers.ValidationError("Email field cannot be empty.")
    #     else:
    #         try:
    #             django_validate_email(value)
    #         except serializers.ValidationError:
    #             raise serializers.ValidationError("Enter a valid email address.")
    #         if User.objects.filter(email=value).exists():
    #             raise serializers.ValidationError("A user with this email already exists.")
    #     return value

