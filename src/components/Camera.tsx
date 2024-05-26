"use client"

import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export const Camera = () => {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageText, setImageText] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot() ?? null;
    setImageSrc(imageSrc);
  }, [webcamRef]);

  const uploadAndProcessImage = async () => {
    if (!imageSrc) return;

    try {
      const { data } = await axios.post("/api/upload", { image: imageSrc });
      setImageText(data.text);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <button
        onClick={capture}
        className="mt-4 rounded bg-blue-500 py-2 px-4 text-white"
      >
        Capture
      </button>
      {imageSrc && (
        <div>
          <img src={imageSrc} alt="Captured" className="mt-4" />
          <button
            onClick={() => setImageSrc(null)}
            className="mt-4 rounded bg-red-500 py-2 px-4 text-white"
          >
            Recapture
          </button>
          <button
            onClick={uploadAndProcessImage}
            className="mt-4 ml-4 rounded bg-green-500 py-2 px-4 text-white"
          >
            Save & Process
          </button>
        </div>
      )}
      {imageText && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Extracted Text:</h3>
          <p>{imageText}</p>
        </div>
      )}
    </div>
  );
};
