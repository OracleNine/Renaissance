from django.http import Http404, HttpResponse
from django.shortcuts import render, get_object_or_404, redirect
from core.models import Wiki
from wiki.models import Page
from django.contrib.auth.decorators import login_required
from wiki.forms import EditForm

def page(request, wikiSubdomain, pageName):
    wiki = get_object_or_404(Wiki, subdomain=wikiSubdomain)
    name = pageName.replace("_", " ")
    pageExists = Page.objects.filter(wiki=wiki, name=pageName).exists()

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
    wiki = get_object_or_404(Wiki, subdomain=wikiSubdomain)
    page = get_object_or_404(Page, wiki=wiki, name=pageName)
    name = pageName.replace("_", " ")
    form = EditForm(initial={
        "name": name,
        "content": page.content,
        })

    context = page.createDict()
    return render(request, "wiki/page/edit.html", context={"form": form, "page": context, "pageName": pageName, "wikiSubdomain": wikiSubdomain})

@login_required
def save(request, wikiSubdomain):
    if request.method == "POST":
        form = EditForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            wiki = get_object_or_404(Wiki, subdomain=wikiSubdomain)
            pageName = data['name'].replace(" ", "_")
            page = Page.objects.filter(name=pageName, wiki=wiki)
            page = page[0]
            page.name = pageName
            page.content = data['content']
            if data['tags']:
                for item in data['tags']:
                    page.tags.add(item)

            page.save()

            if 'redirect' in request.POST:
                return redirect('wiki_page', wikiSubdomain=wikiSubdomain, pageName=pageName)
        
        return redirect('wiki_edit', wikiSubdomain=wikiSubdomain, pageName=pageName)

def index(request, wikiSubdomain):
    return page(request, wikiSubdomain, "Home")