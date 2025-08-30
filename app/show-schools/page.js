"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ShinyButton from "../components/Shinybutton";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/schools");
      const data = await res.json();
      setSchools(data);
    } catch (error) {
      console.error("Failed to fetch schools:", error);
    }
    setLoading(false);
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this school?")) return;

    try {
      const res = await fetch(`/api/schools/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert("Error deleting school: " + errorData.error);
        return;
      }

      alert("School deleted successfully!");
      // Remove deleted school from state
      setSchools((prev) => prev.filter((school) => school.id !== id));
    } catch (error) {
      alert("Failed to delete school.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* ✅ Top Buttons */}
      <div className="flex justify-center gap-4 py-8">
        <ShinyButton
          val="🏠 Go Home"
          onclick={() => router.push("/")}
          cl="bg-gradient-to-r from-[#34d399] to-[#059669] px-6"
        />
        <ShinyButton
          val="➕ Create School"
          onclick={() => router.push("/add-school")}
          cl="bg-gradient-to-r from-[#417DF6] to-[#8E37EB] px-6"
        />
      </div>

      {/* ✅ Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800">
        📚 All Schools
      </h2>

      {/* ✅ School Cards Grid */}
      <div className="grid gap-8 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* ✅ Spinner while loading */}
        {loading ? (
          <div className="col-span-full flex flex-col items-center text-gray-500">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p>Loading schools...</p>
          </div>
        ) : schools.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 mt-6">
            No schools found. Try adding one!
          </p>
        ) : (
          schools.map((s) => (
            <div
              key={s.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden border hover:shadow-xl transform hover:scale-[1.02] transition-all flex flex-col"
            >
              <img
                src={s.image}
                alt={s.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex-grow">
                <h3 className="text-lg font-semibold text-gray-900">{s.name}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  {s.address}, {s.city}, {s.state}
                </p>
                <p className="text-gray-800 font-medium mt-3">📞 {s.contact}</p>
                <p className="text-gray-800 text-sm">✉️ {s.email_id}</p>
              </div>

              {/* Delete Button */}
              <div className="p-4 pt-0">
                <ShinyButton
                  val="🗑️ Delete"
                  onclick={() => handleDelete(s.id)}
                  cl="bg-gradient-to-r from-red-500 to-red-700 w-full py-2 text-sm"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
