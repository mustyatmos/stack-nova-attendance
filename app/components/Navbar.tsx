import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-950 text-white px-8 py-5 flex justify-between items-center border-b border-slate-800">

      <h1 className="text-2xl font-bold">
        Stack Nova AI
      </h1>

      <div className="flex gap-8 text-lg">

        <Link
          href="/"
          className="hover:text-blue-400 transition"
        >
          Home
        </Link>

        <Link
          href="/attendance"
          className="hover:text-blue-400 transition"
        >
          Attendance
        </Link>

        <Link
          href="/admin"
          className="hover:text-blue-400 transition"
        >
          Admin
        </Link>

      </div>

    </nav>
  );
}