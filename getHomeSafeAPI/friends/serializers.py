from rest_framework import serializers
from .models import Friends


class FriendsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Friends
        fields = ("url", "first_name", "last_name", "user_id")