from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

# Create your models here.
class User(AbstractUser):
    name = models.CharField(max_length=255, null=True, blank=True)
    email = models.CharField(max_length=255, unique=True)
    username = models.CharField(max_length=25, unique=True)
    password = models.CharField(max_length=255)
    friends = models.ManyToManyField("self")
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

class Wiki(models.Model):
    name = models.CharField(max_length=25)
    subdomainValidator = RegexValidator(r'^[0-9a-z\-]*$', 'Only alphanumeric characters and dashes are allowed.')
    subdomain = models.CharField(max_length=25, validators=[subdomainValidator], unique=True)
    description = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def add_founder(self, target):
        founderRole = Role.objects.create(wiki=self, name="Founder", PERM_FOUNDER=True)
        member = Member.objects.create(wiki=self, user=target)
        member.roles.add(founderRole)

class Role(models.Model):
    wiki = models.ForeignKey(Wiki, on_delete=models.CASCADE)
    name = models.CharField(max_length=25)
    PERM_FOUNDER = models.BooleanField()

class Member(models.Model):
    wiki = models.ForeignKey(Wiki, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    roles = models.ManyToManyField(Role)