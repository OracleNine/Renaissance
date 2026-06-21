from django.http import Http404
from django.shortcuts import render, redirect, get_object_or_404
from core.models import Wiki
from wiki.models import Page

# Create your views here.

def page(request, wiki_subdomain, page_name):
    wiki = get_object_or_404(Wiki, subdomain=wiki_subdomain)
    pageName = page_name.replace("_", " ")
    pageExists = Page.objects.filter(wiki=wiki, name=pageName).exists()

    if not pageExists and (pageName == "Home"):
        homePage = Page(wiki=wiki, name="Home", content="Welcome to your new wiki!")
        homePage.save()
    elif not pageExists:
        raise Http404

    page = Page.objects.filter(wiki=wiki, name=pageName)[0]
    context = page.createDict()
    return render(request, "wiki/page/page.html", context={"page": context})



def index(request, wiki_subdomain):
    return page(request, wiki_subdomain, "Home")