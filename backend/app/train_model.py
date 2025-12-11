# training script to produce a starter model
import numpy as np
from sklearn.ensemble import RandomForestRegressor
import joblib
import os
from dotenv import load_dotenv

load_dotenv()
MODEL_PATH = os.getenv("MODEL_PATH", "./app/heat_model.pkl")

def train_and_save():
    # This uses synthetic initial data. Replace with more data later.
    # Features: temperature, humidity, wind
    X = np.array([
        [20, 50, 3],
        [25, 40, 2],
        [30, 50, 2],
        [32, 60, 1],
        [35, 70, 1],
        [38, 80, 1],
        [28, 45, 3],
        [22, 55, 4],
        [33, 65, 2],
        [36, 75, 1]
    ])
    # Synthetic labels: perceived heat on scale 1-10
    y = np.array([3.2, 4.0, 6.0, 7.0, 8.0, 9.0, 5.0, 4.0, 7.5, 8.5])

    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)

    # Ensure directory exists
    outdir = os.path.dirname(MODEL_PATH)
    if outdir and not os.path.exists(outdir):
        os.makedirs(outdir, exist_ok=True)
    joblib.dump(model, MODEL_PATH)
    print("Trained model saved to", MODEL_PATH)

if __name__ == "__main__":
    train_and_save()
