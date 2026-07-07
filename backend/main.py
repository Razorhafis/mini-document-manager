from fastapi import FastAPI, UploadFile, File
from database import engine, SessionLocal
from models import Document
from fastapi import Query
from fastapi.responses import FileResponse
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
import models
import shutil
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/documents")
def get_documents(
    q: str = Query(default=""),
    page: int = Query(default=1),
    page_size: int = Query(default=5),
    sort_order: str = Query(default="asc")
):

    db = SessionLocal()

    query = db.query(Document)

    if q:
        query = query.filter(Document.title.contains(q))

    if sort_order == "desc":
        query = query.order_by(Document.upload_date.desc())
    else:
        query = query.order_by(Document.upload_date.asc())

    documents = query.offset((page - 1) * page_size).limit(page_size).all()

    db.close()

    return documents

@app.post("/documents")
async def upload_documents(files: list[UploadFile] = File(...)):

    db = SessionLocal()

    for file in files:

        file_path = os.path.join(UPLOAD_FOLDER, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        document = Document(
            title=file.filename,
            filename=file.filename,
            size=file.size
        )

        db.add(document)

    db.commit()
    db.close()

    return {"message": "Files uploaded successfully"}

@app.get("/documents/{document_id}/download")
def download_document(document_id: int):

    db = SessionLocal()

    document = db.query(Document).filter(
        Document.id == document_id
    ).first()

    db.close()

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    file_path = os.path.join(
        UPLOAD_FOLDER,
        document.filename
    )

    return FileResponse(
        path=file_path,
        filename=document.filename,
        media_type="application/octet-stream"
    )