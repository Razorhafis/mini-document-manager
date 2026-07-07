from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from database import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    filename = Column(String)
    size = Column(Integer)
    upload_date = Column(DateTime, default=datetime.utcnow)