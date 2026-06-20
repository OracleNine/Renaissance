from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("signup/", views.signup, name="signup"),
    path("dashboard/", views.dashboard_activity, name="dashboard_activity"),
    path("dashboard/wikis", views.dashboard_wikis, name="dashboard_wikis")
]