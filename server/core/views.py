from django.shortcuts import render
from rest_framework import generics, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, RenTokenObtainPairSerializer, WikiSerializer
from .models import User, Member, Wiki
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import InvalidToken

class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class MyWikiViewSet(viewsets.ModelViewSet):
    serializer_class = WikiSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()
        target = Wiki.objects.filter(subdomain=serializer.data["subdomain"])[0]
        target.add_founder(self.request.user)
        target.save()

    def get_queryset(self):
        memberships = Member.objects.filter(user=self.request.user)
        return Wiki.objects.filter(member__in=memberships)

class RenTokenObtainPairView(TokenObtainPairView):

    def post(self, request):
        serializer = RenTokenObtainPairSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        access = serializer.validated_data["access"]
        refresh = serializer.validated_data["refresh"]
        response = Response({"status": 1})
        response.set_cookie(
            key="access",
            value=access,
            httponly=True,
            max_age=300
        )
        response.set_cookie(
            key="refresh",
            value=refresh,
            httponly=True,
            max_age=604800
        )
        return response

class RenTokenRefresh(TokenRefreshView):

    def post(self, request):
        try:
            serializer = TokenRefreshSerializer(data=
                                            { "refresh": request.COOKIES["refresh"] })
            serializer.is_valid(raise_exception=True)
            access = serializer.validated_data["access"]
            refresh = serializer.validated_data["refresh"]
            response = Response({"status": 1})
            response.set_cookie(
                key="access",
                value=access,
                httponly=True,
                max_age=300
            )
            response.set_cookie(
                key="refresh",
                value=refresh,
                httponly=True,
                max_age=604800
            )
            return response
        except:
            return Response({"status": 0, "details": "Invalid or expired token"})
        