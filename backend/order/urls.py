from rest_framework.routers import SimpleRouter

from order.views import OrderModelViewSet

router = SimpleRouter()

router.register("orders", OrderModelViewSet)

urlpatterns = []

urlpatterns += router.urls
