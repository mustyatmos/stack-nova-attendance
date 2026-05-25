export default function AttendanceLogsPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white p-10">
      <h1 className="text-4xl font-bold mb-6">
        Attendance Logs
      </h1>

      <p className="text-gray-300">
        Attendance records are currently being saved successfully in Firebase.
      </p>

      <p className="text-gray-400 mt-4">
        Admin log table will be connected after deployment.
      </p>
    </main>
  );
}