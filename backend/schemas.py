from pydantic import BaseModel
from datetime import datetime


class DocumentResponse(BaseModel):
    id: int
    title: str
    filename: str
    size: int
    upload_date: datetime

    class Config:
        from_attributes = True