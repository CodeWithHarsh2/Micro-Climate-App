import os
import joblib
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from dotenv import load_dotenv

load_dotenv()
MODEL_PATH = os.getenv("MODEL_PATH", "./app/heat_model.pkl")

class HeatModel:
    def __init__(self, model_path=MODEL_PATH):
        self.model_path = model_path
        self.model = None
        self.load()

    def load(self):
        if os.path.exists(self.model_path):
            self.model = joblib.load(self.model_path)
        else:
            self.model = None

    def predict(self, temp, humidity, wind):
        if self.model is None:
            raise RuntimeError("Model not trained. Run train_model.py")
        X = np.array([[temp, humidity, wind]])
        pred = self.model.predict(X)
        return float(pred[0])

    def set_model(self, model):
        self.model = model
        joblib.dump(model, self.model_path)
