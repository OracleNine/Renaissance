from django.db import models
from core.models import Wiki, User
from django.core.validators import RegexValidator
from django.utils.text import slugify 

class Tag(models.Model):
    wiki = models.ForeignKey(Wiki, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)

    def getName(self):
        return self.name

class Page(models.Model):
    wiki = models.ForeignKey(Wiki, on_delete=models.CASCADE)
    nameValidator = RegexValidator(r'^[\w\-\s]+$', 'Invalid page name.')
    name = models.CharField(max_length=50, validators=[nameValidator])
    slug = models.SlugField(default="", unique=True)
    content = models.TextField()
    watchlist = models.ManyToManyField(User, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Page, self).save(*args, **kwargs)

class Revision(models.Model):
    target = models.ForeignKey(Page, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    tags = models.ManyToManyField(Tag)

class Post(models.Model):
    title = models.CharField(max_length=75)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    page = models.ForeignKey(Page, on_delete=models.CASCADE)
    target = models.ForeignKey("self", on_delete=models.CASCADE, blank=True, null=True)