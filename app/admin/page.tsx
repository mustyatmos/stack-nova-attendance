"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function AdminDashboard() {
  const [workerCount, setWorkerCount] = useState(0);
  const [attendanceCount, setAttendanceCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const workersSnapshot = await getDocs(collection(db, "workers"));
        const attendanceSnapshot = await getDocs(collection(db, "attendance"));

        setWorkerCount(workersSnapshot.size);
        setAttendanceCount(attendanceSnapshot.size);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchStats();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">
        Stack Nova Admin Dashboard
      </h1>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

  <div className="bg-slate-800 text-white p-8 rounded-2xl shadow">

    <h2 className="text-2xl font-bold">
      Total Workers
    </h2>

    <p className="text-5xl mt-4 font-bold text-blue-400">
      {workerCount}
    </p>

  </div>

  <div className="bg-slate-800 text-white p-8 rounded-2xl shadow">

    <h2 className="text-2xl font-bold">
      Attendance Logs
    </h2>

    <p className="text-5xl mt-4 font-bold text-green-400">
      {attendanceCount}
    </p>

  </div>

</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <Link href="/admin/register">

          <div className="bg-white p-8 rounded-2xl shadow hover:scale-105 transition cursor-pointer">

            <h2 className="text-3xl font-bold mb-3">
              Register Worker
            </h2>

            <p className="text-gray-500">
              Add new workers and register faces
            </p>

          </div>

        </Link>

        <Link href="/admin/workers">

          <div className="bg-white p-8 rounded-2xl shadow hover:scale-105 transition cursor-pointer">

            <h2 className="text-3xl font-bold mb-3">
              Workers
            </h2>

            <p className="text-gray-500">
              View all registered workers
            </p>

          </div>

        </Link>

        <Link href="/admin/attendance">

          <div className="bg-white p-8 rounded-2xl shadow hover:scale-105 transition cursor-pointer">

            <h2 className="text-3xl font-bold mb-3">
              Attendance Logs
            </h2>

            <p className="text-gray-500">
              Monitor daily attendance records
            </p>

          </div>

        </Link>

      </div>

    </main>
  );
}