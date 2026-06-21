from django.shortcuts import render, redirect
from core.models import Wiki
from wiki.models import Page

# Create your views here.

def page_exists(wiki_name, page_name):
    wiki = Wiki.objects.filter(subdomain=wiki_name)
    if not wiki.exists():
        return {
            "wiki": None, 
            "page": None
            }
    else:
        wiki = wiki[0]
        name = page_name.replace("_", " ")
        pageExists = Page.objects.filter(name=name).exists()

        if not pageExists:
            return {
                "wiki": wiki,
                "page": None
            }
        else:
            page = Page.objects.filter(name=name)[0]
            return {
                "page": page,
                "wiki": wiki
            }

def page(request, wiki_name, page_name):
    pageExists = page_exists(wiki_name, page_name)
    if pageExists['wiki'] is None:
        return redirect("/404")
    elif pageExists['page'] is None:
        return redirect("/wiki/" + pageExists['wiki'].subdomain) # TODO change this to a customizeable 404 page
    elif pageExists["page"].name == "Home":
        # First time wiki setup
        homePage = Page(wiki=pageExists["wiki"], name="Home", content="Welcome to your new wiki!")
        homePage.save()

    page = Page.objects.filter(wiki=pageExists["wiki"], name=pageExists["page"].name)[0]
    context = page.createDict()
    return render(request, "wiki/page/page.html", context={"page": context})



def index(request, wiki_name):
    return page(request, wiki_name, "Home")