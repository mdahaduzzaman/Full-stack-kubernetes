from django.urls import path
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from core.views import UserModelViewSet, MyTokenObtainPairView

router = SimpleRouter()

router.register("users", UserModelViewSet)

urlpatterns = [
    path("users/token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("users/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

urlpatterns += router.urls
