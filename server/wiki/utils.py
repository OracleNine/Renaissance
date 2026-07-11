from core.models import Member, Role, Permissions

def has_permission(wiki, user, target_perm):
    everyone = Role.objects.get(name="@everyone", wiki=wiki)
    everyonePerms = Permissions.objects.get(role=everyone)
    if everyonePerms and getattr(everyonePerms, target_perm):
        return getattr(everyonePerms, target_perm)
    if not user.is_anonymous:
        membership = Member.objects.get(user=user, wiki=wiki)
        roles = membership.roles.all()
        for role in roles:
            perms = Permissions.objects.get(role=role)
            if perms and getattr(perms, target_perm):
                return True

    return False