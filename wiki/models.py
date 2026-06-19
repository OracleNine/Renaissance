from django.db import models
from core.models import Wiki, Profile

class Role(models.Model):
    wiki = models.ForeignKey(Wiki, on_delete=models.CASCADE)
    name = models.CharField(max_length=25)
    PERM_FOUNDER = models.BooleanField()

class Member(models.Model):
    wiki = models.ForeignKey(Wiki, on_delete=models.CASCADE)
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    roles = models.ManyToManyField(Role)

class Tag(models.Model):
    wiki = models.ForeignKey(Wiki, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)

class Page(models.Model):
    wiki = models.ForeignKey(Wiki, on_delete=models.CASCADE)
    name = models.CharField(max_length=25)
    content = models.TextField()
    watchlist = models.ManyToManyField(Profile)
    tags = models.ManyToManyField(Tag)

class Revision(models.Model):
    target = models.ForeignKey(Page, on_delete=models.CASCADE)
    name = models.CharField(max_length=25)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True)
    tags = models.ManyToManyField(Tag)
