import React, { useState } from "react";
import axios from "axios";
import './assets/a.css';

const VideoUpload = () => {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setVideo(event.target.files[0]); // Store the selected file
  };

  const handleUpload = async () => {
    if (!video || !title) {
      setMessage("Please provide a title and select a video.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", video);

    try {
      const response = await axios.post("http://127.0.0.1:8000/videos/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Video uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading video:", error);
      setMessage("❌ Upload failed.");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Video</h2>
      <input 
        type="text" 
        placeholder="Enter video title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VideoUpload;
