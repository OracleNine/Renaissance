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
    name = forms.CharField(help_text='The name of your wiki.')
    subdomain = forms.CharField(help_text='Only alphanumeric characters and dashes are allowed.')
    description = forms.CharField( widget=forms.Textarea, help_text='Tell us about your wiki.' )

    class Meta:
        model = Wiki
        fields = ["name", "subdomain", "description"]