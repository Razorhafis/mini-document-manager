import { useEffect, useState } from "react";
import Upload from "./components/Upload";
import SearchBar from "./components/SearchBar";
import DocumentList from "./components/DocumentList";
import api from "./api";

function App() {

    const [documents, setDocuments] = useState([]);
    const [page, setPage] = useState(1);

    async function fetchDocuments() {
        const response = await api.get( `/documents?page=${page}&page_size=5`);
        setDocuments(response.data);
    }

    async function searchDocuments(query) {

    const response = await api.get(
        `/documents?q=${query}&page=1&page_size=5`
    );

    setDocuments(response.data);
    setPage(1);
}

useEffect(() => {
    fetchDocuments();
}, [page]);

return (
    <div style={{ padding: 24, maxWidth: 700, margin: "0 auto" }}>

        <h1 style={{ marginBottom: 24 }}>Mini Document Manager</h1>

        <div style={{ marginBottom: 24 }}>
            <Upload fetchDocuments={fetchDocuments} />
        </div>

        <div style={{ marginBottom: 24 }}>
            <SearchBar searchDocuments={searchDocuments} />
        </div>

        <div style={{ marginBottom: 24 }}>
            <DocumentList documents={documents} />
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>

            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                style={{ padding: "8px 12px" }}
            >
                Previous
            </button>

            <span style={{ padding: "0 8px" }}> Page {page} </span>

            <button
                onClick={() => setPage(page + 1)}
                style={{ padding: "8px 12px" }}
            >
                Next
            </button>

        </div>

    </div>
);
}

export default App;