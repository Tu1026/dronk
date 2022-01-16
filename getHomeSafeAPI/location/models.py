from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.conf import settings

User = settings.AUTH_USER_MODEL
class Location(models.Model):
    
    latitude = models.FloatField(max_length=30)
    longitude = models.FloatField(max_length=30)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{User.objects.get(pk=self.user_id)}'s location"