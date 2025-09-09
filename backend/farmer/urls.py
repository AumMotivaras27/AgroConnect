from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SignupViewSet, CropViewSet, OrderViewSet, LoginView
from . import views 


router = DefaultRouter()
router.register(r'signup', SignupViewSet, basename='signup')
router.register(r'crops', CropViewSet, basename='crops')
router.register(r'orders', OrderViewSet, basename='orders')

urlpatterns = [
    path('', include(router.urls)),                   
    path('login/', LoginView.as_view(), name='login'),

   
    path("cart/<str:username>/", views.get_cart, name="get_cart"),
    path("cart/add/", views.add_to_cart, name="add_to_cart"),
    path("cart/payment/", views.make_payment, name="make_payment"),

]
