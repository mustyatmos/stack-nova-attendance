"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

type WorkerRecord = {
  name?: string;
  employeeId?: string;
};

export default function WorkersPage() {
  const [workers, setWorkers] = useState<WorkerRecord[]>([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "workers"));

        const workersData: WorkerRecord[] = [];

        snapshot.forEach((doc) => {
          workersData.push(doc.data() as WorkerRecord);
        });

        setWorkers(workersData);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchWorkers();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-8">Registered Workers</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {workers.map((worker, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold">{worker.name}</h2>
            <p className="text-gray-500 mt-2">
              ID: {worker.employeeId}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
