from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    friends = models.ManyToManyField("self")
    
    def getName(self):
        return self.user.username

class Wiki(models.Model):
    name = models.CharField(max_length=25)
    subdomainValidator = RegexValidator(r'^[0-9a-z\-]*$', 'Only alphanumeric characters and dashes are allowed.')
    subdomain = models.CharField(max_length=25, validators=[subdomainValidator])
    description = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def add_founder(self, target):
        profile = target.profile
        founderRole = Role.objects.create(wiki=self, name="Founder", PERM_FOUNDER=True)
        member = Member.objects.create(wiki=self, profile=profile)
        
        member.roles.add(founderRole)

class Role(models.Model):
    wiki = models.ForeignKey(Wiki, on_delete=models.CASCADE)
    name = models.CharField(max_length=25)
    PERM_FOUNDER = models.BooleanField()

class Member(models.Model):
    wiki = models.ForeignKey(Wiki, on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    roles = models.ManyToManyField(Role)

