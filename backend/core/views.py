from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth.decorators import login_required
import math

from core.models import Profile, User, Wiki, Member
from core.utils import sortNotifications, POSTS_PER_PAGE
from wiki.models import Revision, Post, Page
from .forms import RegisterForm, CreateWikiForm

# Registration Views
def index(request):
    return render(request, "core/index.html")

def signup(request):
    if request.user.is_authenticated:
        return redirect("/dashboard")
    else:
        if request.method == "POST":
            form = RegisterForm(request.POST)
            if form.is_valid():
                form.save()
                
                data = form.cleaned_data
                user = User.objects.filter(username=data["username"])[0]
                profile = Profile(user=user)
                profile.save()
            return redirect("/dashboard")
        else:
            form = RegisterForm()
        return render(request, "registration/signup.html", {"form": form})

# Dashboard Views
@login_required
def dashboard_activity(request):
    lastLogin = request.user.last_login
    profile = request.user.profile
    watchedPages = profile.page_set.all()
    watchedPosts = profile.post_set.all()
    revisionNotifs = Revision.objects.filter(target__in=watchedPages, created_at__lt=lastLogin).order_by('-created_at').exclude(author=profile)
    postNotifs = Post.objects.filter(target__in=watchedPosts, created_at__lt=lastLogin).order_by('-created_at').exclude(author=profile)
    notifications = []
    for revision in revisionNotifs:
        revision = {
            "target": revision.target,
            "name": revision.name,
            "content": revision.content,
            "created_at": revision.created_at,
            "author": revision.author,
            "absolute_url": revision.get_absolute_url()
        }
        notifications.append(revision)
    for post in postNotifs:
        parent = post.target
        postPosition = Post.objects.filter(page=post.page, target=None, created_at__gt=parent.created_at).count()
        pageIndex = math.ceil(postPosition/POSTS_PER_PAGE)
        if (pageIndex == 0):
            pageIndex = 1
        post = {
            "title": post.title,
            "author": post.author,
            "content": post.content,
            "created_at": post.created_at,
            "page": post.page,
            "target": post.target,
            "absolute_url": post.get_absolute_url(pageIndex)
        }
        notifications.append(post)
    notifications.sort(key=sortNotifications, reverse=True)
    return render(request, "core/social/activity.html", {"notifications": notifications})

@login_required
def dashboard_wikis(request):
    memberships = Member.objects.filter(profile=request.user.profile)
    wikis = []
    for membership in memberships:
        wikis.append({
            "name": membership.wiki.name,
            "description": membership.wiki.description,
            "subdomain": membership.wiki.subdomain
        })
    return render(request, "core/social/wikis.html", {"wikis": wikis})

@login_required
def dashboard_create(request):
    if request.method == "POST":
        form = CreateWikiForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            if Wiki.objects.filter(subdomain=data["subdomain"]).exists():
                return render(request, "core/social/create-wiki.html", {"form": form, "error": True, "message": "A wiki with this subdomain already exists. Please pick another subdomain."})
            else:
                form.save()
                wiki = Wiki.objects.filter(subdomain=data["subdomain"])[0]
                wiki.add_founder(request.user)
                return redirect("/dashboard/wikis")
    else:
        form = CreateWikiForm()
    return render(request, "core/social/create-wiki.html", {"form": form, "error": False, "message": ""})

@login_required
def api_subdomain_occupied(request):
    subdomain = request.GET.get('subdomain', 'none')
    if subdomain != 'none':
        if Wiki.objects.filter(subdomain=subdomain).exists():
            return HttpResponse("<div class=\"alert alert-warning\"><i class=\"bi bi-exclamation-triangle-fill\"></i> This subdomain is taken. Please choose another one.</div>")
    return HttpResponse()