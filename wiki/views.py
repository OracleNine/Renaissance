from django.http import Http404
from django.shortcuts import render, redirect, get_object_or_404
from core.models import Wiki
from wiki.models import Page

# Create your views here.

def page(request, wikiSubdomain, pageName):
    wiki = get_object_or_404(Wiki, subdomain=wikiSubdomain)
    name = pageName.replace("_", " ")
    pageExists = Page.objects.filter(wiki=wiki, name=name).exists()

    if not pageExists and name == "Home":
        homePage = Page(wiki=wiki, name="Home", content="Welcome to your new wiki!")
        homePage.save()
    elif not pageExists:
        raise Http404

    page = Page.objects.filter(wiki=wiki, name=name)[0]
    context = page.createDict()
    return render(request, "wiki/page/page.html", context={"page": context})



def index(request, wikiSubdomain):
    return page(request, wikiSubdomain, "Home")