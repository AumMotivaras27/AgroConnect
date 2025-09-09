from rest_framework import serializers
from farmer.models import Signup,Crop,Order
from django.contrib.auth.hashers import make_password

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=False)

    class Meta:
        model = Signup
        fields = [ 'username', 'email', 'password', 'mobilenumber', 'role']

    # def create(self, validated_data):
    #     user = Signup.objects.create(**validated_data)
    #     return user

    # def update(self, instance, validated_data):
    #     return super().update(instance, validated_data)
    # def validate_mobilenumber(self, value):
    #     value = value.strip()
    #     if not value:
    #         raise serializers.ValidationError("Mobile number cannot be empty.")
    
    #     qs = Signup.objects.filter(mobilenumber__iexact=value)
    #     if self.instance:
    #         qs = qs.exclude(pk=self.instance.pk)

    #     if qs.exists():
    #         raise serializers.ValidationError("Users Alreay Exist ")

    #     return value



class CropSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    class Meta:
        model = Crop
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    buyer_name = serializers.CharField(source='buyer.username', read_only=True)
    crop_name = serializers.CharField(source='crop.crop_type', read_only=True)  # show proper crop name
    total_amount = serializers.FloatField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'