from django import forms
from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from wiki.models import Page, Tag
from core.models import Wiki

class EditForm(forms.Form):

    name = forms.CharField(max_length=25)
    content = forms.CharField( widget=forms.Textarea )
    tags = forms.ModelMultipleChoiceField(queryset=Tag.objects.all(), required=False)
