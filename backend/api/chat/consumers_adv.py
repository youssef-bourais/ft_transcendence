import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from django.db.models import Q
from .models import Message

User = get_user_model()

class DirectMessageConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = await self.get_user("admin")
        await self.accept()
        await self.channel_layer.group_add(f"user_{self.user.username}", self.channel_name)
        
        # Fetch and send existing messages
        await self.send_existing_messages()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(f"user_{self.user.username}", self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        body = text_data_json.get('body')  # Change 'text' to 'body'
        recipient = "eel-hour"  # Hardcoded recipient
        
        if body:  # Add a check to ensure body is not None or empty
            # Save the message to the database
            await self.save_message(self.user.username, recipient, body)
            
            # Send message to recipient
            await self.channel_layer.group_send(
                f"user_{recipient}",
                {
                    'type': 'chat_message',
                    'message': body,
                    'sender': self.user.username,
                    'receiver': recipient
                }
            )
            
            # Send message back to sender (for confirmation)
            await self.channel_layer.group_send(
                f"user_{self.user.username}",
                {
                    'type': 'chat_message',
                    'message': body,
                    'sender': self.user.username,
                    'receiver': recipient
                }
            )
        else:
            print("Received empty message body")

    async def chat_message(self, event):
        body = event['message']  # Keep this as 'message' to match the group_send data
        sender = event['sender']
        receiver = event['receiver']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'type': 'chat',
            'body': body,  # Change 'message' to 'body'
            'sender': sender,
            'receiver': receiver
        }))

    @database_sync_to_async
    def get_user(self, username):
        return User.objects.get_or_create(username=username)[0]

    @database_sync_to_async
    def save_message(self, sender, recipient, body):
        sender_user = User.objects.get(username=sender)
        recipient_user = User.objects.get(username=recipient)
        Message.objects.create(sender=sender_user, recipient=recipient_user, body=body)

    @database_sync_to_async
    def get_conversation(self, user1, user2):
        return list(Message.objects.filter(
            (Q(sender__username=user1) & Q(recipient__username=user2)) |
            (Q(sender__username=user2) & Q(recipient__username=user1))
        ).order_by('date').values('sender__username', 'recipient__username', 'body', 'date', 'is_read'))

    async def send_existing_messages(self):
        messages = await self.get_conversation("admin", "eel-hour")
        for message in messages:
            await self.send(text_data=json.dumps({
                'type': 'chat',
                'message': message['body'],
                'sender': message['sender__username'],
                'receiver': message['recipient__username'],
                'timestamp': message['date'].isoformat(),
                'is_read': message['is_read']
            }))

