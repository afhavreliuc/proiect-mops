"use client";

import { getSong } from "@/app/api/requests/shazam";
import React, { useState, useRef } from "react";

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  // Get microphone permission
  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err: any) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = () => {
    if (!permission) {
      alert("Please grant microphone permission first.");
      return;
    }

    try {
      mediaRecorderRef.current = new MediaRecorder(stream!);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioBlob(event.data);
        }
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    try {
      mediaRecorderRef.current!.stop();
      setIsRecording(false);
    } catch (error) {
      console.error("Error stopping recording:", error);
    }
  };

  const handleSendAudio = async () => {
    if (!audioBlob) {
      alert("No audio recorded");
      return;
    }

    const formData = new FormData();
    formData.append("file", audioBlob, "recording.webm");

    try {
      const result = await getSong(formData);
      console.log("Song recognition result:", result);
    } catch (error) {
      console.error("Error sending audio blob:", error);
    }
  };

  return (
    <div>
      {!permission && (
        <button onClick={getMicrophonePermission}>
          Grant Microphone Access
        </button>
      )}
      {permission && (
        <>
          <button onClick={isRecording ? stopRecording : startRecording}>
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
          {audioBlob && (
            <button onClick={handleSendAudio}>
              Send Audio for Recognition
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default AudioRecorder;
