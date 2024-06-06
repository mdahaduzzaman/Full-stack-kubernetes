from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from books.models import Book
from books.serializers import BookSerializer


class BookModelViewSet(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]