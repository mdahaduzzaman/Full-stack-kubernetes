from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import (
    TokenObtainPairView
)
from django.contrib.auth import get_user_model

User = get_user_model()
from core.serializers import UserSerializer


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get('access')
            if access_token:
                # Create a dummy request object with the token
                request_object = request
                request_object.META['HTTP_AUTHORIZATION'] = f'Bearer {access_token}'
                # Use JWTAuthentication to authenticate the request
                jwt_authentication = JWTAuthentication()
                user, _ = jwt_authentication.authenticate(request_object)
                # Now you have the authenticated user
                if user:
                    response.data["id"] = user.pk
                    response.data["first_name"] = user.first_name
                    response.data["last_name"] = user.last_name
                    response.data["username"] = user.username
                    response.data["email"] = user.email

        return response