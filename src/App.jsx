import React from "react";
import VideoUpload from "./video.jsx";

import VideoList from "./VideoList.jsx";

function App() {
  return (
    <div className="App">
      <h1>Video Upload App</h1>
      <VideoUpload />
      <h1>Video list</h1>
      <VideoList></VideoList>
    </div>
  );
}

export default App;
