from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from .schemas import LocationInput, FeltHeatResponse, FeedbackIn
from .utils import fetch_current_weather
from .ml_model import HeatModel
from .db import SessionLocal, init_db
from .models import Feedback
from sqlalchemy.orm import Session
import os

# initialize db
init_db()

app = FastAPI(title="Micro-Climate Felt Heat API")

# allow local dev origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = HeatModel()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Micro-Climate Felt Heat API is running"}

@app.post("/felt-heat", response_model=FeltHeatResponse)
def get_felt_heat(loc: LocationInput):
    try:
        w = fetch_current_weather(loc.lat, loc.lon)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Weather fetch error: {str(e)}")

    try:
        score = model.predict(w["temperature"], w["humidity"], w["wind"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Model error: {str(e)}")

    return {
        "temperature": w["temperature"],
        "humidity": w["humidity"],
        "wind": w["wind"],
        "felt_heat_score": score
    }

@app.post("/feedback")
def post_feedback(feedback: FeedbackIn, db: Session = Depends(get_db)):
    # store feedback in DB
    fb = Feedback(
        lat=feedback.lat,
        lon=feedback.lon,
        felt_score=feedback.felt_score,
        temp=feedback.temp,
        humidity=feedback.humidity,
        wind=feedback.wind,
        notes=(feedback.notes or "")
    )
    db.add(fb)
    db.commit()
    db.refresh(fb)
    return {"status": "ok", "id": fb.id}

@app.get("/feedback/recent")
def get_recent_feedback(limit: int = 50, db: Session = Depends(get_db)):
    items = db.query(Feedback).order_by(Feedback.created_at.desc()).limit(limit).all()
    return items

@app.post("/retrain")
def retrain_model(db: Session = Depends(get_db)):
    """
    Simple retraining using stored feedback rows to adjust the model.
    This is a naive example. In practice, do careful preprocessing and validation.
    """
    rows = db.query(Feedback).all()
    if len(rows) < 10:
        raise HTTPException(status_code=400, detail="Not enough feedback to retrain, need at least 10")

    import numpy as np
    from sklearn.ensemble import RandomForestRegressor
    X = []
    y = []
    for r in rows:
        if r.temp is None or r.humidity is None or r.wind is None:
            continue
        X.append([r.temp, r.humidity, r.wind])
        y.append(r.felt_score)

    if len(X) < 10:
        raise HTTPException(status_code=400, detail="Not enough feedback rows with weather data")

    X = np.array(X)
    y = np.array(y)
    new_model = RandomForestRegressor(n_estimators=100, random_state=42)
    new_model.fit(X, y)
    # save
    from .ml_model import HeatModel
    hm = HeatModel()
    hm.set_model(new_model)
    return {"status": "ok", "trained_on": len(X)}
