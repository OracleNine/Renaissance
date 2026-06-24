from django.urls import path

from . import views

urlpatterns = [
    path("<str:wikiSubdomain>/", views.index, name="wiki_index"),
    path("<str:wikiSubdomain>/p/<str:pageName>", views.page, name="wiki_page"),
    path("<str:wikiSubdomain>/p/<str:pageName>/edit", views.edit, name="wiki_edit"),
    path("<str:wikiSubdomain>/p/<str:pageName>/revision", views.view_revisions, name="wiki_view_revisions"),
    path("<str:wikiSubdomain>/p/<str:pageName>/save", views.save, name="wiki_save")
]