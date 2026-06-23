from django import forms
from django.forms import ModelForm
from django_tiptap_editor.widgets.tiptap_widget import TipTapWidget
from wiki.models import Page, Tag


class EditForm(ModelForm):
    tags = forms.ModelMultipleChoiceField(queryset=Tag.objects.all(), required=False)

    class Meta:
        model = Page
        fields = ["name", "content", "tags"]
        exclude = ["wiki", "watchlist"]
        widgets = {"content": TipTapWidget(config={"height": "400px"})}