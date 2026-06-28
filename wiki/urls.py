from django.urls import path

from . import views

urlpatterns = [
    path("<str:wikiSubdomain>/", views.index, name="wiki_index"),
    path("<str:wikiSubdomain>/p/<str:pageName>", views.page, name="wiki_page"),
    path("<str:wikiSubdomain>/p/<str:pageName>/edit", views.edit, name="wiki_edit"),
    path("<str:wikiSubdomain>/p/<str:pageName>/revision", views.view_revisions, name="wiki_view_revisions"),
    path("<str:wikiSubdomain>/p/<str:pageName>/save", views.save, name="wiki_save"),
    path("<str:wikiSubdomain>/p/<str:pageName>/discuss", views.discuss, name="wiki_discuss"),
    path("<str:wikiSubdomain>/p/<str:pageName>/discuss/post", views.discuss_post, name="wiki_discuss_post"),
    path("<str:wikiSubdomain>/p/<str:pageName>/discuss/delete", views.discuss_delete, name="wiki_discuss_delete"),
]