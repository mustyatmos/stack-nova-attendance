"use client";

import Webcam from "react-webcam";
import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { loadModels } from "../lib/faceapi";
import { db } from "../lib/firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

export default function AttendancePage() {
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    const startAI = async () => {
      await loadModels();


    };

    startAI();
  }, []);

  const scanFace = async () => {
    try {
      const screenshot = webcamRef.current?.getScreenshot();

      if (!screenshot) {
        alert("No Image Captured");
        return;
      }

      const img = await faceapi.fetchImage(screenshot);

      const detection = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        alert("No Face Detected");
        return;
      }

      const snapshot = await getDocs(collection(db, "workers"));

      const workers: any[] = [];

      snapshot.forEach((doc) => {
        workers.push(doc.data());
      });

      if (workers.length === 0) {
        alert("No workers registered yet");
        return;
      }

      const labeledDescriptors = workers.map((worker) => {
        return new faceapi.LabeledFaceDescriptors(worker.name, [
          new Float32Array(worker.faceDescriptor),
        ]);
      });

      const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

      const result = faceMatcher.findBestMatch(detection.descriptor);

      if (result.label === "unknown") {
        alert("Worker Not Recognized");
      } else {
        const today = new Date().toLocaleDateString();

const attendanceQuery = query(
  collection(db, "attendance"),
  where("name", "==", result.label),
  where("date", "==", today)
);

const existingAttendance = await getDocs(attendanceQuery);

if (!existingAttendance.empty) {
  alert(`${result.label} has already marked attendance today.`);
  return;
}

await addDoc(collection(db, "attendance"), {
  name: result.label,
  status: "Present",
  date: today,
  time: new Date().toLocaleTimeString(),
  createdAt: new Date().toISOString(),
});

alert(`Welcome ${result.label}. Attendance marked successfully.`);
      }
    } catch (error) {
      console.error(error);
      alert("Face Matching Error");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-[450px]">
        <h1 className="text-3xl font-bold mb-6">
          AI Attendance Scanner
        </h1>

        {loading && (
          <p className="text-blue-600 mb-4">Loading AI Models...</p>
        )}

        <div className="overflow-hidden rounded-xl mb-5">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            className="w-full rounded-xl"
          />
        </div>

        <button
          onClick={scanFace}
          className="bg-black text-white py-3 rounded-xl w-full"
        >
          Scan Face
        </button>
      </div>
    </main>
  );
}