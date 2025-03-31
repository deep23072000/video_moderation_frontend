import React from "react";
import VideoUpload from "./video.jsx";

import VideoList from "./VideoList.jsx";
import LiveStream from "./LiveStream.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Navbar.jsx";



function App() {
  return (
    <BrowserRouter>
    <Nav></Nav>
      <Routes>
        <Route path="/" element={<VideoList></VideoList>}></Route>
        <Route path="/live_stream" element={<LiveStream/>}></Route>
        <Route path="/video_upload" element={<VideoUpload/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
