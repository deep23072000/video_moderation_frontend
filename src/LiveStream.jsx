import React, { useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";

const LiveStream = () => {
  const [stream, setStream] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const videoRef = useRef();
  const peerRef = useRef(null);
  const ws = useRef(null);

  const startStreaming = async () => {
    if (isStreaming) return; // Prevent duplicate streams

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      ws.current = new WebSocket("ws://127.0.0.1:8000/ws/live/");
      setStream(mediaStream);
      setIsStreaming(true); // ✅ Ensure state updates to show Stop button

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      peerRef.current = new SimplePeer({ initiator: true, stream: mediaStream, trickle: false });

      peerRef.current.on("signal", (data) => {
        ws.current.send(JSON.stringify({ message: data }));
      });

      ws.current.onmessage = (event) => {
        const receivedData = JSON.parse(event.data).message;
        peerRef.current.signal(receivedData);
      };
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopStreaming = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop()); // Stop camera & mic
      setStream(null);
    }
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }
    setIsStreaming(false); // ✅ Update state to switch back to Start button
  };

  useEffect(() => {
    return () => {
      stopStreaming(); // Cleanup on unmount
    };
  }, []);

  return (
    <div>
      <h2>Live Stream</h2>
      <video ref={videoRef} autoPlay playsInline muted />
      <div>
        {isStreaming ? (
          <button onClick={stopStreaming} style={{ backgroundColor: "red", color: "white" }}>Stop Live Stream</button>
        ) : (
          <button onClick={startStreaming} style={{ backgroundColor: "green", color: "white" }}>Start Live Stream</button>
        )}
      </div>
    </div>
  );
};

export default LiveStream;
