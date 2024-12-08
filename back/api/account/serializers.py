
from rest_framework import serializers
# from django.contrib.auth.models import  CustomUser
from django.utils.html import escape
from django.core.validators import validate_email as django_validate_email
from account.models import CustomUser

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)
    print("password2: ", password2)

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
        user = CustomUser.objects.create_user(**validated_data)
        return user




# from account.models import CustomUser
# from django.contrib.auth.password_validation import validate_password
# from django.core.validators import RegexValidator
# from rest_framework import serializers
# from django.utils.translation import gettext_lazy as _
#
# class UserRegistrationSerializer(serializers.ModelSerializer):
#     password2 = serializers.CharField(
#         write_only=True,
#         label=_("Confirm Password"),
#         style={'input_type': 'password'}  # Ensures the field appears as a password field in forms
#     )
#
#     email = serializers.EmailField(
#         validators=[
#             serializers.EmailValidator(message=_("Enter a valid email address."))
#         ]  # Built-in email validator for proper email format
#     )
#
#     username = serializers.CharField(
#         validators=[
#             RegexValidator(
#                 regex=r'^[a-zA-Z0-9_]+$',
#                 message=_("Username must only contain letters, numbers, and underscores."),
#                 code='invalid_username'
#             )
#         ]  # Ensures usernames are alphanumeric with optional underscores
#     )
#
#     class Meta:
#         model = CustomUser
#         fields = ['username', 'email', 'password', 'password2']
#         extra_kwargs = {
#             'password': {'write_only': True, 'style': {'input_type': 'password'}}
#         }  # Marks password as write-only and ensures it's a password field in forms
#
#     def validate_password(self, value):
#         """
#         Validate the password strength using Django's built-in password validation.
#         """
#         validate_password(value)  # Validates based on rules like minimum length, complexity, etc.
#         return value
#
#     def validate_email(self, value):
#         """
#         Check if the email is unique.
#         """
#         if CustomUser.objects.filter(email=value).exists():
#             raise serializers.ValidationError(_("A user with this email already exists."))
#         return value
#
#     def validate_username(self, value):
#         """
#         Check if the username is unique.
#         """
#         if CustomUser.objects.filter(username=value).exists():
#             raise serializers.ValidationError(_("This username is already taken."))
#         return value
#
#     def validate(self, attrs):
#         """
#         Cross-field validation to ensure passwords match.
#         """
#         if attrs['password'] != attrs['password2']:
#             raise serializers.ValidationError({"password2": _("Passwords do not match.")})
#         return attrs
#
#     def create(self, validated_data):
#         """
#         Create the user with hashed password.
#         """
#         validated_data.pop('password2') 
#         user = CustomUser.objects.create_user(**validated_data)  # Hashes password automatically
#         return user
