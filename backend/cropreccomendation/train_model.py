import os, pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import pickle

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(BASE_DIR, "Crop_recommendation.csv")

df = pd.read_csv(csv_path)

X = df.drop("label", axis=1)
y = df["label"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

with open(os.path.join(BASE_DIR, "crop_model.pkl"), "wb") as f:
    pickle.dump(model, f)

print("✅ Model trained and saved successfully!")
