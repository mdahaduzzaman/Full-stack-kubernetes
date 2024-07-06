from django.db import models

from django.contrib.auth import get_user_model
User = get_user_model()

class Book(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="books")
    name = models.CharField(max_length=50)
    short_description = models.TextField(max_length=200)
    long_description = models.TextField()
    price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)