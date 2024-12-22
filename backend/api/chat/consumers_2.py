import json
from channels.generic.websocket import WebsocketConsumer
from rest_framework_simplejwt.authentication import JWTAuthentication
from asgiref.sync import sync_to_async
from django.contrib.auth.models import User
class DirectMessageConsumer(WebsocketConsumer):
    def connect(self):
        # token = self.scope.get('query_string', b'').decode().split('=')[-1]
        # if not token:
        #     await self.close()
        #     return

        # try:
        #     user, _ = JWTAuthentication().authenticate(self.scope, token)
        #     self.scope['user'] = user
        # except Exception as e:
        #     print(f"JWT Authentication error: {e}")  # Log the error
        #     await self.close()
        #     return

        # self.other_user = self.scope['url_route']['kwargs']['username']
        # self.room_group_name = f'dm_{min(self.scope["user"].username, self.other_user)}_{max(self.scope["user"].username, self.other_user)}'

        # # Add user to group
        # await self.channel_layer.group_add(
        #     self.room_group_name,
        #     self.channel_name
        # )

        self.accept()


    async def disconnect(self, close_code):
        # Remove user from group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            message = data.get('message')

            if not message:
                return  # No message to process

            await self.save_message(self.scope['user'].username, self.other_user, message)

            # Send the message to the WebSocket group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'sender': self.scope['user'].username,
                }
            )
        except json.JSONDecodeError:
            print("Failed to decode JSON from received WebSocket data.")

    async def chat_message(self, event):
        message = event['message']
        sender = event['sender']

        # Send message to WebSocket client
        await self.send(text_data=json.dumps({
            'message': message,
            'sender': sender,
        }))

    @sync_to_async
    def save_message(self, sender, recipient, message):
        from .models import Message
        try:
            recipient_user = User.objects.get(username=recipient)
            Message.objects.create(
                sender=self.scope['user'],
                recipient=recipient_user,
                body=message,
            )
        except User.DoesNotExist:
            print(f"Recipient {recipient} does not exist.")  # Log error
        except Exception as e:
            print(f"Error saving message: {e}")  # Log unexpected errors
 