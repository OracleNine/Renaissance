from django.shortcuts import render, redirect
from core.models import Wiki
from wiki.models import Page

# Create your views here.
def page(request, wiki_name, page_name):
    wiki = Wiki.objects.filter(subdomain=wiki_name)
    if not wiki.exists():
        return redirect("/dashboard")
    else:
        wiki = wiki[0]
        pageName = page_name.replace("_", " ")
        pageExists = Page.objects.filter(name=pageName).exists()
        if (not pageExists) and (pageName == "Home"):
            # First time wiki setup
            
            homePage = Page(wiki=wiki, name="Home", content="Welcome to your new wiki!")
            homePage.save()

        elif not pageExists:
            return redirect("/404")
        
        page = Page.objects.filter(wiki=wiki, name=pageName)[0]

        context = {
            "name": page.name,
            "content": page.content,
        }

        return render(request, "wiki/page/page.html", context={"page": context})

def index(request, wiki_name):
    return page(request, wiki_name, "Home")