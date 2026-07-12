from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('<str:wikiSubdomain>/<str:pageSlug>', views.PageView.as_view()),
    path('<str:wikiSubdomain>/p/new', views.PageCreateView.as_view())
]