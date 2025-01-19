import React, { useState } from "react";
import axios from "axios";
import './styles/DocumentUploader.css';


function DocumentUploader() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResponse(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/documents/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while uploading the file.");
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="uploader-container">
      <h2 className="uploader-title">Document Summary Assistant</h2>
      <div className="file-input-container">
        <input type="file" onChange={handleFileChange} className="file-input" />
      </div>
      <button
        onClick={handleUpload}
        disabled={isLoading}
        className={`upload-button ${isLoading ? "loading" : ""}`}
      >
        {isLoading ? "Uploading..." : "Upload"}
      </button>
      {error && <p className="error-message">{error}</p>}
      {response && (
        <div className="response-container">
          <div className="response-section">
            <h3>Extracted Text</h3>
            <pre className="response-text">{response.extracted_text}</pre>
          </div>
          <div className="response-section">
            <h3>Summary</h3>
            <p className="response-summary">{response.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentUploader;
