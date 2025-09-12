'use client';
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Verify() {
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const search = useSearchParams();
  const email = search.get("email");

  async function verify(e) {
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
  }

  return (
    <form onSubmit={verify} className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Enter OTP sent to {email}</h2>
      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
        inputMode="numeric"
        maxLength={6}
        required
        className="w-full mb-3 p-3 border text-center"
        placeholder="123456"
      />
      <button className="w-full py-2 bg-green-600 text-white rounded">Verify & Login</button>
      <p className="mt-2 text-sm text-red-600">{msg}</p>
    </form>
  );
}
