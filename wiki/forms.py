from django import forms
from django.forms import ModelForm
from django_tiptap_editor.widgets.tiptap_widget import TipTapWidget
from wiki.models import Page, Tag


class EditForm(ModelForm):
    tags = forms.ModelMultipleChoiceField(queryset=Tag.objects.all(), required=False)
    content_before = forms.CharField(required=False, widget=forms.HiddenInput())

    class Meta:
        model = Page
        fields = ["name", "content", "tags", "content_before"]
        exclude = ["wiki", "watchlist"]
        widgets = {"content": TipTapWidget(config={"height": "400px"})}