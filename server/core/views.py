from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, RenTokenObtainPairSerializer, WikiSerializer
from .models import User, Member, Wiki
from rest_framework_simplejwt.views import TokenObtainPairView

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
    serializer_class = RenTokenObtainPairSerializer