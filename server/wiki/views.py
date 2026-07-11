from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, viewsets, status, mixins
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND
from core.models import Wiki
from .models import Page
from .utils import has_permission
from .serializers import PageSerializer

class ViewPage(APIView):
    
    def get(self, request, wikiSubdomain, pageSlug):
        wiki = get_object_or_404(Wiki, subdomain=wikiSubdomain)
        page = get_object_or_404(Page, wiki=wiki, slug=pageSlug)
        if has_permission(wiki, request.user, "READ_PAGE"):
            serializer = PageSerializer(page)
            return Response(serializer.data)
        return Response({
            "details": "You don't have permission to view this page!"
        })

