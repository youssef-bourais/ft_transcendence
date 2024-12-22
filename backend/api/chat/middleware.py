import json
from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.http import JsonResponse

class JWTAuthMiddleware(BaseMiddleware):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    async def connect(self, event):
        token = self.scope.get('query_string', b'').decode().split('=')[-1]  # Extract token from the URL query string
        if not token:
            await self.close()
            return

        try:
            # Validate JWT token and retrieve the user
            user, _ = JWTAuthentication().authenticate(self.scope, token)
            self.scope['user'] = user
        except Exception as e:
            # If token is invalid or expired, close the connection
            await self.close()
            return

        await super().connect(event)