from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('<str:wikiSubdomain>/<str:pageSlug>', views.ViewPage.as_view()),
]