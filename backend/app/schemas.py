from pydantic import BaseModel
from typing import Optional

class LocationInput(BaseModel):
    lat: float
    lon: float

class FeltHeatResponse(BaseModel):
    temperature: float
    humidity: float
    wind: float
    felt_heat_score: float

class FeedbackIn(BaseModel):
    lat: float
    lon: float
    felt_score: float
    temp: Optional[float] = None
    humidity: Optional[float] = None
    wind: Optional[float] = None
    notes: Optional[str] = None
