from rest_framework import serializers

from order.models import Order, OrderItem

class OrderItemModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        exclude = ["order"]

class OrderModelSerializer(serializers.ModelSerializer):
    order_item = OrderItemModelSerializer(many=True)

    class Meta:
        model = Order
        fields = "__all__"
        read_only_fields = ["user"]

    def create(self, validated_data):
        user = self.context['request'].user
        order_items_data = validated_data.pop('order_item')
        order = Order.objects.create(**validated_data, user=user)
        for order_item_data in order_items_data:
            OrderItem.objects.create(order=order, **order_item_data)
        return order

    def update(self, instance, validated_data):
        order_items_data = validated_data.pop('order_item')
        instance.address = validated_data.get('address', instance.address)
        instance.save()

        existing_item_ids = [item.id for item in instance.order_item.all()]
        new_item_ids = [item.get('id') for item in order_items_data if item.get('id')]

        # Delete items that are no longer present
        for item_id in existing_item_ids:
            if item_id not in new_item_ids:
                OrderItem.objects.filter(id=item_id).delete()

        for order_item_data in order_items_data:
            order_item_id = order_item_data.get('id')
            if order_item_id:
                order_item = OrderItem.objects.get(id=order_item_id, order=instance)
                order_item.book = order_item_data.get('book', order_item.book)
                order_item.quantity = order_item_data.get('quantity', order_item.quantity)
                order_item.save()
            else:
                OrderItem.objects.create(order=instance, **order_item_data)

        return instance

