from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("signup/", views.signup, name="signup"),
    path("dashboard/", views.dashboard_activity, name="dashboard_activity"),
    path("dashboard/wikis", views.dashboard_wikis, name="dashboard_wikis"),
    path("dashboard/create", views.dashboard_create, name="dashboard_create"),
    path("api/subdomain-occupied", views.api_subdomain_occupied, name="api_subdomain_occupied")
]