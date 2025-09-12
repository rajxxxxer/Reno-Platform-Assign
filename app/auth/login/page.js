'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Shinny from "@/app/components/Shinny";

export default function Login() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const handleSend = async (e) => {
    e.preventDefault();
    setMsg("Sending...");
    const res = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
    } else {
      setMsg(data.error || "Failed to send OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-100 px-4">
      <form
        onSubmit={handleSend}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          🔐 Login with Email OTP
        </h2>

        <label className="block mb-2 text-gray-700 font-medium" htmlFor="email">
          Email Address
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          required
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="you@example.com"
        />

        <div className="flex justify-center">
          <Shinny onclick={handleSend} val={"📩 Send OTP"} />
        </div>

        {msg && (
          <p className="mt-4 text-center text-sm text-red-600">{msg}</p>
        )}
      </form>
    </div>
  );
}
