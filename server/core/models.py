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
    subdomain = models.CharField(max_length=25, validators=[subdomainValidator], unique=True, error_messages={
        "unique": "This subdomain is already taken."
    })
    description = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def add_founder(self, target):
        founderRole = Role.objects.create(wiki=self, name="Founder")
        founderPerms = Permissions.objects.create(
            role = founderRole,
            scope = "#global",
            CREATE_PAGE = True,
            READ_PAGE = True,
            UPDATE_PAGE = True,
            DELETE_PAGE = True,
        )
        member = Member.objects.create(wiki=self, user=target)
        member.roles.add(founderRole)

    def add_everyone(self):
        everyoneRole = Role.objects.create(wiki=self, name="@everyone")
        everyoneRole.save()
        everyonePerms = Permissions.objects.create(
            role = everyoneRole,
            scope = "#global",
            CREATE_PAGE = True,
            READ_PAGE = True,
            UPDATE_PAGE = True,
            DELETE_PAGE = True,
        )
        everyonePerms.save()

class Role(models.Model):
    wiki = models.ForeignKey(Wiki, on_delete=models.CASCADE)
    name = models.CharField(max_length=25)
    
class Member(models.Model):
    wiki = models.ForeignKey(Wiki, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    roles = models.ManyToManyField(Role)

class Permissions(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    scope = models.CharField()
    CREATE_PAGE = models.BooleanField(default=False)
    READ_PAGE = models.BooleanField(default=False)
    UPDATE_PAGE = models.BooleanField(default=False)
    DELETE_PAGE = models.BooleanField(default=False)