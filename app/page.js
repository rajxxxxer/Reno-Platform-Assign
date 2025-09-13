"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Shinny from "./components/Shinny";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./Usercontext/UserContext";

export default function Home() {
  const router = useRouter();
  const { user, setUser ,fetchUser} = useContext(UserContext);
  useEffect(()=>{
    fetchUser();
  },[])

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      setUser(null);
      router.refresh(); // refsh ui
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100 relative">
     
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
          <Shinny
            onclick={() => router.push("/auth/login")}
            cl="bg-gradient-to-r from-[#417DF6] to-[#8E37EB]"
            val={"Login"}
          />
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
          <Link href={user ? "/add-school" : "/auth/login"} className="cursor-pointer">
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
