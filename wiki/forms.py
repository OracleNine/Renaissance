from django import forms
from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from wiki.models import Page

class EditForm(ModelForm):
    name = forms.CharField()
    content = forms.CharField( widget=forms.Textarea )

    class Meta:
        model = Page
        fields = ["name", "content"]