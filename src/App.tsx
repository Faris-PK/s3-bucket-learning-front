import React, { useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
      console.log('Enthat response: ', response);
      
      setUploadUrl(response.data.url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>File Upload to S3</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadUrl && (
        <div>
          <h2>File uploaded successfully!</h2>
          <a href={uploadUrl} target="_blank" rel="noopener noreferrer">View File</a>
        </div>
      )}
    </div>
  );
};

export default App;
