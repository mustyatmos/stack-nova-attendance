"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function AttendanceLogsPage() {

  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {

    const fetchAttendance = async () => {

      const q = query(
        collection(db, "attendance"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const attendanceData: any[] = [];

      snapshot.forEach((doc) => {
        attendanceData.push(doc.data());
      });

      setLogs(attendanceData);

    };

    fetchAttendance();

  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        Attendance Logs
      </h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow">

        <table className="w-full">

          <thead className="bg-black text-white">

            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Time</th>
            </tr>

          </thead>

          <tbody>

            {
              logs.map((log, index) => (

                <tr
                  key={index}
                  className="border-b"
                >

                  <td className="p-4">{log.name}</td>

                  <td className="p-4 text-green-600 font-semibold">
                    {log.status}
                  </td>

                  <td className="p-4">{log.date}</td>

                  <td className="p-4">{log.time}</td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </main>
  );
}