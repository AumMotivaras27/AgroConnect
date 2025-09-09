import os, pickle
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CropInputSerializer

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(BASE_DIR, "crop_model.pkl"), "rb") as f:
    model = pickle.load(f)

class CropRecommendationView(APIView):
    permission_classes = []  # 👈 no authentication required

    def post(self, request):
        serializer = CropInputSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            X = [[
                data["N"],
                data["P"],
                data["K"],
                data["temperature"],
                data["humidity"],
                data["ph"],
                data["rainfall"],
            ]]
            prediction = model.predict(X)

            return Response({
                "username": data["username"],   # 👈 now safe to use
                "recommended_crop": prediction[0]
            })
        return Response(serializer.errors, status=400)
