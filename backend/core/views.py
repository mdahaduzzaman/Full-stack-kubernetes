from rest_framework.viewsets import ModelViewSet

from django.contrib.auth import get_user_model

User = get_user_model()
from core.serializers import UserSerializer


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
