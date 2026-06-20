from django import forms
from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from core.models import Wiki

class RegisterForm(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ["email", "username", "password1", "password2"]

class CreateWikiForm(ModelForm):
    name = forms.CharField()
    description = forms.CharField( widget=forms.Textarea )

    class Meta:
        model = Wiki
        fields = ["name", "description"]