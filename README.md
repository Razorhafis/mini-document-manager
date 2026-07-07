# Mini Document Manager

A full-stack document management application built with React and FastAPI. Users can upload, search, browse and download documents through a clean web interface.

---

## Features

- Upload multiple documents
- Store uploaded files on disk
- Store document metadata in SQLite
- Search documents by title
- Pagination for browsing documents
- Sort documents by upload date
- Download documents

---

## Tech Stack

### Frontend

- React
- Axios
- Vite

### Backend

- FastAPI
- SQLAlchemy
- SQLite
- Uvicorn

---

## Project Structure

```
mini-document-manager
│
├── backend
│   ├── uploads
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   └── documents.db
│
├── frontend
│   ├── src
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## API Endpoints

### Upload Documents

```
POST /documents
```

Uploads one or more documents.

---

### List Documents

```
GET /documents
```

Returns paginated document metadata.

---

### Search Documents

```
GET /documents?q=resume
```

Searches documents by title.

---

### Download Document

```
GET /documents/{id}/download
```

Downloads the selected document.

---

## Setup

### Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

## Database Design

The application stores:

- Document ID
- Title
- Filename
- File Size
- Upload Date

inside SQLite.

The actual uploaded files are stored inside the **uploads/** directory.

---

## Workflow

1. User uploads one or more documents.
2. React sends the files to FastAPI.
3. FastAPI stores the files in the uploads folder.
4. Metadata is saved in SQLite.
5. React retrieves document metadata through the API.
6. Users can search, browse and download documents.

---

## Future Improvements

- User Authentication
- Delete Documents
- Edit Document Metadata
- Cloud Storage (AWS S3)
- File Preview
- Drag and Drop Upload