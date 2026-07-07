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
## Setup Assumptions

- Python 3.11 or later is installed.
- Node.js and npm are installed.
- SQLite is used as the local database and is created automatically on first run.
- Uploaded files are stored locally in the `backend/uploads` directory.
- The frontend communicates with the backend through HTTP requests using Axios.

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
## Key Tradeoffs Due to Time Limit

- Local file storage was used instead of cloud storage services such as Amazon S3.
- Authentication and user management were not implemented.
- Search uses a simple substring match instead of advanced or fuzzy search.
- Pagination uses a fixed page size.
- The frontend focuses on core functionality over advanced UI styling and animations.
- Basic validation and error handling were implemented, while more comprehensive validation was left out to prioritize core features.

---
## Design Questions

### 1. Multiple Uploads

The application uploads multiple documents in a single multipart/form-data request. Each uploaded file is processed one by one on the backend. The file is saved to local storage, and its metadata (title, filename, size and upload date) is stored in SQLite. Using a single request reduces network overhead compared to uploading each file separately. In a production environment, limits on the number or size of uploaded files would be added.

---

### 2. Streaming

Streaming allows files to be transferred in smaller chunks rather than loading the complete file into memory. This keeps memory usage low and allows the application to handle larger files more efficiently. Loading an entire file into memory before sending it could consume unnecessary memory and reduce server scalability.

---

### 3. Moving to S3

If the application used Amazon S3, the backend would upload files to an S3 bucket instead of the local uploads folder. The SQLite database would store the S3 object key or URL instead of a local filename. The backend could either stream files from S3 or generate pre-signed URLs so clients can download files directly from S3.

---

### 4. Frontend UX

With additional development time, I would add document previews for supported file types such as PDFs and images. I would also implement drag-and-drop uploads, upload progress indicators, toast notifications, loading animations and a more polished responsive interface to improve the overall user experience.

---

## Future Improvements

- User Authentication
- Delete Documents
- Edit Document Metadata
- Cloud Storage (AWS S3)
- File Preview
- Drag and Drop Upload