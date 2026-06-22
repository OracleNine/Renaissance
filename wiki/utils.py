from wiki.models import Revision, Page

def log_revision(profile, page):
    revision = Revision(
        target=page,
        name=page.name,
        content=page.content,
        author=profile
    )
    for tag in page.tags.all():
        revision.tags.add(tag)
    revision.save()