from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, viewsets, status, mixins
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_401_UNAUTHORIZED
from core.models import Wiki
from .models import Page
from .utils import has_permission
from .serializers import PageSerializer

class PageView(APIView):
    # Read Page
    def get(self, request, wikiSubdomain, pageSlug):
        wiki = get_object_or_404(Wiki, subdomain=wikiSubdomain)
        page = get_object_or_404(Page, wiki=wiki, slug=pageSlug)
        if has_permission(wiki, request.user, "READ_PAGE"):
            serializer = PageSerializer(page)
            return Response(serializer.data)
        return Response({
            "name": "Unauthorized",
            "content": "You do not have permission to view this page.",
            "watchlist": [],
            "tags": []
        }, status=HTTP_401_UNAUTHORIZED)
    # Update page
    def put(self, request, wikiSubdomain, pageSlug):
        wiki = get_object_or_404(Wiki, subdomain=wikiSubdomain)
        page = get_object_or_404(Page, wiki=wiki, slug=pageSlug)
        if has_permission(wiki, request.user, "UPDATE_PAGE"):
            serializer = PageSerializer(page, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        return Response({
            "name": "Unauthorized",
            "content": "You do not have permission to edit this page.",
            "watchlist": [],
            "tags": []
        }, status=HTTP_401_UNAUTHORIZED)
    
    def delete(self, request, wikiSubdomain, pageSlug):
        wiki = get_object_or_404(Wiki, subdomain=wikiSubdomain)
        page = get_object_or_404(Page, wiki=wiki, slug=pageSlug)
        if has_permission(wiki, request.user, "DELETE_PAGE") and (pageSlug != "home"):
            page.delete()
            return Response({"details": "Page has been deleted."})
        return Response({
            "name": "Unauthorized",
            "content": "You do not have permission to delete this page.",
            "watchlist": [],
            "tags": []
        }, status=HTTP_401_UNAUTHORIZED)

class PageCreateView(APIView):
    def post(self, request, wikiSubdomain):
        wiki = get_object_or_404(Wiki, subdomain=wikiSubdomain)
        if has_permission(wiki, request.user, "CREATE_PAGE"):
            serializer = PageSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            page = Page.objects.create(
                wiki=wiki,
                name=serializer.validated_data["name"],
                content=serializer.validated_data["content"],
            )
            if serializer.validated_data.get("tags"):
                page.tags = serializer.validated_data["tags"]
            page.save()
            return Response(serializer.data)
        return Response({"details": "Unable to create new page"})

