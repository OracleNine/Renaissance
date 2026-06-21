from django.shortcuts import render, redirect
from wiki.models import Page
from .utils import page_exists

# Create your views here.

def page(request, wiki_name, page_name):
    result = page_exists(wiki_name, page_name)
    if result['wiki'] is None:
        return redirect("/404")
    elif result['page'] is None:
        return redirect("/wiki/" + result['wiki'].subdomain) # TODO change this to a customizeable 404 page
    elif result["page"].name == "Home":
        # First time wiki setup
        homePage = Page(wiki=result["wiki"], name="Home", content="Welcome to your new wiki!")
        homePage.save()

    page = Page.objects.filter(wiki=result["wiki"], name=result["page"].name)[0]
    context = page.createDict()
    return render(request, "wiki/page/page.html", context={"page": context})



def index(request, wiki_name):
    return page(request, wiki_name, "Home")