"use client";

import { getSong } from "@/app/api/requests/shazam";
import React, { useState, useRef } from "react";

interface AudioRecorderProps {
  onClose?: () => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [identifiedSong, setIdentifiedSong] = useState<any>(null);
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
      const response = await getSong(formData);
      setIdentifiedSong(response.track);
      setAudioBlob(null); // Reset for new recording
    } catch (error) {
      console.error("Error identifying song:", error);
      alert("Failed to identify song. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {!permission ? (
        <button 
          onClick={getMicrophonePermission}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <span>🎤</span>
          <span>Grant Microphone Access</span>
        </button>
      ) : (
<>
          {identifiedSong ? (
            <div className="flex flex-col gap-4 p-6 bg-gray-50 rounded-lg shadow-md">
              <div className="flex flex-col items-start gap-2">
                <h3 className="text-3xl font-bold text-gray-800">
                  {identifiedSong.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-xl">
                    {identifiedSong.subtitle}
                  </span>
                  {identifiedSong.genres?.primary && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="px-2 py-1 bg-gray-200 rounded-full text-sm">
                        {identifiedSong.genres.primary}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  setIdentifiedSong(null);
                  setAudioBlob(null);
                }}
                className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <span>🎤</span>
                <span>Record Another Song</span>
              </button>
            </div>
          ) : (
            <div className="flex gap-4 w-full">
              <button 
                onClick={isRecording ? stopRecording : startRecording}
                className={`flex-1 px-4 py-2 text-white rounded transition-colors flex items-center justify-center gap-2
                  ${isRecording 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-500 hover:bg-green-600'
                  }`}
              >
                <span>{isRecording ? '⏹️' : '⏺️'}</span>
                <span>{isRecording ? "Stop Recording" : "Start Recording"}</span>
              </button>
              {audioBlob && (
                <button 
                  onClick={handleSendAudio}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>🔍</span>
                  <span>Identify Song</span>
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AudioRecorder;
