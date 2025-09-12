"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Shinny from "./components/Shinny";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Check login on mount
      async function fetchUser() {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        if (!res.ok) {
          throw new Error("User fetch failed");
        }
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err.message);
        setUser(null);
      }
    }
    
  useEffect(() => {


    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      setUser(null);
      router.refresh(); // refresh to update UI
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100 relative">
      {/* Top-right Login/Logout button + Email */}
      <div className="absolute top-4 right-6 flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-3 text-right max-w-xs sm:max-w-none">
        {user ? (
          <>
            <span className="text-sm text-gray-700 whitespace-nowrap">
              👋 Hi, <span className="font-semibold">{user.email}</span>
            </span>
            <Shinny onclick={handleLogout}  cl="bg-gradient-to-r from-[#EF4444] to-[#B91C1C]"

              val={" logout"} ></Shinny>
        
          </>
        ) : (
          <button
            onClick={() => router.push("/auth/login")}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
          >
            Login
          </button>
        )}
      </div>

      <section className=" flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <h1 className="mt-17 text-3xl md:text-5xl font-bold mb-6 text-gray-800">
          Welcome to <span className="text-blue-600">School Management App</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Easily create and manage schools in one place.
        </p>

        <div className="flex gap-6 flex-col sm:flex-row cursor-pointer">
          <Link href="/add-school" className="cursor-pointer">
            <Shinny
              cl="bg-gradient-to-r from-[#417DF6] to-[#8E37EB]"
              val={"➕ Create School"}
            />
          </Link>
          <Link href="/show-schools" className="cursor-pointer">
            <Shinny val={"🏫 View Schools"} />
          </Link>
        </div>
      </section>
    </div>
  );
}
