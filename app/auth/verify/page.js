'use client';
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Shinny from "@/app/components/Shinny";

export default function Verify() {
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const search = useSearchParams();
  const email = search.get("email");

  const handleVerify = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/");
    } else {
      setMsg(data.error || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-100 px-4">
      <form
        onSubmit={handleVerify}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          ✅ Verify OTP
        </h2>

        <p className="text-center text-sm text-gray-600 mb-4">
          Enter the 6-digit OTP sent to <span className="font-medium">{email}</span>
        </p>

        <input
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
          }
          inputMode="numeric"
          maxLength={6}
          required
          className="w-full px-4 py-3 mb-4 text-center text-lg tracking-widest border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          placeholder="123456"
        />

        <div className="flex justify-center">
          <Shinny onclick={handleVerify} val={"🔓 Verify & Login"} />
        </div>

        {msg && (
          <p className="mt-4 text-center text-sm text-red-600">{msg}</p>
        )}
      </form>
    </div>
  );
}
