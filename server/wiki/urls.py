from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('<str:wikiSubdomain>/<str:pageSlug>', views.ReadPage.as_view()),
]