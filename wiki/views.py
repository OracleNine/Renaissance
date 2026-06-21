from django.http import Http404
from django.shortcuts import render, get_object_or_404
from core.models import Wiki
from wiki.models import Page
from django.contrib.auth.decorators import login_required
from wiki.forms import EditForm

def page(request, wikiSubdomain, pageName):
    wiki = get_object_or_404(Wiki, subdomain=wikiSubdomain)
    name = pageName.replace("_", " ")
    pageExists = Page.objects.filter(wiki=wiki, name=name).exists()

    if not pageExists and name == "Home":
        homePage = Page(wiki=wiki, name="Home", content="Welcome to your new wiki!")
        homePage.save()
    elif not pageExists:
        # TODO Create a custom 404 which allows users to create a new page
        raise Http404

    page = Page.objects.filter(wiki=wiki, name=name)[0]
    context = page.createDict()
    return render(request, "wiki/page/page.html", context={"page": context, "pageName": pageName, "wikiSubdomain": wikiSubdomain})

@login_required
def edit(request, wikiSubdomain, pageName):
    name = pageName.replace("_", " ")
    wiki = get_object_or_404(Wiki, subdomain=wikiSubdomain)
    page = get_object_or_404(Page, wiki=wiki, name=name)

    if not request.user.is_authenticated:
        return reverse("index")

    form = EditForm(initial={
        "name": name,
        "content": page.content
        })

    context = page.createDict()
    return render(request, "wiki/page/edit.html", context={"form": form, "page": context})

@login_required
def save(request, wikiSubdomain, pageName):
    pass

@login_required
def save_and_continue(request, wikiSubdomain, pageName):
    pass

def index(request, wikiSubdomain):
    return page(request, wikiSubdomain, "Home")