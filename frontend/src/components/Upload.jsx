import { useState } from "react";
import api from "../api";

function Upload({ fetchDocuments }) {

    const [selectedFiles, setSelectedFiles] = useState([]);

    function handleFileChange(event) {
        setSelectedFiles(event.target.files);
    }

    async function uploadFiles() {

        const formData = new FormData();

        for (let file of selectedFiles) {
            formData.append("files", file);
        }

        await api.post("/documents", formData);
        await fetchDocuments();

        alert("Upload Successful!");
    }

    return (
        <div>

            <h2 style={{ marginBottom: 12 }}>Upload Documents</h2>

            <div style={{ marginBottom: 12 }}>
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                />
            </div>

            <button onClick={uploadFiles} style={{ padding: "8px 12px" }}>
                Upload
            </button>

        </div>
    );
}

export default Upload;