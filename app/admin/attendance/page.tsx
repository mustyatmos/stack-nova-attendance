"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function AttendanceLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const q = query(collection(db, "attendance"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLogs(data);
    };

    fetchLogs();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">Attendance Logs</h1>

      <div className="bg-slate-900 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Time</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log: any) => (
              <tr key={log.id} className="border-b border-slate-700">
                <td className="p-4">{log.name}</td>
                <td className="p-4 text-green-400">{log.status}</td>
                <td className="p-4">{log.date}</td>
                <td className="p-4">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}