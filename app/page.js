
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100">
     
      <section className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">
          Welcome to <span className="text-blue-600">School Management App</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Easily create and manage schools in one place.
        </p>

        <div className="flex gap-6 flex-col sm:flex-row">
          <Link
            href="/add-school"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition text-lg font-medium"
          >
            ➕ Create School
          </Link>
          <Link
            href="/show-schools"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition text-lg font-medium"
          >
            📋 Show Schools
          </Link>
        </div>
      </section>
    </div>
  );
}
