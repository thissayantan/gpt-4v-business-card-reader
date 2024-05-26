"use client";

import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import Pica from "pica";

const pica = Pica();

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user", // use "environment" for rear camera
};

export const Camera = () => {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageText, setImageText] = useState<string | null>(null);

  const capture = useCallback(async () => {
    const originalImageSrc = webcamRef.current?.getScreenshot() ?? null;
    if (originalImageSrc) {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = 1280; // Set desired width
        canvas.height = 720; // Set desired height
        // Resize and optimize the image
        await pica.resize(img, canvas, {
          unsharpAmount: 80,
          unsharpRadius: 0.6,
          unsharpThreshold: 2,
        });
        const optimizedImage = canvas.toDataURL("image/jpeg", 0.9);
        setImageSrc(optimizedImage);
      };
      img.src = originalImageSrc;
    }
  }, []);

  const uploadAndProcessImage = async () => {
    if (!imageSrc) return;

    try {
      // Update this to your actual API endpoint
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
