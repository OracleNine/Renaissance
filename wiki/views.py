from django.shortcuts import render, redirect
from core.models import Wiki
from wiki.models import Page

# Create your views here.

def pageExists(wiki_name, page_name):
    wiki = Wiki.objects.filter(subdomain=wiki_name)
    if not wiki.exists():
        return {"pageExists": False}
    else:
        wiki = wiki[0]
        name = page_name.replace("_", " ")
        pageExists = Page.objects.filter(name=name).exists()

        if not pageExists:
            return {"pageExists": False}
        else:
            page = Page.objects.filter(name=name)[0]
            return {
                "pageExists": True,
                "page": page,
                "wiki": wiki
            }

def page(request, wiki_name, page_name):
    result = pageExists(wiki_name, page_name)
    if not result['pageExists']:
        return redirect("/404")
    elif (not result['pageExists']) and (result['page'].name == "Home"):
        # First time wiki setup
        homePage = Page(wiki=result['wiki'], name="Home", content="Welcome to your new wiki!")
        # TODO: Generate top and side navigation
        homePage.save()

    page = Page.objects.filter(wiki=result['wiki'], name=result['page'].name)[0]
    context = page.createDict()
    return render(request, "wiki/page/page.html", context={"page": context})



def index(request, wiki_name):
    return page(request, wiki_name, "Home")