from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (TokenRefreshView)
from .views import RegisterView, RenTokenObtainPairView, MyWikiViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'wiki', MyWikiViewSet, basename='wiki')

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('token/', RenTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    *router.urls
]