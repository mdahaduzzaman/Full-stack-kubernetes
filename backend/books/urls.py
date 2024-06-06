from django.urls import path
from rest_framework.routers import SimpleRouter

from books.views import BookModelViewSet

router = SimpleRouter()

router.register("books", BookModelViewSet)

urlpatterns = []
urlpatterns += router.urls
