from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (TokenRefreshView)
from .views import RegisterView, RenTokenObtainPairView, UserListView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('userlist', UserListView.as_view(), name="user_list"),
    path('token/', RenTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]