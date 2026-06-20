from django.shortcuts import render, redirect, HttpResponse
from core.models import Profile, User
from .forms import RegisterForm

# Create your views here.
def index(request):
    return render(request, "core/index.html")

def signup(request):
    if (request.user.is_authenticated):
        return redirect("/")
    else:
        if request.method == "POST":
            form = RegisterForm(request.POST)
            if form.is_valid():
                form.save()
                
                data = form.cleaned_data
                user = User.objects.filter(username=data["username"])[0]
                profile = Profile(user=user)
                profile.save()
            return redirect("/")
        else:
            form = RegisterForm()
        return render(request, "registration/signup.html", {"form": form})

def dashboard_activity(request):
    if (request.user.is_authenticated):
        return render(request, "core/social/activity.html")
    else:
        return redirect("/login")

def dashboard_wikis(request):
    if (request.user.is_authenticated):
        profile = request.user.profile

        return render(request, "core/social/wikis.html")
    else:
        return redirect("/login")

def dashboard_create(request):
    if (request.user.is_authenticated):
        return render(request, "/core/social/create-wiki.html")
    else:
        return redirect("/login")