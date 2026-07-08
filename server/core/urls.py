from django.contrib import admin
from django.urls import path, include
from .views import RegisterView, MyWikiViewSet, LoginView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'wikis', MyWikiViewSet, basename='wikis')

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    *router.urls
]