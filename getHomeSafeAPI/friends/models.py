from pyexpat import model
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.apps import apps
from django.conf import settings

User = settings.AUTH_USER_MODEL
class Friends(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    
    
    def __str__(self):
        return f"{User.objects.get(pk=self.user_id)}'s friends"
    
    # notice the absence of a "Password field", that is built in.
