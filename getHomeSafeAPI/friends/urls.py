from django.urls import include, path
from rest_framework import routers
from .views import FriendsCreateViewSet
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register(r'friends', FriendsCreateViewSet)

# routerList = [(r'friends', FriendsCreateViewSet)]

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.


urlpatterns = [
    path('', include(router.urls))
]