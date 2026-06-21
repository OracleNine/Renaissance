from core.models import Wiki
from wiki.models import Page

def page_exists(wiki_name, page_name):
    wiki = Wiki.objects.filter(subdomain=wiki_name)
    if not wiki.exists():
        return {
            "wiki": None, 
            "page": None
            }
    else:
        wiki = wiki[0]
        name = page_name.replace("_", " ")
        pageExists = Page.objects.filter(name=name).exists()

        if not pageExists:
            return {
                "wiki": wiki,
                "page": None
            }
        else:
            page = Page.objects.filter(name=name)[0]
            return {
                "page": page,
                "wiki": wiki
            }