from django.urls import include, path
from rest_framework import routers
from .views import LocationViewSet
from django.urls import re_path


router = routers.DefaultRouter()
router.register(r'location', LocationViewSet)


urlpatterns = [
    path('', include(router.urls))

]




