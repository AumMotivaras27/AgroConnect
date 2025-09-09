from django.shortcuts import render
from rest_framework import viewsets,status
from rest_framework.response import Response
from farmer.models import Signup,Crop,Order
from farmer.serializers import SignupSerializer,CropSerializer,OrderSerializer
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
class SignupViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Signup.objects.all()
    serializer_class = SignupSerializer

    def create(self, request, *args, **kwargs):
        mobile_number = request.data.get('mobilenumber')
        
        if Signup.objects.filter(mobilenumber=mobile_number).exists():
            return Response(
                {'error': 'Mobile number already exists.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        data=request.data.copy()
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)



class CropViewSet(viewsets.ModelViewSet):
    queryset = Crop.objects.all()
    serializer_class = CropSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        user = Signup.objects.filter(email=request.data.get("email")).first()

        if not user:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        if user.role != "Buyer":
            return Response({"error": "Only Buyers can buy products."}, status=status.HTTP_403_FORBIDDEN)

        return super().create(request, *args, **kwargs)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Username and password are required"}, status=400)

        try:
            user = Signup.objects.get(username=username)
        except Signup.DoesNotExist:
            return Response({"error": "Invalid username"}, status=400)

        
        if user.password != password:
            return Response({"error": "Invalid password"}, status=400)
        request.session["user_id"] = user.userid

        return Response({
            "message": "Login successful",
            "userid": user.userid,
            "username": user.username,
            "email": user.email,
            "role": user.role
        }, status=200)


def get_logged_in_buyer(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return None, Response({"error": "Login as buyer first."}, status=401)
    try:
        user = Signup.objects.get(userid=user_id)
    except Signup.DoesNotExist:
        return None, Response({"error": "User not found."}, status=404)
    if user.role != "Buyer":
        return None, Response({"error": "Only buyers can access this."}, status=403)
    return user, None


@api_view(['POST'])
def add_to_cart(request):
    buyer_userid = request.data.get('buyer_userid')
    try:
        buyer = Signup.objects.get(userid=buyer_userid, role="Buyer")
    except Signup.DoesNotExist:
        return Response({"error": "Buyer not found"}, status=404)

    crop_id = request.data.get('crop_cropid')
    quantity = int(request.data.get('quantity', 1))
    payment_method = request.data.get('payment_method', '')

    try:
        crop = Crop.objects.get(cropid=crop_id)
    except Crop.DoesNotExist:
        return Response({"error": "Crop not found"}, status=404)

    total_amount = float(crop.price_per_kg) * quantity

    order = Order.objects.create(
        buyer=buyer,
        crop=crop,
        seller_name=crop.farmer_name,
        quantity=quantity,
        price_per_unit=float(crop.price_per_kg),
        total_amount=total_amount,
        payment_method=payment_method,
        status='Pending'
    )

    serializer = OrderSerializer(order)
    return Response(serializer.data)

@api_view(['GET'])
def get_cart(request, username):
    try:
        buyer = Signup.objects.get(username=username, role="Buyer")
    except Signup.DoesNotExist:
        return Response(
            {"error": f"Buyer with username '{username}' not found"},
            status=404
        )

    orders = Order.objects.filter(buyer=buyer)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)



@api_view(['POST'])
def make_payment(request):
    buyer, error = get_logged_in_buyer(request)
    if error:
        return error

    Order.objects.filter(buyer=buyer, status='Pending').update(status='Paid')
    return Response({"message": "Payment successful"})


