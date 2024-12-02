from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(max_length=50, unique=True)
    photo = models.URLField(
        blank=True, null=True, default="https://cdn-images-3.listennotes.com/podcasts/two-dead-pines/lsd-trip-report-Qe0E3pjyGlg-USIahZq6KYe.1400x1400.jpg?_gl=1*2qe68d*_ga*ODMxNDUyOTgxLjE3MzMxNDk5MzY.*_ga_T0PZE2Z7L4*MTczMzE0OTkzNS4xLjAuMTczMzE0OTk0My41Mi4wLjA."
    )
