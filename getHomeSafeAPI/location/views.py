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
from .models import Location
from .serializers import LocationSerializer
from django.conf import settings

# Create your views here.
class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_claases = [IsAuthenticated,]
    
    def retrieve(self, request, *args, **kwargs):
        locations = get_list_or_404(self.queryset, user_id=kwargs["pk"])
        serialzer = LocationSerializer(locations, many=True)
        # print(serialzer.data)
        return Response(serialzer.data)