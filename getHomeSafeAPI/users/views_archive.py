from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from .models import User
from .serializers import UserSerializer

class UserCreateViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_claases = [AllowAny,]
    authentication_classes = []
    # def create(self, request, *args, **kwargs):
        
    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action != 'create':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]
    
    # def get(self, request):
    #     userProfileObj = queryset.objects.filter(user_id=request.user.id)
    #     serializer = self.get_serializer(userProfileObj)
    #     return Response(serializer.data)