function DocumentList({ documents }) {

    function downloadDocument(id) {

        window.open(
            `http://127.0.0.1:8000/documents/${id}/download`,
            "_blank"
        );

    }

    return (
        <div>

            <h2 style={{ marginBottom: 12 }}>Documents</h2>

            {documents.map((document) => (
                <div
                    key={document.id}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 0",
                        gap: 12,
                    }}
                >

                    <span>{document.title}</span>

                    <button
                        onClick={() => downloadDocument(document.id)}
                        style={{ padding: "6px 10px" }}
                    >
                        Download
                    </button>

                </div>
            ))}

        </div>
    );
}

export default DocumentList;