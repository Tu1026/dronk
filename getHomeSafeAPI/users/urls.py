from django.urls import include, path
from rest_framework import routers
from .views import CreateUserAPIView, LogoutUserAPIView, CustomObtainAuthToken, UserCreateViewSet
from django.urls import re_path
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register(r'users', UserCreateViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
# urlpatterns = [
#     path('', include(router.urls)),
#     path('api-auth/', include('rest_framework.urls', namespace='rest_users'))
# ]

urlpatterns = [
    re_path(r'^auth/login/$',
        CustomObtainAuthToken.as_view(),
        name='auth_user_login'),
    re_path(r'^auth/register/$',
        CreateUserAPIView.as_view(),
        name='auth_user_create'),
    re_path(r'^auth/logout/$',
        LogoutUserAPIView.as_view(),
        name='auth_user_logout'),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))

]




