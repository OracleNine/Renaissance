from django.http import Http404, HttpResponse
from django.shortcuts import render, get_object_or_404, redirect, reverse
from django.contrib.auth.decorators import login_required

from core.models import Wiki
from wiki.models import Page, Revision
from wiki.forms import EditForm
from wiki.utils import log_revision

# pageName is the URL, which has underscores instead of spaces
# name is the name of the page with these underscores stripped away

def page(request, wikiSubdomain, pageName):
    wiki = get_object_or_404(Wiki, subdomain=wikiSubdomain)
    name = pageName.replace("_", " ")
    page = Page.objects.filter(wiki=wiki, name=pageName)

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
    context = {
                "wiki": wiki.name,
                "name": pageName,
                "content": "",
                "tags": []
            }
    if request.method == "POST":
        form = EditForm(request.POST)
        if page.exists():
            form = EditForm(request.POST, instance=page[0])
        if form.is_valid():
            newPage = form.save(commit=False)
            newPage.wiki = wiki
            newPage.save()

            log_revision(request.user.profile, newPage)
            if 'redirect' in request.POST:
                return redirect(reverse("wiki_page", kwargs={"wikiSubdomain": wikiSubdomain, "pageName": pageName}))
            else:
                return redirect(reverse("wiki_edit", kwargs={"wikiSubdomain": wikiSubdomain, "pageName": pageName}))
        
    else:
        if page.exists():
            context = page[0].createDict()
        form = EditForm(initial={
            "name": context['name'],
            "content": context['content'],
            "tags": context['tags']
        })

    return render(request, "wiki/page/edit.html", context={"form": form, "page": context, "pageName": pageName, "wikiSubdomain": wikiSubdomain})

def view_revisions(request, wikiSubdomain, pageName):
    wiki = get_object_or_404(Wiki, subdomain=wikiSubdomain)
    page = Page.objects.filter(wiki=wiki, name=pageName)[0]

    allRevisions = Revision.objects.filter(target=page)
    revisionList = []
    for revision in allRevisions:
        revisionList.append({
            "pk": revision.pk,
            "name": revision.name,
            "created_at": revision.created_at,
            "author": revision.author.user.username
        })
    
    return render(request, "wiki/page/revision-history.html", context={"revisionList": revisionList})


def index(request, wikiSubdomain):
    return page(request, wikiSubdomain, "Home")