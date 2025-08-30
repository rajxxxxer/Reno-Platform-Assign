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
    <div className="flex flex-col items-center py-12 px-4">
      {/* ✅ Top navigation buttons */}
      <div className="flex gap-4 mb-8">
        <ShinyButton
          val="🏠 Go Home"
          onclick={() => router.push("/")}
          cl="bg-gradient-to-r from-[#34d399] to-[#059669] px-6"
        />
        <ShinyButton
          val="📚 View Schools"
          onclick={() => router.push("/show-schools")}
          cl="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-6"
        />
      </div>

      {/* ✅ Add School Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center text-sm text-slate-800 w-full max-w-lg"
      >
        <p className="text-xs bg-indigo-200 text-indigo-600 font-medium px-3 py-1 rounded-full">
          Add New Entry
        </p>
        <h1 className="text-3xl md:text-4xl font-bold py-4 text-center">
          Add a School
        </h1>
        <p className="max-md:text-sm text-gray-500 pb-6 text-center">
          Fill the details below to add a school to the database.
        </p>

        <div className="w-full px-4">
          {/* Name */}
          <label htmlFor="name" className="font-medium">
            School Name
          </label>
          <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full 
                          focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Enter school name"
              required
              className="h-full px-2 w-full outline-none bg-transparent"
            />
          </div>

          {/* Address */}
          <label htmlFor="address" className="font-medium">
            Address
          </label>
          <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full 
                          focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
            <input
              type="text"
              name="address"
              onChange={handleChange}
              placeholder="Enter address"
              required
              className="h-full px-2 w-full outline-none bg-transparent"
            />
          </div>

          {/* City */}
          <label htmlFor="city" className="font-medium">
            City
          </label>
          <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full 
                          focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
            <input
              type="text"
              name="city"
              onChange={handleChange}
              placeholder="Enter city"
              required
              className="h-full px-2 w-full outline-none bg-transparent"
            />
          </div>

          {/* State */}
          <label htmlFor="state" className="font-medium">
            State
          </label>
          <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full 
                          focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
            <input
              type="text"
              name="state"
              onChange={handleChange}
              placeholder="Enter state"
              required
              className="h-full px-2 w-full outline-none bg-transparent"
            />
          </div>

          {/* Contact */}
          <label htmlFor="contact" className="font-medium">
            Contact
          </label>
          <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full 
                          focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
            <input
              type="text"
              name="contact"
              onChange={handleChange}
              placeholder="Enter contact number"
              required
              className="h-full px-2 w-full outline-none bg-transparent"
            />
          </div>

          {/* Image URL */}
          <label htmlFor="image" className="font-medium">
            Image URL
          </label>
          <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full 
                          focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
            <input
              type="text"
              name="image"
              onChange={handleChange}
              placeholder="Enter image link"
              required
              className="h-full px-2 w-full outline-none bg-transparent"
            />
          </div>

          {/* Email */}
          <label htmlFor="email_id" className="font-medium">
            Email
          </label>
          <div className="flex items-center mt-2 mb-6 h-10 pl-3 border border-slate-300 rounded-full 
                          focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
            <input
              type="email"
              name="email_id"
              onChange={handleChange}
              placeholder="Enter school email"
              required
              className="h-full px-2 w-full outline-none bg-transparent"
            />
          </div>

          {/* ✅ ShinyButton as Submit */}
          <ShinyButton
            type="submit"
            val="➕ Create School"
            cl="bg-gradient-to-r from-[#417DF6] to-[#8E37EB] w-full"
          />
        </div>
      </form>
    </div>
  );
}
