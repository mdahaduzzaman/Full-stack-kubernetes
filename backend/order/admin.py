from django.contrib import admin

from order.models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1  # Number of extra line item forms to display

@admin.register(Order)
class BookModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'created_at']
    inlines = [OrderItemInline]