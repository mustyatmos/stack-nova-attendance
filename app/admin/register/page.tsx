"use client";

import Webcam from "react-webcam";
import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { loadModels } from "../../lib/faceapi";

import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function RegisterWorkerPage() {
  const webcamRef = useRef<Webcam>(null);

  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const startAI = async () => {
      await loadModels();
      setModelsLoaded(true);
    };

    startAI();
  }, []);

  const registerWorker = async () => {
    if (!name || !employeeId) {
      alert("Enter worker name and employee ID");
      return;
    }

    const screenshot = webcamRef.current?.getScreenshot();

    if (!screenshot) {
      alert("No image captured");
      return;
    }

    const img = await faceapi.fetchImage(screenshot);

    const detection = await faceapi
      .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      alert("No face detected. Try again with better lighting.");
      return;
    }

    const workerData = {
      name,
      employeeId,
      faceDescriptor: Array.from(detection.descriptor),
    };

   await addDoc(collection(db, "workers"), {
  ...workerData,
  createdAt: new Date().toISOString(),
});

alert("Worker Saved to Firebase Successfully");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[450px]">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Register Worker
        </h1>

        {!modelsLoaded && (
          <p className="text-blue-600 text-center mb-4">
            Loading AI Models...
          </p>
        )}

        <input
          type="text"
          placeholder="Worker Name"
          className="border p-3 rounded-xl w-full mb-4"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Employee ID e.g SN001"
          className="border p-3 rounded-xl w-full mb-4"
          onChange={(e) => setEmployeeId(e.target.value)}
        />

        <div className="overflow-hidden rounded-xl mb-5">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            className="w-full rounded-xl"
          />
        </div>

        <button
          onClick={registerWorker}
          className="bg-black text-white py-3 rounded-xl w-full"
        >
          Register Face
        </button>
      </div>
    </main>
  );
}