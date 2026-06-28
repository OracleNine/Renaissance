from django.http import Http404, HttpResponse
from django.shortcuts import render, get_object_or_404, redirect, reverse
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator

from core.models import Wiki
from wiki.models import Page, Revision, Post
from wiki.forms import EditForm, PostForm
from wiki.utils import log_revision, find_context

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
    context = find_context(page, wiki, pageName)
    form = EditForm(initial={
        "name": context['name'],
        "content": context['content'],
        "content_before": context['content'],
        "tags": context['tags']
    })

    return render(request, "wiki/page/edit.html", context={"form": form, "page": context, "pageName": pageName, "wikiSubdomain": wikiSubdomain})

@login_required
def save(request, wikiSubdomain, pageName):
    if request.method == "POST":
        wiki = get_object_or_404(Wiki, subdomain=wikiSubdomain)
        page = Page.objects.filter(wiki=wiki, name=pageName)
        if page.exists():
            form = EditForm(request.POST, instance=page[0])
        else:
            form = EditForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            if page.exists() and data["content_before"] != page[0].content and 'conflict-confirm' not in request.POST:
                context = page[0].createDict()
                return render(request, "wiki/page/partials/edit-conflict.html", context={"page": context, "form": form, 'pageName': pageName, 'wikiSubdomain': wikiSubdomain})
            savedPage = form.save(commit=False)
            savedPage.wiki = wiki
            savedPage.save()
            log_revision(request.user.profile, savedPage)

            response = HttpResponse("Page save successful.")
            response['HX-Redirect'] = reverse('wiki_page', kwargs={"wikiSubdomain": wikiSubdomain, "pageName": pageName})
            return response
        
        return render(request, "wiki/page/partials/invalid-form.html", context={"form": form, 'pageName': pageName, 'wikiSubdomain': wikiSubdomain})

def view_revisions(request, wikiSubdomain, pageName):
    wiki = get_object_or_404(Wiki, subdomain=wikiSubdomain)
    page = Page.objects.filter(wiki=wiki, name=pageName)[0]

    allRevisions = Revision.objects.filter(target=page).order_by('-created_at')
    revisionList = []
    for revision in allRevisions:
        revisionList.append({
            "pk": revision.pk,
            "name": revision.name,
            "content": revision.content,
            "created_at": revision.created_at,
            "author": revision.author.user.username
        })
    
    return render(request, "wiki/page/revision-history.html", context={"revisionList": revisionList})

def discuss(request, wikiSubdomain, pageName):
    if request.method == "POST" and request.user.is_authenticated:
        form = PostForm(request.POST)
        if form.is_valid():
            newPost = form.save(commit=False)
            newPost.author = request.user.profile
            newPost.page = page
            data = form.cleaned_data
            target = Post.objects.filter(data["target"])
            if target.exists():
                newPost.target = target[0]
            newPost.save()
    wiki = get_object_or_404(Wiki, subdomain=wikiSubdomain)
    page = get_object_or_404(Page, wiki=wiki, name=pageName)
    form = PostForm()
    topLevelPostsList = Post.objects.filter(page=page, target=None).order_by('-created_at')
    paginator = Paginator(topLevelPostsList, 15)  # Show 25 contacts per page.
    pageNumber = request.GET.get("p")
    postsPage = paginator.get_page(pageNumber)
    postsCtx = {}
    for post in postsPage.object_list:
        postsCtx[post.pk] = {
            "title": post.title,
            "author": post.author.user.username,
            "content": post.content,
            "replies": Post.objects.filter(target=post).order_by('created_at')
        }
    
    return render(request, "wiki/page/discussion.html", context={"form": form, "posts": postsCtx, 'pageName': pageName, 'wikiSubdomain': wikiSubdomain})

        


def index(request, wikiSubdomain):
    return page(request, wikiSubdomain, "Home")