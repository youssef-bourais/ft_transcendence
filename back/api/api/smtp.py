
from django.conf import settings
import smtplib

smtp_host = "your.smtp.host"
smtp_port = 587
smtp_user = "your-email@example.com"
smtp_password = "your-password"

try:
    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_password)
        print("SMTP login successful")
except smtplib.SMTPAuthenticationError as e:
    print("Authentication failed:", e)
