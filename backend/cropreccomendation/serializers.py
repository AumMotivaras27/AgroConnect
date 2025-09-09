from rest_framework import serializers

class CropInputSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)  # 👈 username required
    N = serializers.FloatField()
    P = serializers.FloatField()
    K = serializers.FloatField()
    temperature = serializers.FloatField()
    humidity = serializers.FloatField()
    ph = serializers.FloatField()
    rainfall = serializers.FloatField()
