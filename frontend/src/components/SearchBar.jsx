import { useState } from "react";

function SearchBar({ searchDocuments }) {

    const [query, setQuery] = useState("");

    return (
        <div>

            <h2 style={{ marginBottom: 12 }}>Search</h2>

            <div style={{ display: "flex", gap: 8 }}>

                <input
                    type="text"
                    placeholder="Search documents..."
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    style={{ padding: "8px 12px", flex: 1 }}
                />

                <button
                    onClick={() => searchDocuments(query)}
                    style={{ padding: "8px 12px" }}
                >
                    Search
                </button>

            </div>

        </div>
    );
}

export default SearchBar;