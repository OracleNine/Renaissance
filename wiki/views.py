from django.shortcuts import render, redirect
from core.models import Wiki
from wiki.models import Page

# Create your views here.

def page_exists(wiki_name, page_name):
    wiki = Wiki.objects.filter(subdomain=wiki_name)
    if not wiki.exists():
        return {}
    else:
        wiki = wiki[0]
        name = page_name.replace("_", " ")
        pageExists = Page.objects.filter(name=name).exists()

        if not pageExists:
            return {}
        else:
            page = Page.objects.filter(name=name)[0]
            return {
                "page": page,
                "wiki": wiki
            }

def page(request, wiki_name, page_name):
    pageExists = page_exists(wiki_name, page_name)
    if not pageExists:
        return redirect("/404")
    elif pageExists["page"].name == "Home":
        # First time wiki setup
        homePage = Page(wiki=pageExists["wiki"], name="Home", content="Welcome to your new wiki!")
        # TODO: Generate top and side navigation
        homePage.save()

    page = Page.objects.filter(wiki=pageExists["wiki"], name=pageExists["page"].name)[0]
    context = page.createDict()
    return render(request, "wiki/page/page.html", context={"page": context})



def index(request, wiki_name):
    return page(request, wiki_name, "Home")