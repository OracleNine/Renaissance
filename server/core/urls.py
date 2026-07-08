from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'wikis', views.MyWikiViewSet, basename='wikis')

urlpatterns = [
    path('register', views.RegisterView.as_view()),
    path('login', views.LoginView.as_view()),
    path('profile', views.ProfileView.as_view()),
    *router.urls
]