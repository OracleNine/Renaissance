from django.urls import path

from . import views

urlpatterns = [
    path("<str:wikiSubdomain>/", views.index, name="index"),
    path("<str:wikiSubdomain>/p/<str:pageName>", views.page, name="page")
]