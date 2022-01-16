from re import S
from rest_framework.request import Request
from django.contrib.auth import get_user_model
from django.shortcuts import get_list_or_404
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from .models import Friends
from .serializers import FriendsSerializer
from django.conf import settings

User = settings.AUTH_USER_MODEL

# Create your views here.
class FriendsCreateViewSet(viewsets.ModelViewSet):
    queryset = Friends.objects.all()
    serializer_class = FriendsSerializer
    permission_claases = [IsAuthenticated,]
    
    def retrieve(self, request, *args, **kwargs):
        friends = get_list_or_404(self.queryset, user_id=kwargs["pk"])
        serialzer = FriendsSerializer(friends, many=True)
        # print(serialzer.data)
        return Response(serialzer.data)