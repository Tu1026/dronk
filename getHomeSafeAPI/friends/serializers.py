from rest_framework import serializers
from .models import Friends

class FriendsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friends
        fields = ("pk", "first_name", "last_name", "user_id")
