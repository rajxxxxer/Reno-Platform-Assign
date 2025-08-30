"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ShinyButton from "../components/ShinyButton";


export default function AddSchool() {
  const [form, setForm] = useState({});
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/schools", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("School added!");
  };

  return (
    <div
      className="min-h-screen bg-[url('/bac-img.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center py-12 px-4 md:px-6"
    >
      {/* Top navigation buttons */}
      <div className="flex gap-4 mb-8">
        
        <ShinyButton
          val="🏠 Go Home"
          onclick={() => router.push("/")}
          cl="bg-gradient-to-r from-[#34d399] to-[#059669] px-5 text-sm md:text-base"
        />
        <ShinyButton
          val="📚 View Schools"
          onclick={() => router.push("/show-schools")}
          cl="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-5 text-sm md:text-base"
        />
      </div>

      {/* Add School Form */}
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-md bg-white/90 rounded-xl shadow-lg flex flex-col items-center text-sm md:text-base text-slate-800 w-full max-w-lg p-6 md:p-8"
      >
        <p className="text-xs md:text-sm bg-indigo-200 text-indigo-600 font-medium px-4 py-1 rounded-full mb-3 md:mb-4">
          Add New Entry
        </p>
        <h1 className="text-2xl md:text-3xl font-bold py-2 md:py-4 text-center mb-5">
          Add a School
        </h1>
        <p className="max-md:text-sm text-gray-500 pb-6 text-center">
          Fill the details below to add a school to the database.
        </p>

        <div className="w-full space-y-5">
          {[
            { label: "School Name", name: "name", type: "text", placeholder: "Enter school name" },
            { label: "Address", name: "address", type: "text", placeholder: "Enter address" },
            { label: "City", name: "city", type: "text", placeholder: "Enter city" },
            { label: "State", name: "state", type: "text", placeholder: "Enter state" },
            { label: "Contact", name: "contact", type: "text", placeholder: "Enter contact number" },
            { label: "Image URL", name: "image", type: "text", placeholder: "Enter image link" },
            { label: "Email", name: "email_id", type: "email", placeholder: "Enter school email" },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label htmlFor={name} className="font-medium mb-1 block text-sm md:text-base">
                {label}
              </label>
              <input
                type={type}
                name={name}
                onChange={handleChange}
                placeholder={placeholder}
                required
                className="w-full h-10 md:h-11 px-3 md:px-4 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm md:text-base"
              />
            </div>
          ))}

          <ShinyButton
            type="submit"
            val="➕ Create School"
            cl="bg-gradient-to-r from-[#417DF6] to-[#8E37EB] w-full py-3 text-base md:text-lg"
          />
        </div>
      </form>
    </div>
  );
}
