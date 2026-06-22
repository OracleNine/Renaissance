from django.db import models
from core.models import Wiki, Profile
from django.core.validators import RegexValidator

class Tag(models.Model):
    wiki = models.ForeignKey(Wiki, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)

    def getName(self):
        return self.name

class Page(models.Model):
    wiki = models.ForeignKey(Wiki, on_delete=models.CASCADE)
    nameValidator = RegexValidator(r'^[\w\-\s]+$', 'Invalid page name.')
    name = models.CharField(max_length=25, validators=[nameValidator])
    content = models.TextField()
    watchlist = models.ManyToManyField(Profile)
    tags = models.ManyToManyField(Tag)

    def createDict(self):
        context = {}
        context["pk"] = self.pk
        context["wiki"] = self.wiki.name
        context["name"] = self.name
        context["content"] = self.content

        watchers = []
        for watcher in self.watchlist.all():
            watchers.append(watcher.getName())
        context["watchlist"] = watchers

        tagList = []
        for tag in self.tags.all():
            tagList.append(tag.getName())
        context["tags"] = tagList

        return context

class Revision(models.Model):
    target = models.ForeignKey(Page, on_delete=models.CASCADE)
    name = models.CharField(max_length=25)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True)
    tags = models.ManyToManyField(Tag)
