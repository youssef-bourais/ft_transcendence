from django.db import models
from account.models import CustomUser
# from django.contrib.auth.models import User
from django.db.models import Max


# Create your models here.

class Friends(models.Model):
    # friend_user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    friend_name = models.TextField()

    def __str__(self):
        return f'{self.friend_name}'

class Message(models.Model):
    sender = models.ForeignKey(CustomUser,on_delete=models.CASCADE, related_name='from_user')
    recipient = models.ForeignKey(CustomUser,on_delete=models.CASCADE, related_name='to_user')
    body = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    
    @property
    def serializable_date(self):
        # Convert the DateTimeField to an ISO 8601 string
        return self.date.isoformat()

    # def send_message(from_user, to_user, msg):
    #     sender_message = Message(
    #         sender=from_user,
    #         recipient=to_user,
    #         body=msg,
    #         is_read=True)
    #     sender_message.save()

    #     recipient_message = Message(
    #         sender=from_user,
    #         recipient=to_user,
    #         body=msg,)
    #     recipient_message.save()
    #     return sender_message
    
    # def get_messages(user):
    #     messages = Message.objects.filter(recipient=user).values('recipient').annotate(last=Max('date')).order_by('-last')
    #     users = []
    #     for message in messages:
    #         users.append({
    #             'user': User.objects.get(pk=message['recipient']),
    #             'last': message['last'],
    #             'unread': Message.objects.filter(sender=user, recipient__pk=message['recipient'], is_read=False).count(),
    #         })
    #         return users
    
    def __str__(self):
        return f'{self.sender.username} -> {self.recipient.username}'
