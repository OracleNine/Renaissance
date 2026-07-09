from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, WikiSerializer
from .models import User, Member, Wiki
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND

class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return Response({'status': 1}, status=HTTP_200_OK)
        else:
            return Response({'status': 0, 'details': 'Invalid login'}, status=HTTP_404_NOT_FOUND)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logout(request)
        return Response({'status': 1}, status=HTTP_200_OK)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

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
        