import React from "react";
import DocumentUploader from "./components/DocumentUploader";
import "./App.css"; 

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Document Summary Assistant</h1>
      </header>
      <main>
        <DocumentUploader />
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 Document Summary Assistant. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
