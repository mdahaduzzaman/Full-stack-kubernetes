from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from order.models import Order
from order.serializers import OrderModelSerializer

class OrderModelViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderModelSerializer
    permission_classes = [IsAuthenticated]