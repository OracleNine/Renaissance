from django.urls import path

from . import views

urlpatterns = [
    path("<str:wiki_name>/", views.index, name="index"),
    path("<str:wiki_name>/p/<str:page_name>", views.page, name="page")
]