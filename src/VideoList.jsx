import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/videos/list/")
      .then(response => {
        setVideos(response.data);  // Store the video data
      })
      .catch(error => {
        console.error("Error fetching videos:", error);
      });
  }, []);

  return (
    <div>
      <h2>Uploaded Videos</h2>
      {videos.length === 0 ? (
        <p>No videos found</p>
      ) : (
        videos.map(video => (
          <div key={video.id} className="video-card">
            <h3>{video.title}</h3>
            <video width="400" controls>
              <source src={`http://127.0.0.1:8000${video.file}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))
      )}
    </div>
  );
};

export default VideoList;
