from django.shortcuts import render, redirect, HttpResponse
from core.models import Profile, User, Wiki, Member
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
def dashboard_activity(request):
    if request.user.is_authenticated:
        return render(request, "core/social/activity.html")
    else:
        return redirect("/login")

def dashboard_wikis(request):
    if request.user.is_authenticated:
        memberships = Member.objects.filter(profile=request.user.profile)
        wikis = []
        for membership in memberships:
            wikis.append({
                "name": membership.wiki.name,
                "description": membership.wiki.description,
                "subdomain": membership.wiki.subdomain
            })
        return render(request, "core/social/wikis.html", {"wikis": wikis})
    else:
        return redirect("/login")

def dashboard_create(request):
    if not request.user.is_authenticated:
        return redirect("/login")
    elif request.method == "POST":
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

def api_subdomain_occupied(request):
    if request.user.is_authenticated and request.GET.get('subdomain', 'none') != 'none':
        subdomain = request.GET.get('subdomain', 'none')
        if Wiki.objects.filter(subdomain=subdomain).exists():
            return HttpResponse("<div class=\"alert alert-warning\"><i class=\"bi bi-exclamation-triangle-fill\"></i> This subdomain is taken. Please choose another one.</div>")
    return HttpResponse()