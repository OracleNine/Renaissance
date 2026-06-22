from django.http import Http404, HttpResponse
from django.shortcuts import render, get_object_or_404, redirect, reverse
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError

from core.models import Wiki
from wiki.models import Page
from wiki.forms import EditForm

import os

# pageName is the URL, which has underscores instead of spaces
# name is the name of the page with these underscores stripped away

def page(request, wikiSubdomain, pageName):
    wiki = get_object_or_404(Wiki, subdomain=wikiSubdomain)
    name = pageName.replace("_", " ")
    page = Page.objects.filter(wiki=wiki, name=name)

    if not page.exists() and name == "Home":
        homePage = Page(wiki=wiki, name="Home", content="Welcome to your new wiki!")
        homePage.save()
    elif not page.exists():
        # TODO Create a custom 404 which allows users to create a new page
        raise Http404

    page = page[0]
    context = page.createDict()
    return render(request, "wiki/page/page.html", context={"page": context, "pageName": pageName, "wikiSubdomain": wikiSubdomain})

@login_required
def edit(request, wikiSubdomain, pageName):
    wiki = get_object_or_404(Wiki, subdomain=wikiSubdomain)
    page = Page.objects.filter(wiki=wiki, name=pageName)

    if request.method == "POST":
        form = EditForm(request.POST)
        if page.exists():
            form = EditForm(request.POST, instance=page[0])
        if form.is_valid():
            newPage = form.save(commit=False)
            newPage.wiki = wiki
            newPage.save()
            return redirect(reverse("wiki_page", kwargs={"wikiSubdomain": wikiSubdomain, "pageName": pageName}))
    else:
        if page.exists():
            context = page[0].createDict()
        else:
            context = {
                "wiki": wiki.name,
                "name": pageName,
                "content": "",
                "tags": []
            }
        form = EditForm(initial={
            "name": context['name'],
            "content": context['content'],
            "tags": context['tags']
        })

    return render(request, "wiki/page/edit.html", context={"form": form, "page": context, "pageName": pageName, "wikiSubdomain": wikiSubdomain})


def index(request, wikiSubdomain):
    return page(request, wikiSubdomain, "Home")