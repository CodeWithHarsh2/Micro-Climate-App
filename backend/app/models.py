from sqlalchemy import Column, Integer, Float, String, DateTime
from .db import Base
import datetime

class Feedback(Base):
    __tablename__ = "feedback"
    id = Column(Integer, primary_key=True, index=True)
    lat = Column(Float, nullable=False)
    lon = Column(Float, nullable=False)
    felt_score = Column(Float, nullable=False)  # user 1-10
    temp = Column(Float, nullable=True)
    humidity = Column(Float, nullable=True)
    wind = Column(Float, nullable=True)
    notes = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

