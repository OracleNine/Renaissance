from django.urls import path

from . import views

urlpatterns = [
    path("<str:wiki_subdomain>/", views.index, name="index"),
    path("<str:wiki_subdomain>/p/<str:page_name>", views.page, name="page")
]