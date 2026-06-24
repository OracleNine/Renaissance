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

def find_context(page, wiki, pageName):
    if page.exists():
        return page[0].createDict()
    else:
        return {
                "wiki": wiki.name,
                "name": pageName,
                "content": "",
                "tags": []
            }